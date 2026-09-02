import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Clock,
  Check,
  Flame,
  Tag,
  Share2,
  Printer,
  Award,
  Target,
  Wrench,
  HardHat,
  ChevronRight,
} from 'lucide-react';
import {
  ResponsibleLeader,
  EmployeeAccount,
  DocumentCategory,
} from '../types';
import { JOB_ROLES_DATA, JobRoleDescriptor } from '../data/jobRolesData';
import {
  ROLE_STATION_META,
  RECHAUD_CUBAS,
  TABUAS_CORES,
  ETIQUETA_CAMPOS,
  roleTaskId,
  loadRoleTasksState,
  saveRoleTasksState,
  splitTaskTime,
  RoleTaskState,
} from '../data/roleStationData';
import { Gauge } from './Gauge';
import { BrandLogo, BrandWatermarkOverlay } from './BrandLogo';
import { CharacterAvatar, IllustratedStamp } from './Characters';

interface RoleStationProps {
  team: ResponsibleLeader[];
  currentEmployee?: EmployeeAccount;
  allEmployees?: EmployeeAccount[];
  onOpenLoginModal?: () => void;
  onNavigate?: (cat: DocumentCategory) => void;
}

const todayISO = () => new Date().toISOString().split('T')[0];
const nowTime = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};
const gaugeTone = (accent: string): 'emerald' | 'amber' | 'rose' | 'blue' =>
  accent === 'amber' ? 'amber' : accent === 'rose' ? 'rose' : accent === 'emerald' ? 'emerald' : 'blue';

const EPI_KEY = (roleId: string, date: string) => `bistro_posto_epi_${roleId}_${date}`;

export const RoleStation: React.FC<RoleStationProps> = ({
  team,
  currentEmployee,
  allEmployees = [],
  onOpenLoginModal,
  onNavigate,
}) => {
  const date = todayISO();

  // Abre no posto do colaborador logado; troca ao logar outro com cargo definido.
  const [roleId, setRoleId] = useState<string>(
    () => currentEmployee?.roleId || 'cozinheiro-lider',
  );
  const lastEmpRef = useRef<string | undefined>(currentEmployee?.id);
  useEffect(() => {
    if (currentEmployee?.id !== lastEmpRef.current) {
      lastEmpRef.current = currentEmployee?.id;
      if (currentEmployee?.roleId) setRoleId(currentEmployee.roleId);
    }
  }, [currentEmployee?.id, currentEmployee?.roleId]);

  const role: JobRoleDescriptor =
    JOB_ROLES_DATA.find((r) => r.id === roleId) || JOB_ROLES_DATA[0];
  const meta = ROLE_STATION_META[role.id] || ROLE_STATION_META['auxiliar-cozinha'];

  const [taskState, setTaskState] = useState<Record<string, RoleTaskState>>(() =>
    loadRoleTasksState(date),
  );
  useEffect(() => saveRoleTasksState(date, taskState), [taskState, date]);

  const [epiState, setEpiState] = useState<boolean[]>(() => {
    try {
      const s = localStorage.getItem(EPI_KEY(role.id, date));
      if (s) return JSON.parse(s);
    } catch {
      /* ignore */
    }
    return role.requiredEpi.map(() => false);
  });
  useEffect(() => {
    try {
      const s = localStorage.getItem(EPI_KEY(role.id, date));
      setEpiState(s ? JSON.parse(s) : role.requiredEpi.map(() => false));
    } catch {
      setEpiState(role.requiredEpi.map(() => false));
    }
  }, [role.id, date]);
  const persistEpi = (next: boolean[]) => {
    setEpiState(next);
    try {
      localStorage.setItem(EPI_KEY(role.id, date), JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const [toast, setToast] = useState<string | null>(null);
  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 3000);
  };

  /* ---------- métricas ---------- */
  const allTasks = useMemo(() => {
    const list: { id: string; phaseIdx: number; taskIdx: number; phase: string; time: string; raw: string }[] = [];
    role.shiftRoutine.forEach((ph, pIdx) => {
      ph.tasks.forEach((t, tIdx) => {
        list.push({
          id: roleTaskId(role.id, pIdx, tIdx),
          phaseIdx: pIdx,
          taskIdx: tIdx,
          phase: ph.phase,
          time: ph.timeRange,
          raw: t,
        });
      });
    });
    return list;
  }, [role.id]);

  const doneCount = allTasks.filter((t) => taskState[t.id]?.status === 'concluido').length;
  const pct = allTasks.length ? Math.round((doneCount / allTasks.length) * 100) : 0;
  const epiDone = epiState.filter(Boolean).length;
  const epiReady = epiDone === role.requiredEpi.length && role.requiredEpi.length > 0;

  const assignedEmployee =
    allEmployees.find((e) => e.roleId === role.id && e.active !== false) ||
    (currentEmployee?.roleId === role.id ? currentEmployee : undefined);

  const cycle = (s?: RoleTaskState['status']): RoleTaskState['status'] =>
    s === 'pendente' || !s ? 'em_andamento' : s === 'em_andamento' ? 'concluido' : s === 'concluido' ? 'nao_conforme' : 'pendente';

  const toggle = (id: string) => {
    setTaskState((prev) => {
      const next = cycle(prev[id]?.status);
      return {
        ...prev,
        [id]: {
          ...prev[id],
          status: next,
          completedAt:
            next === 'concluido'
              ? `${nowTime()}${currentEmployee ? ` por ${currentEmployee.name.split(' ')[0]}` : ''}`
              : undefined,
        },
      };
    });
  };

  const setNote = (id: string, notes: string) =>
    setTaskState((prev) => ({ ...prev, [id]: { ...(prev[id] || { status: 'pendente' }), notes } }));

  const completePhase = (pIdx: number) => {
    setTaskState((prev) => {
      const next = { ...prev };
      allTasks
        .filter((t) => t.phaseIdx === pIdx)
        .forEach((t) => {
          next[t.id] = {
            ...next[t.id],
            status: 'concluido',
            completedAt: `${nowTime()}${currentEmployee ? ` por ${currentEmployee.name.split(' ')[0]}` : ''}`,
          };
        });
      return next;
    });
  };

  const copyReport = () => {
    let t = `${meta.icon} *POSTO: ${role.title.toUpperCase()}*\n`;
    t += `📅 ${new Date().toLocaleDateString('pt-BR')} • ${assignedEmployee?.name || currentEmployee?.name || 'Plantão'}\n`;
    t += `🦺 Paramentação: ${epiDone}/${role.requiredEpi.length} ${epiReady ? '✅' : '⚠️'}\n`;
    t += `📊 Rotina do turno: ${doneCount}/${allTasks.length} (${pct}%)\n\n`;
    role.shiftRoutine.forEach((ph, pIdx) => {
      const phDone = allTasks.filter((x) => x.phaseIdx === pIdx && taskState[x.id]?.status === 'concluido').length;
      const phTotal = allTasks.filter((x) => x.phaseIdx === pIdx).length;
      t += `*${ph.phase}* — ${phDone}/${phTotal}\n`;
      allTasks
        .filter((x) => x.phaseIdx === pIdx)
        .forEach((x) => {
          const st = taskState[x.id]?.status;
          const ic = st === 'concluido' ? '✅' : st === 'em_andamento' ? '🟡' : st === 'nao_conforme' ? '🔴' : '⬜';
          t += `${ic} ${splitTaskTime(x.raw).text}\n`;
        });
      t += `\n`;
    });
    t += `🏷️ _"Primeiro identificar, depois armazenar. Sem etiqueta = Sem uso."_`;
    navigator.clipboard.writeText(t);
    flash('Relatório do posto copiado para o WhatsApp.');
  };

  const isAux = role.id === 'auxiliar-cozinha';

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* ===== Seletor de cargo ===== */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-paper no-print">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-black text-stone-500 uppercase tracking-wider">
            Escolha o posto de trabalho
          </span>
          <span className="text-[11px] text-stone-400">Rotina oficial extraída do Dossiê Mestre §5</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {JOB_ROLES_DATA.map((r) => {
            const m = ROLE_STATION_META[r.id];
            const active = r.id === role.id;
            return (
              <button
                key={r.id}
                onClick={() => setRoleId(r.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  active
                    ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span className="text-base leading-none">{m?.icon}</span>
                <span>{m?.short || r.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {toast && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-md animate-slide-down no-print">
          <Check className="w-4 h-4" />
          {toast}
        </div>
      )}

      {/* ===== HERO do posto ===== */}
      <div className={`rounded-2xl overflow-hidden shadow-lg border border-stone-800 animate-slide-up`}>
        <div className={`bg-gradient-to-br ${meta.headerClass} text-white p-6 relative`}>
          <BrandWatermarkOverlay opacity={0.04} />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <CharacterAvatar id={assignedEmployee?.photoUrl || meta.avatarId} size="xl" customUrl={assignedEmployee?.photoUrl} />
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-white/15 text-white text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                    {role.cboCode}
                  </span>
                  <span className="bg-white/10 text-stone-200 text-[10px] px-2 py-0.5 rounded font-medium">
                    {meta.focusArea}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2">
                  <span>{meta.icon}</span> {role.title}
                </h1>
                <p className="text-xs text-stone-300">
                  Setor <strong>{role.department}</strong>
                </p>
                <p className="text-xs text-stone-300">
                  Reporta a <strong>{role.directSupervisor}</strong>
                  {role.subordinates && !role.subordinates.toLowerCase().includes('não') && (
                    <> • Coordena <strong>{role.subordinates}</strong></>
                  )}
                </p>
                <p className="text-xs text-stone-300">
                  Jornada: <strong>{role.workingShift}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 self-start lg:self-center">
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                <Gauge value={pct} label="" display={`${pct}%`} size={104} tone={gaugeTone(meta.accent)} sublabel={`${doneCount}/${allTasks.length}`} />
              </div>
              <div className="hidden sm:block">
                <BrandLogo variant="icon" size="sm" theme="white" />
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-4 bg-black/25 rounded-xl p-3.5 text-xs leading-relaxed text-stone-100 flex items-start gap-2">
            <Target className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white">Missão central do posto:</span> {role.summary}
            </div>
          </div>
        </div>

        {/* barra de ações */}
        <div className="bg-stone-900 px-4 py-3 flex flex-wrap items-center justify-between gap-2 no-print">
          <div className="flex items-center gap-2 text-xs text-stone-300">
            {assignedEmployee ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Operando: <strong className="text-white">{assignedEmployee.name}</strong>
              </>
            ) : (
              <span className="text-stone-400">Nenhum colaborador vinculado a este posto</span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={copyReport}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" /> Relatório do turno
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 px-3 py-1.5 rounded-lg font-bold text-xs border border-stone-700 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> Prancheta
            </button>
            {onOpenLoginModal && (
              <button
                onClick={onOpenLoginModal}
                className="text-xs font-bold text-stone-400 hover:text-white border border-stone-700 rounded-lg px-2.5 py-1.5 cursor-pointer"
              >
                Trocar operador
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ===== PARAMENTAÇÃO / EPI (portão de entrada) ===== */}
      <div
        className={`rounded-2xl border-2 p-5 transition-colors ${
          epiReady ? 'border-emerald-400 bg-emerald-50/60' : 'border-amber-300 bg-amber-50/50'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-black text-stone-900 uppercase tracking-wider flex items-center gap-2">
            <HardHat className="w-4 h-4 text-amber-600" />
            Antes de começar: paramentação obrigatória
          </h2>
          <span
            className={`text-[11px] font-black px-2.5 py-1 rounded-full ${
              epiReady ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
            }`}
          >
            {epiReady ? '✓ POSTO LIBERADO' : `${epiDone}/${role.requiredEpi.length} itens`}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {role.requiredEpi.map((epi, i) => (
            <button
              key={i}
              onClick={() => persistEpi(epiState.map((v, idx) => (idx === i ? !v : v)))}
              className={`text-left flex items-start gap-2.5 p-2.5 rounded-lg border text-xs transition-all cursor-pointer ${
                epiState[i] ? 'bg-white border-emerald-300' : 'bg-white/70 border-stone-200 hover:border-stone-300'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-md shrink-0 flex items-center justify-center mt-0.5 ${
                  epiState[i] ? 'bg-emerald-600 text-white' : 'border-2 border-stone-300'
                }`}
              >
                {epiState[i] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </span>
              <span className={epiState[i] ? 'text-stone-500 line-through' : 'text-stone-800 font-medium'}>{epi}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ===== LINHA DO TEMPO DO TURNO ===== */}
      <div className="space-y-4">
        <h2 className="text-sm font-black text-stone-900 uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-600" />
          Rotina do turno, passo a passo
        </h2>

        {role.shiftRoutine.map((phase, pIdx) => {
          const phaseTasks = allTasks.filter((t) => t.phaseIdx === pIdx);
          const phaseDone = phaseTasks.filter((t) => taskState[t.id]?.status === 'concluido').length;
          const phasePct = phaseTasks.length ? Math.round((phaseDone / phaseTasks.length) * 100) : 0;
          return (
            <div key={pIdx} className="bg-white border border-stone-200 rounded-2xl shadow-paper overflow-hidden page-break-inside-avoid">
              <div className="bg-stone-100 border-b border-stone-200 p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-stone-900 text-amber-300 font-black flex items-center justify-center">
                    {pIdx + 1}
                  </span>
                  <div>
                    <h3 className="font-black text-sm text-stone-900">{phase.phase}</h3>
                    <span className="text-[11px] text-stone-500 font-mono">{phase.timeRange}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-28 h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full bar-grow" style={{ width: `${phasePct}%` }} />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-stone-600">{phaseDone}/{phaseTasks.length}</span>
                  <button
                    onClick={() => completePhase(pIdx)}
                    className="text-[11px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer no-print"
                  >
                    Concluir fase
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-2">
                {phaseTasks.map((t) => {
                  const st = taskState[t.id]?.status || 'pendente';
                  const done = st === 'concluido';
                  const prog = st === 'em_andamento';
                  const nc = st === 'nao_conforme';
                  const { time, text } = splitTaskTime(t.raw);
                  return (
                    <div
                      key={t.id}
                      className={`rounded-xl border p-3 flex flex-col sm:flex-row sm:items-start gap-3 transition-colors ${
                        done
                          ? 'bg-emerald-50/50 border-emerald-300'
                          : prog
                            ? 'bg-amber-50/50 border-amber-300'
                            : nc
                              ? 'bg-rose-50/50 border-rose-300'
                              : 'bg-white border-stone-200'
                      }`}
                    >
                      <button
                        onClick={() => toggle(t.id)}
                        className="shrink-0 mt-0.5 active:scale-95 transition-transform cursor-pointer"
                        title="Pendente → Em andamento → Concluído → Não conforme"
                      >
                        {done ? (
                          <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center"><Check className="w-4 h-4 stroke-[3]" /></span>
                        ) : prog ? (
                          <span className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center"><Clock className="w-4 h-4" /></span>
                        ) : nc ? (
                          <span className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center"><AlertTriangle className="w-4 h-4" /></span>
                        ) : (
                          <span className="w-6 h-6 rounded-lg border-2 border-stone-300 block" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {time && (
                            <span className="bg-stone-900 text-amber-300 text-[10px] font-mono font-black px-1.5 py-0.5 rounded">
                              {time}
                            </span>
                          )}
                          {taskState[t.id]?.completedAt && (
                            <span className="text-[10px] text-emerald-800 font-mono font-bold flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {taskState[t.id]?.completedAt}
                            </span>
                          )}
                        </div>
                        <p className={`text-xs sm:text-sm font-semibold text-stone-900 mt-0.5 ${done ? 'line-through text-stone-500' : ''}`}>
                          {text}
                        </p>
                        <input
                          value={taskState[t.id]?.notes || ''}
                          onChange={(e) => setNote(t.id, e.target.value)}
                          placeholder="Observação (temperatura aferida, lote, ocorrência)…"
                          className="mt-1.5 w-full max-w-lg text-[11px] bg-stone-50 focus:bg-white border border-stone-200 focus:border-emerald-500 rounded px-2 py-1 focus:outline-hidden no-print"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== REFERÊNCIAS VISUAIS DA AUXILIAR ===== */}
      {isAux && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Rechaud 70C */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-paper">
            <h3 className="text-sm font-black text-stone-900 uppercase tracking-wider flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-rose-600" /> Rechaud — 6 cubas base
            </h3>
            <p className="text-[11px] text-stone-500 mb-3">
              Banho-maria sempre <strong className="text-rose-700">≥ 70&nbsp;°C</strong>. Repor antes do nível crítico.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {RECHAUD_CUBAS.map((c, i) => (
                <div key={c} className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-center">
                  <span className="block text-[10px] font-mono text-amber-700">Cuba {i + 1}</span>
                  <span className="text-xs font-bold text-stone-800">{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tábuas por cor */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-paper">
            <h3 className="text-sm font-black text-stone-900 uppercase tracking-wider flex items-center gap-2 mb-3">
              <span className="w-4 h-4 rounded bg-gradient-to-br from-green-500 via-red-500 to-blue-500" />
              Tábuas de corte por cor
            </h3>
            <div className="space-y-2">
              {TABUAS_CORES.map((t) => (
                <div key={t.cor} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg shrink-0 border border-black/10" style={{ background: t.hex }} />
                  <div>
                    <span className="text-xs font-bold text-stone-900">{t.cor}</span>
                    <p className="text-[11px] text-stone-500">{t.uso}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Etiqueta Universal */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-paper lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-black text-stone-900 uppercase tracking-wider flex items-center gap-2">
                <Tag className="w-4 h-4 text-blue-600" /> Etiqueta Universal — os 4 campos
              </h3>
              <IllustratedStamp type="ETIQUETA_OBRIGATORIA" size="sm" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ETIQUETA_CAMPOS.map((c, i) => (
                <div key={c.campo} className="bg-blue-50/60 border border-blue-200 rounded-lg p-3">
                  <span className="text-[10px] font-mono font-bold text-blue-700">Campo {i + 1}</span>
                  <p className="text-xs font-bold text-stone-900">{c.campo}</p>
                  <p className="text-[11px] text-stone-600 mt-0.5">{c.funcao}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => onNavigate?.('labels')}
              className="mt-3 text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer no-print"
            >
              Abrir gerador de etiquetas <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* ===== REGRAS DE OURO + PROIBIÇÕES ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5">
          <h3 className="font-black text-emerald-950 text-sm uppercase tracking-wider flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Regras de Ouro
          </h3>
          <ul className="space-y-2">
            {role.rulesOfGold.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-emerald-900 leading-relaxed">
                <span className="text-emerald-600 font-black shrink-0">✓</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-5">
          <h3 className="font-black text-rose-950 text-sm uppercase tracking-wider flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-rose-600" /> O que NUNCA fazer
          </h3>
          <ul className="space-y-2">
            {role.prohibitions.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-rose-900 leading-relaxed">
                <span className="text-rose-600 font-black shrink-0">🚫</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ===== MÉTRICAS + FERRAMENTAS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-paper">
          <h3 className="text-sm font-black text-stone-900 uppercase tracking-wider flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-emerald-600" /> Como o posto é avaliado
          </h3>
          <ul className="space-y-2">
            {role.performanceMetrics.map((m, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-stone-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                {m}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-paper">
          <h3 className="text-sm font-black text-stone-900 uppercase tracking-wider flex items-center gap-2 mb-3">
            <Wrench className="w-4 h-4 text-stone-600" /> Ferramentas e equipamentos
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {role.toolsAndEquipments.map((t, i) => (
              <span key={i} className={`text-[11px] px-2 py-1 rounded-lg border ${meta.chipClass}`}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* rodapé */}
      <div className="bg-stone-100 rounded-xl p-4 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>
            A rotina deste posto fica sincronizada com o módulo <strong>Checklists por Setor</strong> e alimenta o{' '}
            <strong>Painel do Dia 1</strong>.
          </span>
        </div>
        <IllustratedStamp type="PADRAO_PAI_DEGUA" size="sm" />
      </div>
    </div>
  );
};
