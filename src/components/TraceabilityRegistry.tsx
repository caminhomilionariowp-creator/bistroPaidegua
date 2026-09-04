import React, { useState, useEffect, useMemo } from 'react';
import {
  Tag,
  AlertTriangle,
  Clock,
  Check,
  Trash2,
  Printer,
  Plus,
  X,
  Share2,
  History,
  MapPin,
  PackageCheck,
  ShieldAlert,
} from 'lucide-react';
import {
  TraceLot,
  EmployeeAccount,
  DocumentCategory,
  OperationalOccurrence,
} from '../types';
import {
  loadLots,
  saveLots,
  SHELF_LIFE,
  TRACE_CATEGORIES,
  DISCARD_REASONS,
  expiryBucket,
  BUCKET_META,
  humanizeExpiry,
  fmtDateTime,
  toLocalInput,
  addHoursISO,
  newLotId,
  ExpiryBucket,
} from '../data/traceabilityData';
import { loadOccurrences, saveOccurrences } from '../data/cockpitData';
import { BrandLogo, BrandWatermarkOverlay } from './BrandLogo';
import { IllustratedStamp } from './Characters';
import { useSyncRefresh } from '../lib/useSync';

interface Props {
  currentEmployee?: EmployeeAccount;
  onNavigate?: (cat: DocumentCategory) => void;
}

const BUCKETS: ExpiryBucket[] = ['vencido', 'proximo', 'hoje', 'ok'];
const nowLocalInput = () => toLocalInput(new Date().toISOString());

/* ---------- etiqueta imprimível (Etiqueta Universal, 4 campos) ---------- */
const LotLabel: React.FC<{ lot: TraceLot }> = ({ lot }) => (
  <div className="bg-white border-2 border-stone-900 rounded-xl p-4 font-mono text-xs w-full max-w-sm">
    <div className="bg-stone-900 text-white py-1 px-2 text-[10px] font-extrabold uppercase rounded flex items-center justify-between mb-2">
      <BrandLogo variant="horizontal" size="xs" theme="dark" />
      <span className="text-amber-400 text-[9px]">RASTREABILIDADE</span>
    </div>
    <div className="border-b-2 border-stone-300 pb-2 mb-2">
      <div className="text-[9px] text-stone-500 font-bold uppercase">Produto / Insumo</div>
      <div className="text-sm font-extrabold text-stone-900 font-sans leading-tight">{lot.product}</div>
      {lot.complement && <div className="text-[10px] font-bold text-stone-600">{lot.complement}</div>}
    </div>
    <div className="grid grid-cols-2 gap-2 border-b-2 border-stone-300 pb-2 mb-2">
      <div className="bg-stone-50 p-1.5 rounded border border-stone-200">
        <span className="text-[9px] text-stone-500 block uppercase font-bold">Preparo</span>
        <span className="font-extrabold text-stone-900">{fmtDateTime(lot.prepAt)}</span>
      </div>
      <div className="bg-rose-50 p-1.5 rounded border border-rose-300">
        <span className="text-[9px] text-rose-700 block uppercase font-bold">Validade</span>
        <span className="font-extrabold text-rose-950">{fmtDateTime(lot.expiryAt)}</span>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2 text-[10px] mb-2">
      <div>
        <span className="text-[9px] text-stone-500 block font-bold">Executor</span>
        <span className="font-bold text-stone-800">{lot.executor}</span>
      </div>
      <div>
        <span className="text-[9px] text-stone-500 block font-bold">Conferente</span>
        <span className="font-bold text-stone-800">{lot.checker || '—'}</span>
      </div>
    </div>
    <div className="pt-1.5 border-t border-dashed border-stone-300 flex items-center justify-between text-[9px] text-stone-500">
      <span>{lot.location || 'Cozinha / Estoque'}</span>
      <span className="font-bold text-emerald-800">Sem etiqueta = Sem uso</span>
    </div>
  </div>
);

export const TraceabilityRegistry: React.FC<Props> = ({ currentEmployee, onNavigate }) => {
  const [lots, setLots] = useState<TraceLot[]>(() => loadLots());
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(i);
  }, []);

  useSyncRefresh(['bistro_pai_degua_rastreabilidade_v1'], () => setLots(loadLots()));

  const persist = (next: TraceLot[]) => {
    setLots(next);
    saveLots(next);
  };
  const [toast, setToast] = useState<string | null>(null);
  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 3200);
  };

  const [showForm, setShowForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [filter, setFilter] = useState<ExpiryBucket | 'todos'>('todos');
  const [catFilter, setCatFilter] = useState('todas');
  const [printLot, setPrintLot] = useState<TraceLot | null>(null);
  const [discardTarget, setDiscardTarget] = useState<TraceLot | null>(null);
  const [discardReason, setDiscardReason] = useState(DISCARD_REASONS[0]);
  const [discardNote, setDiscardNote] = useState('');
  const [discardLogLoss, setDiscardLogLoss] = useState(true);

  /* ---------- formulário ---------- */
  const blank = {
    product: '',
    complement: '',
    quantity: '',
    category: 'Pré-preparo',
    location: '',
    executor: currentEmployee?.name || '',
    checker: '',
    prepAt: nowLocalInput(),
    shelfHours: 48,
    expiryAt: toLocalInput(addHoursISO(new Date().toISOString(), 48)),
    expiryTouched: false,
  };
  const [form, setForm] = useState(blank);
  const matchedPreset = SHELF_LIFE.find((p) => p.product === form.product);

  const setProduct = (product: string) => {
    const preset = SHELF_LIFE.find((p) => p.product === product);
    setForm((f) => {
      const shelfHours = preset?.hours ?? f.shelfHours;
      return {
        ...f,
        product,
        category: preset?.category ?? f.category,
        shelfHours,
        expiryAt: f.expiryTouched
          ? f.expiryAt
          : toLocalInput(addHoursISO(new Date(f.prepAt).toISOString(), shelfHours)),
      };
    });
  };
  const setShelf = (h: number) =>
    setForm((f) => ({
      ...f,
      shelfHours: h,
      expiryTouched: false,
      expiryAt: toLocalInput(addHoursISO(new Date(f.prepAt).toISOString(), h)),
    }));
  const setPrepAt = (v: string) =>
    setForm((f) => ({
      ...f,
      prepAt: v,
      expiryAt: f.expiryTouched ? f.expiryAt : toLocalInput(addHoursISO(new Date(v).toISOString(), f.shelfHours)),
    }));

  const submit = () => {
    if (!form.product.trim() || !form.executor.trim()) {
      flash('Produto e executor são obrigatórios — a etiqueta prova a autoria.');
      return;
    }
    const lot: TraceLot = {
      id: newLotId(),
      product: form.product.trim(),
      complement: form.complement.trim() || undefined,
      category: form.category,
      quantity: form.quantity.trim() || undefined,
      prepAt: new Date(form.prepAt).toISOString(),
      expiryAt: new Date(form.expiryAt).toISOString(),
      executor: form.executor.trim(),
      checker: form.checker.trim() || undefined,
      location: form.location.trim() || undefined,
      status: 'ativo',
    };
    persist([lot, ...lots]);
    setForm({ ...blank, executor: currentEmployee?.name || '' });
    setShowForm(false);
    setPrintLot(lot);
    flash('Lote registrado. Imprima e cole a etiqueta antes de guardar.');
  };

  const markConsumed = (lot: TraceLot) =>
    persist(
      lots.map((l) =>
        l.id === lot.id
          ? { ...l, status: 'consumido', closedAt: new Date().toISOString(), closedBy: currentEmployee?.name || 'Equipe' }
          : l,
      ),
    );

  const confirmDiscard = () => {
    if (!discardTarget) return;
    const lot = discardTarget;
    let loggedAsLoss = false;
    if (discardLogLoss) {
      const occ: OperationalOccurrence = {
        id: `occ-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
        type: 'perda',
        sector: 'cozinha',
        item: `${lot.product}${lot.complement ? ` (${lot.complement})` : ''}`,
        reason: `Descarte na rastreabilidade — ${discardReason}${discardNote ? `. ${discardNote}` : ''}`,
        quantity: lot.quantity,
        registeredBy: currentEmployee?.name || 'Equipe',
        actionTaken: 'Lote encerrado no registro de rastreabilidade.',
        resolved: true,
      };
      saveOccurrences([occ, ...loadOccurrences()]);
      loggedAsLoss = true;
    }
    persist(
      lots.map((l) =>
        l.id === lot.id
          ? {
              ...l,
              status: 'descartado',
              closedAt: new Date().toISOString(),
              closedBy: currentEmployee?.name || 'Equipe',
              discardReason: `${discardReason}${discardNote ? ` — ${discardNote}` : ''}`,
              loggedAsLoss,
            }
          : l,
      ),
    );
    setDiscardTarget(null);
    setDiscardNote('');
    setDiscardReason(DISCARD_REASONS[0]);
    flash(loggedAsLoss ? 'Descarte registrado e lançado como perda no Painel.' : 'Descarte registrado.');
  };

  /* ---------- métricas ---------- */
  const active = lots.filter((l) => l.status === 'ativo');
  const closed = lots.filter((l) => l.status !== 'ativo');
  const counts = useMemo(() => {
    const c: Record<ExpiryBucket, number> = { vencido: 0, proximo: 0, hoje: 0, ok: 0 };
    active.forEach((l) => (c[expiryBucket(l, now)] += 1));
    return c;
  }, [active, now]);

  const visible = active
    .filter((l) => (filter === 'todos' ? true : expiryBucket(l, now) === filter))
    .filter((l) => (catFilter === 'todas' ? true : l.category === catFilter))
    .sort((a, b) => new Date(a.expiryAt).getTime() - new Date(b.expiryAt).getTime());

  const alertNames = active
    .filter((l) => ['vencido', 'proximo', 'hoje'].includes(expiryBucket(l, now)))
    .sort((a, b) => new Date(a.expiryAt).getTime() - new Date(b.expiryAt).getTime());

  const copyAlert = () => {
    let t = `🏷️ *RASTREABILIDADE — BISTRÔ PAI D'ÉGUA*\n📅 ${now.toLocaleDateString('pt-BR')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}\n\n`;
    t += `🔴 Vencidos: ${counts.vencido} • 🟠 ≤24h: ${counts.proximo} • 🟡 hoje: ${counts.hoje} • 🟢 ok: ${counts.ok}\n\n`;
    if (alertNames.length === 0) {
      t += `_Nenhum lote vencido ou perto do vencimento. 100% no prazo._`;
    } else {
      t += `*Conferir agora:*\n`;
      alertNames.forEach((l) => {
        t += `${expiryBucket(l, now) === 'vencido' ? '🔴' : expiryBucket(l, now) === 'proximo' ? '🟠' : '🟡'} ${l.product}${l.complement ? ` — ${l.complement}` : ''} (${humanizeExpiry(l, now)}) • ${l.location || '—'}\n`;
      });
    }
    t += `\n🏷️ _"Primeiro identificar, depois armazenar. Sem etiqueta = Sem uso."_`;
    navigator.clipboard.writeText(t);
    flash('Alerta de validade copiado para o WhatsApp.');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* ===== HERO ===== */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-950 to-blue-950 text-white rounded-2xl p-6 shadow-lg border border-stone-800 relative overflow-hidden animate-slide-up">
        <BrandWatermarkOverlay opacity={0.04} />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="bg-stone-900/70 p-2.5 rounded-xl border border-stone-800 hidden sm:flex shrink-0">
              <BrandLogo variant="icon" size="sm" theme="white" />
            </div>
            <div className="space-y-1">
              <span className="bg-red-600 text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Regra de Ouro • Primeiro identificar, depois armazenar
              </span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2.5">
                <Tag className="w-7 h-7 text-blue-300" />
                Rastreabilidade Universal
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
                Todo produto aberto, preparado, porcionado ou reembalado vira um lote com validade,
                autoria e endereço. <strong>Sem etiqueta = sem uso.</strong>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
            <button
              onClick={() => setShowForm((v) => !v)}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-lg font-bold text-xs cursor-pointer"
            >
              {showForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              {showForm ? 'Fechar' : 'Nova etiqueta'}
            </button>
            <button
              onClick={copyAlert}
              className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 px-3 py-2 rounded-lg font-bold text-xs border border-stone-700 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Alerta</span>
            </button>
          </div>
        </div>

        {counts.vencido > 0 && (
          <div className="relative z-10 mt-4 bg-rose-950/70 border border-rose-700 rounded-xl p-3 text-xs text-rose-100 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-300" />
            <span>
              <strong>{counts.vencido} lote(s) vencido(s):</strong>{' '}
              {active
                .filter((l) => expiryBucket(l, now) === 'vencido')
                .map((l) => l.product)
                .join(', ')}
              . Separar, descartar e registrar a perda. Não volta para a geladeira.
            </span>
          </div>
        )}
      </div>

      {toast && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-md animate-slide-down no-print">
          <Check className="w-4 h-4" />
          {toast}
        </div>
      )}

      {/* ===== PAINEL DE VALIDADE ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 stagger">
        {BUCKETS.map((b) => {
          const meta = BUCKET_META[b];
          return (
            <button
              key={b}
              onClick={() => setFilter(filter === b ? 'todos' : b)}
              className={`text-left bg-white border-2 rounded-2xl p-4 shadow-paper transition-all cursor-pointer ${
                filter === b ? 'ring-2 ring-stone-900' : 'hover:shadow-md'
              }`}
              style={{ borderColor: meta.hex + '55' }}
            >
              <div className="flex items-center justify-between">
                <Clock className="w-5 h-5" style={{ color: meta.hex }} />
                <span className="text-3xl font-black" style={{ color: meta.hex }}>
                  {counts[b]}
                </span>
              </div>
              <p className="text-xs font-bold text-stone-800 mt-1">{meta.label}</p>
            </button>
          );
        })}
      </div>

      {/* ===== FORMULÁRIO ===== */}
      {showForm && (
        <div className="bg-white border border-stone-200 rounded-2xl shadow-paper p-5 space-y-3 animate-slide-down no-print">
          <h2 className="text-sm font-black text-stone-900 uppercase tracking-wider">Registrar lote</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Produto / insumo *</label>
              <input
                list="trace-products"
                value={form.product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="Ex: Açaí batido (polpa)"
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
              <datalist id="trace-products">
                {SHELF_LIFE.map((p) => (
                  <option key={p.product} value={p.product} />
                ))}
              </datalist>
              {matchedPreset?.note && (
                <p className="text-[10px] text-amber-700 mt-1">{matchedPreset.note}</p>
              )}
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Porção / corte / lote</label>
              <input
                value={form.complement}
                onChange={(e) => setForm((f) => ({ ...f, complement: e.target.value }))}
                placeholder="Ex: Cuba GN 1/3 • 2,5 kg"
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Quantidade</label>
                <input
                  value={form.quantity}
                  onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
                  placeholder="1,2 kg"
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="font-bold text-stone-700 block mb-1">Categoria</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  {TRACE_CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Endereço de guarda (PEPS)</label>
              <input
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                placeholder="Freezer 1 — Gaveta B"
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Executor *</label>
              <input
                value={form.executor}
                onChange={(e) => setForm((f) => ({ ...f, executor: e.target.value }))}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Conferente</label>
              <input
                value={form.checker}
                onChange={(e) => setForm((f) => ({ ...f, checker: e.target.value }))}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Preparo</label>
              <input
                type="datetime-local"
                value={form.prepAt}
                onChange={(e) => setPrepAt(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Validade limite</label>
              <input
                type="datetime-local"
                value={form.expiryAt}
                onChange={(e) => setForm((f) => ({ ...f, expiryAt: e.target.value, expiryTouched: true }))}
                className="w-full bg-white border border-rose-300 text-rose-900 font-bold rounded-lg p-2 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-stone-500">Vida útil sugerida:</span>
            {[12, 24, 48, 72, 120, 168].map((h) => (
              <button
                key={h}
                onClick={() => setShelf(h)}
                className={`text-[11px] font-bold px-2 py-1 rounded border cursor-pointer ${
                  form.shelfHours === h && !form.expiryTouched
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {h < 48 ? `${h}h` : `${h / 24}d`}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-stone-500">
              Autoria: <strong>{currentEmployee?.name || 'defina o executor'}</strong>
            </span>
            <button
              onClick={submit}
              className="bg-stone-900 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer"
            >
              Gerar etiqueta e registrar
            </button>
          </div>
        </div>
      )}

      {/* ===== FILTRO CATEGORIA ===== */}
      <div className="flex flex-wrap gap-1.5 no-print">
        <button
          onClick={() => setCatFilter('todas')}
          className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border cursor-pointer ${
            catFilter === 'todas' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
          }`}
        >
          Todas as categorias
        </button>
        {TRACE_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCatFilter(c)}
            className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border cursor-pointer ${
              catFilter === c ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* ===== LOTES ATIVOS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {visible.map((lot) => {
          const b = expiryBucket(lot, now);
          const meta = BUCKET_META[b];
          const totalMs = new Date(lot.expiryAt).getTime() - new Date(lot.prepAt).getTime();
          const usedMs = now.getTime() - new Date(lot.prepAt).getTime();
          const pct = Math.max(0, Math.min(100, Math.round((usedMs / totalMs) * 100)));
          return (
            <div key={lot.id} className="bg-white border border-stone-200 rounded-2xl p-4 shadow-paper page-break-inside-avoid">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-black text-sm text-stone-900">{lot.product}</p>
                  {lot.complement && <p className="text-[11px] text-stone-500">{lot.complement}</p>}
                </div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded border shrink-0 ${meta.chipClass}`}>
                  {meta.label}
                </span>
              </div>

              <div className="mt-2.5">
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div className={`h-full ${meta.barClass} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                </div>
                <div className="flex items-center justify-between mt-1 text-[11px]">
                  <span className="font-mono font-bold" style={{ color: meta.hex }}>
                    {humanizeExpiry(lot, now)}
                  </span>
                  <span className="text-stone-400 font-mono">
                    {fmtDateTime(lot.prepAt)} → {fmtDateTime(lot.expiryAt)}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2.5 text-[10px] text-stone-500">
                <span>{lot.executor}{lot.checker ? ` → ${lot.checker}` : ''}</span>
                {lot.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {lot.location}
                  </span>
                )}
                {lot.quantity && <span className="font-mono">{lot.quantity}</span>}
              </div>

              <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-stone-100 no-print">
                <button
                  onClick={() => markConsumed(lot)}
                  className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 cursor-pointer"
                >
                  <PackageCheck className="w-3.5 h-3.5" /> Consumido
                </button>
                <button
                  onClick={() => setDiscardTarget(lot)}
                  className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Descartar
                </button>
                <button
                  onClick={() => setPrintLot(lot)}
                  className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200 cursor-pointer ml-auto"
                >
                  <Printer className="w-3.5 h-3.5" /> Etiqueta
                </button>
              </div>
            </div>
          );
        })}
        {visible.length === 0 && (
          <div className="md:col-span-2 bg-white border border-stone-200 rounded-2xl p-10 text-center text-sm text-stone-400">
            Nenhum lote ativo neste filtro.
          </div>
        )}
      </div>

      {/* ===== HISTÓRICO ===== */}
      {closed.length > 0 && (
        <div className="bg-white border border-stone-200 rounded-2xl shadow-paper overflow-hidden">
          <button
            onClick={() => setShowHistory((v) => !v)}
            className="w-full flex items-center justify-between p-4 text-sm font-black text-stone-900 uppercase tracking-wider cursor-pointer no-print"
          >
            <span className="flex items-center gap-2">
              <History className="w-4 h-4 text-stone-500" /> Histórico ({closed.length})
            </span>
            <span className="text-stone-400">{showHistory ? '−' : '+'}</span>
          </button>
          {showHistory && (
            <div className="divide-y divide-stone-100 border-t border-stone-100">
              {closed.map((l) => (
                <div key={l.id} className="p-3.5 flex items-start gap-3 text-xs">
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded shrink-0 ${
                      l.status === 'consumido' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {l.status === 'consumido' ? 'Consumido' : 'Descartado'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-stone-900">
                      {l.product}
                      {l.complement ? ` — ${l.complement}` : ''}
                    </p>
                    <p className="text-[11px] text-stone-500">
                      {l.closedAt ? fmtDateTime(l.closedAt) : ''} • {l.closedBy || '—'}
                      {l.discardReason ? ` • ${l.discardReason}` : ''}
                      {l.loggedAsLoss ? ' • lançado como perda' : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* rodapé */}
      <div className="bg-stone-100 rounded-xl p-4 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>
            Produto sem etiqueta é <strong>separado e não volta ao estoque</strong>. Descartes viram
            perda no{' '}
            <button onClick={() => onNavigate?.('painel')} className="font-bold text-blue-700 hover:underline cursor-pointer">
              Painel do Dia 1
            </button>
            .
          </span>
        </div>
        <IllustratedStamp type="ETIQUETA_OBRIGATORIA" size="sm" />
      </div>

      {/* ===== MODAL: DESCARTE ===== */}
      {discardTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-3 animate-scale-in">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-stone-900 flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-rose-600" /> Descartar lote
              </h3>
              <button onClick={() => setDiscardTarget(null)} className="text-stone-400 hover:text-stone-700 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-stone-600">
              {discardTarget.product}
              {discardTarget.complement ? ` — ${discardTarget.complement}` : ''}
              {discardTarget.quantity ? ` (${discardTarget.quantity})` : ''}
            </p>
            <div>
              <label className="text-[11px] font-bold text-stone-700 block mb-1">Motivo do descarte</label>
              <select
                value={discardReason}
                onChange={(e) => setDiscardReason(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              >
                {DISCARD_REASONS.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
            <input
              value={discardNote}
              onChange={(e) => setDiscardNote(e.target.value)}
              placeholder="Detalhe (opcional)"
              className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs focus:outline-hidden focus:ring-2 focus:ring-rose-500"
            />
            <label className="flex items-center gap-2 text-[11px] text-stone-700 cursor-pointer">
              <input type="checkbox" checked={discardLogLoss} onChange={(e) => setDiscardLogLoss(e.target.checked)} />
              Registrar como perda no Painel do Dia 1
            </label>
            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => setDiscardTarget(null)}
                className="text-xs font-bold px-3 py-2 rounded-lg bg-stone-100 text-stone-600 hover:bg-stone-200 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDiscard}
                className="text-xs font-bold px-3 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700 cursor-pointer"
              >
                Confirmar descarte
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL: ETIQUETA / IMPRESSÃO ===== */}
      {printLot && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-2xl p-5 space-y-4 animate-scale-in">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-stone-900">Etiqueta Universal do lote</h3>
              <button onClick={() => setPrintLot(null)} className="text-stone-400 hover:text-stone-700 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <LotLabel lot={printLot} />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setPrintLot(null)}
                className="text-xs font-bold px-3 py-2 rounded-lg bg-stone-100 text-stone-600 hover:bg-stone-200 cursor-pointer"
              >
                Fechar
              </button>
              <button
                onClick={() => window.print()}
                className="text-xs font-bold px-3 py-2 rounded-lg bg-stone-900 text-white hover:bg-stone-800 cursor-pointer flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Imprimir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* bloco imprimível dedicado — só aparece na impressão */}
      {printLot && (
        <div className="print-only">
          <LotLabel lot={printLot} />
        </div>
      )}
    </div>
  );
};
