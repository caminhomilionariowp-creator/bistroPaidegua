import React, { useState, useEffect } from 'react';
import { DocumentCategory, ResponsibleLeader, ChecklistItemData, EmployeeAccount } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DossierViewer } from './components/DossierViewer';
import { CockpitPanel } from './components/CockpitPanel';
import { RoleStation } from './components/RoleStation';
import { StockControl } from './components/StockControl';
import { PosterStudio } from './components/PosterStudio';
import { PopViewer } from './components/PopViewer';
import { FormsViewer } from './components/FormsViewer';
import { LabelsStudio } from './components/LabelsStudio';
import { RecipeSheets } from './components/RecipeSheets';
import { IllustrationCanvas } from './components/IllustrationCanvas';
import { AiAssistantModal } from './components/AiAssistantModal';
import { TeamManagement } from './components/TeamManagement';
import { SectorChecklist } from './components/SectorChecklist';
import { LoginModal } from './components/LoginModal';
import { loadTeamMembers, saveTeamMembers, loadEmployees, saveEmployees, loadCurrentEmployee, saveCurrentEmployeeId } from './data/teamData';
import { loadChecklistItems, saveChecklistItems } from './data/checklistsData';
import { Printer, Sparkles, BookOpen, Layers, FileText, CheckCircle2, Tag, ChefHat, Palette, Users, CheckSquare } from 'lucide-react';

export default function App() {
  const [currentCategory, setCurrentCategory] = useState<DocumentCategory>('painel');
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(undefined);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  
  // Shared persistent state for Team Members, Employees & Checklists
  const [team, setTeam] = useState<ResponsibleLeader[]>(() => loadTeamMembers());
  const [employees, setEmployees] = useState<EmployeeAccount[]>(() => loadEmployees());
  const [currentEmployee, setCurrentEmployee] = useState<EmployeeAccount>(() => loadCurrentEmployee(loadEmployees()));
  const [checklistItems, setChecklistItems] = useState<ChecklistItemData[]>(() => loadChecklistItems());

  useEffect(() => {
    saveTeamMembers(team);
  }, [team]);

  useEffect(() => {
    saveEmployees(employees);
  }, [employees]);

  useEffect(() => {
    saveChecklistItems(checklistItems);
  }, [checklistItems]);

  const handlePrint = () => {
    window.print();
  };

  const handleOpenIllustrator = (targetId?: any) => {
    setCurrentCategory('illustrator');
  };

  const handleNavigateToPosters = (posterId: string) => {
    setCurrentCategory('posters');
    setSelectedItemId(posterId);
  };

  const getCategoryTitle = () => {
    switch (currentCategory) {
      case 'painel':
        return 'Painel do "Dia 1" — Cockpit Operacional (Aderência, Ruptura, Perdas & Princípios)';
      case 'posto':
        return 'Posto de Trabalho — Rotina Passo a Passo, Paramentação e Regras de Ouro por Cargo';
      case 'estoque':
        return 'Estoque & Termômetro de Ruptura — Níveis, Gatilho de Compra e Regra P.E.P.S.';
      case 'dossier':
        return 'Dossiê Mestre de Implantação v1.1 (Diagnóstico & Arquitetura)';
      case 'posters':
        return '6 Cartazes Ilustrados A3 (297mm x 420mm) com Sinais Visuais e Responsáveis';
      case 'checklists':
        return 'Checklist Operacional por Setor (Feitos, Faltando e Status em Tempo Real)';
      case 'team':
        return 'Gestão de Líderes e Responsáveis por Setor (Sincronizado nos Cartazes)';
      case 'pops':
        return 'Procedimentos Operacionais Padrão (POPs Oficiais)';
      case 'forms':
        return 'Checklists e Formulários de Campo (Prancheta)';
      case 'labels':
        return 'Etiquetas Universais de Alimentos (Folhas Adesivas A4)';
      case 'recipes':
        return 'Fichas Técnicas Operacionais Ilustradas';
      case 'illustrator':
        return 'Estúdio de Ilustração & Anotação de Fotos Reais';
      default:
        return 'Documentos Oficiais Bistrô Pai d\'Égua';
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      
      {/* Top Header */}
      <Header
        currentCategory={currentCategory}
        onSelectCategory={(cat) => {
          setCurrentCategory(cat);
          setSelectedItemId(undefined);
        }}
        onOpenAiAssistant={() => setIsAiModalOpen(true)}
        onPrint={handlePrint}
        documentTitle={getCategoryTitle()}
        currentEmployee={currentEmployee}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Left Navigation Sidebar */}
        <Sidebar
          currentCategory={currentCategory}
          onSelectCategory={(cat) => {
            setCurrentCategory(cat);
            setSelectedItemId(undefined);
          }}
          selectedItemId={selectedItemId}
          onSelectItem={(id) => setSelectedItemId(id)}
          currentEmployee={currentEmployee}
          onOpenLoginModal={() => setIsLoginModalOpen(true)}
        />

        {/* Central Document Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
          
          {/* Quick Notice Banner on screen (hidden on print) */}
          <div className="no-print mb-6 bg-white border border-stone-300 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-stone-900 text-amber-300 flex items-center justify-center font-bold shadow-xs">
                {currentCategory === 'painel' ? '📊' : currentCategory === 'posto' ? '🧑‍🍳' : currentCategory === 'estoque' ? '🌡️' : currentCategory === 'dossier' ? '📖' : currentCategory === 'posters' ? '🖼️' : currentCategory === 'checklists' ? '📋' : currentCategory === 'team' ? '👥' : '📄'}
              </div>
              <div>
                <h3 className="font-extrabold text-stone-900 text-xs sm:text-sm">
                  {getCategoryTitle()}
                </h3>
                <p className="text-[11px] text-stone-500">
                  Documentação técnica oficial padronizada para visualização e impressão em tamanho real sem cortes.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {currentCategory !== 'dossier' && (
                <button
                  onClick={() => {
                    setCurrentCategory('dossier');
                    setSelectedItemId(undefined);
                  }}
                  className="bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors shadow-xs border border-amber-500/30 cursor-pointer"
                  title="Abrir Dossiê Mestre de Governança v1.1"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ver Dossiê Mestre</span>
                </button>
              )}
              {currentCategory !== 'posters' && (
                <button
                  onClick={() => {
                    setCurrentCategory('posters');
                    setSelectedItemId(undefined);
                  }}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors border border-stone-300 cursor-pointer"
                  title="Ir para os 6 Cartazes A3"
                >
                  <Layers className="w-3.5 h-3.5 text-stone-600" />
                  <span>Cartazes A3</span>
                </button>
              )}
              <button
                onClick={handlePrint}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir</span>
              </button>
            </div>
          </div>

          {/* Active View Component */}
          {currentCategory === 'painel' && (
            <CockpitPanel
              checklistItems={checklistItems}
              team={team}
              currentEmployee={currentEmployee}
              onNavigate={(cat) => {
                setCurrentCategory(cat);
                setSelectedItemId(undefined);
              }}
              onOpenLoginModal={() => setIsLoginModalOpen(true)}
            />
          )}

          {currentCategory === 'posto' && (
            <RoleStation
              team={team}
              currentEmployee={currentEmployee}
              allEmployees={employees}
              onOpenLoginModal={() => setIsLoginModalOpen(true)}
              onNavigate={(cat) => {
                setCurrentCategory(cat);
                setSelectedItemId(undefined);
              }}
            />
          )}

          {currentCategory === 'estoque' && (
            <StockControl
              currentEmployee={currentEmployee}
              onNavigate={(cat) => {
                setCurrentCategory(cat);
                setSelectedItemId(undefined);
              }}
            />
          )}

          {currentCategory === 'dossier' && (
            <DossierViewer onOpenIllustrator={handleOpenIllustrator} />
          )}

          {currentCategory === 'posters' && (
            <PosterStudio
              selectedPosterId={selectedItemId}
              onOpenIllustrator={handleOpenIllustrator}
              team={team}
              onNavigateToTeam={() => setCurrentCategory('team')}
            />
          )}

          {currentCategory === 'checklists' && (
            <SectorChecklist
              items={checklistItems}
              onUpdateItems={setChecklistItems}
              team={team}
              onPrint={handlePrint}
              currentEmployee={currentEmployee}
              onOpenLoginModal={() => setIsLoginModalOpen(true)}
            />
          )}

          {currentCategory === 'team' && (
            <TeamManagement
              team={team}
              onUpdateTeam={setTeam}
              onNavigateToPosters={handleNavigateToPosters}
            />
          )}

          {currentCategory === 'pops' && (
            <PopViewer
              selectedPopId={selectedItemId}
              onOpenIllustrator={handleOpenIllustrator}
            />
          )}

          {currentCategory === 'forms' && (
            <FormsViewer selectedFormId={selectedItemId} />
          )}

          {currentCategory === 'labels' && (
            <LabelsStudio />
          )}

          {currentCategory === 'recipes' && (
            <RecipeSheets
              selectedRecipeId={selectedItemId}
              onOpenIllustrator={handleOpenIllustrator}
            />
          )}

          {currentCategory === 'illustrator' && (
            <IllustrationCanvas />
          )}

        </main>
      </div>

      {/* Employee Login / Switcher Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        employees={employees}
        currentEmployee={currentEmployee}
        onSelectEmployee={(emp) => {
          setCurrentEmployee(emp);
          saveCurrentEmployeeId(emp.id);
        }}
        onOpenTeamManagement={() => {
          setIsLoginModalOpen(false);
          setCurrentCategory('team');
        }}
      />

      {/* AI Document Generation Modal */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

    </div>
  );
}
