import React, { useState, useMemo } from 'react';
import {
  Thermometer,
  ShoppingCart,
  Share2,
  Printer,
  Search,
  Minus,
  Plus,
  PackageX,
  AlertTriangle,
  TrendingDown,
  CheckCircle2,
  MapPin,
  Truck,
  ClipboardCheck,
  Check,
} from 'lucide-react';
import { StockItem, StockLevelKey, EmployeeAccount, DocumentCategory } from '../types';
import {
  loadStock,
  saveStock,
  STOCK_CATEGORIES,
  LEVEL_META,
  stockLevel,
  suggestedPurchase,
  fillPercent,
  needsPurchase,
} from '../data/stockData';
import { BrandLogo, BrandWatermarkOverlay } from './BrandLogo';
import { IllustratedStamp } from './Characters';

interface StockControlProps {
  currentEmployee?: EmployeeAccount;
  onNavigate?: (cat: DocumentCategory) => void;
}

const todayISO = () => new Date().toISOString().split('T')[0];
const nowStamp = () => {
  const d = new Date();
  return `${todayISO()}T${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};
const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));
const stepFor = (unit: string) => (['un'].includes(unit) ? 6 : ['kg', 'L'].includes(unit) ? 1 : 1);

const LEVELS: StockLevelKey[] = ['ruptura', 'critico', 'minimo', 'ideal'];

export const StockControl: React.FC<StockControlProps> = ({ currentEmployee, onNavigate }) => {
  const [items, setItems] = useState<StockItem[]>(() => loadStock());
  const [cat, setCat] = useState<string>('todas');
  const [levelFilter, setLevelFilter] = useState<StockLevelKey | 'todos' | 'faltando'>('todos');
  const [query, setQuery] = useState('');
  const [countMode, setCountMode] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const persist = (next: StockItem[]) => {
    setItems(next);
    saveStock(next);
  };
  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 3000);
  };

  const patch = (id: string, changes: Partial<StockItem>) =>
    persist(items.map((it) => (it.id === id ? { ...it, ...changes } : it)));

  const adjust = (item: StockItem, delta: number) => {
    const current = Math.max(0, Math.round((item.current + delta) * 100) / 100);
    patch(item.id, {
      current,
      lastCountAt: nowStamp(),
      lastCountBy: currentEmployee?.name || 'Equipe',
    });
  };
  const setExact = (item: StockItem, value: number) => {
    if (Number.isNaN(value)) return;
    patch(item.id, {
      current: Math.max(0, value),
      lastCountAt: nowStamp(),
      lastCountBy: currentEmployee?.name || 'Equipe',
    });
  };

  const triggerPurchase = (id: string) => {
    patch(id, { purchaseTriggeredAt: nowStamp() });
    flash('Pedido registrado. Confirme o envio ao fornecedor.');
  };
  const triggerAll = () => {
    const stamp = nowStamp();
    persist(items.map((it) => (needsPurchase(it) ? { ...it, purchaseTriggeredAt: stamp } : it)));
    flash('Compra disparada para todos os itens abaixo do mínimo.');
  };

  /* ---------- métricas ---------- */
  const counts = useMemo(() => {
    const c: Record<StockLevelKey, number> = { ruptura: 0, critico: 0, minimo: 0, ideal: 0 };
    items.forEach((it) => (c[stockLevel(it)] += 1));
    return c;
  }, [items]);
  const purchaseList = useMemo(
    () =>
      items
        .filter(needsPurchase)
        .sort((a, b) => LEVEL_META[stockLevel(a)].order - LEVEL_META[stockLevel(b)].order),
    [items],
  );

  const filtered = items.filter((it) => {
    if (cat !== 'todas' && it.category !== cat) return false;
    const lvl = stockLevel(it);
    if (levelFilter === 'faltando' && !needsPurchase(it)) return false;
    if (levelFilter !== 'todos' && levelFilter !== 'faltando' && lvl !== levelFilter) return false;
    if (query && !it.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const copyPurchaseList = () => {
    if (purchaseList.length === 0) {
      flash('Nenhum item abaixo do mínimo. Nada a comprar agora.');
      return;
    }
    const bySupplier: Record<string, StockItem[]> = {};
    purchaseList.forEach((it) => {
      const s = it.supplier || 'Sem fornecedor definido';
      (bySupplier[s] ||= []).push(it);
    });
    let t = `🛒 *PEDIDO DE COMPRA — BISTRÔ PAI D'ÉGUA*\n📅 ${new Date().toLocaleDateString('pt-BR')} • ${currentEmployee?.name || 'Estoque'}\n`;
    Object.entries(bySupplier).forEach(([sup, list]) => {
      t += `\n*${sup}*\n`;
      list.forEach((it) => {
        const lvl = LEVEL_META[stockLevel(it)].label;
        t += `• ${it.name}: comprar *${fmt(suggestedPurchase(it))} ${it.unit}* (tem ${fmt(it.current)}, ideal ${fmt(it.ideal)}) — ${lvl}\n`;
      });
    });
    t += `\n🌡️ _Meta: ruptura previsível = ZERO. Pedido disparado no nível amarelo._`;
    navigator.clipboard.writeText(t);
    flash('Lista de compras copiada para o WhatsApp.');
  };

  const rupturaNames = items.filter((it) => stockLevel(it) === 'ruptura').map((it) => it.name);

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
                Termômetro de Ruptura • Compra antecipada
              </span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2.5">
                <Thermometer className="w-7 h-7 text-blue-300" />
                Estoque &amp; Prevenção de Ruptura
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
                A disponibilidade do cardápio não depende de alguém avisar que acabou. O pedido é
                disparado no nível amarelo — <strong>ruptura previsível deve ser ZERO</strong>.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
            <button
              onClick={copyPurchaseList}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-lg font-bold text-xs cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" /> Copiar pedido
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 px-3 py-2 rounded-lg font-bold text-xs border border-stone-700 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> <span className="hidden sm:inline">F-04</span>
            </button>
          </div>
        </div>

        {rupturaNames.length > 0 && (
          <div className="relative z-10 mt-4 bg-rose-950/70 border border-rose-700 rounded-xl p-3 text-xs text-rose-100 flex items-start gap-2">
            <PackageX className="w-4 h-4 shrink-0 mt-0.5 text-rose-300" />
            <span>
              <strong>{rupturaNames.length} item(ns) em ruptura agora:</strong> {rupturaNames.join(', ')}. Registrar
              ocorrência e investigar a causa no Painel do Dia 1.
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

      {/* ===== TERMÔMETRO GERAL ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 stagger">
        {LEVELS.map((lvl) => {
          const meta = LEVEL_META[lvl];
          const Icon = lvl === 'ruptura' ? PackageX : lvl === 'critico' ? AlertTriangle : lvl === 'minimo' ? TrendingDown : CheckCircle2;
          return (
            <button
              key={lvl}
              onClick={() => setLevelFilter(levelFilter === lvl ? 'todos' : lvl)}
              className={`text-left bg-white border-2 rounded-2xl p-4 shadow-paper transition-all cursor-pointer ${
                levelFilter === lvl ? 'ring-2 ring-stone-900' : 'hover:shadow-md'
              }`}
              style={{ borderColor: meta.hex + '55' }}
            >
              <div className="flex items-center justify-between">
                <Icon className="w-5 h-5" style={{ color: meta.hex }} />
                <span className="text-3xl font-black" style={{ color: meta.hex }}>
                  {counts[lvl]}
                </span>
              </div>
              <p className="text-xs font-bold text-stone-800 mt-1">Nível {meta.label}</p>
              <p className="text-[10px] text-stone-400 leading-tight mt-0.5 line-clamp-2">{meta.action}</p>
            </button>
          );
        })}
      </div>

      {/* distribuição */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-paper">
        <div className="flex items-center justify-between mb-2 text-xs">
          <span className="font-bold text-stone-600">Distribuição do estoque ({items.length} itens)</span>
          <span className="font-mono font-black text-stone-900">
            {purchaseList.length} precisam de compra
          </span>
        </div>
        <div className="flex h-4 rounded-full overflow-hidden border border-stone-200">
          {LEVELS.map((lvl) =>
            counts[lvl] > 0 ? (
              <div
                key={lvl}
                className={`${LEVEL_META[lvl].barClass} flex items-center justify-center`}
                style={{ width: `${(counts[lvl] / items.length) * 100}%` }}
                title={`${LEVEL_META[lvl].label}: ${counts[lvl]}`}
              >
                {counts[lvl] / items.length > 0.08 && (
                  <span className="text-[9px] font-black text-white">{counts[lvl]}</span>
                )}
              </div>
            ) : null,
          )}
        </div>
      </div>

      {/* ===== LISTA DE COMPRAS ===== */}
      {purchaseList.length > 0 && (
        <div className="bg-white border border-amber-300 rounded-2xl shadow-paper overflow-hidden">
          <div className="bg-amber-500 text-white p-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <h2 className="text-sm font-black">Lista de compras — {purchaseList.length} itens no gatilho</h2>
            </div>
            <button
              onClick={triggerAll}
              className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer no-print"
            >
              Disparar pedido de todos
            </button>
          </div>
          <div className="divide-y divide-stone-100">
            {purchaseList.map((it) => {
              const lvl = stockLevel(it);
              const meta = LEVEL_META[lvl];
              const triggeredToday = it.purchaseTriggeredAt?.startsWith(todayISO());
              return (
                <div key={it.id} className="p-3.5 flex flex-wrap items-center gap-3">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${meta.chipClass}`}>
                    {meta.label}
                  </span>
                  <div className="flex-1 min-w-[140px]">
                    <p className="font-bold text-sm text-stone-900">{it.name}</p>
                    <p className="text-[11px] text-stone-500">
                      Tem {fmt(it.current)} {it.unit} • ideal {fmt(it.ideal)} {it.unit}
                      {it.supplier ? ` • ${it.supplier}` : ''}
                      {it.leadTimeDays ? ` (${it.leadTimeDays}d)` : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 block">Comprar</span>
                    <span className="text-sm font-black text-amber-700">
                      {fmt(suggestedPurchase(it))} {it.unit}
                    </span>
                  </div>
                  <button
                    onClick={() => triggerPurchase(it.id)}
                    disabled={triggeredToday}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer no-print ${
                      triggeredToday
                        ? 'bg-emerald-100 text-emerald-800 cursor-default'
                        : 'bg-stone-900 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {triggeredToday
                      ? `✓ disparado ${it.purchaseTriggeredAt!.slice(11)}`
                      : 'Disparar compra'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===== FILTROS ===== */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-paper space-y-3 no-print">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar insumo…"
              className="w-full bg-stone-50 border border-stone-200 rounded-lg pl-8 pr-3 py-1.5 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setCountMode((v) => !v)}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              countMode ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <ClipboardCheck className="w-3.5 h-3.5" />
            {countMode ? 'Sair da contagem' : 'Contagem rápida (F-04)'}
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(['todos', 'faltando', ...LEVELS] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLevelFilter(l)}
              className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                levelFilter === l
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
              }`}
            >
              {l === 'todos' ? 'Todos' : l === 'faltando' ? '⚠ Precisa comprar' : LEVEL_META[l as StockLevelKey].label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setCat('todas')}
            className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border cursor-pointer ${
              cat === 'todas' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
          >
            Todas as categorias
          </button>
          {STOCK_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border cursor-pointer ${
                cat === c ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* ===== GRADE DE ITENS ===== */}
      {countMode ? (
        <div className="bg-white border border-stone-200 rounded-2xl shadow-paper overflow-hidden">
          <div className="bg-stone-900 text-white p-3 text-xs font-bold flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4 text-blue-300" /> Contagem rápida — digite a quantidade real de cada item
          </div>
          <div className="divide-y divide-stone-100">
            {filtered.map((it) => {
              const meta = LEVEL_META[stockLevel(it)];
              return (
                <div key={it.id} className="p-3 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: meta.hex }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-stone-900 truncate">{it.name}</p>
                    <p className="text-[10px] text-stone-400">{it.location || it.category}</p>
                  </div>
                  <input
                    type="number"
                    defaultValue={it.current}
                    onBlur={(e) => setExact(it, parseFloat(e.target.value))}
                    className="w-20 bg-stone-50 border border-stone-200 rounded-lg px-2 py-1.5 text-sm font-mono font-bold text-right focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-xs text-stone-400 w-8">{it.unit}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((it) => {
            const lvl = stockLevel(it);
            const meta = LEVEL_META[lvl];
            const fill = fillPercent(it);
            const minPct = Math.min(100, (it.min / (it.ideal || 1)) * 100);
            const critPct = Math.min(100, (it.critical / (it.ideal || 1)) * 100);
            const triggeredToday = it.purchaseTriggeredAt?.startsWith(todayISO());
            return (
              <div key={it.id} className="bg-white border border-stone-200 rounded-2xl p-4 shadow-paper page-break-inside-avoid">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-black text-sm text-stone-900">{it.name}</p>
                    <p className="text-[10px] text-stone-400">{it.category}</p>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded border shrink-0 ${meta.chipClass}`}>
                    {meta.label}
                  </span>
                </div>

                {/* termômetro horizontal */}
                <div className="mt-3">
                  <div className="relative h-3 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${fill}%`, background: meta.hex }} />
                    <span className="absolute top-0 bottom-0 w-0.5 bg-orange-400" style={{ left: `${critPct}%` }} title="Crítico" />
                    <span className="absolute top-0 bottom-0 w-0.5 bg-amber-500" style={{ left: `${minPct}%` }} title="Mínimo" />
                  </div>
                  <div className="flex justify-between text-[9px] text-stone-400 font-mono mt-0.5">
                    <span>0</span>
                    <span>crít {fmt(it.critical)}</span>
                    <span>mín {fmt(it.min)}</span>
                    <span>ideal {fmt(it.ideal)}</span>
                  </div>
                </div>

                {/* ajuste rápido */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => adjust(it, -stepFor(it.unit))}
                      className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-rose-100 text-stone-700 flex items-center justify-center cursor-pointer no-print"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="number"
                      value={it.current}
                      onChange={(e) => setExact(it, parseFloat(e.target.value))}
                      className="w-16 text-center text-lg font-black text-stone-900 bg-transparent focus:outline-hidden focus:bg-stone-50 rounded"
                    />
                    <span className="text-xs text-stone-400">{it.unit}</span>
                    <button
                      onClick={() => adjust(it, stepFor(it.unit))}
                      className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-emerald-100 text-stone-700 flex items-center justify-center cursor-pointer no-print"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {needsPurchase(it) && (
                    <button
                      onClick={() => triggerPurchase(it.id)}
                      disabled={triggeredToday}
                      className={`text-[11px] font-bold px-2.5 py-1.5 rounded-lg cursor-pointer no-print ${
                        triggeredToday ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-500 hover:bg-amber-600 text-white'
                      }`}
                    >
                      {triggeredToday ? '✓ pedido' : `comprar ${fmt(suggestedPurchase(it))}`}
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 pt-3 border-t border-stone-100 text-[10px] text-stone-500">
                  {it.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {it.location}
                    </span>
                  )}
                  {it.supplier && (
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3" /> {it.supplier}
                      {it.leadTimeDays ? ` · ${it.leadTimeDays}d` : ''}
                    </span>
                  )}
                  {it.perishable && (
                    <span className="text-rose-600 font-bold">perecível</span>
                  )}
                  {it.lastCountAt && (
                    <span className="ml-auto">
                      contado {it.lastCountAt.slice(11)} {it.lastCountBy ? `· ${it.lastCountBy.split(' ')[0]}` : ''}
                    </span>
                  )}
                </div>
                {it.notes && <p className="text-[10px] text-stone-400 italic mt-1.5">{it.notes}</p>}
              </div>
            );
          })}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="bg-white border border-stone-200 rounded-2xl p-10 text-center text-sm text-stone-400">
          Nenhum item neste filtro.
        </div>
      )}

      {/* rodapé */}
      <div className="bg-stone-100 rounded-xl p-4 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
        <div className="flex items-center gap-3">
          <Thermometer className="w-5 h-5 text-blue-700 shrink-0" />
          <span>
            Regra P.E.P.S.: primeiro que entra, primeiro que sai. Compra disparada no{' '}
            <strong className="text-amber-700">amarelo</strong>, nunca no vermelho.{' '}
            <button onClick={() => onNavigate?.('painel')} className="font-bold text-blue-700 hover:underline cursor-pointer">
              Ver impacto no Painel do Dia 1
            </button>
          </span>
        </div>
        <IllustratedStamp type="PEPS" size="sm" />
      </div>
    </div>
  );
};
