import React, { createContext, useContext, useState, useSyncExternalStore } from 'react';
import { subscribeContent, overrideCount } from './contentStore';

interface EditModeCtx {
  /** o colaborador logado é gestor */
  canEdit: boolean;
  /** modo de edição ligado */
  editing: boolean;
  setEditing: (v: boolean) => void;
  /** quantas edições existem agora */
  overrides: number;
}

const Ctx = createContext<EditModeCtx>({
  canEdit: false,
  editing: false,
  setEditing: () => {},
  overrides: 0,
});

export const EditModeProvider: React.FC<{ canEdit: boolean; children: React.ReactNode }> = ({
  canEdit,
  children,
}) => {
  const [editing, setEditingRaw] = useState(false);
  const overrides = useSyncExternalStore(subscribeContent, overrideCount, () => 0);
  const setEditing = (v: boolean) => setEditingRaw(canEdit && v);
  return (
    <Ctx.Provider value={{ canEdit, editing: canEdit && editing, setEditing, overrides }}>
      {children}
    </Ctx.Provider>
  );
};

export const useEditMode = () => useContext(Ctx);
