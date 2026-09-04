import React, { useState } from 'react';
import { FORMS_DATA } from '../data/formsData';
import { OperationalForm } from '../types';
import { 
  CheckCircle2, 
  Printer, 
  Plus, 
  Trash2, 
  Calendar, 
  User, 
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import { BrandLogo, BrandWatermarkOverlay } from './BrandLogo';
import { Editable } from './Editable';

interface FormsViewerProps {
  selectedFormId?: string;
}

export const FormsViewer: React.FC<FormsViewerProps> = ({ selectedFormId }) => {
  const [activeFormId, setActiveFormId] = useState<string>(selectedFormId || FORMS_DATA[0].id);
  const [interactiveMode, setInteractiveMode] = useState<boolean>(false);

  const currentForm = FORMS_DATA.find((f) => f.id === activeFormId) || FORMS_DATA[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      
      {/* Selector & Options Header (No-print) */}
      <div className="no-print bg-white p-4 rounded-xl border border-stone-300 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-extrabold text-stone-900 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Formulários Operacionais & Checklists (Modelos Oficiais de Prancheta)</span>
          </h2>
          <p className="text-xs text-stone-500">
            Formulários desenhados para preenchimento físico a caneta ou conferência em tablet/contingência.
          </p>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 max-w-full">
          {FORMS_DATA.map((form) => (
            <button
              key={form.id}
              onClick={() => setActiveFormId(form.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeFormId === form.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {form.code}: {form.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Official Form Sheet (Print A4 Styled) */}
      <div 
        id="printable-form"
        className="bg-white border-2 border-stone-800 rounded-xl p-6 sm:p-8 shadow-paper relative page-break-after overflow-hidden"
      >
        {/* Subtle Brand Watermark */}
        <BrandWatermarkOverlay opacity={0.035} />

        {/* Formal Document Header Table */}
        <div className="relative z-10 border border-stone-900 mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-12 border-b border-stone-900">
            <div className="sm:col-span-3 p-3 bg-stone-900 text-white flex flex-col justify-center items-center text-center">
              <BrandLogo variant="horizontal" size="xs" theme="dark" />
              <span className="font-extrabold text-[11px] mt-1 text-emerald-400">CONTROLE OFICIAL</span>
            </div>
            <div className="sm:col-span-6 p-2 flex flex-col justify-center items-center text-center border-y sm:border-y-0 sm:border-r sm:border-l border-stone-900 bg-stone-50">
              <span className="text-[10px] font-bold text-stone-500 uppercase">FORMULÁRIO OPERACIONAL DE CAMPO</span>
              <h1 className="font-extrabold text-sm sm:text-base text-stone-900 leading-tight">
                <Editable path={`form.${currentForm.id}.title`} seed={currentForm.title} />
              </h1>
            </div>
            <div className="sm:col-span-3 p-2 bg-stone-50 flex flex-col justify-center text-[11px] font-mono text-stone-800 space-y-0.5">
              <div><span className="font-bold">CÓDIGO:</span> {currentForm.code}</div>
              <div><span className="font-bold">SETOR:</span> <Editable path={`form.${currentForm.id}.sector`} seed={currentForm.sector} /></div>
              <div><span className="font-bold">FREQ:</span> <Editable path={`form.${currentForm.id}.frequency`} seed={currentForm.frequency} /></div>
            </div>
          </div>

          {/* Header Metadata Input Fields */}
          <div className="p-3 bg-stone-50/70 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {currentForm.fields.map((field) => (
              <div key={field.id} className="border-b border-stone-400 pb-1 flex items-baseline justify-between">
                <span className="font-bold text-stone-700 text-[11px]">
                  <Editable path={`form.${currentForm.id}.field.${field.id}`} seed={field.label} />:
                </span>
                <span className="text-stone-400 font-mono text-[11px] italic">
                  {field.placeholder || "__________________"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Purpose Callout */}
        <div className="mb-4 text-[11px] text-stone-600 italic bg-stone-50 p-2 rounded border border-stone-200">
          <span className="font-bold text-stone-800 not-italic">Finalidade Oficial: </span>
          <Editable path={`form.${currentForm.id}.purpose`} seed={currentForm.purpose} multiline />

        </div>

        {/* Structured Printable Data Table */}
        {currentForm.tableTemplate && (
          <div className="overflow-x-auto border border-stone-800 rounded-sm mb-6">
            <table className="min-w-full divide-y divide-stone-800 text-xs text-left">
              <thead className="bg-stone-200 text-stone-900 font-extrabold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-2.5 py-2 border-r border-stone-800 w-8 text-center">#</th>
                  {currentForm.tableTemplate.columns.map((col, idx) => (
                    <th key={idx} className="px-3 py-2 border-r border-stone-800 last:border-r-0">
                      <Editable path={`form.${currentForm.id}.col.${idx}`} seed={col} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-stone-300 font-mono text-xs">
                {currentForm.tableTemplate.sampleRows && currentForm.tableTemplate.sampleRows.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'}>
                    <td className="px-2 py-2 border-r border-stone-800 text-center font-bold text-stone-500 text-[11px]">
                      {rIdx + 1}
                    </td>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3 py-2 border-r border-stone-300 last:border-r-0 text-stone-800 font-sans text-xs">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Additional Blank Rows for Manual Writing when printed */}
                {Array.from({ length: 4 }).map((_, bIdx) => (
                  <tr key={`blank-${bIdx}`} className="h-9">
                    <td className="px-2 py-2 border-r border-stone-800 text-center text-stone-400 text-[10px]">
                      {(currentForm.tableTemplate?.sampleRows?.length || 0) + bIdx + 1}
                    </td>
                    {currentForm.tableTemplate?.columns.map((_, cIdx) => (
                      <td key={cIdx} className="border-r border-stone-300 last:border-r-0"></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Bottom Signature & Verification Area */}
        <div className="grid grid-cols-2 gap-8 pt-4 border-t-2 border-stone-800 text-xs page-break-inside-avoid">
          <div className="border border-stone-300 p-3 rounded bg-stone-50/50">
            <div className="font-bold text-stone-900 mb-1">
              <Editable path={`form.${currentForm.id}.sig.executor`} seed={currentForm.signatureBlock.executorTitle} />
            </div>
            <div className="h-10 border-b border-dashed border-stone-400 mb-2"></div>
            <div className="flex justify-between text-[10px] text-stone-500 font-mono">
              <span>Assinatura: ________________</span>
              <span>Hora: ___:___</span>
            </div>
          </div>

          <div className="border border-stone-300 p-3 rounded bg-stone-50/50">
            <div className="font-bold text-stone-900 mb-1">
              <Editable path={`form.${currentForm.id}.sig.checker`} seed={currentForm.signatureBlock.checkerTitle} />
            </div>
            <div className="h-10 border-b border-dashed border-stone-400 mb-2"></div>
            <div className="flex justify-between text-[10px] text-stone-500 font-mono">
              <span>Visto de Auditoria: ________</span>
              <span>Status: [ ] Aprovado</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-4 pt-2 border-t border-stone-300 flex justify-between text-[10px] text-stone-400 font-mono">
          <span>Bistrô Pai d'Égua • Sistema Operacional v1.1</span>
          <span>Folha de Auditoria Obrigatória • Retenção: 90 dias</span>
        </div>

      </div>

    </div>
  );
};
