import React, { useState, useEffect, useMemo } from 'react';
import {
  Gauge as GaugeIcon,
  AlertTriangle,
  Trash2,
  ShieldCheck,
  Lock,
  CalendarClock,
  Plus,
  Share2,
  Printer,
  PackageX,
  ClipboardList,
  ArrowRight,
  TrendingUp,
  Info,
  X,
  Check,
} from 'lucide-react';
import {
  ChecklistItemData,
  ResponsibleLeader,
  EmployeeAccount,
  DocumentCategory,
  OperationalOccurrence,
  OccurrenceType,
  PrincipleStatusEntry,
  PrincipleSignal,
} from '../types';
import {
  loadOccurrences,
  saveOccurrences,
  OCCURRENCE_META,
  loadImplantationStart,
  saveImplantationStart,
  getImplantationStatus,
  IMPLANTATION_PHASES,
  PRINCIPLES,
  loadPrincipleStatus,
  savePrincipleStatus,
  CORRECTION_LADDER,
  DIA1_INDICATORS,
} from '../data/cockpitData';
import { loadStock, stockLevel, needsPurchase } from '../data/stockData';
import { traceSummary } from '../data/traceabilityData';
import { Gauge, MiniBar } from './Gauge';
import { BrandLogo, BrandWatermarkOverlay } from './BrandLogo';
import { CharacterAvatar } from './Characters';

interface CockpitPanelProps {
  checklistItems: ChecklistItemData[];
  team: ResponsibleLeader[];
  currentEmployee?: EmployeeAccount;
  onNavigate?: (cat: DocumentCategory) => void;
  onOpenLoginModal?: () => void;
}

const SECTORS: { id: ChecklistItemData['sector']; name: string; tone: 'emerald' | 'amber' | 'rose' | 'blue' | 'stone' }[] = [
  { id: 'cozinha', name: 'Cozinha', tone: 'emerald' },
  { id: 'estoque', name: 'Estoque', tone: 'amber' },
  { id: 'salao', name: 'Salão', tone: 'rose' },
  { id: 'caixa', name: 'Caixa', tone: 'blue' },
  { id: 'limpeza', name: 'Limpeza', tone: 'stone' },
];

const nowTime = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};
const todayISO = () => new Date().toISOString().split('T')[0];
const brl = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const SIGNAL_STYLE: Record<string, { dot: string; ring: string; label: string }> = {
  verde: { dot: 'bg-emerald-500', ring: 'border-emerald-400 bg-emerald-50', label: 'No padrão' },
  amarelo: { dot: 'bg-amber-500', ring: 'border-amber-400 bg-amber-50', label: 'Atenção' },
  vermelho: { dot: 'bg-rose-500', ring: 'border-rose-400 bg-rose-50', label: 'Fora do padrão' },
};

const adherenceTone = (pct: number): 'emerald' | 'amber' | 'rose' =>
  pct >= 90 ? 'emerald' : pct >= 70 ? 'amber' : 'rose';

export const CockpitPanel: React.FC<CockpitPanelProps> = ({
  checklistItems,
  team,
  currentEmployee,
  onNavigate,
  onOpenLoginModal,
}) => {
  const today = todayISO();

  const [startISO, setStartISO] = useState<string>(() => loadImplantationStart());
  const [occurrences, setOccurrences] = useState<OperationalOccurrence[]>(() => loadOccurrences());
  const [principleState, setPrincipleState] = useState<Record<string, PrincipleStatusEntry>>(() =>
    loadPrincipleStatus(today),
  );
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => saveOccurrences(occurrences), [occurrences]);
  useEffect(() => savePrincipleStatus(today, principleState), [principleState, today]);

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  /* ---------------- Métricas derivadas (espelho da rotina) ---------------- */

  const impl = useMemo(() => getImplantationStatus(startISO), [startISO]);

  const total = checklistItems.length;
  const done = checklistItems.filter((i) => i.status === 'concluido').length;
  const overallAdherence = total > 0 ? Math.round((done / total) * 100) : 0;
  const nonConformChecklist = checklistItems.filter((i) => i.status === 'nao_conforme').length;
  const signedDone = checklistItems.filter(
    (i) => i.status === 'concluido' && (i.completedAt || '').includes('por '),
  ).length;

  const sectorAdherence = SECTORS.map((s) => {
    const items = checklistItems.filter((i) => i.sector === s.id);
    const d = items.filter((i) => i.status === 'concluido').length;
    return {
      ...s,
      total: items.length,
      done: d,
      pct: items.length > 0 ? Math.round((d / items.length) * 100) : 0,
      leader: team.find((t) => t.sectorId === (s.id === 'limpeza' ? 'cozinha' : s.id)),
    };
  });

  const stockItems = useMemo(() => loadStock(), []);
  const stockRuptura = stockItems.filter((i) => stockLevel(i) === 'ruptura').length;
  const stockNoGatilho = stockItems.filter(needsPurchase).length;
  const trace = useMemo(() => traceSummary(), []);

  const todayOcc = occurrences.filter((o) => o.date === today);
  const rupturasHoje = todayOcc.filter((o) => o.type === 'ruptura');
  const perdasHoje = todayOcc.filter((o) => o.type === 'perda');
  const ncHoje = todayOcc.filter((o) => o.type === 'nao_conformidade');
  const elogiosHoje = todayOcc.filter((o) => o.type === 'elogio');
  const perdaBRL = perdasHoje.reduce((acc, o) => acc + (o.estimatedLossBRL || 0), 0);
  const ncTotal = ncHoje.length + nonConformChecklist;
  const registrosHoje = todayOcc.length;

  /* ---------------- Placar dos 6 Princípios ---------------- */

  const principleSignal = (key: string): PrincipleSignal => {
    const manual = principleState[key]?.signal;
    if (manual && manual !== 'auto') return manual;
    if (key === 'responsavel') {
      if (done === 0) return 'amarelo';
      const r = signedDone / done;
      return r >= 0.9 ? 'verde' : r >= 0.6 ? 'amarelo' : 'vermelho';
    }
    if (key === 'registro') return registrosHoje >= 1 ? 'verde' : 'amarelo';
    if (key === 'padrao') {
      return overallAdherence >= 90 ? 'verde' : overallAdherence >= 70 ? 'amarelo' : 'vermelho';
    }
    return 'amarelo';
  };

  const setPrinciple = (key: string, signal: PrincipleSignal, note?: string) => {
    setPrincipleState((prev) => ({
      ...prev,
      [key]: { signal, note: note ?? prev[key]?.note, updatedAt: nowTime() },
    }));
  };

  const principleScore = PRINCIPLES.reduce((acc, p) => {
    const s = principleSignal(p.key);
    return acc + (s === 'verde' ? 1 : s === 'amarelo' ? 0.5 : 0);
  }, 0);
  const principlePct = Math.round((principleScore / PRINCIPLES.length) * 100);

  /* ---------------- Registro de ocorrência ---------------- */

  const blankForm = {
    type: 'perda' as OccurrenceType,
    sector: (currentEmployee?.primarySector as OperationalOccurrence['sector']) || 'cozinha',
    item: '',
    reason: '',
    quantity: '',
    estimatedLossBRL: '',
    actionTaken: '',
    correctionStep: '' as '' | '1' | '2' | '3' | '4',
  };
  const [form, setForm] = useState(blankForm);

  const submitOccurrence = () => {
    if (!form.item.trim() || !form.reason.trim()) {
      flash('Informe o item e o motivo — fato antes de conversa (Princípio 5).');
      return;
    }
    const occ: OperationalOccurrence = {
      id: `occ-${Date.now()}`,
      date: today,
      time: nowTime(),
      type: form.type,
      sector: form.sector,
      item: form.item.trim(),
      reason: form.reason.trim(),
      quantity: form.quantity.trim() || undefined,
      estimatedLossBRL: form.estimatedLossBRL ? Number(form.estimatedLossBRL) : undefined,
      registeredBy: currentEmployee?.name || 'Equipe de plantão',
      actionTaken: form.actionTaken.trim() || undefined,
      correctionStep: form.correctionStep ? (Number(form.correctionStep) as 1 | 2 | 3 | 4) : undefined,
      resolved: form.type === 'elogio',
    };
    setOccurrences((prev) => [occ, ...prev]);
    setForm(blankForm);
    setShowForm(false);
    flash(`${OCCURRENCE_META[occ.type].label} registrada às ${occ.time}.`);
  };

  const toggleResolved = (id: string) =>
    setOccurrences((prev) => prev.map((o) => (o.id === id ? { ...o, resolved: !o.resolved } : o)));
  const removeOccurrence = (id: string) =>
    setOccurrences((prev) => prev.filter((o) => o.id !== id));

  /* ---------------- Relatório para WhatsApp ---------------- */

  const copyReport = () => {
    let t = `📊 *PAINEL DO DIA 1 — BISTRÔ PAI D'ÉGUA*\n`;
    t += `📅 ${new Date().toLocaleDateString('pt-BR')} • Dia ${impl.dayNumber} da implantação (${impl.phase.label})\n`;
    t += `👤 Fechado por: ${currentEmployee?.name || 'Equipe de plantão'}\n\n`;
    t += `🎯 *Aderência a checklists:* ${overallAdherence}% (${done}/${total})\n`;
    sectorAdherence
      .filter((s) => s.total > 0)
      .forEach((s) => {
        t += `   • ${s.name}: ${s.pct}%\n`;
      });
    t += `\n🔴 *Rupturas hoje:* ${rupturasHoje.length} (meta: ZERO)\n`;
    rupturasHoje.forEach((o) => (t += `   • ${o.item} — ${o.reason}\n`));
    t += `\n🟡 *Perdas hoje:* ${perdasHoje.length} • ${brl(perdaBRL)}\n`;
    perdasHoje.forEach((o) => (t += `   • ${o.item}${o.quantity ? ` (${o.quantity})` : ''} — ${o.reason}\n`));
    t += `\n⚠️ *Não-conformidades:* ${ncTotal}\n`;
    t += `🟢 *Elogios / acertos:* ${elogiosHoje.length}\n`;
    t += `\n🧭 *6 Princípios:* ${principlePct}% no verde\n`;
    PRINCIPLES.forEach((p) => {
      const s = principleSignal(p.key);
      const icon = s === 'verde' ? '🟢' : s === 'amarelo' ? '🟡' : '🔴';
      t += `   ${icon} ${p.title}\n`;
    });
    t += `\n🔒 CMV e Margem: desbloqueiam em ${impl.daysToUnlockFinancials} dia(s).\n`;
    t += `\n🏷️ _"Primeiro identificar, depois armazenar. Sem etiqueta = Sem uso."_`;
    navigator.clipboard.writeText(t);
    flash('Relatório do dia copiado para o WhatsApp.');
  };

  /* ================================================================= */

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* ============ HERO — Fase de Implantação ============ */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 text-white rounded-2xl p-6 shadow-lg border border-stone-800 relative overflow-hidden animate-slide-up">
        <BrandWatermarkOverlay opacity={0.04} />
        <div className="relative z-10 space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-800 pb-5">
            <div className="flex items-start gap-4">
              <div className="bg-stone-900/80 p-2.5 rounded-xl border border-stone-800 hidden sm:flex shrink-0">
                <BrandLogo variant="icon" size="sm" theme="white" />
              </div>
              <div className="space-y-1">
                <span className="bg-red-600 text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Painel do "Dia 1" • Processo antes de finanças
                </span>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2.5">
                  <GaugeIcon className="w-7 h-7 text-emerald-400" />
                  Cockpit Operacional
                </h1>
                <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
                  Nos primeiros 30 dias a prioridade é a disciplina do processo. Os números de
                  lucro e CMV só entram quando os registros estiverem limpos.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
              <button
                onClick={copyReport}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-lg font-bold text-xs shadow-sm transition-all cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                Copiar relatório do dia
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 px-3 py-2 rounded-lg font-bold text-xs border border-stone-700 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Imprimir</span>
              </button>
            </div>
          </div>

          {/* Linha do tempo das 5 fases */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <CalendarClock className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-stone-200">
                  Dia {impl.dayNumber} da implantação
                </span>
                <span className="text-stone-500">•</span>
                <label className="flex items-center gap-1.5 text-stone-400">
                  Início:
                  <input
                    type="date"
                    value={startISO}
                    onChange={(e) => {
                      setStartISO(e.target.value);
                      saveImplantationStart(e.target.value);
                    }}
                    className="bg-stone-800 border border-stone-700 rounded px-1.5 py-0.5 text-stone-200 font-mono text-[11px] focus:outline-hidden"
                  />
                </label>
              </div>
              <span className="font-mono text-stone-400">
                {impl.financialsUnlocked
                  ? '🔓 Indicadores financeiros liberados'
                  : `🔒 CMV/Margem em ${impl.daysToUnlockFinancials} dia(s)`}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {IMPLANTATION_PHASES.map((p) => {
                const active = p.number === impl.phase.number;
                const passed = p.number < impl.phase.number;
                return (
                  <div
                    key={p.key}
                    className={`rounded-lg p-3 border text-left transition-all ${
                      active
                        ? 'bg-emerald-950 border-emerald-500 shadow-md ring-1 ring-emerald-400/30'
                        : passed
                          ? 'bg-stone-800/60 border-stone-700 opacity-70'
                          : 'bg-stone-900/60 border-stone-800 opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center ${
                          active
                            ? 'bg-emerald-500 text-stone-950'
                            : passed
                              ? 'bg-emerald-700 text-white'
                              : 'bg-stone-700 text-stone-300'
                        }`}
                      >
                        {passed ? '✓' : p.number}
                      </span>
                      <span className="text-[11px] font-bold text-stone-100">{p.label}</span>
                    </div>
                    <p className="text-[10px] text-stone-400 font-mono">{p.window}</p>
                    {active && (
                      <p className="text-[10px] text-emerald-300 mt-1 leading-snug">{p.focus}</p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="w-full bg-stone-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full bar-grow"
                style={{ width: `${impl.progressToDay30}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-md animate-slide-down no-print">
          <Check className="w-4 h-4" />
          {toast}
        </div>
      )}

      {(trace.vencidos > 0 || trace.hoje > 0 || trace.proximos > 0) && (
        <button
          onClick={() => onNavigate?.('rastreabilidade')}
          className="w-full text-left bg-amber-50 border border-amber-300 rounded-xl px-4 py-3 text-xs text-amber-950 flex items-center gap-2 hover:bg-amber-100 transition-colors cursor-pointer"
        >
          <span className="text-base">🏷️</span>
          <span>
            Rastreabilidade:{' '}
            {trace.vencidos > 0 && <strong>{trace.vencidos} vencido(s)</strong>}
            {trace.vencidos > 0 && (trace.hoje > 0 || trace.proximos > 0) && ' • '}
            {trace.hoje > 0 && <>{trace.hoje} vence(m) hoje</>}
            {trace.hoje > 0 && trace.proximos > 0 && ' • '}
            {trace.proximos > 0 && <>{trace.proximos} em ≤24h</>}
            . Conferir os lotes antes de abrir.
          </span>
        </button>
      )}

      {/* ============ KPIs PRINCIPAIS ============ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 stagger">
        {/* Aderência geral */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-paper flex flex-col items-center">
          <Gauge
            value={overallAdherence}
            label="Aderência a checklists (turno atual)"
            tone={adherenceTone(overallAdherence)}
            sublabel={`${done}/${total}`}
          />
          <button
            onClick={() => onNavigate?.('checklists')}
            className="mt-3 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
          >
            Abrir checklists <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Ruptura */}
        <StatCard
          icon={<PackageX className="w-5 h-5" />}
          tone={rupturasHoje.length === 0 && stockRuptura === 0 ? 'emerald' : 'rose'}
          value={String(rupturasHoje.length)}
          label="Ocorrências de ruptura hoje"
          target={
            stockRuptura > 0
              ? `${stockRuptura} item(ns) zerados no estoque • ${stockNoGatilho} no gatilho`
              : stockNoGatilho > 0
                ? `${stockNoGatilho} item(ns) no gatilho de compra`
                : 'Meta operacional: ZERO'
          }
          onClick={() => onNavigate?.('estoque')}
        />

        {/* Perdas */}
        <StatCard
          icon={<Trash2 className="w-5 h-5" />}
          tone={perdasHoje.length === 0 ? 'emerald' : 'amber'}
          value={String(perdasHoje.length)}
          label="Perdas registradas hoje"
          target={perdaBRL > 0 ? `≈ ${brl(perdaBRL)} descartado` : 'Nenhuma perda lançada'}
          onClick={() => setShowForm(true)}
        />

        {/* Não-conformidades */}
        <StatCard
          icon={<AlertTriangle className="w-5 h-5" />}
          tone={ncTotal === 0 ? 'emerald' : 'amber'}
          value={String(ncTotal)}
          label="Não-conformidades abertas"
          target={`${elogiosHoje.length} elogio(s) hoje`}
          onClick={() => onNavigate?.('checklists')}
        />
      </div>

      {/* ============ INDICADORES BLOQUEADOS ============ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DIA1_INDICATORS.filter((i) => i.status === 'bloqueado').map((ind) => (
          <div
            key={ind.key}
            className="bg-stone-100 border border-dashed border-stone-300 rounded-2xl p-5 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-stone-500">
                  <Lock className="w-4 h-4" />
                  <span className="font-bold text-sm text-stone-700">{ind.label}</span>
                </div>
                <p className="text-xs text-stone-500 mt-1 max-w-sm">{ind.measures}</p>
              </div>
              <span className="text-[10px] font-mono font-bold bg-stone-800 text-amber-300 px-2 py-1 rounded">
                {impl.financialsUnlocked ? 'PRONTO P/ CALIBRAR' : `${impl.daysToUnlockFinancials}d`}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-3 bg-white/70 border border-stone-200 rounded-lg p-2 leading-relaxed">
              {ind.unlockNote}
            </p>
          </div>
        ))}
      </div>

      {/* ============ ADERÊNCIA POR SETOR ============ */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-paper">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-black text-stone-900 uppercase tracking-wider flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-emerald-600" />
            Aderência por setor
          </h2>
          <span className="text-[11px] text-stone-400">Onde o padrão está sendo cumprido ou falhando</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {sectorAdherence.map((s) => (
            <div key={s.id} className="flex items-center gap-3">
              <div className="flex-1">
                <MiniBar
                  label={s.name}
                  value={s.pct}
                  tone={adherenceTone(s.pct) === 'rose' ? 'rose' : adherenceTone(s.pct) === 'amber' ? 'amber' : s.tone}
                  caption={
                    s.total === 0
                      ? 'Sem itens cadastrados'
                      : `${s.done}/${s.total} tarefas • Líder: ${s.leader?.name?.split(' ')[0] || '—'}`
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============ REGISTRO DE OCORRÊNCIAS ============ */}
      <div className="bg-white border border-stone-200 rounded-2xl shadow-paper overflow-hidden">
        <div className="bg-stone-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-amber-400" />
            <div>
              <h2 className="text-sm font-black">Registro de ocorrências do dia</h2>
              <p className="text-[11px] text-stone-400">
                Fato, responsável, ação e retorno — nada fica só na conversa (Princípio 5).
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer no-print"
          >
            {showForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            {showForm ? 'Fechar' : 'Nova ocorrência'}
          </button>
        </div>

        {/* Formulário */}
        {showForm && (
          <div className="p-4 bg-stone-50 border-b border-stone-200 space-y-3 animate-slide-down no-print">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(OCCURRENCE_META) as OccurrenceType[]).map((k) => (
                <button
                  key={k}
                  onClick={() => setForm((f) => ({ ...f, type: k }))}
                  className={`p-2 rounded-lg border text-center text-[11px] font-bold transition-all cursor-pointer ${
                    form.type === k
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <span className="block text-base leading-none mb-0.5">{OCCURRENCE_META[k].icon}</span>
                  {OCCURRENCE_META[k].label}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-stone-500 italic">{OCCURRENCE_META[form.type].helper}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <select
                value={form.sector}
                onChange={(e) => setForm((f) => ({ ...f, sector: e.target.value as OperationalOccurrence['sector'] }))}
                className="bg-white border border-stone-300 rounded-lg p-2 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                {SECTORS.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
                <option value="gerencia">Gerência</option>
              </select>
              <input
                value={form.item}
                onChange={(e) => setForm((f) => ({ ...f, item: e.target.value }))}
                placeholder="Item / prato / processo *"
                className="bg-white border border-stone-300 rounded-lg p-2 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <textarea
              value={form.reason}
              onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
              placeholder="Motivo exato (o que aconteceu, por quê) *"
              rows={2}
              className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <input
                value={form.quantity}
                onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
                placeholder="Quantidade (2,4 kg / 3 un)"
                className="bg-white border border-stone-300 rounded-lg p-2 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
              {form.type === 'perda' && (
                <input
                  type="number"
                  value={form.estimatedLossBRL}
                  onChange={(e) => setForm((f) => ({ ...f, estimatedLossBRL: e.target.value }))}
                  placeholder="Perda estimada (R$)"
                  className="bg-white border border-stone-300 rounded-lg p-2 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              )}
              <select
                value={form.correctionStep}
                onChange={(e) => setForm((f) => ({ ...f, correctionStep: e.target.value as typeof f.correctionStep }))}
                className="bg-white border border-stone-300 rounded-lg p-2 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Escada de correção…</option>
                {CORRECTION_LADDER.map((c) => (
                  <option key={c.step} value={String(c.step)}>{c.step}. {c.title}</option>
                ))}
              </select>
            </div>
            <input
              value={form.actionTaken}
              onChange={(e) => setForm((f) => ({ ...f, actionTaken: e.target.value }))}
              placeholder="Ação tomada / próximo passo"
              className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-stone-500">
                Autoria: <strong>{currentEmployee?.name || 'Equipe de plantão'}</strong> • {nowTime()}
              </span>
              <button
                onClick={submitOccurrence}
                className="bg-stone-900 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Registrar ocorrência
              </button>
            </div>
          </div>
        )}

        {/* Lista do dia */}
        <div className="divide-y divide-stone-100">
          {todayOcc.length === 0 && (
            <p className="p-6 text-center text-xs text-stone-400">
              Nenhuma ocorrência registrada hoje. Se algo aconteceu e não está aqui, o registro falhou —
              não a operação.
            </p>
          )}
          {todayOcc.map((o) => {
            const meta = OCCURRENCE_META[o.type];
            return (
              <div key={o.id} className="p-4 flex items-start gap-3 hover:bg-stone-50/70">
                <span className="text-lg leading-none mt-0.5">{meta.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm text-stone-900">{o.item}</span>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${meta.badgeClass}`}>
                      {meta.short}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {o.time} • {o.sector} • {o.registeredBy}
                    </span>
                    {o.correctionStep && (
                      <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-1.5 py-0.5 rounded">
                        Correção {o.correctionStep}/4
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">{o.reason}</p>
                  {(o.quantity || o.estimatedLossBRL) && (
                    <p className="text-[11px] text-stone-500 mt-0.5 font-mono">
                      {o.quantity}
                      {o.estimatedLossBRL ? ` • ${brl(o.estimatedLossBRL)}` : ''}
                    </p>
                  )}
                  {o.actionTaken && (
                    <p className="text-[11px] text-emerald-800 mt-1 flex items-start gap-1">
                      <ArrowRight className="w-3 h-3 mt-0.5 shrink-0" /> {o.actionTaken}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0 no-print">
                  {o.type !== 'elogio' && (
                    <button
                      onClick={() => toggleResolved(o.id)}
                      className={`text-[10px] font-bold px-2 py-1 rounded border transition-colors cursor-pointer ${
                        o.resolved
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      {o.resolved ? '✓ Resolvido' : 'Em aberto'}
                    </button>
                  )}
                  <button
                    onClick={() => removeOccurrence(o.id)}
                    className="text-stone-300 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Remover registro"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============ PLACAR DOS 6 PRINCÍPIOS ============ */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-paper">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-black text-stone-900 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Placar dos 6 Princípios Inegociáveis
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-stone-400">no verde</span>
            <span className="font-mono font-black text-emerald-700 text-sm">{principlePct}%</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 stagger">
          {PRINCIPLES.map((p) => {
            const sig = principleSignal(p.key);
            const st = SIGNAL_STYLE[sig] || SIGNAL_STYLE.amarelo;
            return (
              <div key={p.key} className={`rounded-xl border p-3.5 ${st.ring}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 min-w-0">
                    <span className="w-6 h-6 rounded-full bg-stone-900 text-amber-300 text-xs font-black flex items-center justify-center shrink-0">
                      {p.number}
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-stone-900">{p.title}</p>
                      <p className="text-[10px] text-stone-500 leading-snug mt-0.5">{p.application}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className={`w-2.5 h-2.5 rounded-full ${st.dot}`} />
                    <span className="text-[10px] font-bold text-stone-600">{st.label}</span>
                  </div>
                </div>

                {p.evaluation === 'auto' ? (
                  <p className="text-[10px] text-stone-500 mt-2 font-mono bg-white/60 rounded px-2 py-1 border border-stone-200">
                    auto • {p.autoMetricLabel}
                  </p>
                ) : (
                  <div className="flex items-center gap-1.5 mt-2 no-print">
                    {(['verde', 'amarelo', 'vermelho'] as PrincipleSignal[]).map((s) => (
                      <button
                        key={s}
                        onClick={() => setPrinciple(p.key, s)}
                        className={`flex-1 text-[10px] font-bold py-1 rounded border transition-all cursor-pointer ${
                          sig === s
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {s === 'verde' ? '🟢 Padrão' : s === 'amarelo' ? '🟡 Atenção' : '🔴 Fora'}
                      </button>
                    ))}
                  </div>
                )}
                {p.evaluation === 'manual' && (
                  <input
                    value={principleState[p.key]?.note || ''}
                    onChange={(e) => setPrinciple(p.key, principleState[p.key]?.signal || 'amarelo', e.target.value)}
                    placeholder="Evidência de campo / observação da liderança"
                    className="w-full mt-1.5 text-[10px] bg-white border border-stone-200 rounded px-2 py-1 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 no-print"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ============ ESCADA DE CORREÇÃO ============ */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-paper">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-black text-stone-900 uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            Escada de Correção Operacional
          </h2>
          <span className="text-[11px] text-stone-400">Cobrança justa, por etapas</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CORRECTION_LADDER.map((c) => (
            <div key={c.step} className={`rounded-xl border-2 p-3.5 ${c.cardClass}`}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`w-6 h-6 rounded-lg ${c.badgeClass} text-white text-xs font-black flex items-center justify-center`}>
                  {c.step}
                </span>
                <span className="font-black text-sm text-stone-900">{c.title}</span>
              </div>
              <p className="text-[11px] text-stone-500 font-semibold">{c.trigger}</p>
              <p className="text-[11px] text-stone-700 mt-1 leading-relaxed">{c.action}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ============ CRITÉRIO DE SUCESSO ============ */}
      <div className="bg-emerald-950 text-emerald-100 rounded-2xl p-5 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-white text-sm mb-1">Critério de sucesso do projeto</p>
          <p className="text-xs leading-relaxed text-emerald-200">
            O painel funciona quando um funcionário novo entende sua função, executa com o material
            visual, registra o que fez e não precisa que a gestão faça por ele.
          </p>
        </div>
      </div>

      {/* Rodapé com contato do líder ativo */}
      {currentEmployee && (
        <div className="flex items-center justify-between bg-white border border-stone-200 rounded-xl p-3 text-xs no-print">
          <div className="flex items-center gap-2.5">
            <CharacterAvatar id={currentEmployee.photoUrl || 'chef_manel'} size="sm" customUrl={currentEmployee.photoUrl} />
            <div>
              <p className="font-bold text-stone-800">{currentEmployee.name}</p>
              <p className="text-[11px] text-stone-500">Fechando o painel de hoje</p>
            </div>
          </div>
          {onOpenLoginModal && (
            <button
              onClick={onOpenLoginModal}
              className="text-[11px] font-bold text-stone-500 hover:text-stone-800 border border-stone-300 rounded-lg px-2.5 py-1.5 cursor-pointer"
            >
              Trocar operador
            </button>
          )}
        </div>
      )}
    </div>
  );
};

/* ---------- Card de indicador numérico ---------- */

interface StatCardProps {
  icon: React.ReactNode;
  tone: 'emerald' | 'amber' | 'rose';
  value: string;
  label: string;
  target: string;
  onClick?: () => void;
}

const STAT_TONES: Record<string, { bg: string; text: string; ring: string }> = {
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', ring: 'border-emerald-200' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', ring: 'border-amber-200' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', ring: 'border-rose-200' },
};

const StatCard: React.FC<StatCardProps> = ({ icon, tone, value, label, target, onClick }) => {
  const t = STAT_TONES[tone];
  return (
    <button
      onClick={onClick}
      className={`text-left bg-white border ${t.ring} rounded-2xl p-5 shadow-paper hover:shadow-md transition-shadow cursor-pointer`}
    >
      <div className={`w-10 h-10 rounded-xl ${t.bg} ${t.text} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={`text-3xl font-black ${t.text}`}>{value}</span>
      </div>
      <p className="text-xs font-bold text-stone-700 mt-1 leading-tight">{label}</p>
      <p className="text-[10px] text-stone-400 mt-1">{target}</p>
    </button>
  );
};
