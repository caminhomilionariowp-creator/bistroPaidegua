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
const writeLocalRaw = (key: string, value: unknown) => {
  try {
    rawSetItem.call(localStorage, key, JSON.stringify(value));
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
      try {
        pushKey(key, JSON.parse(value));
      } catch {
        pushKey(key, value);
      }
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
      const incoming = JSON.stringify(row?.valor ?? null);
      if (lastPushed.get(key) === incoming) return; // eco do nosso próprio push
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
      const incoming = JSON.stringify(valor);
      if (localNow !== incoming) writeLocalRaw(chave, valor);
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
        if (has === undefined) pushKey(k, JSON.parse(v));
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
