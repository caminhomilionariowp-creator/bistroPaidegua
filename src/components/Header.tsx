import React from 'react';
import {
  Printer,
  Sparkles,
  BookOpen,
  Layers,
  FileText,
  Tag,
  ChefHat,
  Palette,
  CheckCircle2,
  Users,
  Smartphone,
  CheckSquare,
  KeyRound,
  ShieldCheck,
  User,
  Gauge
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
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenAiAssistant,
  onPrint,
  documentTitle,
  currentEmployee,
  onOpenLoginModal
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Official Brand Logo & Document Context */}
          <div className="flex items-center space-x-3 shrink-0">
            <button 
              onClick={() => onSelectCategory('dossier')} 
              className="flex items-center text-left group bg-stone-950/80 hover:bg-stone-950 px-2.5 py-1.5 rounded-xl border border-stone-800 hover:border-red-600/50 transition-all cursor-pointer shadow-sm"
              title="Ir para o Início / Dossiê Mestre"
            >
              <BrandLogo variant="horizontal" size="sm" theme="dark" />
            </button>
            
            <div className="hidden sm:block border-l border-stone-800 pl-3">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  Manual Operacional v1.1
                </span>
              </div>
              <p className="text-xs text-stone-300 font-semibold truncate max-w-xs md:max-w-sm">
                {documentTitle}
              </p>
            </div>
          </div>

          {/* Quick Category Tabs Navigation - Dossier as First Item */}
          <nav className="hidden lg:flex items-center space-x-1 overflow-x-auto py-1 scrollbar-none">
            {[
              { id: 'painel', label: '📊 Painel do Dia 1', icon: Gauge, highlight: true },
              { id: 'dossier', label: '📖 Dossiê Mestre', icon: BookOpen },
              { id: 'posters', label: 'Cartazes A3', icon: Layers },
              { id: 'checklists', label: 'Checklists', icon: CheckSquare },
              { id: 'team', label: 'Equipe', icon: Users },
              { id: 'pops', label: 'POPs', icon: FileText },
              { id: 'forms', label: 'Formulários', icon: CheckCircle2 },
              { id: 'labels', label: 'Etiquetas', icon: Tag },
              { id: 'recipes', label: 'Fichas', icon: ChefHat },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = currentCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectCategory(tab.id as DocumentCategory)}
                  className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md ring-1 ring-white/20'
                      : tab.highlight
                      ? 'bg-stone-800 text-amber-300 hover:text-white hover:bg-stone-750 border border-amber-500/30'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons & Employee Profile Switcher */}
          <div className="flex items-center space-x-2.5 shrink-0">
            
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
