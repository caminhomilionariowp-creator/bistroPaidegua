/* ================================================================== */
/*  Encolhe cada folha impressa (marcada com data-print-fit) pra caber */
/*  inteira numa página A3 — sem dividir conteúdo em 2 folhas.         */
/* ================================================================== */
import { useEffect } from 'react';

const MM_TO_PX = 96 / 25.4;

/** Área útil da folha (tamanho A3 menos as margens de 8mm de cada lado). */
const USABLE_MM: Record<'landscape' | 'portrait', { w: number; h: number }> = {
  landscape: { w: 420 - 16, h: 297 - 16 },
  portrait: { w: 297 - 16, h: 420 - 16 },
};

const clearFit = (el: HTMLElement) => {
  el.style.transform = '';
  el.style.transformOrigin = '';
  (el.style as any).width = el.dataset.printFitOrigWidth || '';
  delete el.dataset.printFitOrigWidth;
};

const applyFit = () => {
  const sheets = document.querySelectorAll<HTMLElement>('[data-print-fit]');
  sheets.forEach((el) => {
    const orientation = (el.dataset.printFit === 'portrait' ? 'portrait' : 'landscape') as
      | 'landscape'
      | 'portrait';
    const usable = USABLE_MM[orientation];
    const targetWpx = usable.w * MM_TO_PX;
    const targetHpx = usable.h * MM_TO_PX;

    // Layout na largura real da folha antes de medir a altura natural.
    el.dataset.printFitOrigWidth = el.style.width;
    el.style.transform = '';
    el.style.width = `${targetWpx}px`;

    const naturalW = el.scrollWidth || targetWpx;
    const naturalH = el.scrollHeight || targetHpx;
    const scale = Math.min(1, targetWpx / naturalW, targetHpx / naturalH);

    el.style.transformOrigin = 'top left';
    el.style.transform = scale < 1 ? `scale(${scale})` : '';
  });
};

const clearAllFits = () => {
  document.querySelectorAll<HTMLElement>('[data-print-fit]').forEach(clearFit);
};

let listenersAttached = false;
const attachGlobalListeners = () => {
  if (listenersAttached || typeof window === 'undefined') return;
  listenersAttached = true;
  window.addEventListener('beforeprint', applyFit);
  window.addEventListener('afterprint', clearAllFits);
};

/** Garante que os listeners globais de impressão estejam ativos (chame uma vez perto da raiz do app). */
export const usePrintFit = () => {
  useEffect(() => {
    attachGlobalListeners();
  }, []);
};
