/* ================================================================== */
/*  HORÁRIO DE FUNCIONAMENTO — Bistrô Pai d'Égua                        */
/*  Fecha segunda e terça. Qua–Sex: só jantar. Sáb–Dom: almoço+jantar.  */
/* ================================================================== */

export interface DaySchedule {
  /** 0 = domingo … 6 = sábado (padrão Date.getDay) */
  weekday: number;
  name: string;
  short: string;
  open: boolean;
  /** horário ao público, "HH:MM" */
  serviceFrom?: string;
  serviceTo?: string;
  /** entrada da equipe para pré-preparo (mise en place antes de abrir) */
  prepFrom?: string;
  /** fechamento da operação após o último cliente */
  closeTo?: string;
  /** almoço + jantar contínuo, ou só jantar */
  serviceKind?: 'jantar' | 'almoco_jantar';
}

export const WEEK_SCHEDULE: DaySchedule[] = [
  { weekday: 0, name: 'Domingo', short: 'Dom', open: true, serviceFrom: '12:00', serviceTo: '23:30', prepFrom: '09:00', closeTo: '00:15', serviceKind: 'almoco_jantar' },
  { weekday: 1, name: 'Segunda', short: 'Seg', open: false },
  { weekday: 2, name: 'Terça', short: 'Ter', open: false },
  { weekday: 3, name: 'Quarta', short: 'Qua', open: true, serviceFrom: '18:30', serviceTo: '23:00', prepFrom: '15:30', closeTo: '23:45', serviceKind: 'jantar' },
  { weekday: 4, name: 'Quinta', short: 'Qui', open: true, serviceFrom: '18:00', serviceTo: '23:00', prepFrom: '15:00', closeTo: '23:45', serviceKind: 'jantar' },
  { weekday: 5, name: 'Sexta', short: 'Sex', open: true, serviceFrom: '18:30', serviceTo: '23:00', prepFrom: '15:30', closeTo: '23:45', serviceKind: 'jantar' },
  { weekday: 6, name: 'Sábado', short: 'Sáb', open: true, serviceFrom: '12:00', serviceTo: '23:30', prepFrom: '09:00', closeTo: '00:15', serviceKind: 'almoco_jantar' },
];

export const scheduleFor = (d: Date = new Date()): DaySchedule =>
  WEEK_SCHEDULE.find((s) => s.weekday === d.getDay()) || WEEK_SCHEDULE[0];

export const OPEN_DAYS_LABEL = 'Quarta a domingo (fechado segunda e terça)';

/** Texto curto para o dia de hoje. */
export const todayScheduleLabel = (d: Date = new Date()): string => {
  const s = scheduleFor(d);
  if (!s.open) return `${s.name} — FECHADO`;
  const kind = s.serviceKind === 'almoco_jantar' ? 'almoço e jantar' : 'jantar';
  return `${s.name} — ${s.serviceFrom} às ${s.serviceTo} (${kind})`;
};

/** Qual fase do turno estamos agora, para destacar no app. */
export type TurnPhase = 'fora' | 'pre_preparo' | 'servico' | 'fechamento';

export const currentTurnPhase = (d: Date = new Date()): TurnPhase => {
  const s = scheduleFor(d);
  if (!s.open || !s.serviceFrom || !s.serviceTo || !s.prepFrom || !s.closeTo) return 'fora';
  const mins = d.getHours() * 60 + d.getMinutes();
  const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
  const prep = toMin(s.prepFrom);
  const from = toMin(s.serviceFrom);
  const to = toMin(s.serviceTo);
  const close = s.closeTo === '00:15' ? 24 * 60 + 15 : toMin(s.closeTo);
  if (mins >= prep && mins < from) return 'pre_preparo';
  if (mins >= from && mins < to) return 'servico';
  if (mins >= to && mins < close) return 'fechamento';
  return 'fora';
};
