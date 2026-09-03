import React, { useState } from 'react';
import { 
  Lock, 
  KeyRound, 
  UserCheck, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ChefHat, 
  Users, 
  Sparkles,
  ArrowRight,
  Fingerprint,
  Delete
} from 'lucide-react';
import { EmployeeAccount } from '../types';
import { CharacterAvatar } from './Characters';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  employees: EmployeeAccount[];
  currentEmployee: EmployeeAccount;
  onSelectEmployee: (employee: EmployeeAccount) => void;
  onOpenTeamManagement?: () => void;
  onLogout?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  employees,
  currentEmployee,
  onSelectEmployee,
  onOpenTeamManagement,
  onLogout
}) => {
  const [selectedTarget, setSelectedTarget] = useState<EmployeeAccount | null>(null);
  const [pinInput, setPinInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sectorFilter, setSectorFilter] = useState<'todos' | 'cozinha' | 'estoque' | 'salao' | 'caixa' | 'gerencia'>('todos');

  if (!isOpen) return null;

  const filteredEmployees = employees.filter(emp => {
    if (sectorFilter === 'todos') return true;
    return emp.primarySector === sectorFilter || emp.allowedSectors.includes(sectorFilter);
  });

  const handleSelectCard = (emp: EmployeeAccount) => {
    setSelectedTarget(emp);
    setPinInput('');
    setErrorMsg(null);
  };

  const handleKeypadPress = (num: string) => {
    if (pinInput.length < 4) {
      const nextPin = pinInput + num;
      setPinInput(nextPin);
      setErrorMsg(null);

      // Auto-validate on 4th digit
      if (nextPin.length === 4 && selectedTarget) {
        if (nextPin === selectedTarget.pin) {
          onSelectEmployee(selectedTarget);
          onClose();
        } else {
          setErrorMsg('PIN incorreto! Tente novamente ou use o PIN de demonstração.');
        }
      }
    }
  };

  const handleBackspace = () => {
    setPinInput(prev => prev.slice(0, -1));
    setErrorMsg(null);
  };

  const handleDirectQuickLogin = (emp: EmployeeAccount) => {
    onSelectEmployee(emp);
    onClose();
  };

  const handleConfirmPin = () => {
    if (!selectedTarget) return;
    if (pinInput === selectedTarget.pin) {
      onSelectEmployee(selectedTarget);
      onClose();
    } else {
      setErrorMsg('PIN incorreto! Tente novamente ou use o PIN cadastrado.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl border-2 border-stone-800 max-w-3xl w-full overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-stone-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-inner">
              <KeyRound className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight">
                  Acesso aos Postos de Trabalho
                </h2>
                <span className="bg-emerald-900/80 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-700">
                  Autenticação por Setor
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Selecione o funcionário para acessar seu setor (Cozinha, Estoque, Salão, Caixa ou Diretoria).
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {/* Sector Filter Chips */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0 mr-1">
              Filtrar Setor:
            </span>
            {[
              { id: 'todos', label: 'Todos os Colaboradores' },
              { id: 'cozinha', label: '🍳 Cozinha' },
              { id: 'estoque', label: '📦 Estoque' },
              { id: 'salao', label: '🍽️ Salão' },
              { id: 'caixa', label: '💵 Caixa' },
              { id: 'gerencia', label: '⭐ Diretoria' },
            ].map((sec) => (
              <button
                key={sec.id}
                onClick={() => { setSectorFilter(sec.id as any); setSelectedTarget(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  sectorFilter === sec.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>

          {/* Grid Layout: Left List of Employees, Right PIN Pad (if selected) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* Left: Employee Cards */}
            <div className={`${selectedTarget ? 'md:col-span-7' : 'md:col-span-12'} space-y-2.5`}>
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center justify-between">
                <span>Clique para selecionar o colaborador:</span>
                <span className="text-stone-400 font-normal">{filteredEmployees.length} ativos</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                {filteredEmployees.map((emp) => {
                  const isSelected = selectedTarget?.id === emp.id;
                  const isCurrent = currentEmployee.id === emp.id;

                  return (
                    <div
                      key={emp.id}
                      onClick={() => handleSelectCard(emp)}
                      className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex items-start space-x-3 relative ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/80 shadow-md ring-2 ring-emerald-300'
                          : isCurrent
                            ? 'border-emerald-300 bg-emerald-50/30 hover:border-emerald-400'
                            : 'border-stone-200 hover:border-stone-400 bg-white hover:bg-stone-50/80'
                      }`}
                    >
                      {/* Avatar */}
                      <div className="shrink-0 relative mt-0.5">
                        <CharacterAvatar id={emp.photoUrl} size="md" customUrl={emp.photoUrl} />
                        {isCurrent && (
                          <span className="absolute -top-1 -right-1 bg-emerald-600 text-white p-0.5 rounded-full shadow-xs" title="Perfil Atual Ativo">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-black text-xs text-stone-900 truncate">
                            {emp.name}
                          </span>
                          <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase shrink-0 ${
                            emp.primarySector === 'cozinha' ? 'bg-emerald-100 text-emerald-900' :
                            emp.primarySector === 'estoque' ? 'bg-amber-100 text-amber-900' :
                            emp.primarySector === 'salao' ? 'bg-rose-100 text-rose-900' :
                            emp.primarySector === 'caixa' ? 'bg-blue-100 text-blue-900' :
                            'bg-stone-900 text-amber-300'
                          }`}>
                            {emp.primarySector}
                          </span>
                        </div>

                        <p className="text-[11px] text-stone-600 truncate font-medium">
                          {emp.role}
                        </p>

                        <div className="flex items-center justify-between text-[10px] text-stone-500 pt-0.5 font-mono">
                          <span>Crachá: {emp.badgeNumber}</span>
                          <span className="text-emerald-700 font-bold">PIN: {emp.pin}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Tactile PIN Keypad Area */}
            {selectedTarget && (
              <div className="md:col-span-5 bg-stone-50 rounded-2xl border-2 border-stone-300 p-4 flex flex-col justify-between space-y-3 animate-fade-in shadow-xs">
                
                {/* Selected Employee summary */}
                <div className="text-center space-y-1">
                  <div className="inline-block relative">
                    <CharacterAvatar id={selectedTarget.photoUrl} size="md" customUrl={selectedTarget.photoUrl} />
                    <span className="absolute -bottom-1 -right-1 bg-stone-900 text-emerald-400 p-1 rounded-full text-[9px]">
                      <Fingerprint className="w-3 h-3" />
                    </span>
                  </div>
                  <h3 className="font-black text-stone-900 text-sm">{selectedTarget.name}</h3>
                  <div className="text-[11px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full inline-block">
                    Setor: {selectedTarget.primarySector.toUpperCase()}
                  </div>
                  <p className="text-[10px] text-stone-500">
                    Digite o PIN de 4 dígitos (Sugestão: <strong className="font-mono text-stone-900">{selectedTarget.pin}</strong>)
                  </p>
                </div>

                {/* PIN Dots display */}
                <div className="flex justify-center space-x-3 my-1">
                  {[0, 1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className={`w-4 h-4 rounded-full border-2 transition-all ${
                        pinInput.length > idx
                          ? 'bg-emerald-600 border-emerald-700 scale-110 shadow-xs'
                          : 'border-stone-300 bg-white'
                      }`}
                    />
                  ))}
                </div>

                {errorMsg && (
                  <div className="text-rose-600 font-bold text-[11px] text-center bg-rose-50 border border-rose-200 p-1.5 rounded-lg flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Number Keypad */}
                <div className="grid grid-cols-3 gap-1.5 max-w-[200px] mx-auto w-full">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleKeypadPress(num)}
                      className="h-10 rounded-xl bg-white hover:bg-emerald-50 active:bg-emerald-200 border border-stone-300 hover:border-emerald-500 text-stone-900 font-mono font-black text-base shadow-2xs transition-all active:scale-95 cursor-pointer"
                    >
                      {num}
                    </button>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => setPinInput('')}
                    className="h-10 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 text-[10px] font-bold shadow-2xs transition-all cursor-pointer"
                  >
                    Limpar
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleKeypadPress('0')}
                    className="h-10 rounded-xl bg-white hover:bg-emerald-50 active:bg-emerald-200 border border-stone-300 hover:border-emerald-500 text-stone-900 font-mono font-black text-base shadow-2xs transition-all active:scale-95 cursor-pointer"
                  >
                    0
                  </button>

                  <button
                    type="button"
                    onClick={handleBackspace}
                    className="h-10 rounded-xl bg-stone-200 hover:bg-rose-100 hover:text-rose-700 text-stone-700 flex items-center justify-center shadow-2xs transition-all cursor-pointer"
                    title="Apagar dígito"
                  >
                    <Delete className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-2 border-t border-stone-200 text-center text-[11px] text-stone-500">
                  Digite os 4 dígitos do PIN para confirmar.
                </div>

              </div>
            )}

          </div>

        </div>

        {/* Footer */}
        <div className="p-3.5 bg-stone-100 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-600">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="text-[11px]">
              O perfil autenticado personaliza automaticamente os checklists, cartazes e POPs do setor correspondente.
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                onClose();
                if (onOpenTeamManagement) onOpenTeamManagement();
              }}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
            >
              ⚙️ Equipe & PINs
            </button>
            {onLogout && (
              <button
                onClick={onLogout}
                className="text-xs font-bold text-rose-700 hover:text-rose-900 underline cursor-pointer"
              >
                Sair do sistema
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
