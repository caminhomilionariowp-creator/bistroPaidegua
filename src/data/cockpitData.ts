import {
  OperationalOccurrence,
  OccurrenceType,
  PrincipleStatusEntry,
} from '../types';

/* ================================================================== */
/*  PAINEL DO "DIA 1"  —  Fonte de dados operacionais (Dossiê §12/§13)  */
/*  A tecnologia é o espelho da rotina: nada aqui inventa número.       */
/* ================================================================== */

const OCCURRENCES_KEY = 'bistro_pai_degua_ocorrencias_v1';
const IMPLANTATION_START_KEY = 'bistro_pai_degua_implantacao_inicio_v1';
const PRINCIPLES_KEY_PREFIX = 'bistro_pai_degua_principios_';

/* ---------- Ocorrências (ruptura, perda, não-conformidade, elogio) ---------- */

const todayISO = () => new Date().toISOString().split('T')[0];

export const DEFAULT_OCCURRENCES: OperationalOccurrence[] = [
  {
    id: 'occ-seed-1',
    date: todayISO(),
    time: '11:20',
    type: 'ruptura',
    sector: 'cozinha',
    item: 'Tucupi (garrafa 2L)',
    reason: 'Consumo do fim de semana acima da média e pedido não disparado no nível amarelo.',
    quantity: '0 em estoque',
    registeredBy: 'Chef Manoel',
    actionTaken: 'Compra emergencial em fornecedor local. Recalibrar estoque mínimo do tucupi.',
    correctionStep: 3,
    resolved: false,
  },
  {
    id: 'occ-seed-2',
    date: todayISO(),
    time: '14:05',
    type: 'perda',
    sector: 'cozinha',
    item: 'Camarão regional descascado',
    reason: 'Porção fracionada sem etiqueta encontrada na abertura — validade indefinida, descartada por segurança.',
    quantity: '0,45 kg',
    estimatedLossBRL: 27.0,
    registeredBy: 'Raimundo (Mundico)',
    actionTaken: 'Reforço da Regra de Ouro com a equipe da tarde.',
    correctionStep: 2,
    resolved: true,
  },
  {
    id: 'occ-seed-3',
    date: todayISO(),
    time: '19:40',
    type: 'elogio',
    sector: 'salao',
    item: 'Atendimento mesa 7',
    reason: 'Cliente elogiou a rapidez do retorno do pedido e a indicação do maniçoba.',
    registeredBy: 'Dona Florinda',
    resolved: true,
  },
];

export const loadOccurrences = (): OperationalOccurrence[] => {
  try {
    const saved = localStorage.getItem(OCCURRENCES_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Falha ao carregar ocorrências', e);
  }
  return DEFAULT_OCCURRENCES;
};

export const saveOccurrences = (list: OperationalOccurrence[]): void => {
  try {
    localStorage.setItem(OCCURRENCES_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Falha ao salvar ocorrências', e);
  }
};

export const OCCURRENCE_META: Record<
  OccurrenceType,
  { label: string; short: string; hex: string; icon: string; helper: string; badgeClass: string }
> = {
  ruptura: {
    label: 'Ruptura de Estoque',
    short: 'Ruptura',
    hex: '#e11d48',
    icon: '🔴',
    helper: 'Item indisponível para venda durante o serviço. Meta operacional: ZERO.',
    badgeClass: 'bg-rose-100 text-rose-800',
  },
  perda: {
    label: 'Perda / Descarte',
    short: 'Perda',
    hex: '#d97706',
    icon: '🟡',
    helper: 'Alimento descartado, refação ou sobra não aproveitada. Registrar quantidade e motivo.',
    badgeClass: 'bg-amber-100 text-amber-800',
  },
  nao_conformidade: {
    label: 'Não-Conformidade',
    short: 'Não-Conf.',
    hex: '#ea580c',
    icon: '⚠️',
    helper: 'Desvio de padrão detectado (etiqueta, temperatura, higiene, caixa, atendimento).',
    badgeClass: 'bg-orange-100 text-orange-800',
  },
  elogio: {
    label: 'Elogio / Acerto',
    short: 'Elogio',
    hex: '#059669',
    icon: '🟢',
    helper: 'Registro positivo: elogio de cliente, meta batida, boa prática a repetir.',
    badgeClass: 'bg-emerald-100 text-emerald-800',
  },
};

/* ---------- Cronograma de Implantação (Dossiê §12) ---------- */

export interface ImplantationPhase {
  number: number;
  key: string;
  label: string;
  window: string;
  focus: string;
  dayFrom: number;
  dayTo: number; // 9999 = aberto
  color: string;
}

export const IMPLANTATION_PHASES: ImplantationPhase[] = [
  {
    number: 1,
    key: 'patrocinio',
    label: 'Patrocínio',
    window: 'Dia 0',
    focus: 'Regras definidas, liderança alinhada e reunião semanal fixada.',
    dayFrom: 0,
    dayTo: 0,
    color: 'stone',
  },
  {
    number: 2,
    key: 'controle-inicial',
    label: 'Controle Inicial',
    window: 'Dias 1 a 7',
    focus: 'Organização física, etiquetas obrigatórias e inventário zero.',
    dayFrom: 1,
    dayTo: 7,
    color: 'amber',
  },
  {
    number: 3,
    key: 'padronizacao',
    label: 'Padronização',
    window: 'Dias 8 a 21',
    focus: 'POPs treinados e fichas técnicas piloto em uso.',
    dayFrom: 8,
    dayTo: 21,
    color: 'blue',
  },
  {
    number: 4,
    key: 'estabilizacao',
    label: 'Estabilização',
    window: 'Dias 22 a 30',
    focus: 'Auditoria diária, medição de aderência e cobertura de escala.',
    dayFrom: 22,
    dayTo: 30,
    color: 'emerald',
  },
  {
    number: 5,
    key: 'melhoria-continua',
    label: 'Melhoria Contínua',
    window: 'Após o 30º dia',
    focus: 'CMV real x teórico, margem, metas e expansão de delivery.',
    dayFrom: 31,
    dayTo: 9999,
    color: 'violet',
  },
];

export const loadImplantationStart = (): string => {
  try {
    const saved = localStorage.getItem(IMPLANTATION_START_KEY);
    if (saved) return saved;
  } catch (e) {
    console.error('Falha ao carregar início da implantação', e);
  }
  const start = todayISO();
  try {
    localStorage.setItem(IMPLANTATION_START_KEY, start);
  } catch {
    /* ignore */
  }
  return start;
};

export const saveImplantationStart = (dateISO: string): void => {
  try {
    localStorage.setItem(IMPLANTATION_START_KEY, dateISO);
  } catch (e) {
    console.error('Falha ao salvar início da implantação', e);
  }
};

export interface ImplantationStatus {
  dayNumber: number;
  phase: ImplantationPhase;
  nextPhase?: ImplantationPhase;
  daysToNextPhase?: number;
  progressToDay30: number; // 0-100
  financialsUnlocked: boolean;
  daysToUnlockFinancials: number;
}

export const getImplantationStatus = (startISO: string): ImplantationStatus => {
  const start = new Date(startISO + 'T00:00:00');
  const now = new Date(todayISO() + 'T00:00:00');
  const dayNumber = Math.max(
    0,
    Math.round((now.getTime() - start.getTime()) / 86400000),
  );

  const phase =
    IMPLANTATION_PHASES.find((p) => dayNumber >= p.dayFrom && dayNumber <= p.dayTo) ||
    IMPLANTATION_PHASES[IMPLANTATION_PHASES.length - 1];

  const nextPhase = IMPLANTATION_PHASES.find((p) => p.dayFrom > dayNumber);
  const daysToNextPhase = nextPhase ? nextPhase.dayFrom - dayNumber : undefined;

  return {
    dayNumber,
    phase,
    nextPhase,
    daysToNextPhase,
    progressToDay30: Math.min(100, Math.round((dayNumber / 30) * 100)),
    financialsUnlocked: dayNumber >= 30,
    daysToUnlockFinancials: Math.max(0, 30 - dayNumber),
  };
};

/* ---------- Os 6 Princípios Inegociáveis (Dossiê §2) ---------- */

export interface Principle {
  number: number;
  key: string;
  title: string;
  application: string;
  /** 'auto' = derivado dos dados; 'manual' = aferição diária da liderança */
  evaluation: 'auto' | 'manual';
  autoMetricLabel?: string;
}

export const PRINCIPLES: Principle[] = [
  {
    number: 1,
    key: 'responsavel',
    title: 'Responsável definido',
    application:
      'Toda atividade crítica tem executor, conferente e regra de substituição por cargo.',
    evaluation: 'auto',
    autoMetricLabel: 'Tarefas concluídas hoje com autoria assinada',
  },
  {
    number: 2,
    key: 'registro',
    title: 'Registro é parte do trabalho',
    application:
      'Nada entra, sai, é preparado, descartado ou dado como cortesia sem registro.',
    evaluation: 'auto',
    autoMetricLabel: 'Perdas e ocorrências registradas hoje',
  },
  {
    number: 3,
    key: 'identificar',
    title: 'Primeiro identificar, depois armazenar',
    application:
      'Produto aberto, preparado, porcionado ou reembalado recebe etiqueta antes de guardar.',
    evaluation: 'manual',
  },
  {
    number: 4,
    key: 'padrao',
    title: 'Padrão antes de velocidade',
    application:
      'O trabalho correto é treinado e repetido; só então se mede ganho de tempo.',
    evaluation: 'auto',
    autoMetricLabel: 'Aderência geral aos checklists de hoje',
  },
  {
    number: 5,
    key: 'fatos',
    title: 'Fatos contra conversas',
    application:
      'Ocorrência não fica em bate-boca: tem fato, responsável, ação, prazo e retorno.',
    evaluation: 'manual',
  },
  {
    number: 6,
    key: 'mudanca',
    title: 'Mudança controlada (Padrão de Franquia)',
    application:
      'Melhorias são testadas e aprovadas antes de virar regra. Sem regras paralelas.',
    evaluation: 'manual',
  },
];

export const loadPrincipleStatus = (dateISO: string): Record<string, PrincipleStatusEntry> => {
  try {
    const saved = localStorage.getItem(PRINCIPLES_KEY_PREFIX + dateISO);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Falha ao carregar status dos princípios', e);
  }
  return {};
};

export const savePrincipleStatus = (
  dateISO: string,
  state: Record<string, PrincipleStatusEntry>,
): void => {
  try {
    localStorage.setItem(PRINCIPLES_KEY_PREFIX + dateISO, JSON.stringify(state));
  } catch (e) {
    console.error('Falha ao salvar status dos princípios', e);
  }
};

/* ---------- Escada de Correção Operacional (Dossiê §12) ---------- */

export interface CorrectionStep {
  step: 1 | 2 | 3 | 4;
  title: string;
  trigger: string;
  action: string;
  cardClass: string;
  badgeClass: string;
}

export const CORRECTION_LADDER: CorrectionStep[] = [
  {
    step: 1,
    title: 'Ajuste',
    trigger: 'Falha simples, primeira vez.',
    action: 'Demonstrar o padrão na hora e registrar a orientação.',
    cardClass: 'border-emerald-300 bg-emerald-50/60',
    badgeClass: 'bg-emerald-600',
  },
  {
    step: 2,
    title: 'Reforço',
    trigger: 'Dúvida recorrente ou reincidência.',
    action: 'Treinar de novo e observar uma execução completa.',
    cardClass: 'border-amber-300 bg-amber-50/60',
    badgeClass: 'bg-amber-600',
  },
  {
    step: 3,
    title: 'Plano',
    trigger: 'Falha repetida após reforço.',
    action: 'Ação documentada com prazo e conferência definida.',
    cardClass: 'border-orange-300 bg-orange-50/60',
    badgeClass: 'bg-orange-600',
  },
  {
    step: 4,
    title: 'Decisão',
    trigger: 'Descumprimento consciente do padrão.',
    action: 'Ação de RH conduzida pela diretoria.',
    cardClass: 'border-rose-300 bg-rose-50/60',
    badgeClass: 'bg-rose-600',
  },
];

/* ---------- Painel do Dia 1 — indicadores ativos vs. bloqueados (§13) ---------- */

export interface Dia1Indicator {
  key: string;
  label: string;
  measures: string;
  status: 'ativo' | 'bloqueado';
  unlockNote?: string;
}

export const DIA1_INDICATORS: Dia1Indicator[] = [
  {
    key: 'aderencia',
    label: 'Aderência a Checklists (%)',
    measures: 'Onde o padrão está sendo cumprido ou falhando.',
    status: 'ativo',
  },
  {
    key: 'ruptura',
    label: 'Ocorrências de Ruptura',
    measures: 'Quantas vezes a operação parou por falta de item.',
    status: 'ativo',
  },
  {
    key: 'perdas',
    label: 'Perdas por Motivo',
    measures: 'Quantidade e produto descartado, com o motivo exato.',
    status: 'ativo',
  },
  {
    key: 'cmv',
    label: 'CMV Real x Teórico',
    measures: 'Custo da mercadoria vendida contra o custo esperado das fichas.',
    status: 'bloqueado',
    unlockNote: 'Desbloqueia após 30 dias de registros consistentes de entrada, perda e venda.',
  },
  {
    key: 'margem',
    label: 'Margem de Lucro Real',
    measures: 'Resultado real por prato depois de insumo e perda.',
    status: 'bloqueado',
    unlockNote: 'Desbloqueia após inventários e fichas técnicas auditadas.',
  },
];
