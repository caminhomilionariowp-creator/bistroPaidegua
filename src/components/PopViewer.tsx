import React, { useState } from 'react';
import { POPS_DATA } from '../data/popsData';
import { POPItem } from '../types';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  UserCheck, 
  Clock, 
  Printer, 
  Layers,
  Sparkles,
  Palette
} from 'lucide-react';
import { BrandLogo, BrandWatermarkOverlay } from './BrandLogo';
import { Editable, EditableList } from './Editable';

interface PopViewerProps {
  selectedPopId?: string;
  onOpenIllustrator?: (popId: string) => void;
}

export const PopViewer: React.FC<PopViewerProps> = ({ selectedPopId, onOpenIllustrator }) => {
  const [activePopId, setActivePopId] = useState<string>(selectedPopId || POPS_DATA[0].id);

  const currentPop = POPS_DATA.find((p) => p.id === activePopId) || POPS_DATA[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Quick POP Switcher (No-print) */}
      <div className="no-print bg-white p-4 rounded-xl border border-stone-300 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-extrabold text-stone-900 flex items-center space-x-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Procedimentos Operacionais Padrão (POPs Oficiais)</span>
          </h2>
          <p className="text-xs text-stone-500">
            Passo a passo com responsável, pontos críticos e evidências para treinamento e auditoria.
          </p>
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 max-w-full">
          {POPS_DATA.map((pop) => (
            <button
              key={pop.id}
              onClick={() => setActivePopId(pop.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activePopId === pop.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {pop.code}: {pop.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Official POP Document Card (A4 Printable) */}
      <div 
        id="printable-pop"
        className="bg-white border border-stone-300 rounded-xl p-8 sm:p-10 shadow-paper relative page-break-after overflow-hidden"
      >
        {/* Subtle Brand Watermark */}
        <BrandWatermarkOverlay opacity={0.035} />

        {/* Header Block with ISO-style header */}
        <div className="relative z-10 border-2 border-stone-900 rounded-lg overflow-hidden mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-12 border-b border-stone-900">
            <div className="sm:col-span-3 p-3 bg-stone-900 text-white flex flex-col justify-center items-center text-center">
              <BrandLogo variant="horizontal" size="xs" theme="dark" />
              <span className="font-extrabold text-[11px] mt-1 text-blue-400">PROCEDIMENTO PADRÃO</span>
            </div>
            <div className="sm:col-span-6 p-3 flex flex-col justify-center items-center text-center border-y sm:border-y-0 sm:border-r sm:border-l border-stone-900 bg-stone-50">
              <span className="text-[10px] font-bold text-stone-500 uppercase">PROCEDIMENTO OPERACIONAL PADRÃO</span>
              <Editable as="h1" path={`pop.${currentPop.id}.title`} seed={currentPop.title} className="block font-extrabold text-base text-stone-900" />
            </div>
            <div className="sm:col-span-3 p-2 bg-stone-50 flex flex-col justify-center text-[11px] font-mono text-stone-700 space-y-0.5">
              <div><span className="font-bold">CÓDIGO:</span> {currentPop.code}</div>
              <div><span className="font-bold">VERSÃO:</span> {currentPop.version}</div>
              <div><span className="font-bold">DATA:</span> {currentPop.date}</div>
              <div><span className="font-bold">SETOR:</span> {currentPop.targetSector}</div>
            </div>
          </div>

          {/* Quick Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-stone-300 text-xs bg-stone-100/70 p-2.5">
            <div>
              <span className="text-stone-500 font-bold block text-[10px] uppercase">Executor Principal:</span>
              <span className="font-bold text-stone-900">{currentPop.responsibleRole}</span>
            </div>
            <div className="sm:pl-3">
              <span className="text-stone-500 font-bold block text-[10px] uppercase">Conferente / Auditor:</span>
              <span className="font-bold text-stone-900">{currentPop.checkerRole}</span>
            </div>
            <div className="sm:pl-3">
              <span className="text-stone-500 font-bold block text-[10px] uppercase">Frequência:</span>
              <span className="font-bold text-stone-900">{currentPop.frequency}</span>
            </div>
          </div>
        </div>

        {/* Section 1: Objective & Materials */}
        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 bg-stone-100 px-3 py-1 rounded mb-2">
              1. Objetivo do Procedimento
            </h3>
            <Editable as="p" multiline path={`pop.${currentPop.id}.objective`} seed={currentPop.objective} className="block text-xs sm:text-sm text-stone-700 leading-relaxed pl-2" />
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 bg-stone-100 px-3 py-1 rounded mb-2">
              2. Materiais & Equipamentos Necessários
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2 text-xs text-stone-700">
              <EditableList
                path={`pop.${currentPop.id}.materials`}
                seed={currentPop.materialsNeeded}
                addLabel="Novo material…"
                read={(mat, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-blue-600 font-bold">▪</span>
                    <span>{mat}</span>
                  </li>
                )}
              />
            </ul>
          </div>
        </div>

        {/* Section 2: Step-by-Step with Visual Color Codes */}
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 bg-stone-100 px-3 py-1 rounded mb-4">
            3. Sequência de Execução Passo a Passo
          </h3>

          <div className="space-y-4">
            {currentPop.steps.map((step) => {
              const signalBg = 
                step.visualSignal === 'red' ? 'border-rose-400 bg-rose-50/50' :
                step.visualSignal === 'yellow' ? 'border-amber-400 bg-amber-50/50' :
                step.visualSignal === 'blue' ? 'border-blue-400 bg-blue-50/50' :
                'border-emerald-400 bg-emerald-50/50';

              return (
                <div 
                  key={step.order} 
                  className={`border-2 rounded-lg p-4 transition-all page-break-inside-avoid ${signalBg}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-stone-900 text-white font-mono font-bold flex items-center justify-center text-xs">
                        {step.order}
                      </span>
                      <Editable as="h4" path={`pop.${currentPop.id}.step.${step.order}.title`} seed={step.title} className="font-extrabold text-stone-900 text-xs sm:text-sm" />
                    </div>

                    {step.requiredEvidence && (
                      <span className="text-[10px] font-mono font-bold text-stone-700 bg-white px-2 py-0.5 rounded border border-stone-300">
                        Evidência: {step.requiredEvidence}
                      </span>
                    )}
                  </div>

                  <Editable as="p" multiline path={`pop.${currentPop.id}.step.${step.order}.desc`} seed={step.description} className="block text-xs sm:text-sm text-stone-700 leading-relaxed pl-8 mb-2" />

                  {step.criticalControlPoint && (
                    <div className="ml-8 bg-white/80 p-2.5 rounded border border-stone-300 text-xs text-stone-900 font-medium flex items-start space-x-2">
                      <span className="text-amber-600 font-bold">⚠️ PONTO CRÍTICO:</span>
                      <Editable multiline path={`pop.${currentPop.id}.step.${step.order}.ccp`} seed={step.criticalControlPoint} className="leading-snug" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: What NOT to do (Limites Críticos) */}
        <div className="mb-8 page-break-inside-avoid">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-900 bg-rose-100 px-3 py-1 rounded mb-3 flex items-center space-x-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-700" />
            <span>4. Limites Críticos: O que NUNCA fazer</span>
          </h3>

          <div className="bg-rose-50/60 border border-rose-300 rounded-lg p-4 space-y-2">
            <EditableList
              path={`pop.${currentPop.id}.nunca`}
              seed={currentPop.whatNotToDo}
              addLabel="Nova proibição…"
              read={(item, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-rose-950 font-medium">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span className="leading-snug">{item}</span>
                </div>
              )}
            />
          </div>
        </div>

        {/* Section 4: Non-compliance reaction & Signatures */}
        <div className="space-y-6 page-break-inside-avoid">
          <div className="bg-stone-50 border border-stone-300 rounded-lg p-3.5 text-xs text-stone-700">
            <span className="font-bold text-stone-900 block mb-1">Reação à Não-Conformidade:</span>
            <Editable as="p" multiline path={`pop.${currentPop.id}.reacao`} seed={currentPop.nonComplianceReaction} className="block leading-relaxed" />
          </div>

          <div className="grid grid-cols-2 gap-6 pt-4 border-t-2 border-stone-800 text-xs">
            <div className="text-center">
              <div className="h-10 border-b border-dashed border-stone-400 mb-1"></div>
              <span className="font-bold text-stone-900 block">{currentPop.responsibleRole}</span>
              <span className="text-[10px] text-stone-500">Executor Treinado</span>
            </div>
            <div className="text-center">
              <div className="h-10 border-b border-dashed border-stone-400 mb-1"></div>
              <span className="font-bold text-stone-900 block">{currentPop.checkerRole}</span>
              <span className="text-[10px] text-stone-500">Conferente / Gestão</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
