/* ================================================================== */
/*  POSTO DE TRABALHO — camada visual dos descritivos de cargo          */
/*  Fonte: Dossiê Mestre §5, §5.1, §6, §7  +  jobRolesData.ts           */
/* ================================================================== */

export interface RoleStationMeta {
  avatarId: string;
  icon: string;
  accent: 'emerald' | 'amber' | 'blue' | 'rose' | 'teal';
  /** classes Tailwind já resolvidas (Tailwind não gera classe dinâmica) */
  headerClass: string;
  chipClass: string;
  ringClass: string;
  short: string;
  /** o que o posto responde — descrição, não hierarquia */
  focusArea: string;
}

export const ROLE_STATION_META: Record<string, RoleStationMeta> = {
  'auxiliar-cozinha': {
    avatarId: 'chef_manel',
    icon: '🔪',
    accent: 'amber',
    headerClass: 'from-stone-900 via-stone-800 to-amber-950',
    chipClass: 'bg-amber-100 text-amber-900 border-amber-300',
    ringClass: 'ring-amber-400/40',
    short: 'Auxiliar de Cozinha',
    focusArea: 'Mise en place, etiquetagem obrigatória e higiene do posto',
  },
  'cozinheiro-lider': {
    avatarId: 'chef_manel',
    icon: '👨‍🍳',
    accent: 'emerald',
    headerClass: 'from-stone-900 via-stone-800 to-emerald-950',
    chipClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    ringClass: 'ring-emerald-400/40',
    short: 'Cozinheiro Líder',
    focusArea: 'Padrão de sabor, fichas técnicas e comando da linha',
  },
  'estoquista-almoxarife': {
    avatarId: 'ze_estoque',
    icon: '📦',
    accent: 'blue',
    headerClass: 'from-stone-900 via-stone-800 to-blue-950',
    chipClass: 'bg-blue-100 text-blue-900 border-blue-300',
    ringClass: 'ring-blue-400/40',
    short: 'Encarregado de Estoque',
    focusArea: 'Recebimento técnico, PEPS e prevenção de ruptura',
  },
  'atendente-garcom': {
    avatarId: 'dona_flor',
    icon: '🍽️',
    accent: 'rose',
    headerClass: 'from-stone-900 via-stone-800 to-rose-950',
    chipClass: 'bg-rose-100 text-rose-900 border-rose-300',
    ringClass: 'ring-rose-400/40',
    short: 'Líder de Salão',
    focusArea: 'Hospitalidade, fluxo de mesas e retorno de pedidos',
  },
  'operador-caixa': {
    avatarId: 'camila_caixa',
    icon: '💵',
    accent: 'teal',
    headerClass: 'from-stone-900 via-stone-800 to-teal-950',
    chipClass: 'bg-teal-100 text-teal-900 border-teal-300',
    ringClass: 'ring-teal-400/40',
    short: 'Operador de Caixa',
    focusArea: 'Blindagem financeira e conferência cega de caixa',
  },
};

/** As 6 cubas base do rechaud (Dossiê §5.1 / §6 — abertura da Auxiliar). */
export const RECHAUD_CUBAS = [
  'Arroz Branco',
  'Feijão Preto',
  'Baião de Dois',
  'Vatapá',
  'Maniçoba',
  'Arroz Paraense',
];

/** Tábuas de corte por cor (Regra de Ouro da Auxiliar). */
export const TABUAS_CORES: { cor: string; hex: string; uso: string }[] = [
  { cor: 'Verde', hex: '#16a34a', uso: 'Vegetais, legumes e frutas' },
  { cor: 'Vermelha', hex: '#dc2626', uso: 'Carnes vermelhas cruas' },
  { cor: 'Azul', hex: '#2563eb', uso: 'Pescados e camarão' },
  { cor: 'Branca', hex: '#e7e5e4', uso: 'Laticínios e alimentos prontos' },
];

/** Os 4 campos da Etiqueta Universal (Dossiê §7). */
export const ETIQUETA_CAMPOS: { campo: string; funcao: string }[] = [
  { campo: 'Nome do Produto', funcao: 'Localização — evita trocas e acha o item rápido.' },
  { campo: 'Data / Hora de Preparo', funcao: 'Histórico — rastreia quando a manipulação ocorreu.' },
  { campo: 'Data de Validade', funcao: 'Segurança — limite de uso por padrão técnico, nunca por "chute".' },
  { campo: 'Responsável / Conferente', funcao: 'Autoria — treino cirúrgico em caso de falha e prova de liberação.' },
];

/** Chave e formato de id compartilhados com SectorChecklist (mantém os dois em sincronia). */
export const getRoleTasksStorageKey = (dateISO: string) => `bistro_role_tasks_tracker_${dateISO}`;
export const roleTaskId = (roleId: string, phaseIdx: number, taskIdx: number) =>
  `rt_${roleId}_p${phaseIdx}_t${taskIdx}`;

export interface RoleTaskState {
  status: 'pendente' | 'em_andamento' | 'concluido' | 'nao_conforme';
  completedAt?: string;
  notes?: string;
}

export const loadRoleTasksState = (dateISO: string): Record<string, RoleTaskState> => {
  try {
    const saved = localStorage.getItem(getRoleTasksStorageKey(dateISO));
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Erro ao carregar tarefas do posto', e);
  }
  return {};
};

export const saveRoleTasksState = (dateISO: string, state: Record<string, RoleTaskState>) => {
  try {
    localStorage.setItem(getRoleTasksStorageKey(dateISO), JSON.stringify(state));
  } catch (e) {
    console.error('Erro ao salvar tarefas do posto', e);
  }
};

/** Extrai um horário "07h00" de um texto de tarefa, se houver. */
export const splitTaskTime = (text: string): { time: string | null; text: string } => {
  const m = text.match(/^(\d{1,2}h\d{2}):?\s*(.*)$/);
  return m ? { time: m[1], text: m[2] } : { time: null, text };
};
