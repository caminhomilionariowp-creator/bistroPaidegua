/* ================================================================== */
/*  Edições do gestor — sobrescritas de texto/itens guardadas no        */
/*  navegador do aparelho. Chave por "caminho" do conteúdo.             */
/* ================================================================== */

const KEY = 'bistro_pai_degua_conteudo_v1';

type Overrides = Record<string, unknown>;

const read = (): Overrides => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
};

const write = (o: Overrides) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(o));
  } catch (e) {
    console.error('Falha ao salvar edição', e);
  }
};

/** Notifica componentes que leem overrides para re-renderizarem. */
const listeners = new Set<() => void>();
export const subscribeContent = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
const emit = () => listeners.forEach((fn) => fn());

// Atualização vinda de outro aparelho (sincronização).
if (typeof window !== 'undefined') {
  window.addEventListener('bistro:sync', (e) => {
    const key = (e as CustomEvent).detail?.key as string | undefined;
    if (key === KEY) emit();
  });
}

export const hasOverride = (path: string): boolean => path in read();

export const getOverride = <T,>(path: string): T | undefined => read()[path] as T | undefined;

/** Valor final: a edição do gestor, se existir; senão o valor original. */
export const resolveText = (path: string, seed: string): string => {
  const o = read()[path];
  return typeof o === 'string' ? o : seed;
};

export const resolveList = (path: string, seed: string[]): string[] => {
  const o = read()[path];
  return Array.isArray(o) ? (o as string[]) : seed;
};

export const setOverride = (path: string, value: unknown): void => {
  const o = read();
  o[path] = value;
  write(o);
  emit();
};

export const clearOverride = (path: string): void => {
  const o = read();
  if (path in o) {
    delete o[path];
    write(o);
    emit();
  }
};

export const clearAllOverrides = (): void => {
  write({});
  emit();
};

export const overrideCount = (): number => Object.keys(read()).length;
