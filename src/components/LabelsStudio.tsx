import React, { useState } from 'react';
import { DEFAULT_LABELS_PRESETS } from '../data/labelsData';
import { UniversalLabelTemplate } from '../types';
import { 
  Tag, 
  Printer, 
  Plus, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  Copy,
  Sliders
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const LabelsStudio: React.FC = () => {
  const [labels, setLabels] = useState<UniversalLabelTemplate[]>(DEFAULT_LABELS_PRESETS);
  const [copiesPerPage, setCopiesPerPage] = useState<number>(8); // 8, 12 or 16 per A4
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Active label being edited or cloned
  const [selectedLabel, setSelectedLabel] = useState<UniversalLabelTemplate>(DEFAULT_LABELS_PRESETS[0]);

  // Form states for creating/editing label
  const [productName, setProductName] = useState(selectedLabel.productName);
  const [complement, setComplement] = useState(selectedLabel.complement || '');
  const [prepDate, setPrepDate] = useState(selectedLabel.prepDate);
  const [prepTime, setPrepTime] = useState(selectedLabel.prepTime);
  const [expiryDate, setExpiryDate] = useState(selectedLabel.expiryDate);
  const [expiryTime, setExpiryTime] = useState(selectedLabel.expiryTime);
  const [executor, setExecutor] = useState(selectedLabel.executor);
  const [checker, setChecker] = useState(selectedLabel.checker);
  const [lotLocation, setLotLocation] = useState(selectedLabel.lotLocation || '');
  const [notes, setNotes] = useState(selectedLabel.notes || '');

  const handleSelectPreset = (preset: UniversalLabelTemplate) => {
    setSelectedLabel(preset);
    setProductName(preset.productName);
    setComplement(preset.complement || '');
    setPrepDate(preset.prepDate);
    setPrepTime(preset.prepTime);
    setExpiryDate(preset.expiryDate);
    setExpiryTime(preset.expiryTime);
    setExecutor(preset.executor);
    setChecker(preset.checker);
    setLotLocation(preset.lotLocation || '');
    setNotes(preset.notes || '');
  };

  const handleAddCustomLabel = () => {
    const newLbl: UniversalLabelTemplate = {
      id: `lbl-${Date.now()}`,
      productName: productName || 'Novo Produto Fracionado',
      complement,
      prepDate,
      prepTime,
      expiryDate,
      expiryTime,
      executor,
      checker,
      lotLocation,
      notes,
      category: 'Outros'
    };
    setLabels([newLbl, ...labels]);
  };

  const filteredLabels = filterCategory === 'all' 
    ? labels 
    : labels.filter(l => l.category === filterCategory);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      
      {/* Studio Control Header */}
      <div className="no-print bg-white p-5 rounded-xl border border-stone-300 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
          <div>
            <h2 className="text-base font-extrabold text-stone-900 flex items-center space-x-2">
              <Tag className="w-5 h-5 text-emerald-600" />
              <span>Gerador de Etiquetas Universais de Alimentos (Regra de Ouro)</span>
            </h2>
            <p className="text-xs text-stone-500">
              Crie, personalize e imprima folhas completas de etiquetas adesivas para porcionamento e fracionamento.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-stone-700">Etiquetas por Folha A4:</span>
            {[6, 8, 12].map((num) => (
              <button
                key={num}
                onClick={() => setCopiesPerPage(num)}
                className={`px-2.5 py-1 rounded text-xs font-bold font-mono transition-all ${
                  copiesPerPage === num
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {num} por folha
              </button>
            ))}
          </div>
        </div>

        {/* Preset Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-stone-600 mr-1">Presets Rápidos:</span>
          {['all', 'Açaí', 'Carnes & Peixes', 'Molhos', 'Pré-preparo'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                filterCategory === cat
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat === 'all' ? 'Todos os Insumos' : cat}
            </button>
          ))}
        </div>

        {/* Form to Customize or Add Label */}
        <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="font-bold text-stone-800 block mb-1">Nome do Produto</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded p-1.5 text-xs focus:ring-1 focus:ring-emerald-500 font-bold"
              placeholder="Ex: Açaí Grosso 300g"
            />
          </div>

          <div>
            <label className="font-bold text-stone-800 block mb-1">Variação / Corte / Lote</label>
            <input
              type="text"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded p-1.5 text-xs focus:ring-1 focus:ring-emerald-500"
              placeholder="Ex: Porção 120g / Lote 01"
            />
          </div>

          <div>
            <label className="font-bold text-stone-800 block mb-1">Data / Hora de Preparo</label>
            <div className="flex space-x-1">
              <input
                type="text"
                value={prepDate}
                onChange={(e) => setPrepDate(e.target.value)}
                className="w-2/3 bg-white border border-stone-300 rounded p-1.5 text-xs"
              />
              <input
                type="text"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                className="w-1/3 bg-white border border-stone-300 rounded p-1.5 text-xs text-center"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-800 block mb-1">Data / Hora Validade Limite</label>
            <div className="flex space-x-1">
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-2/3 bg-white border border-rose-300 text-rose-900 rounded p-1.5 text-xs font-bold"
              />
              <input
                type="text"
                value={expiryTime}
                onChange={(e) => setExpiryTime(e.target.value)}
                className="w-1/3 bg-white border border-rose-300 text-rose-900 rounded p-1.5 text-xs text-center font-bold"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-800 block mb-1">Executor (Quem preparou)</label>
            <input
              type="text"
              value={executor}
              onChange={(e) => setExecutor(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded p-1.5 text-xs"
            />
          </div>

          <div>
            <label className="font-bold text-stone-800 block mb-1">Conferente (Líder / Cozinha)</label>
            <input
              type="text"
              value={checker}
              onChange={(e) => setChecker(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded p-1.5 text-xs"
            />
          </div>

          <div>
            <label className="font-bold text-stone-800 block mb-1">Endereço / Gaveta de Guarda</label>
            <input
              type="text"
              value={lotLocation}
              onChange={(e) => setLotLocation(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded p-1.5 text-xs"
              placeholder="Ex: Freezer 01 / Gaveta A"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleAddCustomLabel}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 px-3 rounded text-xs flex items-center justify-center space-x-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Gerar Etiqueta Customizada</span>
            </button>
          </div>
        </div>
      </div>

      {/* The Printable Sticker Sheet (A4 Grid) */}
      <div className="bg-white border-2 border-stone-400 rounded-xl p-8 shadow-paper bg-blueprint-grid page-break-after">
        
        <div className="border-b-2 border-stone-800 pb-3 mb-6 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-800 uppercase bg-emerald-100 px-2 py-0.5 rounded">
              FOLHA DE ETIQUETAS ADESIVAS PADRONIZADAS
            </span>
            <h3 className="text-xl font-extrabold text-stone-900 mt-1">
              Bistrô Pai d'Égua • Rastreabilidade Universal
            </h3>
          </div>
          <span className="text-xs font-mono text-stone-500">
            Formato A4 • {copiesPerPage} Etiquetas por Página
          </span>
        </div>

        {/* Labels Grid */}
        <div className={`grid gap-4 ${
          copiesPerPage === 6 ? 'grid-cols-1 sm:grid-cols-2' :
          copiesPerPage === 8 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2' :
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {Array.from({ length: copiesPerPage }).map((_, index) => {
            const currentItem = filteredLabels[index % filteredLabels.length] || selectedLabel;
            return (
              <div 
                key={index} 
                className="bg-white border-2 border-stone-900 rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-between font-mono text-xs page-break-inside-avoid"
              >
                {/* Header Tag */}
                <div className="bg-stone-900 text-white py-1 px-2 text-[10px] font-extrabold tracking-wider uppercase rounded flex items-center justify-between mb-2">
                  <BrandLogo variant="horizontal" size="xs" theme="dark" />
                  <span className="text-amber-400 text-[9px] font-bold">RASTREABILIDADE</span>
                </div>

                {/* Product Name & Complement */}
                <div className="border-b-2 border-stone-300 pb-2 mb-2">
                  <div className="text-[9px] text-stone-500 font-bold uppercase">PRODUTO / INSUMO:</div>
                  <div className="text-sm font-extrabold text-stone-900 font-sans leading-tight">
                    {currentItem.productName}
                  </div>
                  {currentItem.complement && (
                    <div className="text-[10px] font-bold text-stone-600 mt-0.5">
                      {currentItem.complement}
                    </div>
                  )}
                </div>

                {/* Dates & Times */}
                <div className="grid grid-cols-2 gap-2 border-b-2 border-stone-300 pb-2 mb-2 text-[11px]">
                  <div className="bg-stone-50 p-1.5 rounded border border-stone-200">
                    <span className="text-[9px] text-stone-500 block uppercase font-bold">PREPARO / HORA:</span>
                    <span className="font-extrabold text-stone-900">{currentItem.prepDate}</span>
                    <span className="text-stone-600 block text-[10px]">{currentItem.prepTime}</span>
                  </div>

                  <div className="bg-rose-50 p-1.5 rounded border border-rose-300">
                    <span className="text-[9px] text-rose-700 block uppercase font-bold">VALIDADE / HORA:</span>
                    <span className="font-extrabold text-rose-950">{currentItem.expiryDate}</span>
                    <span className="text-rose-800 block text-[10px]">{currentItem.expiryTime}</span>
                  </div>
                </div>

                {/* Authors & Location */}
                <div className="grid grid-cols-2 gap-2 text-[10px] mb-2">
                  <div>
                    <span className="text-[9px] text-stone-500 block font-bold">EXECUTOR:</span>
                    <span className="font-bold text-stone-800">{currentItem.executor}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-stone-500 block font-bold">CONFERENTE:</span>
                    <span className="font-bold text-stone-800">{currentItem.checker}</span>
                  </div>
                </div>

                {/* Footer notes / rule */}
                <div className="pt-1.5 border-t border-dashed border-stone-300 flex items-center justify-between text-[9px] text-stone-500">
                  <span>{currentItem.lotLocation || "Cozinha / Estoque"}</span>
                  <span className="font-bold text-emerald-800">Sem etiqueta = Sem uso</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Warning */}
        <div className="mt-8 pt-3 border-t border-stone-300 text-center text-[10px] text-stone-400 font-mono">
          Padrão Obrigatório de Segurança Alimentar • Bistrô Pai d'Égua • Imprimir em papel adesivo A4
        </div>

      </div>

    </div>
  );
};
