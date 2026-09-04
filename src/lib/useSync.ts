import { useEffect, useRef } from 'react';
import { onSyncKey } from './db';

/**
 * Recarrega o estado local do componente quando as chaves informadas
 * chegam de outro aparelho (sincronização). Chave exata ou prefixo "…*".
 */
export const useSyncRefresh = (keys: string[], refetch: () => void) => {
  const ref = useRef(refetch);
  ref.current = refetch;
  const sig = keys.join('|');
  useEffect(() => onSyncKey(sig.split('|'), () => ref.current()), [sig]);
};
