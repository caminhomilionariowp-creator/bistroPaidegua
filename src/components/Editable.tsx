import React, { useState } from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown, RotateCcw } from 'lucide-react';
import { useEditMode } from '../lib/editMode';
import {
  resolveText,
  resolveList,
  setOverride,
  clearOverride,
  hasOverride,
} from '../lib/contentStore';

/* ---------- Texto editável ---------- */

interface EditableProps {
  path: string;
  seed: string;
  as?: React.ElementType;
  className?: string;
  /** deixa quebrar linha (textarea-like) */
  multiline?: boolean;
}

export const Editable: React.FC<EditableProps> = ({
  path,
  seed,
  as = 'span',
  className = '',
  multiline = false,
}) => {
  const { canEdit, editing } = useEditMode();
  const [, force] = useState(0);
  const El = as as any;
  const value = resolveText(path, seed);

  if (!(canEdit && editing)) {
    return <El className={className}>{value}</El>;
  }

  const overridden = hasOverride(path);

  return (
    <El
      className={`${className} outline-dashed outline-1 rounded-sm px-0.5 -mx-0.5 transition-colors ${
        overridden ? 'outline-amber-400 bg-amber-50/60' : 'outline-emerald-400/70'
      } focus:outline-emerald-600 focus:bg-emerald-50 hover:bg-emerald-50/40 cursor-text`}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      style={multiline ? { whiteSpace: 'pre-wrap' } : undefined}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const t = (e.currentTarget.textContent ?? '').replace(/ /g, ' ');
        if (t === seed) clearOverride(path);
        else setOverride(path, t);
        force((n) => n + 1);
      }}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (!multiline && e.key === 'Enter') {
          e.preventDefault();
          (e.currentTarget as HTMLElement).blur();
        }
      }}
    >
      {value}
    </El>
  );
};

/* ---------- Lista de textos editável (passos, regras, itens) ---------- */

interface EditableListProps {
  path: string;
  seed: string[];
  /** render de cada item no modo leitura */
  read: (text: string, i: number) => React.ReactNode;
  /** placeholder do campo de novo item */
  addLabel?: string;
  className?: string;
}

export const EditableList: React.FC<EditableListProps> = ({
  path,
  seed,
  read,
  addLabel = 'Novo item…',
  className = '',
}) => {
  const { canEdit, editing } = useEditMode();
  const items = resolveList(path, seed);
  const [draft, setDraft] = useState('');

  const commit = (next: string[]) => {
    if (next.length === seed.length && next.every((v, i) => v === seed[i])) clearOverride(path);
    else setOverride(path, next);
  };

  if (!(canEdit && editing)) {
    return <>{items.map((it, i) => read(it, i))}</>;
  }

  const update = (i: number, v: string) => commit(items.map((x, idx) => (idx === i ? v : x)));
  const remove = (i: number) => commit(items.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    commit(next);
  };
  const add = () => {
    if (!draft.trim()) return;
    commit([...items, draft.trim()]);
    setDraft('');
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {items.map((it, i) => (
        <div key={i} className="flex items-start gap-1.5">
          <div className="flex flex-col pt-1">
            <button onClick={() => move(i, -1)} className="text-stone-300 hover:text-stone-600 cursor-pointer">
              <ChevronUp className="w-3 h-3" />
            </button>
            <button onClick={() => move(i, 1)} className="text-stone-300 hover:text-stone-600 cursor-pointer">
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <textarea
            value={it}
            onChange={(e) => update(i, e.target.value)}
            rows={Math.max(1, Math.ceil(it.length / 70))}
            className="flex-1 text-xs bg-white border border-emerald-300 rounded px-2 py-1 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 resize-none"
          />
          <button
            onClick={() => remove(i)}
            className="mt-1 text-rose-400 hover:text-rose-600 cursor-pointer"
            title="Remover"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
      <div className="flex items-center gap-1.5">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
          placeholder={addLabel}
          className="flex-1 text-xs bg-emerald-50 border border-emerald-300 rounded px-2 py-1 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
        />
        <button
          onClick={add}
          className="text-emerald-700 hover:text-emerald-900 cursor-pointer flex items-center gap-1 text-xs font-bold"
        >
          <Plus className="w-3.5 h-3.5" /> Adicionar
        </button>
      </div>
      {hasOverride(path) && (
        <button
          onClick={() => clearOverride(path)}
          className="text-[10px] text-stone-400 hover:text-stone-700 flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" /> reverter esta lista ao original
        </button>
      )}
    </div>
  );
};
