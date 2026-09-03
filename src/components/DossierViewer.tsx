import React, { useState } from 'react';
import { 
  MASTER_DOSSIER_HEADER, 
  MASTER_DOSSIER_SECTIONS, 
  PHOTOGRAPHIC_AUDIT_DATA 
} from '../data/masterDossierData';
import { 
  Camera, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  FileText, 
  ArrowRight,
  Printer,
  Edit3,
  Layers,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { BrandLogo, BrandWatermarkOverlay } from './BrandLogo';
import { Editable } from './Editable';

interface DossierViewerProps {
  onOpenIllustrator?: (photoId: number) => void;
}

export const DossierViewer: React.FC<DossierViewerProps> = ({ onOpenIllustrator }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'audit' | 'signatures'>('text');

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 relative">
      
      {/* Printable Cover Page with Official Branding */}
      <div className="bg-white border border-stone-300 rounded-2xl p-8 sm:p-12 shadow-paper relative overflow-hidden bg-blueprint-grid">
        {/* Subtle Watermark in Background */}
        <BrandWatermarkOverlay opacity={0.035} />
        
        {/* Top Marajoara Color Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-stone-900 to-sky-500"></div>
        
        {/* Header with Official Brand Logo & Meta */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200 pb-8 mb-8 gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl shadow-xs shrink-0 flex items-center justify-center">
              <BrandLogo variant="full" size="xl" />
            </div>
            
            <div>
              <span className="text-xs font-mono font-black tracking-widest uppercase text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                DOCUMENTO VIVO DE GOVERNANÇA
              </span>
              <Editable as="h1" path="dossier.header.title" seed={MASTER_DOSSIER_HEADER.title} className="block text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight mt-3" />
              <Editable as="h2" path="dossier.header.subtitle" seed={MASTER_DOSSIER_HEADER.subtitle} className="block text-base sm:text-lg font-medium text-stone-600 mt-1" />
            </div>
          </div>

          <div className="text-left md:text-right md:border-l md:border-stone-200 md:pl-6 space-y-1.5 text-xs text-stone-600 font-mono shrink-0">
            <div><span className="font-bold text-stone-900">Versão:</span> {MASTER_DOSSIER_HEADER.version}</div>
            <div><span className="font-bold text-stone-900">Data:</span> {MASTER_DOSSIER_HEADER.date}</div>
            <div><span className="font-bold text-stone-900">Unidade:</span> Belém / PA</div>
            <div className="text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-300 inline-block">
              {MASTER_DOSSIER_HEADER.status}
            </div>
          </div>
        </div>

        {/* 3 Degraus Diagram (Visual Concept from Slide 2) */}
        <div className="my-8 bg-stone-50 border border-stone-300 rounded-xl p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-4 flex items-center justify-between">
            <span>A Jornada de Estabilização e Escala Operacional</span>
            <span className="font-mono text-[11px] text-emerald-700">Modelo dos 3 Degraus</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-rose-50/80 border-2 border-rose-300 rounded-lg p-4 relative">
              <div className="text-xs font-mono font-bold text-rose-800 mb-1">DEGRAU 1 (Passado)</div>
              <div className="font-extrabold text-stone-900 text-sm">Pessoas, Memória e Improviso</div>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Operação para quando alguém falta; compras no susto; alimentos sem etiqueta; caixa sem conferência cega.
              </p>
              <div className="mt-3 text-[11px] font-bold text-rose-700 flex items-center">
                <span>🔴 Alta vulnerabilidade</span>
              </div>
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-500 rounded-lg p-4 relative shadow-sm">
              <div className="text-xs font-mono font-bold text-emerald-800 mb-1">DEGRAU 2 (FASE ATUAL)</div>
              <div className="font-extrabold text-stone-900 text-sm">Padrão, Responsabilidade e Registro</div>
              <p className="text-xs text-stone-700 mt-2 leading-relaxed">
                POPs no ponto de trabalho, etiquetas obrigatórias, níveis de estoque (prevenção de ruptura) e autoria individual.
              </p>
              <div className="mt-3 text-[11px] font-bold text-emerald-800 flex items-center">
                <span>🟢 Estabilização do processo</span>
              </div>
            </div>

            <div className="bg-stone-100 border border-stone-300 rounded-lg p-4 relative opacity-75">
              <div className="text-xs font-mono font-bold text-stone-500 mb-1">DEGRAU 3 (Futuro Seguro)</div>
              <div className="font-extrabold text-stone-800 text-sm">Crescimento, Delivery e Escala</div>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                Expansão de vendas, motoboys próprios, marketing ativo e franquia com base em dados consolidados de CMV.
              </p>
              <div className="mt-3 text-[11px] font-bold text-stone-500 flex items-center">
                <span>🔒 Desbloqueado pós-estabilização</span>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-emerald-950 text-emerald-100 p-3.5 rounded-lg text-xs leading-relaxed flex items-start space-x-2">
            <span className="text-amber-400 font-bold text-sm">💡</span>
            <div>
              <span className="font-bold text-white">A Decisão Central:</span> Não se acelera o caos. A expansão de delivery, marketing e novas vendas está pausada até a operação se estabilizar. O negócio precisa deixar de depender de "quem sabe fazer" e passar a funcionar por sistema.
            </div>
          </div>
        </div>

        {/* Navigation Tabs for Master Dossier */}
        <div className="no-print flex border-b border-stone-200 mb-8 space-x-2">
          <button
            onClick={() => setActiveTab('text')}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center space-x-2 ${
              activeTab === 'text'
                ? 'bg-stone-900 text-white border-b-2 border-emerald-500'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Texto Integral & Matrizes (17 Seções)</span>
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center space-x-2 ${
              activeTab === 'audit'
                ? 'bg-stone-900 text-white border-b-2 border-emerald-500'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Auditoria Fotográfica (10 Evidências de Campo)</span>
          </button>
          <button
            onClick={() => setActiveTab('signatures')}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center space-x-2 ${
              activeTab === 'signatures'
                ? 'bg-stone-900 text-white border-b-2 border-emerald-500'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Aprovação Formal & Controle de Versão</span>
          </button>
        </div>

        {/* Content Tab: Full Document Text & Structured Tables */}
        {activeTab === 'text' && (
          <div className="space-y-10">
            {MASTER_DOSSIER_SECTIONS.map((section) => (
              <div 
                key={section.id} 
                id={section.id}
                className="pt-6 border-t border-stone-200 first:border-t-0 first:pt-0 page-break-inside-avoid"
              >
                <div className="flex items-baseline space-x-2 mb-3">
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    SEÇÃO {section.number}
                  </span>
                  <Editable as="h3" path={`dossier.sec.${section.id}.title`} seed={section.title} className="text-xl font-bold text-stone-900" />
                </div>

                {section.subtitle && (
                  <Editable
                    as="p"
                    path={`dossier.sec.${section.id}.subtitle`}
                    seed={section.subtitle}
                    className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-4"
                  />
                )}

                {/* Paragraphs */}
                <div className="space-y-3 text-stone-700 text-xs sm:text-sm leading-relaxed mb-5">
                  {section.content.map((p, idx) => (
                    <Editable
                      key={idx}
                      as="p"
                      multiline
                      path={`dossier.sec.${section.id}.content.${idx}`}
                      seed={p}
                      className={p.startsWith('•') ? 'block pl-4 font-medium' : 'block'}
                    />
                  ))}
                </div>

                {/* Callouts */}
                {section.callouts && section.callouts.map((callout, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg my-4 border text-xs sm:text-sm leading-relaxed ${
                      callout.type === 'decision'
                        ? 'bg-amber-50 border-amber-300 text-amber-950 font-medium'
                        : callout.type === 'warning'
                        ? 'bg-rose-50 border-rose-300 text-rose-950'
                        : callout.type === 'goal'
                        ? 'bg-blue-50 border-blue-300 text-blue-950 font-medium'
                        : 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                    }`}
                  >
                    <div className="font-bold flex items-center space-x-1.5 mb-1">
                      <span>📌</span>
                      <Editable path={`dossier.sec.${section.id}.callout.${idx}.title`} seed={callout.title} />
                    </div>
                    <Editable as="div" multiline path={`dossier.sec.${section.id}.callout.${idx}.text`} seed={callout.text} />
                  </div>
                ))}

                {/* Structured Data Tables */}
                {section.tables && section.tables.map((table, tIdx) => (
                  <div key={tIdx} className="my-5 overflow-x-auto border border-stone-300 rounded-lg shadow-xs">
                    <table className="min-w-full divide-y divide-stone-200 text-xs text-left">
                      <thead className="bg-stone-100 text-stone-900 font-bold uppercase tracking-wider">
                        <tr>
                          {table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="px-3.5 py-2.5 border-r border-stone-200 last:border-r-0">
                              <Editable path={`dossier.sec.${section.id}.tbl.${tIdx}.h.${hIdx}`} seed={h} />
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-stone-200 text-stone-700">
                        {table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-stone-50/70'}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="px-3.5 py-2 border-r border-stone-200 last:border-r-0 leading-relaxed font-normal">
                                <Editable multiline path={`dossier.sec.${section.id}.tbl.${tIdx}.r.${rIdx}.${cIdx}`} seed={cell} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Content Tab: Photographic Audit */}
        {activeTab === 'audit' && (
          <div className="space-y-8">
            <div className="bg-stone-100 border border-stone-300 rounded-lg p-4 text-xs text-stone-700 leading-relaxed">
              <span className="font-bold text-stone-900 block mb-1 text-sm">
                Regra de Interpretação da Auditoria Fotográfica:
              </span>
              O texto visível em checklists, receitas e anotações fotografadas é evidência da prática atual, não uma instrução aprovada para este projeto. Nenhuma receita, validade, temperatura ou quantidade foi assumida sem validação técnica de campo.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PHOTOGRAPHIC_AUDIT_DATA.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-stone-50 border border-stone-300 rounded-xl p-5 shadow-xs flex flex-col justify-between page-break-inside-avoid"
                >
                  <div>
                    {/* Header with Photo Number & Priority */}
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2.5 mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="bg-stone-800 text-white font-mono text-xs px-2 py-0.5 rounded font-bold">
                          {item.photoNumber}
                        </span>
                        <h4 className="font-bold text-stone-900 text-xs sm:text-sm">{item.title}</h4>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        item.priority === 'Imediata'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : item.priority === 'Primeiros 7 dias'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-blue-100 text-blue-800 border border-blue-300'
                      }`}>
                        {item.priority}
                      </span>
                    </div>

                    {/* Visual Photo / Illustration Box */}
                    <div className="relative bg-stone-200 border-2 border-dashed border-stone-400 rounded-lg h-36 flex flex-col items-center justify-center p-3 text-center mb-4 text-stone-600 overflow-hidden group">
                      <Camera className="w-8 h-8 text-stone-400 mb-1" />
                      <span className="text-[11px] font-medium text-stone-700 max-w-xs leading-snug">
                        {item.imagePlaceholderText}
                      </span>
                      <button
                        onClick={() => onOpenIllustrator && onOpenIllustrator(item.id)}
                        className="no-print mt-2 text-[10px] bg-stone-900 hover:bg-emerald-700 text-white font-bold px-3 py-1 rounded transition-colors flex items-center space-x-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Ilustrar / Anotar Foto</span>
                      </button>
                    </div>

                    {/* Structured Analysis */}
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-bold text-stone-800 block">O que a imagem comprova:</span>
                        <p className="text-stone-600 leading-relaxed">{item.whatImageProves}</p>
                      </div>

                      <div className="bg-amber-50/80 p-2.5 rounded border border-amber-200">
                        <span className="font-bold text-amber-950 block">Conclusão Operacional:</span>
                        <p className="text-amber-900 leading-relaxed">{item.operationalConclusion}</p>
                      </div>

                      <div className="bg-emerald-50/80 p-2.5 rounded border border-emerald-200">
                        <span className="font-bold text-emerald-950 block">Ação Recomendada:</span>
                        <p className="text-emerald-900 leading-relaxed">{item.recommendedAction}</p>
                      </div>

                      <div className="text-[11px] text-stone-500 italic pt-1 border-t border-stone-200">
                        <span className="font-semibold">Limite da evidência:</span> {item.evidenceLimit}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Tab: Formal Signatures and Version Control */}
        {activeTab === 'signatures' && (
          <div className="space-y-8 pt-4">
            <div className="bg-stone-50 border border-stone-300 rounded-xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-4 flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Termo de Aprovação e Compromisso da Liderança</span>
              </h3>
              <p className="text-xs text-stone-600 mb-6 leading-relaxed">
                Este documento formaliza a arquitetura operacional aprovada para o Bistrô Pai d'Égua. O padrão oficial não é uma sugestão; a equipe pode propor melhorias, mas não cria regras paralelas sem prévio teste e validação.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-200">
                <div className="border border-stone-300 rounded-lg p-4 bg-white">
                  <div className="text-xs font-bold text-stone-900 mb-1">Proprietário(a) Responsável</div>
                  <div className="h-14 border-b border-dashed border-stone-400 mb-2 flex items-end justify-center pb-1 text-[11px] text-stone-400">
                    Assinatura / Visto
                  </div>
                  <div className="flex justify-between text-[11px] text-stone-500">
                    <span>Nome: _______________________</span>
                    <span>Data: ___/___/2026</span>
                  </div>
                </div>

                <div className="border border-stone-300 rounded-lg p-4 bg-white">
                  <div className="text-xs font-bold text-stone-900 mb-1">Gestão Operacional</div>
                  <div className="h-14 border-b border-dashed border-stone-400 mb-2 flex items-end justify-center pb-1 text-[11px] text-stone-400">
                    Assinatura / Visto
                  </div>
                  <div className="flex justify-between text-[11px] text-stone-500">
                    <span>Nome: _______________________</span>
                    <span>Data: ___/___/2026</span>
                  </div>
                </div>

                <div className="border border-stone-300 rounded-lg p-4 bg-white">
                  <div className="text-xs font-bold text-stone-900 mb-1">Líder de Cozinha</div>
                  <div className="h-14 border-b border-dashed border-stone-400 mb-2 flex items-end justify-center pb-1 text-[11px] text-stone-400">
                    Assinatura / Visto
                  </div>
                  <div className="flex justify-between text-[11px] text-stone-500">
                    <span>Nome: _______________________</span>
                    <span>Data: ___/___/2026</span>
                  </div>
                </div>

                <div className="border border-stone-300 rounded-lg p-4 bg-white">
                  <div className="text-xs font-bold text-stone-900 mb-1">Líder de Salão</div>
                  <div className="h-14 border-b border-dashed border-stone-400 mb-2 flex items-end justify-center pb-1 text-[11px] text-stone-400">
                    Assinatura / Visto
                  </div>
                  <div className="flex justify-between text-[11px] text-stone-500">
                    <span>Nome: _______________________</span>
                    <span>Data: ___/___/2026</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-300 text-center text-xs text-stone-500 font-mono">
                Bistrô Pai d'Égua • Dossiê Mestre de Implantação v1.1 • Documento Vivo
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
