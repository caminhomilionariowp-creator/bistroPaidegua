import { TraceLot } from '../types';

/* ================================================================== */
/*  RASTREABILIDADE UNIVERSAL — Dossiê §7                              */
/*  "Primeiro identificar, depois armazenar. Sem etiqueta = Sem uso."  */
/* ================================================================== */

const TRACE_KEY = 'bistro_pai_degua_rastreabilidade_v1';

/** Vida útil padrão sob refrigeração, em horas — base para calcular a validade.
 *  Números conservadores no espírito da RDC 216; ajustáveis no ato da etiqueta. */
export interface ShelfLifePreset {
  product: string;
  category: string;
  hours: number;
  note?: string;
}

export const SHELF_LIFE: ShelfLifePreset[] = [
  { product: 'Açaí batido (polpa)', category: 'Polpas', hours: 24, note: 'Alto giro — bater em lotes menores.' },
  { product: 'Camarão regional limpo (cru, refrigerado)', category: 'Carnes & Peixes', hours: 24 },
  { product: 'Camarão seco demolhado', category: 'Pré-preparo', hours: 48 },
  { product: 'Filhote em posta (cru, refrigerado)', category: 'Carnes & Peixes', hours: 24 },
  { product: 'Charque dessalgado', category: 'Pré-preparo', hours: 72 },
  { product: 'Frango porcionado (cru, refrigerado)', category: 'Carnes & Peixes', hours: 48 },
  { product: 'Tucupi aferventado (alho e chicória)', category: 'Molhos', hours: 96 },
  { product: 'Vatapá', category: 'Molhos', hours: 72 },
  { product: 'Maniçoba cozida', category: 'Pré-preparo', hours: 72, note: 'Maniva exige cozimento longo — respeitar o lote da quarta.' },
  { product: 'Jambu catado e branqueado', category: 'Pré-preparo', hours: 48 },
  { product: 'Vinagrete', category: 'Pré-preparo', hours: 24 },
  { product: 'Farofa crocante', category: 'Pré-preparo', hours: 120 },
  { product: 'Mise en place de vegetais (cebola, tomate, cheiro-verde)', category: 'Pré-preparo', hours: 48 },
  { product: 'Goma de tapioca hidratada', category: 'Pré-preparo', hours: 48 },
  { product: 'Sobra de rechaud resfriada', category: 'Outros', hours: 24, note: 'Só sobra que não ficou exposta abaixo de 60°C.' },
  { product: 'Molho de pimenta da casa', category: 'Molhos', hours: 168 },
];

export const TRACE_CATEGORIES = [
  'Polpas',
  'Carnes & Peixes',
  'Molhos',
  'Pré-preparo',
  'Açaí',
  'Outros',
];

export const DISCARD_REASONS = [
  'Validade vencida',
  'Encontrado sem etiqueta',
  'Quebra de temperatura / cadeia de frio',
  'Aparência ou cheiro alterados',
  'Sobra não aproveitável',
  'Contaminação cruzada',
  'Refação (erro de preparo)',
];

/* ---------- helpers de tempo ---------- */

export type ExpiryBucket = 'vencido' | 'hoje' | 'proximo' | 'ok';

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

export const expiryBucket = (lot: TraceLot, now: Date = new Date()): ExpiryBucket => {
  const exp = new Date(lot.expiryAt).getTime();
  const t = now.getTime();
  if (exp <= t) return 'vencido';
  if (exp - t <= 24 * 3600 * 1000) return 'proximo';
  if (startOfDay(new Date(exp)) === startOfDay(now)) return 'hoje';
  return 'ok';
};

export const BUCKET_META: Record<
  ExpiryBucket,
  { label: string; hex: string; chipClass: string; barClass: string }
> = {
  vencido: { label: 'Vencido', hex: '#e11d48', chipClass: 'bg-rose-100 text-rose-800 border-rose-300', barClass: 'bg-rose-500' },
  proximo: { label: 'Vence em ≤24h', hex: '#ea580c', chipClass: 'bg-orange-100 text-orange-800 border-orange-300', barClass: 'bg-orange-500' },
  hoje: { label: 'Vence hoje', hex: '#d97706', chipClass: 'bg-amber-100 text-amber-800 border-amber-300', barClass: 'bg-amber-500' },
  ok: { label: 'Dentro do prazo', hex: '#059669', chipClass: 'bg-emerald-100 text-emerald-800 border-emerald-300', barClass: 'bg-emerald-500' },
};

/** "vence em 3h20" / "VENCIDO há 2h" / "vence amanhã 14:00" */
export const humanizeExpiry = (lot: TraceLot, now: Date = new Date()): string => {
  const exp = new Date(lot.expiryAt);
  const diffMs = exp.getTime() - now.getTime();
  const absMin = Math.round(Math.abs(diffMs) / 60000);
  const h = Math.floor(absMin / 60);
  const m = absMin % 60;
  const hm = h > 0 ? `${h}h${m > 0 ? String(m).padStart(2, '0') : ''}` : `${m}min`;
  if (diffMs <= 0) return `vencido há ${hm}`;
  if (diffMs <= 36 * 3600 * 1000) return `vence em ${hm}`;
  const dd = String(exp.getDate()).padStart(2, '0');
  const mm = String(exp.getMonth() + 1).padStart(2, '0');
  const time = `${String(exp.getHours()).padStart(2, '0')}:${String(exp.getMinutes()).padStart(2, '0')}`;
  return `vence ${dd}/${mm} ${time}`;
};

export const fmtDateTime = (iso: string): string => {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const time = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  return `${dd}/${mm} ${time}`;
};

/** valor pronto para <input type="datetime-local"> */
export const toLocalInput = (iso: string): string => {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export const addHoursISO = (baseISO: string, hours: number): string =>
  new Date(new Date(baseISO).getTime() + hours * 3600 * 1000).toISOString();

/* ---------- seed ---------- */

const nowISO = new Date().toISOString();
const hoursAgo = (h: number) => new Date(Date.now() - h * 3600 * 1000).toISOString();
const hoursAhead = (h: number) => new Date(Date.now() + h * 3600 * 1000).toISOString();

export const DEFAULT_LOTS: TraceLot[] = [
  {
    id: 'lot-seed-1',
    product: 'Açaí batido (polpa)',
    complement: 'Lote manhã • balde 5 L',
    category: 'Polpas',
    quantity: '5 L',
    prepAt: hoursAgo(26),
    expiryAt: hoursAgo(2), // VENCIDO
    executor: 'Raimundo (Mundico)',
    checker: 'Chef Manoel',
    location: 'Freezer 2 — Gaveta A',
    status: 'ativo',
  },
  {
    id: 'lot-seed-2',
    product: 'Camarão regional limpo (cru, refrigerado)',
    complement: 'Porção 2 • 1,2 kg',
    category: 'Carnes & Peixes',
    quantity: '1,2 kg',
    prepAt: hoursAgo(20),
    expiryAt: hoursAhead(4), // vence em ≤24h
    executor: 'Raimundo (Mundico)',
    checker: 'Chef Manoel',
    location: 'Câmara fria — Prat. C1',
    status: 'ativo',
  },
  {
    id: 'lot-seed-3',
    product: 'Vinagrete',
    complement: 'Cuba GN 1/3',
    category: 'Pré-preparo',
    quantity: '2,5 kg',
    prepAt: hoursAgo(3),
    expiryAt: hoursAhead(21), // vence hoje/amanhã cedo
    executor: 'Raimundo (Mundico)',
    location: 'Geladeira 1 — Prat. B1',
    status: 'ativo',
  },
  {
    id: 'lot-seed-4',
    product: 'Vatapá',
    complement: 'Panela 8 L',
    category: 'Molhos',
    quantity: '8 L',
    prepAt: hoursAgo(10),
    expiryAt: hoursAhead(62),
    executor: 'Chef Manoel',
    checker: 'Gestão Operacional',
    location: 'Geladeira 1 — Prat. A2',
    status: 'ativo',
  },
  {
    id: 'lot-seed-5',
    product: 'Maniçoba cozida',
    complement: 'Lote quarta • 6 kg',
    category: 'Pré-preparo',
    quantity: '6 kg',
    prepAt: hoursAgo(30),
    expiryAt: hoursAhead(40),
    executor: 'Chef Manoel',
    checker: 'Gestão Operacional',
    location: 'Freezer 1 — Gaveta B',
    status: 'ativo',
  },
  {
    id: 'lot-seed-6',
    product: 'Farofa crocante',
    complement: 'Pote 2 kg',
    category: 'Pré-preparo',
    quantity: '2 kg',
    prepAt: hoursAgo(28),
    expiryAt: hoursAgo(4),
    executor: 'Raimundo (Mundico)',
    location: 'Bancada seca',
    status: 'consumido',
    closedAt: hoursAgo(6),
    closedBy: 'Chef Manoel',
  },
];

export const loadLots = (): TraceLot[] => {
  try {
    const saved = localStorage.getItem(TRACE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Falha ao carregar lotes de rastreabilidade', e);
  }
  return DEFAULT_LOTS;
};

export const saveLots = (lots: TraceLot[]): void => {
  try {
    localStorage.setItem(TRACE_KEY, JSON.stringify(lots));
  } catch (e) {
    console.error('Falha ao salvar lotes de rastreabilidade', e);
  }
};

export const newLotId = () => `lot-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
export const NOW_ISO = nowISO;

/** Resumo para o Painel do Dia 1. */
export const traceSummary = (now: Date = new Date()) => {
  const active = loadLots().filter((l) => l.status === 'ativo');
  let vencidos = 0,
    hoje = 0,
    proximos = 0;
  active.forEach((l) => {
    const b = expiryBucket(l, now);
    if (b === 'vencido') vencidos += 1;
    else if (b === 'hoje') hoje += 1;
    else if (b === 'proximo') proximos += 1;
  });
  return { ativos: active.length, vencidos, hoje, proximos };
};
