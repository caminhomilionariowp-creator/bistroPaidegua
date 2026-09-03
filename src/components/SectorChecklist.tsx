import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  AlertTriangle, 
  Printer, 
  RotateCcw, 
  Share2, 
  Plus, 
  Filter, 
  CheckSquare, 
  Square, 
  Sparkles,
  MessageSquare,
  FileSpreadsheet,
  Layers,
  ShieldCheck,
  Check,
  UserCheck,
  KeyRound,
  Briefcase,
  ChefHat,
  Award,
  ChevronRight,
  ListChecks,
  FileText,
  Copy,
  Info
} from 'lucide-react';
import { ChecklistItemData, ResponsibleLeader, EmployeeAccount } from '../types';
import { DEFAULT_CHECKLIST_ITEMS, saveChecklistItems } from '../data/checklistsData';
import { JOB_ROLES_DATA, JobRoleDescriptor } from '../data/jobRolesData';
import { loadEmployees } from '../data/teamData';
import { CharacterAvatar, IllustratedStamp } from './Characters';
import { BrandLogo, BrandWatermarkOverlay } from './BrandLogo';

interface SectorChecklistProps {
  items: ChecklistItemData[];
  onUpdateItems: (items: ChecklistItemData[]) => void;
  team: ResponsibleLeader[];
  onPrint?: () => void;
  currentEmployee?: EmployeeAccount;
  onOpenLoginModal?: () => void;
}

interface RoleTaskState {
  status: 'pendente' | 'em_andamento' | 'concluido' | 'nao_conforme';
  completedAt?: string;
  notes?: string;
}

const getRoleTasksStorageKey = (date: string) => `bistro_role_tasks_tracker_${date}`;

const loadRoleTasksState = (date: string): Record<string, RoleTaskState> => {
  try {
    const saved = localStorage.getItem(getRoleTasksStorageKey(date));
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading role tasks state', e);
  }
  return {};
};

const saveRoleTasksState = (date: string, state: Record<string, RoleTaskState>) => {
  try {
    localStorage.setItem(getRoleTasksStorageKey(date), JSON.stringify(state));
  } catch (e) {
    console.error('Error saving role tasks state', e);
  }
};

export const SectorChecklist: React.FC<SectorChecklistProps> = ({
  items,
  onUpdateItems,
  team,
  onPrint,
  currentEmployee,
  onOpenLoginModal
}) => {
  const isManager = !!(currentEmployee?.isManager || currentEmployee?.primarySector === 'gerencia');

  // Main view mode: 'sector_checklist' (standard sector items) vs 'role_tasks' (extracted role responsibilities)
  const [viewMode, setViewMode] = useState<'sector_checklist' | 'role_tasks'>('sector_checklist');

  // Selected Role ID for role tasks mode (defaults to Auxiliar de Cozinha or matching logged employee)
  const [selectedRoleId, setSelectedRoleId] = useState<string>(
    () => currentEmployee?.roleId || 'auxiliar-cozinha',
  );

  const [selectedRolePhase, setSelectedRolePhase] = useState<string>('todas');

  const [selectedSector, setSelectedSector] = useState<'todos' | 'cozinha' | 'estoque' | 'salao' | 'caixa' | 'limpeza'>(() => {
    if (currentEmployee && currentEmployee.primarySector !== 'gerencia') {
      return currentEmployee.primarySector;
    }
    return 'todos';
  });

  // When employee changes, focus on their sector and matching role
  useEffect(() => {
    if (currentEmployee && currentEmployee.primarySector !== 'gerencia') {
      setSelectedSector(currentEmployee.primarySector);
      if (currentEmployee.roleId) setSelectedRoleId(currentEmployee.roleId);
    }
  }, [currentEmployee?.id]);

  const [selectedShift, setSelectedShift] = useState<'todos' | 'abertura' | 'servico' | 'fechamento' | 'geral'>('todos');
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [activeTab, setActiveTab] = useState<'todos' | 'feitos' | 'faltando'>('todos');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Role tasks tracker state
  const [roleTasksState, setRoleTasksState] = useState<Record<string, RoleTaskState>>(() => 
    loadRoleTasksState(selectedDate)
  );

  // Reload role tasks when date changes
  useEffect(() => {
    setRoleTasksState(loadRoleTasksState(selectedDate));
  }, [selectedDate]);

  // Load all employees to show who is operating which role
  const [allEmployees] = useState<EmployeeAccount[]>(() => loadEmployees());

  // Filter items for sector view
  const filteredItems = items.filter(item => {
    if (selectedSector !== 'todos' && item.sector !== selectedSector) return false;
    if (selectedShift !== 'todos' && item.shift !== selectedShift) return false;
    if (activeTab === 'feitos' && item.status !== 'concluido') return false;
    if (activeTab === 'faltando' && item.status === 'concluido') return false;
    return true;
  });

  // Calculate sector stats
  const totalCount = items.length;
  const completedCount = items.filter(i => i.status === 'concluido').length;
  const pendingCount = items.filter(i => i.status === 'pendente').length;
  const inProgressCount = items.filter(i => i.status === 'em_andamento').length;
  const nonConformingCount = items.filter(i => i.status === 'nao_conforme').length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Sector specific stats for active filter
  const currentSectorItems = selectedSector === 'todos' ? items : items.filter(i => i.sector === selectedSector);
  const currentSectorCompleted = currentSectorItems.filter(i => i.status === 'concluido').length;
  const currentSectorPercent = currentSectorItems.length > 0 ? Math.round((currentSectorCompleted / currentSectorItems.length) * 100) : 0;

  // Find responsible leader for active sector
  const currentLeader = selectedSector === 'todos' 
    ? team.find(t => t.sectorId === 'gerencia') 
    : team.find(t => t.sectorId === selectedSector) || team[0];

  // Active role descriptor
  const activeRole: JobRoleDescriptor = JOB_ROLES_DATA.find(r => r.id === selectedRoleId) || JOB_ROLES_DATA[0];

  // Active assigned employee for active role
  const activeRoleEmployee =
    allEmployees.find(e => e.roleId === activeRole.id && e.active !== false) ||
    (currentEmployee?.roleId === activeRole.id ? currentEmployee : undefined);

  // Extract all routine tasks from current role
  interface ExtractedRoleTask {
    id: string;
    phase: string;
    timeRange: string;
    text: string;
    isKeyResponsibility?: boolean;
    phaseIdx: number;
    taskIdx: number;
  }

  const extractedRoleTasks: ExtractedRoleTask[] = [];

  activeRole.shiftRoutine.forEach((phaseObj, pIdx) => {
    phaseObj.tasks.forEach((taskText, tIdx) => {
      extractedRoleTasks.push({
        id: `rt_${activeRole.id}_p${pIdx}_t${tIdx}`,
        phase: phaseObj.phase,
        timeRange: phaseObj.timeRange,
        text: taskText,
        phaseIdx: pIdx,
        taskIdx: tIdx
      });
    });
  });

  // Calculate role tasks stats
  const roleTotalTasks = extractedRoleTasks.length;
  const roleCompletedTasks = extractedRoleTasks.filter(t => roleTasksState[t.id]?.status === 'concluido').length;
  const roleInProgressTasks = extractedRoleTasks.filter(t => roleTasksState[t.id]?.status === 'em_andamento').length;
  const rolePendingTasks = extractedRoleTasks.filter(t => !roleTasksState[t.id] || roleTasksState[t.id]?.status === 'pendente').length;
  const roleNonConformTasks = extractedRoleTasks.filter(t => roleTasksState[t.id]?.status === 'nao_conforme').length;
  const roleProgressPercent = roleTotalTasks > 0 ? Math.round((roleCompletedTasks / roleTotalTasks) * 100) : 0;

  // Filtered role tasks by selected phase
  const filteredRoleTasks = extractedRoleTasks.filter(t => {
    if (selectedRolePhase === 'todas') return true;
    return t.phase.toLowerCase().includes(selectedRolePhase.toLowerCase()) || 
           t.timeRange.toLowerCase().includes(selectedRolePhase.toLowerCase());
  });

  // Handle toggle role task status
  const handleToggleRoleTaskStatus = (taskId: string) => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const employeeSign = currentEmployee ? `por ${currentEmployee.name.split(' ')[0]}` : (activeRoleEmployee ? `por ${activeRoleEmployee.name.split(' ')[0]}` : '');

    const currentState = roleTasksState[taskId]?.status || 'pendente';
    let newStatus: RoleTaskState['status'] = 'pendente';
    let completedAt: string | undefined = undefined;

    if (currentState === 'pendente') {
      newStatus = 'em_andamento';
    } else if (currentState === 'em_andamento') {
      newStatus = 'concluido';
      completedAt = `${currentTime} ${employeeSign}`.trim();
    } else if (currentState === 'concluido') {
      newStatus = 'nao_conforme';
    } else {
      newStatus = 'pendente';
    }

    const updated = {
      ...roleTasksState,
      [taskId]: {
        ...roleTasksState[taskId],
        status: newStatus,
        completedAt: newStatus === 'concluido' ? completedAt : undefined
      }
    };

    setRoleTasksState(updated);
    saveRoleTasksState(selectedDate, updated);
  };

  const handleDirectRoleTaskStatus = (taskId: string, newStatus: RoleTaskState['status']) => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const employeeSign = currentEmployee ? `por ${currentEmployee.name.split(' ')[0]}` : (activeRoleEmployee ? `por ${activeRoleEmployee.name.split(' ')[0]}` : '');

    const updated = {
      ...roleTasksState,
      [taskId]: {
        ...roleTasksState[taskId],
        status: newStatus,
        completedAt: newStatus === 'concluido' ? `${currentTime} ${employeeSign}`.trim() : roleTasksState[taskId]?.completedAt
      }
    };

    setRoleTasksState(updated);
    saveRoleTasksState(selectedDate, updated);
  };

  const handleUpdateRoleTaskNotes = (taskId: string, notes: string) => {
    const updated = {
      ...roleTasksState,
      [taskId]: {
        ...(roleTasksState[taskId] || { status: 'pendente' }),
        notes
      }
    };
    setRoleTasksState(updated);
    saveRoleTasksState(selectedDate, updated);
  };

  const handleMarkAllPhaseCompleted = (phaseTasks: ExtractedRoleTask[]) => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const employeeSign = currentEmployee ? `por ${currentEmployee.name.split(' ')[0]}` : (activeRoleEmployee ? `por ${activeRoleEmployee.name.split(' ')[0]}` : '');

    const updated = { ...roleTasksState };
    phaseTasks.forEach(t => {
      updated[t.id] = {
        ...(updated[t.id] || {}),
        status: 'concluido',
        completedAt: `${currentTime} ${employeeSign}`.trim()
      };
    });

    setRoleTasksState(updated);
    saveRoleTasksState(selectedDate, updated);
  };

  const handleResetRoleTasksForShift = () => {
    if (window.confirm(`Deseja zerar as tarefas do cargo "${activeRole.title}" para a data ${selectedDate}?`)) {
      const updated = { ...roleTasksState };
      extractedRoleTasks.forEach(t => {
        delete updated[t.id];
      });
      setRoleTasksState(updated);
      saveRoleTasksState(selectedDate, updated);
    }
  };

  const handleCopyRoleWhatsAppReport = () => {
    const doneTasks = extractedRoleTasks.filter(t => roleTasksState[t.id]?.status === 'concluido');
    const pendingTasks = extractedRoleTasks.filter(t => roleTasksState[t.id]?.status !== 'concluido');

    let text = `👔 *ACOMPANHAMENTO DE ROTINA - CARGO: ${activeRole.title.toUpperCase()}*\n`;
    text += `📅 *Data:* ${selectedDate}\n`;
    text += `🏢 *Setor:* ${activeRole.department}\n`;
    text += `👤 *Operador(a):* ${activeRoleEmployee?.name || currentEmployee?.name || 'Equipe de Plantão'}\n`;
    text += `📊 *Progresso Geral do Cargo:* ${roleCompletedTasks}/${roleTotalTasks} (${roleProgressPercent}% Concluído)\n\n`;

    text += `✅ *TAREFAS CONCLUÍDAS (${doneTasks.length}):*\n`;
    if (doneTasks.length === 0) {
      text += `_Nenhuma tarefa marcada como concluída ainda neste turno._\n`;
    } else {
      doneTasks.forEach(t => {
        const timeInfo = roleTasksState[t.id]?.completedAt ? ` (${roleTasksState[t.id]?.completedAt})` : '';
        text += `• ${t.text}${timeInfo}\n`;
      });
    }

    text += `\n⏳ *TAREFAS PENDENTES / EM ANDAMENTO (${pendingTasks.length}):*\n`;
    if (pendingTasks.length === 0) {
      text += `_🎉 Todas as rotinas do cargo foram 100% cumpridas!_\n`;
    } else {
      pendingTasks.forEach(t => {
        const icon = roleTasksState[t.id]?.status === 'em_andamento' ? '🟡' : roleTasksState[t.id]?.status === 'nao_conforme' ? '🔴' : '⚪';
        text += `${icon} [${t.phase.split('(')[0].trim()}] ${t.text}\n`;
      });
    }

    text += `\n🏷️ _"Regra de Ouro: Primeiro identificar, depois armazenar. Sem etiqueta = Sem uso."_`;

    navigator.clipboard.writeText(text);
    setCopiedNotification(`Relatório de ${activeRole.title} copiado!`);
    setTimeout(() => setCopiedNotification(null), 3500);
  };

  const handleToggleStatus = (id: string) => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const employeeSign = currentEmployee ? `por ${currentEmployee.name.split(' ')[0]}` : '';

    const updated = items.map(item => {
      if (item.id === id) {
        if (item.status === 'pendente') {
          return { ...item, status: 'em_andamento' as const, completedAt: undefined };
        } else if (item.status === 'em_andamento') {
          return { ...item, status: 'concluido' as const, completedAt: `${currentTime} ${employeeSign}`.trim() };
        } else if (item.status === 'concluido') {
          return { ...item, status: 'nao_conforme' as const, completedAt: undefined };
        } else {
          return { ...item, status: 'pendente' as const, completedAt: undefined };
        }
      }
      return item;
    });

    onUpdateItems(updated);
    saveChecklistItems(updated);
  };

  const handleDirectStatus = (id: string, newStatus: ChecklistItemData['status']) => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const employeeSign = currentEmployee ? `por ${currentEmployee.name.split(' ')[0]}` : '';

    const updated = items.map(item => {
      if (item.id === id) {
        return { 
          ...item, 
          status: newStatus, 
          completedAt: newStatus === 'concluido' ? `${currentTime} ${employeeSign}`.trim() : item.completedAt 
        };
      }
      return item;
    });

    onUpdateItems(updated);
    saveChecklistItems(updated);
  };

  const handleUpdateNotes = (id: string, notes: string) => {
    const updated = items.map(item => {
      if (item.id === id) {
        return { ...item, notes };
      }
      return item;
    });
    onUpdateItems(updated);
    saveChecklistItems(updated);
  };

  const handleAddNewTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask: ChecklistItemData = {
      id: `chk-custom-${Date.now()}`,
      sector: selectedSector === 'todos' ? (currentEmployee?.primarySector || 'cozinha') : selectedSector,
      shift: selectedShift === 'todos' ? 'abertura' : selectedShift,
      title: newTaskTitle.trim(),
      description: `Tarefa adicional registrada por ${currentEmployee?.name || 'equipe'} para este turno.`,
      critical: false,
      status: 'pendente'
    };

    const updated = [newTask, ...items];
    onUpdateItems(updated);
    saveChecklistItems(updated);
    setNewTaskTitle('');
    setIsAddingTask(false);
  };

  const handleResetForNewShift = () => {
    if (window.confirm('Deseja zerar os checklists para iniciar um novo turno de trabalho?')) {
      const reset = items.map(item => ({
        ...item,
        status: 'pendente' as const,
        completedAt: undefined,
        notes: undefined
      }));
      onUpdateItems(reset);
      saveChecklistItems(reset);
    }
  };

  const handleCopyWhatsAppSummary = () => {
    const sectorName = selectedSector === 'todos' ? 'Geral de Todos os Setores' : selectedSector.toUpperCase();
    const doneItems = currentSectorItems.filter(i => i.status === 'concluido');
    const pendingItemsList = currentSectorItems.filter(i => i.status !== 'concluido');

    let text = `📋 *CHECKLIST DIÁRIO - BISTRÔ PAI D'ÉGUA*\n`;
    text += `📅 *Data:* ${selectedDate}\n`;
    text += `🏢 *Setor:* ${sectorName}\n`;
    text += `👤 *Responsável:* ${currentEmployee?.name || currentLeader?.name || 'Equipe'}\n`;
    text += `📊 *Progresso:* ${currentSectorCompleted}/${currentSectorItems.length} (${currentSectorPercent}% Concluído)\n\n`;

    text += `✅ *O QUE FOI FEITO (${doneItems.length}):*\n`;
    if (doneItems.length === 0) {
      text += `_Nenhum item marcado como concluído ainda._\n`;
    } else {
      doneItems.forEach(i => {
        text += `• ${i.title} (${i.completedAt || 'Feito'})\n`;
      });
    }

    text += `\n⏳ *O QUE FALTA (${pendingItemsList.length}):*\n`;
    if (pendingItemsList.length === 0) {
      text += `_🎉 Parabéns! Tudo 100% concluído neste setor._\n`;
    } else {
      pendingItemsList.forEach(i => {
        const icon = i.status === 'em_andamento' ? '🟡' : i.status === 'nao_conforme' ? '🔴' : '⚪';
        text += `${icon} ${i.title} [${i.shift.toUpperCase()}]\n`;
      });
    }

    text += `\n🏷️ _"Primeiro identificar, depois armazenar. Sem etiqueta = Sem uso."_`;

    navigator.clipboard.writeText(text);
    setCopiedNotification(`Relatório do Setor ${sectorName} copiado!`);
    setTimeout(() => setCopiedNotification(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Banner with Sector & Date Selector */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 text-white rounded-2xl p-6 shadow-lg space-y-6 border border-stone-800 relative overflow-hidden">
        <BrandWatermarkOverlay opacity={0.03} />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-stone-800 pb-5">
          <div className="flex items-start gap-4">
            <div className="bg-stone-900/90 p-2.5 rounded-xl border border-stone-800 hidden sm:flex items-center justify-center shrink-0">
              <BrandLogo variant="icon" size="sm" theme="white" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="bg-red-600 text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Auditoria Diária de Prancheta & Posto
                </span>
                <span className="text-stone-400 text-xs">• Padrão Oficial Bistrô Pai d'Égua</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2.5">
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                Checklist Operacional & Rotinas de Cargo
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
                Controle diário do que foi feito e do que falta por setor e acompanhamento passo a passo das rotinas da <strong>Auxiliar de Cozinha</strong> e dos demais cargos.
              </p>
            </div>
          </div>

          {/* Date Picker & Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5 self-end md:self-auto">
            <div className="flex items-center space-x-1.5 bg-stone-800 border border-stone-700 px-3 py-1.5 rounded-lg text-xs">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <input 
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-white font-bold focus:outline-hidden"
              />
              <button
                onClick={() => {
                  const today = new Date().toISOString().split('T')[0];
                  setSelectedDate(today);
                }}
                className="text-[10px] bg-stone-700 hover:bg-stone-600 text-emerald-300 font-semibold px-1.5 py-0.5 rounded ml-1 cursor-pointer"
              >
                Hoje
              </button>
            </div>

            <button
              onClick={viewMode === 'role_tasks' ? handleCopyRoleWhatsAppReport : handleCopyWhatsAppSummary}
              className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-lg font-bold text-xs shadow-sm transition-all cursor-pointer"
              title="Copiar relatório formatado para o grupo de WhatsApp da equipe"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Copiar p/ WhatsApp</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center space-x-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 px-3 py-2 rounded-lg font-bold text-xs border border-stone-700 transition-colors cursor-pointer"
              title="Imprimir prancheta de conferência física"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Imprimir Prancheta</span>
            </button>

            <button
              onClick={viewMode === 'role_tasks' ? handleResetRoleTasksForShift : handleResetForNewShift}
              className="flex items-center space-x-1.5 bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/60 px-3 py-2 rounded-lg font-bold text-xs transition-colors cursor-pointer"
              title="Zerar status para o próximo turno"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Novo Turno</span>
            </button>
          </div>
        </div>

        {/* Mode Switcher Tabs: Sector Checklist vs Role Tasks Sub-Section */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-stone-800/80">
          <button
            onClick={() => setViewMode('sector_checklist')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              viewMode === 'sector_checklist'
                ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/40'
                : 'bg-stone-800/90 text-stone-300 hover:bg-stone-700 hover:text-white border border-stone-700'
            }`}
          >
            <ListChecks className="w-4 h-4" />
            <span>📋 Checklists por Setor (POPs & F-01)</span>
          </button>

          <button
            onClick={() => setViewMode('role_tasks')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              viewMode === 'role_tasks'
                ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-400/40'
                : 'bg-stone-800/90 text-stone-300 hover:bg-stone-700 hover:text-white border border-stone-700'
            }`}
          >
            <Briefcase className="w-4 h-4 text-amber-300" />
            <span>👔 Tarefas & Rotinas por Cargo (Auxiliar de Cozinha, Chef...)</span>
            <span className="bg-amber-400/20 text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-black border border-amber-400/30">
              {JOB_ROLES_DATA.length} Cargos
            </span>
          </button>
        </div>

        {/* Progress Metric & Active Responsible / Employee Badge */}
        {viewMode === 'sector_checklist' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {/* Sector Progress Bar */}
            <div className="md:col-span-2 bg-stone-800/80 rounded-xl p-4 border border-stone-700/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Progresso do Setor ({currentSectorCompleted} de {currentSectorItems.length} tarefas)
                </span>
                <span className="font-mono font-black text-emerald-400 text-sm">{currentSectorPercent}% Concluído</span>
              </div>
              
              <div className="w-full bg-stone-900 rounded-full h-3 overflow-hidden p-0.5 border border-stone-700">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${currentSectorPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> {completedCount} Concluídas
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> {inProgressCount} Em Andamento
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-stone-500 inline-block" /> {pendingCount} Pendentes
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" /> {nonConformingCount} Não-Conformes
                </span>
              </div>
            </div>

            {/* Active Colaborador Authenticated Card */}
            {currentEmployee ? (
              <div className="bg-emerald-950/70 rounded-xl p-3.5 border border-emerald-700/80 flex items-center justify-between space-x-3 text-xs">
                <div className="flex items-center space-x-3 min-w-0">
                  <CharacterAvatar id={currentEmployee.photoUrl || 'chef_manel'} size="md" customUrl={currentEmployee.photoUrl} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                        Operador em Turno
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="font-bold text-stone-100 truncate">{currentEmployee.name}</div>
                    <div className="text-[11px] text-stone-300 truncate">{currentEmployee.role}</div>
                    <div className="text-[10px] text-emerald-300 font-mono mt-0.5">Posto: {currentEmployee.primarySector.toUpperCase()}</div>
                  </div>
                </div>

                {onOpenLoginModal && (
                  <button
                    onClick={onOpenLoginModal}
                    className="bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white px-2 py-1.5 rounded-lg border border-stone-700 text-[10px] font-bold flex flex-col items-center gap-0.5 cursor-pointer shrink-0"
                    title="Trocar operador do turno"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Trocar</span>
                  </button>
                )}
              </div>
            ) : currentLeader ? (
              <div className="bg-emerald-950/60 rounded-xl p-3.5 border border-emerald-800/80 flex items-center space-x-3 text-xs">
                <CharacterAvatar id={currentLeader.photoUrl || 'chef_manel'} size="md" customUrl={currentLeader.photoUrl} />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                    Líder do Setor
                  </span>
                  <div className="font-bold text-stone-100 truncate">{currentLeader.name}</div>
                  <div className="text-[11px] text-stone-400 truncate">{currentLeader.phone}</div>
                  <div className="text-[10px] text-emerald-300/80 font-mono mt-0.5">{currentLeader.shift}</div>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          /* Role Tasks Header Progress */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {/* Role Progress Bar */}
            <div className="md:col-span-2 bg-stone-800/80 rounded-xl p-4 border border-amber-600/40 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-200 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  Progresso do Cargo: <strong className="text-amber-300">{activeRole.title}</strong> ({roleCompletedTasks} de {roleTotalTasks} rotinas)
                </span>
                <span className="font-mono font-black text-amber-400 text-sm">{roleProgressPercent}% Concluído</span>
              </div>
              
              <div className="w-full bg-stone-900 rounded-full h-3 overflow-hidden p-0.5 border border-stone-700">
                <div 
                  className="bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${roleProgressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> {roleCompletedTasks} Concluídas
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> {roleInProgressTasks} Em Andamento
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-stone-500 inline-block" /> {rolePendingTasks} Pendentes
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" /> {roleNonConformTasks} Não-Conformes
                </span>
              </div>
            </div>

            {/* Assigned Worker Badge for Active Role */}
            <div className="bg-amber-950/60 rounded-xl p-3.5 border border-amber-600/50 flex items-center justify-between space-x-3 text-xs">
              <div className="flex items-center space-x-3 min-w-0">
                <CharacterAvatar 
                  id={activeRoleEmployee?.photoUrl || (activeRole.id === 'auxiliar-cozinha' ? 'dona_flor' : activeRole.id === 'cozinheiro-lider' ? 'chef_manel' : activeRole.id === 'estoquista-almoxarife' ? 'ze_estoque' : 'camila_caixa')} 
                  size="md" 
                  customUrl={activeRoleEmployee?.photoUrl} 
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                    {activeRole.id === 'auxiliar-cozinha' ? '⭐ Auxiliar Designada' : 'Operador Designado'}
                  </span>
                  <div className="font-bold text-stone-100 truncate">{activeRoleEmployee?.name || 'Plantão Operacional'}</div>
                  <div className="text-[11px] text-stone-300 truncate">{activeRoleEmployee?.role || activeRole.title}</div>
                  <div className="text-[10px] text-amber-300 font-mono mt-0.5">{activeRole.workingShift.split('(')[0]}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {copiedNotification && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between shadow-md animate-fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{copiedNotification}</span>
          </div>
          <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded">Copiado</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-SEÇÃO: TAREFAS & ROTINAS POR CARGO (EXTRAÇÃO AUTOMÁTICA DOS DESCRITIVOS) */}
      {/* ========================================================================= */}
      {viewMode === 'role_tasks' ? (
        <div className="space-y-6 animate-fade-in">
          
          {/* Role Selector Tabs */}
          <div className="bg-white rounded-xl border border-stone-300 p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-amber-600" /> Selecione o Cargo para Acompanhamento Diário:
              </span>
              <span className="text-[11px] text-stone-400">
                Rotinas extraídas automaticamente do Dossiê Master e Descritivos Oficiais
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {JOB_ROLES_DATA.map((role) => {
                const isSelected = selectedRoleId === role.id;
                const isAux = role.id === 'auxiliar-cozinha';

                return (
                  <button
                    key={role.id}
                    onClick={() => {
                      setSelectedRoleId(role.id);
                      setSelectedRolePhase('todas');
                    }}
                    className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-400'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200'
                    }`}
                  >
                    {isAux && <ChefHat className={`w-4 h-4 ${isSelected ? 'text-amber-200' : 'text-amber-600'}`} />}
                    {role.id === 'cozinheiro-lider' && <Award className={`w-4 h-4 ${isSelected ? 'text-emerald-200' : 'text-emerald-600'}`} />}
                    {role.id === 'estoquista-almoxarife' && <Layers className={`w-4 h-4 ${isSelected ? 'text-blue-200' : 'text-blue-600'}`} />}
                    {role.id === 'atendente-garcom' && <UserCheck className={`w-4 h-4 ${isSelected ? 'text-orange-200' : 'text-orange-600'}`} />}
                    {role.id === 'operador-caixa' && <ShieldCheck className={`w-4 h-4 ${isSelected ? 'text-teal-200' : 'text-teal-600'}`} />}
                    <span>{role.title}</span>
                    {isAux && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                        isSelected ? 'bg-amber-800 text-amber-100' : 'bg-amber-200 text-amber-900'
                      }`}>
                        Destaque
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Role Detail Hero Card */}
          <div className="bg-white border-2 border-stone-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 p-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-500 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider">
                    {activeRole.cboCode}
                  </span>
                  <span className="text-amber-300 text-xs font-mono">• Setor: {activeRole.department}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  {activeRole.title}
                </h2>
                <p className="text-xs text-stone-300">
                  Subordinação: <strong>{activeRole.directSupervisor}</strong> • Jornada: <strong>{activeRole.workingShift}</strong>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
                <button
                  onClick={() => handleMarkAllPhaseCompleted(filteredRoleTasks)}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors flex items-center space-x-1.5 shadow-xs cursor-pointer"
                  title="Concluir todas as tarefas exibidas nesta fase"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Marcar Fase Concluída</span>
                </button>
              </div>
            </div>

            {/* Mission Statement Box */}
            <div className="p-4 bg-amber-50/70 border-b border-amber-200/80 flex items-start space-x-3 text-xs">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold text-amber-950 block">Missão Central do Posto de Trabalho:</span>
                <p className="text-amber-900 leading-relaxed">{activeRole.summary}</p>
              </div>
            </div>

            {/* Phase Filters */}
            <div className="p-4 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-bold text-stone-500 uppercase tracking-wider text-[11px] mr-1">Fase do Turno:</span>
                <button
                  onClick={() => setSelectedRolePhase('todas')}
                  className={`px-3 py-1.5 rounded-md font-bold text-xs transition-colors cursor-pointer ${
                    selectedRolePhase === 'todas'
                      ? 'bg-stone-800 text-white'
                      : 'bg-white hover:bg-stone-200 text-stone-700 border border-stone-200'
                  }`}
                >
                  Todas as Fases ({extractedRoleTasks.length})
                </button>
                {activeRole.shiftRoutine.map((phase, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedRolePhase(phase.phase.split('(')[0].trim())}
                    className={`px-3 py-1.5 rounded-md font-bold text-xs transition-colors cursor-pointer ${
                      selectedRolePhase === phase.phase.split('(')[0].trim()
                        ? 'bg-amber-600 text-white'
                        : 'bg-white hover:bg-stone-200 text-stone-700 border border-stone-200'
                    }`}
                  >
                    {phase.phase.split('(')[0].trim()} ({phase.tasks.length})
                  </button>
                ))}
              </div>

              <div className="text-[11px] text-stone-500 font-mono">
                {roleCompletedTasks} de {roleTotalTasks} cumpridas ({roleProgressPercent}%)
              </div>
            </div>

            {/* Task List Grouped by Phases */}
            <div className="p-5 space-y-6">
              {activeRole.shiftRoutine.map((phaseObj, pIdx) => {
                const phaseTasks = extractedRoleTasks.filter(t => t.phaseIdx === pIdx);
                const isVisible = selectedRolePhase === 'todas' || phaseObj.phase.toLowerCase().includes(selectedRolePhase.toLowerCase());

                if (!isVisible) return null;

                const phaseCompleted = phaseTasks.filter(t => roleTasksState[t.id]?.status === 'concluido').length;

                return (
                  <div key={pIdx} className="space-y-3">
                    {/* Phase Header */}
                    <div className="bg-stone-100 rounded-lg p-3 border border-stone-300 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
                          {pIdx + 1}
                        </span>
                        <div>
                          <h3 className="font-extrabold text-stone-900 text-xs sm:text-sm">{phaseObj.phase}</h3>
                          <span className="text-[11px] text-stone-500 font-mono">{phaseObj.timeRange}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] font-mono text-stone-600 font-bold">
                          {phaseCompleted}/{phaseTasks.length} concluídas
                        </span>
                        <button
                          onClick={() => handleMarkAllPhaseCompleted(phaseTasks)}
                          className="text-[11px] bg-white hover:bg-stone-200 text-stone-800 font-bold px-2 py-1 rounded border border-stone-300 transition-colors cursor-pointer"
                        >
                          Concluir Esta Fase
                        </button>
                      </div>
                    </div>

                    {/* Task Rows */}
                    <div className="space-y-2">
                      {phaseTasks.map((task) => {
                        const taskState = roleTasksState[task.id] || { status: 'pendente' };
                        const isDone = taskState.status === 'concluido';
                        const isInProgress = taskState.status === 'em_andamento';
                        const isNonConform = taskState.status === 'nao_conforme';

                        // Extract time prefix if any (e.g. "07h00:")
                        const timeMatch = task.text.match(/^(\d{2}h\d{2}):?\s*(.*)$/);
                        const timeBadge = timeMatch ? timeMatch[1] : null;
                        const cleanText = timeMatch ? timeMatch[2] : task.text;

                        return (
                          <div 
                            key={task.id}
                            className={`rounded-xl border p-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 transition-all ${
                              isDone 
                                ? 'bg-emerald-50/40 border-emerald-300' 
                                : isInProgress 
                                  ? 'bg-amber-50/40 border-amber-300' 
                                  : isNonConform 
                                    ? 'bg-rose-50/40 border-rose-300' 
                                    : 'bg-white border-stone-200 hover:border-stone-300'
                            }`}
                          >
                            {/* Left Checkbox & Description */}
                            <div className="flex items-start space-x-3 flex-1 min-w-0">
                              <button
                                onClick={() => handleToggleRoleTaskStatus(task.id)}
                                className={`mt-0.5 shrink-0 transition-transform active:scale-95 cursor-pointer ${
                                  isDone 
                                    ? 'text-emerald-600' 
                                    : isInProgress 
                                      ? 'text-amber-500' 
                                      : isNonConform 
                                        ? 'text-rose-600' 
                                        : 'text-stone-300 hover:text-stone-500'
                                }`}
                                title="Clique para alternar: Pendente ➔ Em Andamento ➔ Concluído ➔ Não Conforme"
                              >
                                {isDone ? (
                                  <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                                    <Check className="w-4 h-4 stroke-[3]" />
                                  </div>
                                ) : isInProgress ? (
                                  <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
                                    <Clock className="w-4 h-4" />
                                  </div>
                                ) : isNonConform ? (
                                  <div className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center shadow-xs">
                                    <AlertTriangle className="w-4 h-4" />
                                  </div>
                                ) : (
                                  <div className="w-6 h-6 rounded-lg border-2 border-stone-300 hover:border-stone-500 bg-white" />
                                )}
                              </button>

                              <div className="space-y-1 min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-1.5">
                                  {timeBadge && (
                                    <span className="bg-stone-900 text-amber-300 text-[10px] font-mono font-black px-2 py-0.5 rounded">
                                      {timeBadge}
                                    </span>
                                  )}
                                  <span className="text-[10px] text-stone-500 font-medium bg-stone-100 px-1.5 py-0.5 rounded capitalize">
                                    {phaseObj.phase.split('(')[0].trim()}
                                  </span>
                                  {taskState.completedAt && (
                                    <span className="text-[10px] text-emerald-800 font-mono font-bold flex items-center gap-1 ml-auto">
                                      <Clock className="w-3 h-3 text-emerald-600" /> {taskState.completedAt}
                                    </span>
                                  )}
                                </div>

                                <p className={`text-xs sm:text-sm font-semibold text-stone-900 leading-relaxed ${isDone ? 'line-through text-stone-500' : ''}`}>
                                  {cleanText}
                                </p>

                                {/* Optional observation field */}
                                <div className="pt-1">
                                  <input 
                                    type="text" 
                                    placeholder="Observação da tarefa (temperatura aferida, lote, ocorrência)..."
                                    value={taskState.notes || ''}
                                    onChange={(e) => handleUpdateRoleTaskNotes(task.id, e.target.value)}
                                    className="text-[11px] bg-stone-50 hover:bg-white focus:bg-white text-stone-700 px-2 py-1 rounded border border-stone-200 focus:border-amber-500 focus:outline-hidden w-full max-w-lg transition-colors"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Right Status Actions */}
                            <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center pl-9 md:pl-0">
                              <button
                                onClick={() => handleDirectRoleTaskStatus(task.id, 'concluido')}
                                className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                                  isDone ? 'bg-emerald-600 text-white shadow-xs' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                                }`}
                              >
                                ✓ Concluído
                              </button>
                              <button
                                onClick={() => handleDirectRoleTaskStatus(task.id, 'em_andamento')}
                                className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                                  isInProgress ? 'bg-amber-500 text-white shadow-xs' : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                                }`}
                              >
                                ⏳ Em Andamento
                              </button>
                              <button
                                onClick={() => handleDirectRoleTaskStatus(task.id, 'pendente')}
                                className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                                  !isDone && !isInProgress && !isNonConform ? 'bg-stone-700 text-white shadow-xs' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                }`}
                              >
                                Pendente
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Supplementary Role Cards: Regras de Ouro, Proibições, EPIs */}
            <div className="p-5 bg-stone-50 border-t border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Regras de Ouro */}
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 space-y-2">
                <h4 className="font-black text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Regras de Ouro do {activeRole.title}
                </h4>
                <ul className="space-y-1.5 text-[11px] text-emerald-900">
                  {activeRole.rulesOfGold.map((rule, rIdx) => (
                    <li key={rIdx} className="flex items-start space-x-1.5">
                      <span className="text-emerald-700 font-bold shrink-0">✓</span>
                      <span className="leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limites Críticos / O que NUNCA fazer */}
              <div className="bg-rose-50 border border-rose-300 rounded-xl p-4 space-y-2">
                <h4 className="font-black text-rose-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Limites Críticos (O que NUNCA Fazer)
                </h4>
                <ul className="space-y-1.5 text-[11px] text-rose-900">
                  {activeRole.prohibitions.map((prohib, pIdx) => (
                    <li key={pIdx} className="flex items-start space-x-1.5">
                      <span className="text-rose-600 font-bold shrink-0">🚫</span>
                      <span className="leading-relaxed">{prohib}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* ========================================================================= */
        /* CHECKLIST OPERACIONAL POR SETOR (STANDARD VIEW)                            */
        /* ========================================================================= */
        <div className="space-y-6 animate-fade-in">
          
          {/* Quick Notice Banner Linking to Role Tasks */}
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-950">
            <div className="flex items-center space-x-2.5">
              <ChefHat className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <span className="font-bold block">Acompanhamento Específico por Cargo:</span>
                <span>Deseja auditar o passo a passo da <strong>Auxiliar de Cozinha</strong> ou dos outros 4 cargos cadastrados?</span>
              </div>
            </div>
            <button
              onClick={() => {
                setViewMode('role_tasks');
                if (selectedSector === 'cozinha') setSelectedRoleId('auxiliar-cozinha');
                else if (selectedSector === 'estoque') setSelectedRoleId('estoquista-almoxarife');
                else if (selectedSector === 'salao') setSelectedRoleId('atendente-garcom');
                else if (selectedSector === 'caixa') setSelectedRoleId('operador-caixa');
              }}
              className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg text-xs transition-colors flex items-center space-x-1 shrink-0 cursor-pointer shadow-xs"
            >
              <span>Ver Rotinas do Cargo</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Filter Tabs: Sector & Shift & Done/Pending */}
          <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm space-y-3">
            {/* Sector Buttons — só o gestor/gerência vê e troca de setor */}
            {isManager ? (
            <div className="flex items-center space-x-2 overflow-x-auto pb-1">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Setor:
              </span>
              {[
                { id: 'todos', label: 'Todos os Setores' },
                { id: 'cozinha', label: '🍳 Cozinha & Pré-Preparo' },
                { id: 'estoque', label: '📦 Estoque & Compras' },
                { id: 'salao', label: '🍽️ Salão & Atendimento' },
                { id: 'caixa', label: '💵 Caixa & Fechamento' },
                { id: 'limpeza', label: '🧹 Higiene & Limpeza' }
              ].map((sec) => {
                const isEmpPrimary = currentEmployee?.primarySector === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setSelectedSector(sec.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedSector === sec.id
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    <span>{sec.label}</span>
                    {isEmpPrimary && (
                      <span className="text-[9px] bg-emerald-900 text-emerald-200 px-1 py-0.2 rounded font-mono">
                        MEU SETOR
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            ) : (
              <div className="flex items-center gap-2 text-xs bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                <Filter className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="font-bold text-emerald-900">
                  Seu setor: {selectedSector.toUpperCase()}
                </span>
                <span className="text-emerald-700">— você vê só o checklist deste setor.</span>
              </div>
            )}

            {/* Shift Buttons & Status Filter Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100 text-xs">
              {/* Shift Filter */}
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-stone-500 uppercase tracking-wider text-[11px] mr-1">Turno:</span>
                {[
                  { id: 'todos', label: 'Todos os Turnos' },
                  { id: 'abertura', label: 'Abertura (Manhã)' },
                  { id: 'servico', label: 'Serviço (Pico)' },
                  { id: 'fechamento', label: 'Fechamento (Noite)' },
                  { id: 'geral', label: 'Geral Diário' }
                ].map((sh) => (
                  <button
                    key={sh.id}
                    onClick={() => setSelectedShift(sh.id as any)}
                    className={`px-2.5 py-1 rounded-md font-semibold text-xs transition-colors cursor-pointer ${
                      selectedShift === sh.id
                        ? 'bg-stone-800 text-white'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {sh.label}
                  </button>
                ))}
              </div>

              {/* Status Tabs (O que foi feito vs O que falta) */}
              <div className="flex items-center space-x-1 bg-stone-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('todos')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'todos' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                  }`}
                >
                  Todos ({currentSectorItems.length})
                </button>
                <button
                  onClick={() => setActiveTab('feitos')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                    activeTab === 'feitos' ? 'bg-emerald-600 text-white shadow-xs' : 'text-stone-600 hover:text-emerald-700'
                  }`}
                >
                  <span>Feitos</span>
                  <span className="bg-emerald-800 text-emerald-100 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                    {currentSectorCompleted}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('faltando')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                    activeTab === 'faltando' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-600 hover:text-amber-700'
                  }`}
                >
                  <span>Faltando</span>
                  <span className="bg-amber-800 text-amber-100 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                    {currentSectorItems.length - currentSectorCompleted}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {/* Quick Add Custom Task Bar */}
            {isAddingTask ? (
              <div className="bg-emerald-50 border-2 border-emerald-400 rounded-xl p-4 space-y-3 shadow-sm animate-fade-in">
                <span className="font-bold text-xs text-emerald-950 uppercase tracking-wider block">
                  + Adicionar Nova Tarefa de Checklist ({selectedSector.toUpperCase()})
                </span>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    placeholder="Ex: Verificar vedação da borracha do freezer horizontal..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddNewTask()}
                    className="flex-1 p-2 text-xs border border-emerald-300 rounded-lg bg-white font-medium focus:border-emerald-600 focus:outline-hidden"
                    autoFocus
                  />
                  <button
                    onClick={handleAddNewTask}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm cursor-pointer"
                  >
                    Salvar Tarefa
                  </button>
                  <button
                    onClick={() => { setIsAddingTask(false); setNewTaskTitle(''); }}
                    className="bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs px-3 py-2 rounded-lg cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-end">
                <button
                  onClick={() => setIsAddingTask(true)}
                  className="flex items-center space-x-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-100/80 hover:bg-emerald-200 px-3.5 py-2 rounded-lg border border-emerald-300 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Tarefa Customizada</span>
                </button>
              </div>
            )}

            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-xl border border-stone-200 p-12 text-center text-stone-500 space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto opacity-70" />
                <h3 className="font-bold text-stone-800 text-sm">Nenhuma tarefa encontrada neste filtro!</h3>
                <p className="text-xs text-stone-400">
                  {activeTab === 'faltando' ? 'Todas as tarefas deste filtro já foram concluídas! 🚀' : 'Altere o filtro de setor ou turno acima.'}
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredItems.map((item) => {
                  const isDone = item.status === 'concluido';
                  const isInProgress = item.status === 'em_andamento';
                  const isNonConform = item.status === 'nao_conforme';

                  return (
                    <div 
                      key={item.id}
                      className={`bg-white rounded-xl border transition-all shadow-xs p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 ${
                        isDone 
                          ? 'border-emerald-300 bg-emerald-50/30' 
                          : isInProgress 
                            ? 'border-amber-300 bg-amber-50/30' 
                            : isNonConform 
                              ? 'border-rose-400 bg-rose-50/40' 
                              : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      {/* Left: Checkbox & Info */}
                      <div className="flex items-start space-x-3.5 flex-1 min-w-0">
                        <button
                          onClick={() => handleToggleStatus(item.id)}
                          className={`mt-0.5 shrink-0 transition-transform active:scale-95 cursor-pointer ${
                            isDone 
                              ? 'text-emerald-600' 
                              : isInProgress 
                                ? 'text-amber-500' 
                                : isNonConform 
                                  ? 'text-rose-600' 
                                  : 'text-stone-300 hover:text-stone-500'
                          }`}
                          title="Clique para alternar status: Pendente ➔ Em Andamento ➔ Concluído ➔ Não Conforme"
                        >
                          {isDone ? (
                            <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                          ) : isInProgress ? (
                            <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
                              <Clock className="w-4 h-4" />
                            </div>
                          ) : isNonConform ? (
                            <div className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center shadow-xs">
                              <AlertTriangle className="w-4 h-4" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-lg border-2 border-stone-300 hover:border-stone-500 bg-white" />
                          )}
                        </button>

                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                              item.sector === 'cozinha' ? 'bg-emerald-100 text-emerald-900' :
                              item.sector === 'estoque' ? 'bg-amber-100 text-amber-900' :
                              item.sector === 'salao' ? 'bg-rose-100 text-rose-900' :
                              item.sector === 'caixa' ? 'bg-blue-100 text-blue-900' :
                              'bg-stone-100 text-stone-800'
                            }`}>
                              {item.sector}
                            </span>

                            <span className="text-[10px] text-stone-500 font-medium bg-stone-100 px-1.5 py-0.5 rounded capitalize">
                              {item.shift}
                            </span>

                            {item.critical && (
                              <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.5 rounded border border-rose-300 flex items-center gap-1">
                                <AlertTriangle className="w-2.5 h-2.5" /> Ponto Crítico
                              </span>
                            )}

                            {item.completedAt && (
                              <span className="text-[10px] text-emerald-800 font-mono font-bold flex items-center gap-1 ml-auto">
                                <Clock className="w-3 h-3 text-emerald-600" /> {item.completedAt}
                              </span>
                            )}
                          </div>

                          <h4 className={`font-bold text-xs sm:text-sm text-stone-900 ${isDone ? 'line-through text-stone-500' : ''}`}>
                            {item.title}
                          </h4>

                          <p className="text-[11px] text-stone-500 leading-relaxed">
                            {item.description}
                          </p>

                          {/* Optional Notes / Observations field */}
                          <div className="pt-1">
                            <input 
                              type="text" 
                              placeholder="Adicionar observação ou número de lote..."
                              value={item.notes || ''}
                              onChange={(e) => handleUpdateNotes(item.id, e.target.value)}
                              className="text-[11px] bg-stone-50 hover:bg-white focus:bg-white text-stone-700 px-2 py-1 rounded border border-stone-200 focus:border-emerald-500 focus:outline-hidden w-full max-w-lg transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right: Quick Status Chips */}
                      <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center pl-9 md:pl-0">
                        <button
                          onClick={() => handleDirectStatus(item.id, 'concluido')}
                          className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                            isDone ? 'bg-emerald-600 text-white shadow-xs' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                          }`}
                        >
                          ✓ Concluído
                        </button>
                        <button
                          onClick={() => handleDirectStatus(item.id, 'em_andamento')}
                          className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                            isInProgress ? 'bg-amber-500 text-white shadow-xs' : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                          }`}
                        >
                          ⏳ Em Andamento
                        </button>
                        <button
                          onClick={() => handleDirectStatus(item.id, 'pendente')}
                          className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                            !isDone && !isInProgress && !isNonConform ? 'bg-stone-700 text-white shadow-xs' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                          }`}
                        >
                          Pendente
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Prancheta Footer Guidance */}
      <div className="bg-stone-100 rounded-xl p-4 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
          <div>
            <span className="font-bold text-stone-900 block">Padrão de Fechamento de Prancheta & Governança:</span>
            <span>O checklist do turno é assinado pelo Líder e arquivado na pasta de governança do Bistrô Pai d'Égua.</span>
          </div>
        </div>
        <IllustratedStamp type="ETIQUETA_OBRIGATORIA" size="sm" />
      </div>

    </div>
  );
};

