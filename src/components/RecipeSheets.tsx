import React, { useState } from 'react';
import { RECIPES_DATA } from '../data/recipesData';
import { RecipeTechSheet } from '../types';
import { PhotoUpload } from './PhotoUpload';
import { Editable, EditableList } from './Editable';
import { 
  ChefHat, 
  Clock, 
  Scale, 
  AlertTriangle, 
  ShieldAlert, 
  DollarSign, 
  Printer, 
  Camera, 
  UtensilsCrossed,
  Sparkles,
  Layers,
  Flame,
  Droplets,
  TestTube,
  CheckCircle2,
  FileText,
  Grid,
  Info
} from 'lucide-react';
import { BrandLogo, BrandWatermarkOverlay } from './BrandLogo';

interface RecipeSheetsProps {
  selectedRecipeId?: string;
  onOpenIllustrator?: (recipeId: string) => void;
}

export const RecipeSheets: React.FC<RecipeSheetsProps> = ({
  selectedRecipeId,
  onOpenIllustrator
}) => {
  const [viewMode, setViewMode] = useState<'individual' | 'mural_rechaud' | 'wall_posters'>('individual');
  const [activeRecipeId, setActiveRecipeId] = useState<string>(
    selectedRecipeId || RECIPES_DATA[0].id
  );

  const currentRecipe = RECIPES_DATA.find((r) => r.id === activeRecipeId) || RECIPES_DATA[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      
      {/* Top Navigation & View Switcher */}
      <div className="no-print bg-white p-4 rounded-xl border border-stone-300 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-extrabold text-stone-900 flex items-center space-x-2">
            <ChefHat className="w-4 h-4 text-orange-600" />
            <span>Fichas Técnicas & Cartazes de Parede da Cozinha</span>
          </h2>
          <p className="text-xs text-stone-500">
            Documentos operacionais digitalizados a partir das fotos reais do Bistrô Pai d'Égua.
          </p>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center space-x-1.5 bg-stone-100 p-1 rounded-lg border border-stone-200 text-xs font-bold">
          <button
            onClick={() => setViewMode('individual')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center space-x-1.5 ${
              viewMode === 'individual'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-orange-600" />
            <span>Ficha Individual (A4)</span>
          </button>
          <button
            onClick={() => setViewMode('mural_rechaud')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center space-x-1.5 ${
              viewMode === 'mural_rechaud'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5 text-amber-600" />
            <span>Mural do Rechaud (6 Receitas)</span>
          </button>
          <button
            onClick={() => setViewMode('wall_posters')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center space-x-1.5 ${
              viewMode === 'wall_posters'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Cartazes de Parede & POPs</span>
          </button>
        </div>

        <button
          onClick={handlePrint}
          className="bg-stone-900 hover:bg-orange-600 text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-xs"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Imprimir Documento</span>
        </button>
      </div>

      {/* VIEW 1: INDIVIDUAL A4 RECIPE SHEET */}
      {viewMode === 'individual' && (
        <div className="space-y-4">
          {/* Quick Recipe Chips */}
          <div className="no-print flex items-center space-x-2 overflow-x-auto pb-1 max-w-full">
            {RECIPES_DATA.map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => setActiveRecipeId(recipe.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  activeRecipeId === recipe.id
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {recipe.code}: {recipe.dishName.split(' ')[0]} {recipe.dishName.includes('Dois') ? 'de Dois' : ''}
              </button>
            ))}
          </div>

          {/* Official Illustrated Technical Sheet (A4 Printable) */}
          <div 
            id="printable-recipe"
            className="bg-white border-2 border-stone-800 rounded-xl p-6 sm:p-8 shadow-paper relative page-break-after overflow-hidden"
          >
            {/* Subtle Brand Watermark */}
            <BrandWatermarkOverlay opacity={0.035} />

            {/* Header Block */}
            <div className="relative z-10 border-2 border-stone-900 rounded-lg overflow-hidden mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-12 border-b border-stone-900">
                <div className="sm:col-span-3 p-3 bg-stone-900 text-white flex flex-col justify-center items-center text-center">
                  <BrandLogo variant="horizontal" size="xs" theme="dark" />
                  <span className="font-extrabold text-[11px] mt-1 text-amber-400">FICHA TÉCNICA OFICIAL</span>
                </div>
                <div className="sm:col-span-6 p-2 flex flex-col justify-center items-center text-center border-y sm:border-y-0 sm:border-r sm:border-l border-stone-900 bg-stone-50">
                  <span className="text-[10px] font-bold text-stone-500 uppercase">PADRÃO OFICIAL DE PRODUÇÃO & MONTAGEM</span>
                  <Editable as="h1" path={`recipe.${currentRecipe.id}.name`} seed={currentRecipe.dishName} className="block font-extrabold text-base sm:text-lg text-stone-900 leading-tight" />
                </div>
                <div className="sm:col-span-3 p-2 bg-stone-50 flex flex-col justify-center text-[11px] font-mono text-stone-800 space-y-0.5">
                  <div><span className="font-bold">CÓDIGO:</span> {currentRecipe.code}</div>
                  <div><span className="font-bold">VERSÃO:</span> {currentRecipe.version}</div>
                  <div><span className="font-bold">CATEGORIA:</span> {currentRecipe.category}</div>
                </div>
              </div>

              {/* Key Metrics Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-stone-300 text-xs bg-stone-100 p-2.5">
                <div className="flex items-center space-x-2">
                  <Scale className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="text-stone-500 block text-[9px] uppercase font-bold">Rendimento:</span>
                    <span className="font-bold text-stone-900">{currentRecipe.standardYield}</span>
                  </div>
                </div>
                <div className="sm:pl-3 flex items-center space-x-2">
                  <UtensilsCrossed className="w-4 h-4 text-amber-600" />
                  <div>
                    <span className="text-stone-500 block text-[9px] uppercase font-bold">Porção Padrão:</span>
                    <span className="font-bold text-stone-900">{currentRecipe.portionWeight}</span>
                  </div>
                </div>
                <div className="sm:pl-3 flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="text-stone-500 block text-[9px] uppercase font-bold">Tempo de Fogo:</span>
                    <span className="font-bold text-stone-900">{currentRecipe.prepTimeMinutes} min</span>
                  </div>
                </div>
                <div className="sm:pl-3 flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-emerald-700" />
                  <div>
                    <span className="text-stone-500 block text-[9px] uppercase font-bold">Custo Estimado:</span>
                    <span className="font-bold text-emerald-800">{currentRecipe.costEstimate || "Em cálculo"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 1: Ingredients Table & Equipment */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
              
              {/* Ingredients Table */}
              <div className="md:col-span-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 bg-stone-100 px-3 py-1 rounded mb-2 flex items-center justify-between">
                  <span>1. Ingredientes & Pré-preparo (Mise en Place)</span>
                  <span className="text-[10px] text-stone-500 font-mono">100% Pesado na Balança</span>
                </h3>

                <div className="border border-stone-300 rounded overflow-hidden">
                  <table className="min-w-full divide-y divide-stone-200 text-xs text-left">
                    <thead className="bg-stone-100 font-bold uppercase text-[10px] text-stone-700">
                      <tr>
                        <th className="px-3 py-1.5">Ingrediente / Matéria-Prima</th>
                        <th className="px-3 py-1.5 w-24 text-right">Qtd Bruta</th>
                        <th className="px-3 py-1.5">Instrução de Pré-Preparo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 bg-white">
                      {currentRecipe.ingredients.map((ing, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'}>
                          <td className="px-3 py-1.5 font-medium text-stone-900">
                            <Editable path={`recipe.${currentRecipe.id}.ing.${idx}.item`} seed={ing.item} />
                          </td>
                          <td className="px-3 py-1.5 font-bold font-mono text-right text-stone-800">
                            <Editable path={`recipe.${currentRecipe.id}.ing.${idx}.qty`} seed={`${ing.grossQty} ${ing.unit}`} />
                          </td>
                          <td className="px-3 py-1.5 text-stone-600 text-[11px]">
                            <Editable path={`recipe.${currentRecipe.id}.ing.${idx}.notes`} seed={ing.prePrepNotes || '-'} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Foto oficial do prato — carregada pela equipe */}
              <div className="md:col-span-4 flex flex-col justify-between">
                <PhotoUpload
                  photoKey={`recipe:${currentRecipe.id}`}
                  label="Foto Oficial do Prato"
                  ratio="wide"
                  caption={`${currentRecipe.dishName} — padrão Bistrô Pai d'Égua`}
                  onAnnotate={onOpenIllustrator ? () => onOpenIllustrator(currentRecipe.id) : undefined}
                />

                <div className="mt-3 bg-stone-50 p-2.5 rounded border border-stone-200 text-xs">
                  <span className="font-bold text-stone-800 block text-[11px] uppercase mb-1">Utensílios Necessários:</span>
                  <ul className="text-[11px] text-stone-600 space-y-0.5">
                    {currentRecipe.equipmentUtensils.map((eq, eIdx) => (
                      <li key={eIdx}>• {eq}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Section 2: Step-by-Step Cooking */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 bg-stone-100 px-3 py-1 rounded mb-3">
                2. Modo de Preparo e Cocção (Passo a Passo Rigoroso)
              </h3>

              <div className="bg-stone-50 border border-stone-300 rounded-lg p-4 space-y-2 text-xs sm:text-sm text-stone-800">
                <EditableList
                  path={`recipe.${currentRecipe.id}.steps`}
                  seed={currentRecipe.stepByStep}
                  addLabel="Novo passo…"
                  read={(step, idx) => (
                    <p key={idx} className="leading-relaxed font-medium">{step}</p>
                  )}
                />
              </div>
            </div>

            {/* Section 3: Plating & Safety Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 page-break-inside-avoid">
              <div className="bg-amber-50/70 border border-amber-300 rounded-lg p-3.5">
                <span className="font-bold text-amber-950 block text-xs uppercase mb-1.5 flex items-center space-x-1.5">
                  <span>🍽️</span>
                  <span>Padrão de Empratamento & Apresentação</span>
                </span>
                <ul className="text-xs text-amber-900 space-y-1">
                  <EditableList
                    path={`recipe.${currentRecipe.id}.plating`}
                    seed={currentRecipe.platingStandard}
                    addLabel="Novo padrão de montagem…"
                    read={(pl, pIdx) => <li key={pIdx}>• {pl}</li>}
                  />
                </ul>
              </div>

              <div className="bg-rose-50/70 border border-rose-300 rounded-lg p-3.5">
                <span className="font-bold text-rose-950 block text-xs uppercase mb-1.5 flex items-center space-x-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Pontos Críticos de Segurança e Validade</span>
                </span>
                <div className="text-xs text-rose-900 space-y-1.5">
                  <EditableList
                    path={`recipe.${currentRecipe.id}.safety`}
                    seed={currentRecipe.criticalSafetyNotes}
                    addLabel="Novo ponto de segurança…"
                    read={(note, nIdx) => <p key={nIdx} className="leading-snug">{note}</p>}
                  />
                </div>
              </div>
            </div>

            {/* Signatures */}
            <div className="pt-3 border-t-2 border-stone-800 flex justify-between items-center text-xs text-stone-600">
              <div><span className="font-bold text-stone-900">Elaborado por:</span> {currentRecipe.author}</div>
              <div><span className="font-bold text-stone-900">Validado por:</span> {currentRecipe.validatedBy}</div>
              <div className="font-mono text-[10px] text-stone-400">Bistrô Pai d'Égua • Ficha Técnica Oficial</div>
            </div>

          </div>
        </div>
      )}

      {/* VIEW 2: MURAL DO RECHAUD (6 PRATOS INTEGRADOS - FOTO 2) */}
      {viewMode === 'mural_rechaud' && (
        <div className="space-y-6">
          <div className="bg-amber-900 text-white p-6 rounded-xl border-4 border-amber-950 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-800/80 pb-4 mb-4">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-amber-300 uppercase">
                  BISTRÔ PAI D'ÉGUA • PAINEL OPERACIONAL DE BUFFET
                </span>
                <h2 className="text-xl font-black text-white">
                  6 Fichas Oficiais do Rechaud de Buffet
                </h2>
              </div>
              <div className="bg-amber-950 px-3 py-1.5 rounded border border-amber-700 text-xs font-mono text-amber-200">
                TEMPERATURA MÍNIMA: ≥ 65°C NO BANHO-MARIA
              </div>
            </div>

            {/* 6 Rechaud Dishes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {RECIPES_DATA.map((recipe, idx) => (
                <div 
                  key={recipe.id}
                  className="bg-white text-stone-900 rounded-lg p-4 border-2 border-amber-950 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-2">
                      <span className="font-black text-amber-700 text-xs">{recipe.code}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                        Cuba #{idx + 1}
                      </span>
                    </div>
                    
                    <h3 className="font-extrabold text-sm text-stone-900 mb-1 leading-snug">
                      {recipe.dishName}
                    </h3>
                    
                    <p className="text-[11px] text-stone-500 mb-2 font-medium">
                      {recipe.category} • Rendimento: {recipe.standardYield}
                    </p>

                    {/* Compact Ingredients list */}
                    <div className="bg-stone-50 p-2 rounded border border-stone-200 text-[11px] mb-3">
                      <span className="font-bold text-stone-700 block mb-1 text-[10px] uppercase">Principais Insumos:</span>
                      <ul className="space-y-0.5 text-stone-600">
                        {recipe.ingredients.slice(0, 4).map((ing, iIdx) => (
                          <li key={iIdx} className="flex justify-between">
                            <span>• {ing.item}</span>
                            <span className="font-mono font-bold text-stone-800">{ing.grossQty} {ing.unit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Safety & Action */}
                  <div>
                    <div className="text-[10px] bg-rose-50 text-rose-900 p-1.5 rounded border border-rose-200 font-semibold mb-2">
                      {recipe.criticalSafetyNotes[0]}
                    </div>

                    <button
                      onClick={() => {
                        setActiveRecipeId(recipe.id);
                        setViewMode('individual');
                      }}
                      className="w-full text-center text-xs bg-stone-900 hover:bg-orange-600 text-white font-bold py-1.5 rounded transition-colors"
                    >
                      Ver Ficha Técnica Completa
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Special Operational Rule Footer */}
            <div className="mt-4 bg-amber-950/80 p-3 rounded-lg border border-amber-700/60 text-xs text-amber-200 flex items-center space-x-2">
              <Flame className="w-5 h-5 text-amber-400 shrink-0" />
              <span>
                <strong>Regra de Ouro do Buffet:</strong> Verificar água do banho-maria a cada 60 minutos. Toda quarta-feira colocar 10kg de maniva fresca no ciclo de cozimento da Maniçoba.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: KITCHEN WALL POSTERS & POPS (FOTO 1) */}
      {viewMode === 'wall_posters' && (
        <div className="space-y-8">
          
          {/* Poster 1: Tábua de Cores de Alimentos */}
          <div className="bg-white border-2 border-stone-800 rounded-xl p-6 shadow-paper">
            <div className="border-b-2 border-stone-800 pb-3 mb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-stone-500 uppercase">
                  BISTRÔ PAI D'ÉGUA • CARTAZ DE POSTO #01
                </span>
                <h3 className="text-base font-black text-stone-900">
                  Cores de Tábuas para Cada Categoria de Alimentos
                </h3>
              </div>
              <span className="bg-rose-100 text-rose-900 text-xs font-bold px-2.5 py-1 rounded">
                Prevenção de Contaminação Cruzada
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="border-2 border-amber-400 bg-amber-50 rounded-lg p-3 text-center">
                <div className="w-full h-12 bg-amber-400 rounded-md mb-2 flex items-center justify-center text-amber-950 font-black text-lg">
                  AMARELO
                </div>
                <h4 className="font-extrabold text-xs text-amber-950">AVES CRUAS</h4>
                <p className="text-[11px] text-amber-800 mt-1">Frango, pato e aves regionais</p>
              </div>

              <div className="border-2 border-blue-400 bg-blue-50 rounded-lg p-3 text-center">
                <div className="w-full h-12 bg-blue-500 text-white rounded-md mb-2 flex items-center justify-center font-black text-lg">
                  AZUL
                </div>
                <h4 className="font-extrabold text-xs text-blue-950">PEIXES & FRUTOS DO MAR</h4>
                <p className="text-[11px] text-blue-800 mt-1">Filhote, camarão, pirarucu e pescados</p>
              </div>

              <div className="border-2 border-rose-500 bg-rose-50 rounded-lg p-3 text-center">
                <div className="w-full h-12 bg-rose-600 text-white rounded-md mb-2 flex items-center justify-center font-black text-lg">
                  VERMELHO
                </div>
                <h4 className="font-extrabold text-xs text-rose-950">CARNES CRUAS</h4>
                <p className="text-[11px] text-rose-800 mt-1">Charque, carne bovina e suína cruas</p>
              </div>

              <div className="border-2 border-emerald-500 bg-emerald-50 rounded-lg p-3 text-center">
                <div className="w-full h-12 bg-emerald-600 text-white rounded-md mb-2 flex items-center justify-center font-black text-lg">
                  VERDE
                </div>
                <h4 className="font-extrabold text-xs text-emerald-950">LEGUMES & HORTIFRÚTI</h4>
                <p className="text-[11px] text-emerald-800 mt-1">Jambu, chicória, cebola e verduras</p>
              </div>

              <div className="border-2 border-stone-300 bg-stone-100 rounded-lg p-3 text-center">
                <div className="w-full h-12 bg-white border border-stone-400 rounded-md mb-2 flex items-center justify-center text-stone-800 font-black text-lg">
                  BRANCO
                </div>
                <h4 className="font-extrabold text-xs text-stone-900">LATICÍNIOS & PRONTOS</h4>
                <p className="text-[11px] text-stone-600 mt-1">Queijo coalho e alimentos prontos</p>
              </div>
            </div>
          </div>

          {/* Poster 2: Higienização de Bancadas, Mesas e Pias */}
          <div className="bg-white border-2 border-stone-800 rounded-xl p-6 shadow-paper">
            <div className="border-b-2 border-stone-800 pb-3 mb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-stone-500 uppercase">
                  BISTRÔ PAI D'ÉGUA • CARTAZ DE POSTO #02
                </span>
                <h3 className="text-base font-black text-stone-900">
                  Higienização de Bancadas de Trabalho, Mesas e Pias
                </h3>
              </div>
              <Droplets className="w-5 h-5 text-blue-600" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div className="bg-stone-50 border border-stone-300 rounded-lg p-3">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center mb-2">1</span>
                <h4 className="font-bold text-xs text-stone-900 mb-1">Retirar Sujidade Grossa</h4>
                <p className="text-[11px] text-stone-600">Remover todos os restos de alimentos das bancadas, mesas ou pias.</p>
              </div>

              <div className="bg-stone-50 border border-stone-300 rounded-lg p-3">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center mb-2">2</span>
                <h4 className="font-bold text-xs text-stone-900 mb-1">Jogar Água</h4>
                <p className="text-[11px] text-stone-600">Umedecer toda a superfície de inox ou bancada.</p>
              </div>

              <div className="bg-stone-50 border border-stone-300 rounded-lg p-3">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center mb-2">3</span>
                <h4 className="font-bold text-xs text-stone-900 mb-1">Esfregar com Detergente</h4>
                <p className="text-[11px] text-stone-600">Usar esponja e detergente neutro até que toda a superfície esteja limpa.</p>
              </div>

              <div className="bg-stone-50 border border-stone-300 rounded-lg p-3">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center mb-2">4</span>
                <h4 className="font-bold text-xs text-stone-900 mb-1">Enxaguar Abundante</h4>
                <p className="text-[11px] text-stone-600">Jogar bastante água até retirar 100% do resíduo de detergente.</p>
              </div>

              <div className="bg-blue-50 border border-blue-300 rounded-lg p-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mb-2">5</span>
                <h4 className="font-bold text-xs text-blue-950 mb-1">Borrifar Álcool 70%</h4>
                <p className="text-[11px] text-blue-800">Deixar secar naturalmente antes de todas as manipulações.</p>
              </div>
            </div>
          </div>

          {/* Poster 3: Higienização dos Fogões e Chapas & Coleta de Amostras */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Fogões e Chapas */}
            <div className="bg-white border-2 border-stone-800 rounded-xl p-5 shadow-paper">
              <div className="border-b-2 border-stone-800 pb-2 mb-3">
                <span className="text-[9px] font-mono tracking-widest text-stone-500 uppercase">
                  CARTAZ DE POSTO #03
                </span>
                <h3 className="text-sm font-black text-stone-900">
                  Higienização dos Fogões e Chapas
                </h3>
              </div>

              <ol className="text-xs text-stone-700 space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-stone-900 font-mono">1.</span>
                  <span>Raspar as incrustações pesadas com espátula de chapa.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-stone-900 font-mono">2.</span>
                  <span>Aplicar o desencrustante onde necessário e deixar agir de 10 a 20 minutos.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-stone-900 font-mono">3.</span>
                  <span>Retirar incrustações com esponja, enxaguar e deixar secar naturalmente.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-stone-900 font-mono">4.</span>
                  <span>Escorrer a água e secar superfícies de contato.</span>
                </li>
                <li className="flex items-start space-x-2 bg-amber-50 p-2 rounded border border-amber-200">
                  <span className="font-bold text-amber-900 font-mono">5.</span>
                  <span className="text-amber-950 font-medium"><strong>Semanalmente:</strong> Desmontar as peças removíveis e emergir em solução de desencrustante com água morna por 20 min.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-stone-900 font-mono">6.</span>
                  <span>Retirar as incrustações finais com esponja e espátula, enxaguar e deixar secar.</span>
                </li>
              </ol>
            </div>

            {/* Coleta de Amostra */}
            <div className="bg-white border-2 border-stone-800 rounded-xl p-5 shadow-paper">
              <div className="border-b-2 border-stone-800 pb-2 mb-3 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-stone-500 uppercase">
                    CARTAZ DE POSTO #04
                  </span>
                  <h3 className="text-sm font-black text-stone-900">
                    Coleta de Amostra de Alimentos
                  </h3>
                </div>
                <TestTube className="w-4 h-4 text-emerald-600" />
              </div>

              <ol className="text-xs text-stone-700 space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-stone-900 font-mono">1.</span>
                  <span>Identificar embalagens/sacos estéreis: Restaurante, Produto, Data, Horário e Responsável.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-stone-900 font-mono">2.</span>
                  <span>Proceder à rigorosa higienização das mãos antes de abrir o saco.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-stone-900 font-mono">3.</span>
                  <span>Abrir a embalagem sem tocar a face interna nem soprá-la.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-stone-900 font-mono">4.</span>
                  <span>Coletar no mínimo 100g do alimento servido.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-stone-900 font-mono">5.</span>
                  <span>Retirar o ar se possível e fechar hermeticamente.</span>
                </li>
                <li className="flex items-start space-x-2 bg-emerald-50 p-2 rounded border border-emerald-300">
                  <span className="font-bold text-emerald-900 font-mono">6.</span>
                  <div className="text-emerald-950 font-medium">
                    <div>• <strong>Refrigerados:</strong> Guardar a ≤4°C por 72 horas.</div>
                    <div>• <strong>Quentes:</strong> Guardar sob congelamento a ≤-18°C por 72 horas.</div>
                  </div>
                </li>
              </ol>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

