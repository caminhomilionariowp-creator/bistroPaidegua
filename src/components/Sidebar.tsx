import React, { useState } from 'react';
import {
  BookOpen,
  Layers,
  FileText,
  CheckCircle2,
  Tag,
  ChefHat,
  Palette,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Users,
  Smartphone,
  CheckSquare,
  KeyRound,
  Star,
  Lock,
  Gauge,
  HardHat
} from 'lucide-react';
import { DocumentCategory, EmployeeAccount } from '../types';
import { POSTERS_DATA } from '../data/postersData';
import { POPS_DATA } from '../data/popsData';
import { FORMS_DATA } from '../data/formsData';
import { RECIPES_DATA } from '../data/recipesData';
import { MASTER_DOSSIER_SECTIONS } from '../data/masterDossierData';
import { CharacterAvatar } from './Characters';
import { BrandLogo } from './BrandLogo';

interface SidebarProps {
  currentCategory: DocumentCategory;
  onSelectCategory: (cat: DocumentCategory) => void;
  selectedItemId?: string;
  onSelectItem?: (id: string) => void;
  currentEmployee?: EmployeeAccount;
  onOpenLoginModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentCategory,
  onSelectCategory,
  selectedItemId,
  onSelectItem,
  currentEmployee,
  onOpenLoginModal
}) => {
  const [onlyMySector, setOnlyMySector] = useState(false);

  const empSector = currentEmployee?.primarySector || 'cozinha';
  const isManager = currentEmployee?.isManager || empSector === 'gerencia';

  // Helper to check if an item belongs to employee's primary/allowed sectors
  const isMyPoster = (sectorId: string) => {
    if (isManager) return true;
    return sectorId === empSector || (currentEmployee?.allowedSectors && currentEmployee.allowedSectors.includes(sectorId as any));
  };

  const isMyPop = (targetSector: string) => {
    if (isManager) return true;
    const s = targetSector.toLowerCase();
    return s.includes(empSector) || (empSector === 'cozinha' && s.includes('geral'));
  };

  const isMyForm = (formSector: string) => {
    if (isManager) return true;
    const s = formSector.toLowerCase();
    return s.includes(empSector) || (empSector === 'cozinha' && s.includes('produção'));
  };

  return (
    <aside className="no-print w-72 bg-white border-r border-stone-200 flex flex-col h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      
      {/* Brand Identity Header in Sidebar */}
      <div className="p-4 bg-gradient-to-b from-stone-900 to-stone-950 text-white border-b border-stone-800 flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-sky-500/10 rounded-full blur-xl pointer-events-none" />
        
        <div className="bg-white/95 rounded-2xl p-2.5 shadow-md border border-white/20 my-1">
          <BrandLogo variant="full" size="md" className="drop-shadow-xs" />
        </div>
        
        <div className="mt-2 text-[11px] font-medium text-stone-300 flex items-center justify-center gap-1.5 border-t border-stone-800/80 pt-2 w-full">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          <span>Cozinha &amp; Cultura Paraense</span>
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
        </div>
      </div>

      {/* Active Employee Station Card in Sidebar */}
      {currentEmployee && (
        <div className="p-3.5 bg-stone-900 text-white border-b border-stone-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Posto de Trabalho Ativo
            </span>
            {onOpenLoginModal && (
              <button
                onClick={onOpenLoginModal}
                className="text-[10px] bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white px-2 py-0.5 rounded border border-stone-700 transition-colors flex items-center gap-1 cursor-pointer"
                title="Trocar funcionário ou setor"
              >
                <KeyRound className="w-2.5 h-2.5 text-emerald-400" />
                <span>Trocar</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2.5">
            <CharacterAvatar id={currentEmployee.photoUrl || 'chef_manel'} size="sm" customUrl={currentEmployee.photoUrl} />
            <div className="min-w-0 flex-1">
              <div className="font-extrabold text-xs text-white truncate">{currentEmployee.name}</div>
              <div className="text-[10px] text-stone-400 truncate">{currentEmployee.role}</div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-stone-800 text-[10px]">
            <span className={`font-mono font-bold px-1.5 py-0.2 rounded uppercase ${
              empSector === 'cozinha' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
              empSector === 'estoque' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
              empSector === 'salao' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
              empSector === 'caixa' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
              'bg-purple-950 text-purple-300 border border-purple-800'
            }`}>
              Setor: {empSector.toUpperCase()}
            </span>
            <span className="text-stone-400 font-mono">Crachá {currentEmployee.badgeNumber}</span>
          </div>
        </div>
      )}

      {/* Category Selection Section */}
      <div className="p-4 border-b border-stone-200 bg-stone-50/70">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
          Conjunto de Documentos Oficiais
        </h3>
        
        <div className="space-y-1">
          {[
            { id: 'painel', label: '★ Painel do Dia 1', desc: 'Cockpit: aderência, ruptura, perdas', icon: Gauge, count: 'Vivo' },
            { id: 'posto', label: '★ Posto de Trabalho', desc: 'Rotina passo a passo por cargo', icon: HardHat, count: '5 cargos' },
            { id: 'dossier', label: '1. Dossiê Mestre v1.1', desc: 'Diagnóstico & Governança', icon: BookOpen, count: '17 seções' },
            { id: 'posters', label: '2. Cartazes A3 (6 Páginas)', desc: 'Tamanho Real & Sinais', icon: Layers, count: '6 Postos' },
            { id: 'checklists', label: '3. Checklists por Setor', desc: 'Feitos, Faltando & Status', icon: CheckSquare, count: 'Diário' },
            { id: 'team', label: '4. Equipe & Acessos', desc: 'Controle de PINs e Setores', icon: Users, count: 'Equipe' },
            { id: 'pops', label: '5. POPs Operacionais', desc: 'Procedimentos Padrão', icon: FileText, count: `${POPS_DATA.length}` },
            { id: 'forms', label: '6. Formulários de Prancheta', desc: 'F-01, F-02, F-03 e Auditoria', icon: CheckCircle2, count: `${FORMS_DATA.length}` },
            { id: 'labels', label: '7. Etiquetas Universais', desc: 'Gerador e Folhas A4', icon: Tag, count: 'Padrão' },
            { id: 'recipes', label: '8. Fichas Técnicas', desc: 'Receitas Ilustradas', icon: ChefHat, count: `${RECIPES_DATA.length}` },
            { id: 'illustrator', label: '9. Estúdio de Ilustração', desc: 'Fotos Reais & Anotações', icon: Palette, count: 'Editor' },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = currentCategory === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectCategory(item.id as DocumentCategory)}
                className={`w-full text-left flex items-start space-x-3 p-2 rounded-lg text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 border border-emerald-300 text-emerald-950 font-semibold shadow-xs'
                    : 'text-stone-700 hover:bg-stone-100 border border-transparent'
                }`}
              >
                <div className={`p-1.5 rounded-md mt-0.5 ${isActive ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-600'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold truncate">{item.label}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${isActive ? 'bg-emerald-200 text-emerald-900 font-bold' : 'bg-stone-200 text-stone-600'}`}>
                      {item.count}
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-500 truncate mt-0.5">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-item Explorer with Sector Highlights */}
      <div className="flex-1 p-4 overflow-y-auto">
        {currentCategory === 'dossier' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Seções do Dossiê Mestre
              </h4>
              <span className="text-[9px] text-amber-700 font-bold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                v1.1 Oficial
              </span>
            </div>
            <div className="space-y-1.5">
              {MASTER_DOSSIER_SECTIONS.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="w-full text-left p-2 rounded-md text-xs transition-all flex items-start space-x-2 text-stone-700 hover:bg-stone-100 hover:text-stone-900 group"
                >
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold mt-0.5 bg-stone-800 text-amber-300 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    §{sec.number}
                  </span>
                  <div className="truncate flex-1">
                    <span className="font-semibold block truncate">{sec.title}</span>
                    {sec.subtitle && (
                      <span className="text-[10px] text-stone-400 font-normal truncate block">{sec.subtitle}</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {currentCategory === 'posters' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Selecione o Cartaz A3
              </h4>
              <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                ★ = Seu Setor
              </span>
            </div>
            <div className="space-y-1.5">
              {POSTERS_DATA.map((poster) => {
                const isMine = isMyPoster(poster.sectorId);
                return (
                  <button
                    key={poster.id}
                    onClick={() => onSelectItem && onSelectItem(poster.id)}
                    className={`w-full text-left p-2 rounded-md text-xs transition-all flex items-start space-x-2 cursor-pointer ${
                      selectedItemId === poster.id
                        ? 'bg-emerald-100/80 border border-emerald-400 text-emerald-950 font-bold'
                        : isMine
                          ? 'bg-stone-50 hover:bg-stone-100 border border-stone-200'
                          : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold mt-0.5 ${
                      isMine ? 'bg-emerald-700 text-white' : 'bg-stone-400 text-white'
                    }`}>
                      #{poster.giantNumber}
                    </span>
                    <div className="truncate flex-1">
                      <div className="truncate flex items-center justify-between">
                        <span>{poster.title}</span>
                        {isMine && <span className="text-emerald-700 text-[10px] shrink-0 ml-1">★</span>}
                      </div>
                      <span className="text-[10px] text-stone-400 font-normal">{poster.category}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {currentCategory === 'pops' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Procedimentos Operacionais (POPs)
              </h4>
            </div>
            <div className="space-y-1.5">
              {POPS_DATA.map((pop) => {
                const isMine = isMyPop(pop.targetSector);
                return (
                  <button
                    key={pop.id}
                    onClick={() => onSelectItem && onSelectItem(pop.id)}
                    className={`w-full text-left p-2 rounded-md text-xs transition-all flex items-start space-x-2 cursor-pointer ${
                      selectedItemId === pop.id
                        ? 'bg-blue-100/70 border border-blue-400 text-blue-950 font-bold'
                        : isMine
                          ? 'bg-blue-50/40 border border-blue-200 hover:bg-blue-50'
                          : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-mono font-bold mt-0.5">
                      {pop.code}
                    </span>
                    <div className="truncate flex-1">
                      <div className="truncate flex items-center justify-between">
                        <span>{pop.title}</span>
                        {isMine && <span className="text-blue-700 text-[10px] font-bold shrink-0 ml-1">★</span>}
                      </div>
                      <span className="text-[10px] text-stone-400 font-normal">{pop.targetSector}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {currentCategory === 'forms' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Formulários & Prancheta
              </h4>
            </div>
            <div className="space-y-1.5">
              {FORMS_DATA.map((form) => {
                const isMine = isMyForm(form.sector);
                return (
                  <button
                    key={form.id}
                    onClick={() => onSelectItem && onSelectItem(form.id)}
                    className={`w-full text-left p-2 rounded-md text-xs transition-all flex items-start space-x-2 cursor-pointer ${
                      selectedItemId === form.id
                        ? 'bg-emerald-100/70 border border-emerald-400 text-emerald-950 font-bold'
                        : isMine
                          ? 'bg-emerald-50/40 border border-emerald-200 hover:bg-emerald-50'
                          : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <span className="text-[10px] bg-emerald-700 text-white px-1.5 py-0.5 rounded font-mono font-bold mt-0.5">
                      {form.code}
                    </span>
                    <div className="truncate flex-1">
                      <div className="truncate flex items-center justify-between">
                        <span>{form.title}</span>
                        {isMine && <span className="text-emerald-700 text-[10px] font-bold shrink-0 ml-1">★</span>}
                      </div>
                      <span className="text-[10px] text-stone-400 font-normal">{form.sector}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {currentCategory === 'recipes' && (
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
              Fichas Técnicas Padronizadas
            </h4>
            <div className="space-y-1.5">
              {RECIPES_DATA.map((recipe) => (
                <button
                  key={recipe.id}
                  onClick={() => onSelectItem && onSelectItem(recipe.id)}
                  className={`w-full text-left p-2 rounded-md text-xs transition-all flex items-start space-x-2 cursor-pointer ${
                    selectedItemId === recipe.id
                      ? 'bg-orange-100/70 border border-orange-400 text-orange-950 font-bold'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <span className="text-[10px] bg-orange-600 text-white px-1.5 py-0.5 rounded font-mono font-bold mt-0.5">
                    {recipe.code}
                  </span>
                  <div className="truncate flex-1">
                    <div className="truncate">{recipe.dishName}</div>
                    <span className="text-[10px] text-stone-400 font-normal">{recipe.category}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentCategory === 'dossier' && (
          <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-stone-700 text-xs space-y-2">
            <div className="flex items-center space-x-1.5 text-emerald-800 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Dossiê Oficial v1.1</span>
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              O Dossiê Mestre reúne o diagnóstico completo de 17 seções, auditoria fotográfica de 10 pontos críticos, matriz de autoridade e princípios inegociáveis.
            </p>
          </div>
        )}
      </div>

      {/* Footer Rule Callout */}
      <div className="p-3 border-t border-stone-200 bg-stone-900 text-stone-200 text-xs">
        <div className="flex items-center space-x-1.5 text-amber-400 font-bold text-[11px] mb-1">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Regra Central do Projeto</span>
        </div>
        <p className="text-[11px] text-stone-300 leading-tight">
          "Primeiro identificar, depois armazenar. Sem etiqueta = Sem uso."
        </p>
      </div>

    </aside>
  );
};

