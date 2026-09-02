import React from 'react';
import {
  Printer,
  Sparkles,
  KeyRound,
  Gauge,
  HardHat,
  Thermometer,
  Tags,
  Menu,
} from 'lucide-react';
import { DocumentCategory, EmployeeAccount } from '../types';
import { CharacterAvatar } from './Characters';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentCategory: DocumentCategory;
  onSelectCategory: (cat: DocumentCategory) => void;
  onOpenAiAssistant: () => void;
  onPrint: () => void;
  documentTitle: string;
  currentEmployee?: EmployeeAccount;
  onOpenLoginModal?: () => void;
  onOpenMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenAiAssistant,
  onPrint,
  documentTitle,
  currentEmployee,
  onOpenLoginModal,
  onOpenMenu
}) => {
  const activeEmp = currentEmployee || {
    id: 'emp-manel',
    name: 'Manoel "Chef Manel" Silva',
    role: 'Chef Executivo de Cozinha',
    primarySector: 'cozinha' as const,
    allowedSectors: ['cozinha' as const],
    pin: '1010',
    phone: '(91) 98455-1234',
    shift: 'Abertura & Serviço',
    badgeNumber: 'PD-01',
    photoUrl: 'chef_manel',
    isManager: true,
    active: true
  };

  return (
    <header className="no-print sticky top-0 z-40 bg-stone-900 border-b border-stone-800 text-stone-100 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-3">
          
          {/* Official Brand Logo & Document Context */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <button
              onClick={onOpenMenu}
              className="lg:hidden shrink-0 w-9 h-9 rounded-lg bg-stone-800 border border-stone-700 text-stone-200 hover:text-white flex items-center justify-center"
              aria-label="Abrir menu de navegação"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => onSelectCategory('painel')}
              className="flex items-center text-left group bg-stone-950/80 hover:bg-stone-950 px-2 sm:px-2.5 py-1.5 rounded-xl border border-stone-800 hover:border-red-600/50 transition-all cursor-pointer shadow-sm shrink-0"
              title="Ir para o Painel do Dia 1"
            >
              <BrandLogo variant="horizontal" size="sm" theme="dark" />
            </button>

            <div className="hidden md:block border-l border-stone-800 pl-3 min-w-0">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
                Manual Operacional v1.1
              </span>
              <p className="text-xs text-stone-300 font-semibold truncate">
                {documentTitle}
              </p>
            </div>
          </div>

          {/* Atalhos dos módulos vivos — a lista completa está sempre na barra lateral */}
          <nav className="hidden xl:flex items-center gap-1 shrink-0">
            {[
              { id: 'painel', label: 'Painel', icon: Gauge },
              { id: 'posto', label: 'Posto', icon: HardHat },
              { id: 'estoque', label: 'Estoque', icon: Thermometer },
              { id: 'rastreabilidade', label: 'Rastreab.', icon: Tags },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = currentCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectCategory(tab.id as DocumentCategory)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md ring-1 ring-white/20'
                      : 'bg-stone-800/70 text-amber-300 hover:text-white hover:bg-stone-700 border border-amber-500/25'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons & Employee Profile Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Active Employee Access Pill */}
            <button
              onClick={onOpenLoginModal}
              className="flex items-center space-x-2 bg-stone-800 hover:bg-stone-750 border border-stone-700 hover:border-emerald-500/60 p-1 sm:pr-3 rounded-xl transition-all cursor-pointer group shadow-xs"
              title="Clique para trocar de funcionário ou setor"
            >
              <div className="relative shrink-0">
                <CharacterAvatar id={activeEmp.photoUrl || 'chef_manel'} size="sm" customUrl={activeEmp.photoUrl} />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-stone-900" />
              </div>

              <div className="text-left hidden sm:block">
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-xs text-stone-100 group-hover:text-emerald-300 transition-colors truncate max-w-[120px]">
                    {activeEmp.name.split(' ')[0]} {activeEmp.name.split(' ')[1] || ''}
                  </span>
                  <span className={`text-[8px] font-mono font-bold px-1.5 py-0.2 rounded uppercase ${
                    activeEmp.primarySector === 'cozinha' ? 'bg-emerald-900 text-emerald-300' :
                    activeEmp.primarySector === 'estoque' ? 'bg-amber-900 text-amber-300' :
                    activeEmp.primarySector === 'salao' ? 'bg-rose-900 text-rose-300' :
                    activeEmp.primarySector === 'caixa' ? 'bg-blue-900 text-blue-300' :
                    'bg-purple-900 text-purple-300'
                  }`}>
                    {activeEmp.primarySector}
                  </span>
                </div>
                <div className="text-[10px] text-stone-400 flex items-center gap-1">
                  <span>Trocar Posto</span>
                  <KeyRound className="w-2.5 h-2.5 text-stone-500 group-hover:text-emerald-400" />
                </div>
              </div>
            </button>

            <button
              onClick={onOpenAiAssistant}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-stone-800 text-amber-300 hover:bg-stone-700 border border-amber-500/30 transition-colors shadow-sm cursor-pointer"
              title="Gerar ou adaptar documentos com IA"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">Assistente IA</span>
            </button>

            <button
              onClick={onPrint}
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-md text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-stone-950 transition-colors shadow-sm cursor-pointer"
              title="Imprimir documento oficial"
            >
              <Printer className="w-4 h-4 text-stone-950" />
              <span className="hidden sm:inline">Imprimir</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
