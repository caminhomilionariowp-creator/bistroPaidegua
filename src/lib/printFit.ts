/* ================================================================== */
/*  Encolhe cada folha impressa (marcada com data-print-fit) pra caber */
/*  inteira numa página A3 — sem dividir conteúdo em 2 folhas.         */
/* ================================================================== */
import { useEffect } from 'react';

const MM_TO_PX = 96 / 25.4;

/** Largura/altura "de design" — a folha SEMPRE é montada nesse tamanho fixo
 *  (é o que garante que grades responsivas tipo md:grid-cols-3 caiam sempre
 *  no mesmo breakpoint, iguais à tela). O tamanho final na página real é
 *  feito depois, com um único scale() que encolhe esse design pra caber. */
const DESIGN_MM: Record<'landscape' | 'portrait', { w: number; h: number }> = {
  landscape: { w: 420 - 16, h: 297 - 16 },
  portrait: { w: 297 - 16, h: 420 - 16 },
};

const clearFit = (el: HTMLElement) => {
  (el.style as any).zoom = '';
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
    const design = DESIGN_MM[orientation];
    const designWpx = design.w * MM_TO_PX;
    const designHpx = design.h * MM_TO_PX;

    // Largura real disponível na folha, o que quer que o navegador tenha
    // escolhido (nem sempre é A3 — o diálogo de impressão às vezes ignora
    // o @page e usa o papel padrão dele). Medimos ANTES de fixar a largura
    // de design no elemento, pra pegar o espaço de verdade do pai.
    el.dataset.printFitOrigWidth = el.style.width;
    (el.style as any).zoom = '';
    el.style.width = '';
    const realAvailableW = el.parentElement?.clientWidth || designWpx;

    // Monta o conteúdo sempre na largura de design (garante que grades tipo
    // md:grid-cols-3 ativem do mesmo jeito que na tela, não dependendo do
    // papel real escolhido pelo navegador).
    el.style.width = `${designWpx}px`;
    const naturalH = el.scrollHeight || designHpx;

    const widthScale = realAvailableW / designWpx;
    const heightScale = designHpx / naturalH;
    const scale = Math.min(1, widthScale, heightScale);

    // "zoom" (não "transform: scale") de propósito: transform só re-pinta
    // visualmente, não muda o tamanho de layout que o motor de paginação de
    // impressão enxerga — no Chrome isso corta o conteúdo pelo tamanho
    // ORIGINAL (a altura "errada" citada em bugs conhecidos do Chrome pra
    // print + transform). zoom encolhe de verdade o espaço ocupado.
    if (scale < 1) (el.style as any).zoom = String(scale);
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
