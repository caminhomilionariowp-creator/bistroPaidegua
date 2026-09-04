/* ================================================================== */
/*  Backend Supabase — sincroniza o estado do app entre aparelhos.     */
/*  Modelo: tabela estado_app (chave -> valor jsonb). Espelha o que    */
/*  antes ficava só no localStorage. Funciona offline (cache local).   */
/* ================================================================== */
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const ANON = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const backendEnabled = !!(URL && ANON);

export const supabase: SupabaseClient | null = backendEnabled
  ? createClient(URL!, ANON!, {
      auth: { persistSession: false },
      realtime: { params: { eventsPerSecond: 5 } },
    })
  : null;

const TABLE = 'estado_app';

/** Chaves do localStorage que devem viajar entre aparelhos. */
export const SYNCED_KEYS: string[] = [
  'bistro_pai_degua_conteudo_v1', // edições do gestor
  'bistro_pai_degua_employees_v2', // equipe (contas + PIN)
  'bistro_pai_degua_team_v1', // líderes por setor
  'bistro_pai_degua_checklists_v2', // checklists por setor
  'bistro_pai_degua_estoque_v1', // estoque
  'bistro_pai_degua_rastreabilidade_v1', // lotes / validade
  'bistro_pai_degua_ocorrencias_v1', // ocorrências do Painel
  'bistro_pai_degua_implantacao_inicio_v1',
  'bistro_pai_degua_fotos_v2', // índice de fotos (URL pública do Storage)
];

const isSynced = (k: string) =>
  SYNCED_KEYS.includes(k) ||
  k.startsWith('bistro_pai_degua_principios_') ||
  k.startsWith('bistro_role_tasks_tracker_') ||
  k.startsWith('bistro_posto_epi_');

/* ---------- status de sincronização ---------- */
type SyncStatus = 'desligado' | 'conectando' | 'ok' | 'offline';
let status: SyncStatus = backendEnabled ? 'conectando' : 'desligado';
const statusListeners = new Set<(s: SyncStatus) => void>();
export const subscribeSyncStatus = (fn: (s: SyncStatus) => void) => {
  statusListeners.add(fn);
  fn(status);
  return () => statusListeners.delete(fn);
};
const setStatus = (s: SyncStatus) => {
  status = s;
  statusListeners.forEach((fn) => fn(s));
};

/* ---------- gravação sem eco (bypass do monkeypatch) ---------- */
const rawSetItem = Storage.prototype.setItem;

/** Como o valor do servidor deve ficar no localStorage.
 *  Algumas chaves guardam string crua (ex.: data ISO), não JSON. */
const asLocalString = (value: unknown): string =>
  typeof value === 'string' ? value : JSON.stringify(value);

/** Tenta desserializar JSON; se não for JSON, devolve a string crua. */
const parseMaybe = (raw: string): unknown => {
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
};

const writeLocalRaw = (key: string, value: unknown) => {
  try {
    rawSetItem.call(localStorage, key, asLocalString(value));
  } catch {
    /* cota cheia */
  }
  window.dispatchEvent(new CustomEvent('bistro:sync', { detail: { key } }));
};

/** o que acabamos de enviar — pra ignorar o eco do realtime */
const lastPushed = new Map<string, string>();
const pending = new Map<string, ReturnType<typeof setTimeout>>();

export const pushKey = (key: string, value: unknown) => {
  if (!supabase) return;
  const json = JSON.stringify(value);
  lastPushed.set(key, json);
  const prev = pending.get(key);
  if (prev) clearTimeout(prev);
  pending.set(
    key,
    setTimeout(async () => {
      pending.delete(key);
      const { error } = await supabase!
        .from(TABLE)
        .upsert({ chave: key, valor: value, atualizado_em: new Date().toISOString() });
      if (error) {
        setStatus('offline');
        console.warn('sync push falhou', key, error.message);
      } else if (status !== 'ok') {
        setStatus('ok');
      }
    }, 350),
  );
};

const pullKey = async (key: string): Promise<unknown | undefined> => {
  if (!supabase) return undefined;
  const { data, error } = await supabase.from(TABLE).select('valor').eq('chave', key).maybeSingle();
  if (error) return undefined;
  return data?.valor;
};

/* ---------- monkeypatch: toda gravação de chave sincronizada sobe ---------- */
let patched = false;
const patchLocalStorage = () => {
  if (patched) return;
  patched = true;
  const original = Storage.prototype.setItem;
  Storage.prototype.setItem = function (key: string, value: string) {
    original.call(this, key, value);
    if (this === window.localStorage && isSynced(key)) {
      pushKey(key, parseMaybe(value));
    }
  };
};

/* ---------- realtime ---------- */
const startRealtime = () => {
  if (!supabase) return;
  supabase
    .channel('estado_app_rt')
    .on('postgres_changes', { event: '*', schema: 'public', table: TABLE }, (payload) => {
      const row = (payload.new ?? payload.old) as { chave?: string; valor?: unknown } | undefined;
      const key = row?.chave;
      if (!key || !isSynced(key)) return;
      if (lastPushed.get(key) === JSON.stringify(row?.valor ?? null)) return; // eco do nosso push
      const incoming = asLocalString(row?.valor ?? null);
      let localNow: string | null = null;
      try {
        localNow = localStorage.getItem(key);
      } catch {
        /* ignore */
      }
      if (localNow === incoming) return;
      writeLocalRaw(key, row?.valor);
    })
    .subscribe((s) => {
      if (s === 'SUBSCRIBED' && status === 'conectando') setStatus('ok');
    });
};

/* ---------- init ---------- */
let started = false;
export const initSync = async () => {
  if (!backendEnabled || started) return;
  started = true;
  patchLocalStorage();
  try {
    const rows = await pullAll();
    rows.forEach(({ chave, valor }) => {
      if (!isSynced(chave)) return;
      let localNow: string | null = null;
      try {
        localNow = localStorage.getItem(chave);
      } catch {
        /* ignore */
      }
      if (localNow !== asLocalString(valor)) writeLocalRaw(chave, valor);
    });
    setStatus('ok');
  } catch {
    setStatus('offline');
  }
  startRealtime();
  // primeira carga de chaves locais que ainda não existem no servidor
  for (const k of SYNCED_KEYS) {
    try {
      const v = localStorage.getItem(k);
      if (v) {
        const has = await pullKey(k);
        if (has === undefined) pushKey(k, parseMaybe(v));
      }
    } catch {
      /* ignore */
    }
  }
};

const pullAll = async (): Promise<{ chave: string; valor: unknown }[]> => {
  if (!supabase) return [];
  const { data, error } = await supabase.from(TABLE).select('chave, valor');
  if (error) throw error;
  return (data as { chave: string; valor: unknown }[]) || [];
};

/* ---------- avisos de sincronização pra componentes ---------- */
/**
 * Chama `cb` quando uma das chaves chegar do servidor (realtime/pull).
 * Aceita chave exata ou prefixo terminando em "*".
 */
export const onSyncKey = (keys: string[], cb: (key: string) => void) => {
  const hit = (k: string) =>
    keys.some((m) => (m.endsWith('*') ? k.startsWith(m.slice(0, -1)) : k === m));
  const handler = (e: Event) => {
    const k = (e as CustomEvent).detail?.key as string | undefined;
    if (k && hit(k)) cb(k);
  };
  window.addEventListener('bistro:sync', handler);
  return () => window.removeEventListener('bistro:sync', handler);
};

/* ---------- fotos: Supabase Storage ---------- */
export const uploadPhoto = async (path: string, dataUri: string): Promise<string | null> => {
  if (!supabase) return null;
  const blob = await (await fetch(dataUri)).blob();
  const { error } = await supabase.storage.from('fotos').upload(path, blob, {
    upsert: true,
    contentType: blob.type || 'image/jpeg',
  });
  if (error) {
    console.warn('upload foto falhou', error.message);
    return null;
  }
  return supabase.storage.from('fotos').getPublicUrl(path).data.publicUrl;
};

export const deletePhotoRemote = async (path: string) => {
  if (!supabase) return;
  await supabase.storage.from('fotos').remove([path]);
};
