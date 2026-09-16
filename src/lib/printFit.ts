/* ================================================================== */
/*  Encolhe cada folha impressa (marcada com data-print-fit) pra caber */
/*  inteira numa página A3 — sem dividir conteúdo em 2 folhas.         */
/* ================================================================== */
import { useEffect } from 'react';

const MM_TO_PX = 96 / 25.4;

/** Altura útil da folha (A3 menos 8mm de margem em cima/embaixo).
 *  Não fixamos a LARGURA em px: o diálogo de impressão do navegador nem
 *  sempre respeita o @page (às vezes cai no papel padrão dele, ex.: A4)
 *  — supor uma largura fixa cortava o conteúdo quando isso acontecia.
 *  A altura em compensação é segura de fixar: A3 paisagem e A4 retrato
 *  têm a mesma altura física (297mm), então o valor serve pros dois casos. */
const USABLE_H_MM: Record<'landscape' | 'portrait', number> = {
  landscape: 297 - 16,
  portrait: 420 - 16,
};

const clearFit = (el: HTMLElement) => {
  el.style.transform = '';
  el.style.transformOrigin = '';
  (el.style as any).width = el.dataset.printFitOrigWidth || '';
  delete el.dataset.printFitOrigWidth;
};

const PAGE_STYLE_ID = 'print-page-size-style';

/** @page só funciona de verdade no nível raiz da folha de estilos — por isso
 *  reescrevemos essa regra aqui em vez de depender de @page nomeada em CSS
 *  (o navegador ignora "page: <nome>" com muita frequência). */
const setPageSize = (orientation: 'landscape' | 'portrait') => {
  let styleEl = document.getElementById(PAGE_STYLE_ID) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = PAGE_STYLE_ID;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = `@page { size: A3 ${orientation}; margin: 8mm; }`;
};

/** Elementos só-impressão (ex.: PosterStudio) dependem do CSS @media print pra
 *  ficar visíveis — mas na hora do "beforeprint" isso às vezes ainda não foi
 *  aplicado quando medimos o tamanho, e a folha é medida com 0px de altura
 *  (aí o encolhimento erra feio: conteúdo minúsculo, sobra de página em branco).
 *  Forçamos a visibilidade aqui, antes de medir, pra não depender dessa corrida. */
const forcePrintOnlyVisible = () => {
  document
    .querySelectorAll<HTMLElement>('.print-only')
    .forEach((el) => el.style.setProperty('display', 'block', 'important'));
};

const releasePrintOnlyVisible = () => {
  document.querySelectorAll<HTMLElement>('.print-only').forEach((el) => el.style.removeProperty('display'));
};

const applyFit = () => {
  forcePrintOnlyVisible();
  const sheets = document.querySelectorAll<HTMLElement>('[data-print-fit]');
  const dominant = sheets[0]?.dataset.printFit === 'portrait' ? 'portrait' : 'landscape';
  setPageSize(dominant);
  sheets.forEach((el) => {
    const orientation = (el.dataset.printFit === 'portrait' ? 'portrait' : 'landscape') as
      | 'landscape'
      | 'portrait';

    // Largura: 100% da folha real que o navegador reservou (nunca supomos um
    // valor fixo — é isso que evita cortar o lado direito quando o papel
    // escolhido não é exatamente A3). A altura (via CSS, .print-fit-h-*)
    // é que fica travada num valor físico confiável pra paginação.
    el.dataset.printFitOrigWidth = el.style.width;
    el.style.transform = '';
    el.style.width = '100%';

    const targetHpx = USABLE_H_MM[orientation] * MM_TO_PX;
    const naturalH = el.scrollHeight;
    const scale = naturalH > 0 ? Math.min(1, targetHpx / naturalH) : 1;

    el.style.transformOrigin = 'top left';
    el.style.transform = scale < 1 ? `scale(${scale})` : '';
  });
};

const clearAllFits = () => {
  document.querySelectorAll<HTMLElement>('[data-print-fit]').forEach(clearFit);
  releasePrintOnlyVisible();
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
