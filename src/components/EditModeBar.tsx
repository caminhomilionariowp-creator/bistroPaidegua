import React, { useState } from 'react';
import { Pencil, X, RotateCcw, Check } from 'lucide-react';
import { useEditMode } from '../lib/editMode';
import { clearAllOverrides } from '../lib/contentStore';

/** Barra flutuante de edição — só aparece para o gestor. */
export const EditModeBar: React.FC = () => {
  const { canEdit, editing, setEditing, overrides } = useEditMode();
  const [confirmReset, setConfirmReset] = useState(false);

  if (!canEdit) return null;

  return (
    <div className="no-print fixed bottom-4 right-4 z-50">
      {editing ? (
        <div className="bg-stone-900 text-white rounded-2xl shadow-2xl border border-stone-700 p-3 w-64 animate-slide-up">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <Pencil className="w-3.5 h-3.5 text-emerald-400" /> Modo edição
            </span>
            <button
              onClick={() => setEditing(false)}
              className="text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] text-stone-400 leading-snug mb-2">
            Toque em qualquer texto tracejado para editar. As mudanças ficam salvas neste aparelho.
          </p>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-stone-300">
              {overrides === 0 ? 'Nenhuma edição' : `${overrides} edição(ões)`}
            </span>
            {overrides > 0 &&
              (confirmReset ? (
                <span className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      clearAllOverrides();
                      setConfirmReset(false);
                    }}
                    className="text-rose-300 font-bold hover:text-rose-200 cursor-pointer flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" /> confirmar
                  </button>
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="text-stone-400 hover:text-white cursor-pointer"
                  >
                    não
                  </button>
                </span>
              ) : (
                <button
                  onClick={() => setConfirmReset(true)}
                  className="text-stone-400 hover:text-white cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> reverter tudo
                </button>
              ))}
          </div>
          <button
            onClick={() => setEditing(false)}
            className="mt-2.5 w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-1.5 rounded-lg cursor-pointer"
          >
            Concluir
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="bg-stone-900 hover:bg-stone-800 text-white rounded-full shadow-2xl border border-stone-700 pl-3 pr-4 py-2.5 flex items-center gap-2 text-xs font-bold cursor-pointer animate-scale-in"
          title="Editar textos e itens (gestor)"
        >
          <Pencil className="w-4 h-4 text-emerald-400" />
          Editar sistema
          {overrides > 0 && (
            <span className="bg-amber-400 text-stone-950 text-[10px] font-black px-1.5 py-0.5 rounded-full">
              {overrides}
            </span>
          )}
        </button>
      )}
    </div>
  );
};
