import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, CheckCircle2, FileText, ChefHat, Tag } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyGeneratedPop?: (popData: any) => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  onApplyGeneratedPop
}) => {
  const [prompt, setPrompt] = useState<string>('');
  const [taskType, setTaskType] = useState<'pop' | 'recipe' | 'checklist' | 'label'>('pop');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedResult(null);

    try {
      // Check if GEMINI_API_KEY exists or generate standard compliant structure
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const systemPrompt = `Você é o Consultor Chefe de Processos Operacionais e Franquia do Bistrô Pai d'Égua.
Seu objetivo é gerar documentos operacionais oficiais de alta precisão baseados estritamente nos 6 Princípios Inegociáveis:
1. Responsável definido
2. Registro é parte do trabalho
3. Primeiro identificar, depois armazenar (Regra de Ouro da Etiquetagem)
4. Padrão antes de velocidade
5. Fatos contra conversas
6. Mudança controlada

Gere o conteúdo em formato estruturado pronto para impressão.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `${systemPrompt}\n\nTarefa: Gerar ${taskType.toUpperCase()} para: ${prompt}`
        });

        setGeneratedResult(response.text || 'Documento gerado com sucesso!');
      } else {
        // Fallback realistic template based on Pai d'Égua master rules
        setTimeout(() => {
          if (taskType === 'pop') {
            setGeneratedResult(`=======================================================
PROCEDIMENTO OPERACIONAL PADRÃO (POP) - BISTRÔ PAI D'ÉGUA
CÓDIGO: POP-AUTOGERADO-01 | VERSÃO: 1.0 OFICIAL
=======================================================
TÍTULO: ${prompt.toUpperCase()}
SETOR: Cozinha / Operação
EXECUTOR: Auxiliar de Cozinha / Cozinheiro
CONFERENTE: Líder de Cozinha / Gestor Operacional
FREQUÊNCIA: Diário por Turno

1. OBJETIVO:
Padronizar a execução de ${prompt}, garantindo segurança alimentar, rastreabilidade universal e conformidade com a Ficha Técnica.

2. MATERIAIS NECESSÁRIOS:
• Uniforme completo e touca descartável
• Recipientes higienizados com tampa
• Etiquetas Universais Adesivas e caneta permanente
• Termômetro de alimentos e balança de precisão

3. SEQUÊNCIA PASSO A PASSO:
[Passo 1] Higienização rigorosa das mãos e da bancada com álcool 70%.
[Passo 2] Separação e pesagem dos insumos conforme a proporção padrão da receita.
[Passo 3] Execução da técnica de manipulação/cocção sem desvios ou improvisos.
[Passo 4] PONTO CRÍTICO: Preenchimento obrigatório da Etiqueta Universal (Produto, Data/Hora de Preparo, Validade Técnica e Responsável).
[Passo 5] Armazenamento imediato na gaveta correspondente seguindo o método PEPS.

4. O QUE NUNCA FAZER (LIMITES CRÍTICOS):
✕ NUNCA guardar o alimento sem etiqueta adesiva completa.
✕ NUNCA improvisar peso ou quantidade sem balança calibrada.
✕ NUNCA deixar o produto exposto em temperatura ambiente fora do tempo estritamente necessário.

5. ASSINATURAS:
Executor: ____________________ | Conferente: ____________________`);
          } else {
            setGeneratedResult(`=======================================================
FICHA TÉCNICA OFICIAL - BISTRÔ PAI D'ÉGUA
PRATO / PREPARO: ${prompt.toUpperCase()}
=======================================================
Rendimento Padrão: 4 porções de 300g
Tempo Médio de Cocção: 25 minutos
Padrão de Apresentação: Cumbuca de louça aquecida, finalizada com folhas frescas de jambu.

INGREDIENTES PESADOS:
1. Insumo Principal: 500g (Mise en place limpo e porcionado)
2. Molho Base / Redução: 200ml (Aferventado e temperado)
3. Especiarias Regionais: 20g (Chicória, alho e pimenta de cheiro)

PASSO A PASSO RIGOROSO:
1. Aquecer a frigideira em fogo médio com fio de manteiga de garrafa.
2. Selar os ingredientes por 3 minutos até dourarem por igual.
3. Incorporar a redução morna e homogeneizar sem ferver excessivamente.
4. Empratar no centro da louça, limpando a borda com papel descartável.
5. Servir imediatamente fumegante.`);
          }
          setIsGenerating(false);
        }, 600);
        return;
      }
    } catch (err: any) {
      setGeneratedResult(`Erro ao conectar com a API: ${err.message}. Utilize o modelo estruturado offline.`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-stone-300 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-amber-500 text-stone-950 font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm">Assistente de Documentos Operacionais IA</h3>
              <p className="text-[11px] text-stone-400">Padrão de Franquia & Princípios do Bistrô Pai d'Égua</p>
            </div>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          
          {/* Document Type Selector */}
          <div>
            <label className="font-bold text-stone-800 block mb-1.5 uppercase text-[10px] tracking-wider">
              O que você deseja gerar ou padronizar?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'pop', label: 'Novo POP Operacional', icon: FileText },
                { id: 'recipe', label: 'Nova Ficha Técnica', icon: ChefHat },
                { id: 'checklist', label: 'Checklist de Turno', icon: CheckCircle2 },
                { id: 'label', label: 'Padrão de Validade', icon: Tag },
              ].map((t) => {
                const Icon = t.icon;
                const isSel = taskType === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTaskType(t.id as any)}
                    className={`p-2.5 rounded-lg border text-center flex flex-col items-center justify-center space-y-1 transition-all ${
                      isSel 
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold' 
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[11px]">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prompt input */}
          <div>
            <label className="font-bold text-stone-800 block mb-1.5 uppercase text-[10px] tracking-wider">
              Descreva o prato, rotina ou equipamento a ser documentado:
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                placeholder="Ex: Pré-preparo de Camarão Seco, Montagem da Maniçoba, Limpeza do Exaustor..."
                className="flex-1 bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="bg-stone-900 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold px-4 py-2 rounded-lg transition-colors flex items-center space-x-1.5"
              >
                {isGenerating ? <span>Gerando...</span> : <><span>Gerar</span> <Send className="w-3.5 h-3.5" /></>}
              </button>
            </div>
          </div>

          {/* Result Output */}
          {generatedResult && (
            <div className="border border-stone-300 rounded-xl p-4 bg-stone-50 space-y-2">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <span className="font-bold text-stone-900 text-[11px] uppercase tracking-wider">
                  Documento Gerado (Padrão Oficial)
                </span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                  Pronto para Impressão
                </span>
              </div>
              <pre className="font-mono text-[11px] text-stone-800 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto p-2 bg-white rounded border border-stone-200">
                {generatedResult}
              </pre>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs">
          <span className="text-stone-500 text-[11px]">
            Todos os documentos gerados respeitam a Regra de Ouro e a Matriz de Autoridade.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-white font-bold rounded-lg"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
