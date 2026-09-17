/* ================================================================== */
/*  Encolhe cada folha impressa (marcada com data-print-fit) pra caber */
/*  inteira numa página A3 — sem dividir conteúdo em 2 folhas.         */
/* ================================================================== */
import { useEffect } from 'react';

const MM_TO_PX = 96 / 25.4;

/** Margem de segurança: encolhe um pouco além da conta "exata" — o Chrome real
 *  usa margens/áreas úteis que variam (impressora, driver, versão), então uma
 *  folga aqui é o que garante caber numa folha só na prática, não só na conta. */
const SAFETY = 0.8;

/** Documentos com muito texto denso (tabela + passo a passo, ex.: Ficha Técnica)
 *  precisam de uma folga MAIOR que cartazes/pôsteres: o texto real impresso pelo
 *  Chrome quebra linha de um jeito levemente diferente do medido na tela, e isso
 *  é o suficiente pra "vazar" pra uma 2ª folha mesmo com a conta "exata" batendo.
 *  Uma folha pode declarar sua própria folga via data-print-safety="0.65". */
const readSafety = (el: HTMLElement): number => {
  const override = parseFloat(el.dataset.printSafety || '');
  return Number.isFinite(override) && override > 0 && override <= 1 ? override : SAFETY;
};

/** Largura "de design" — a folha SEMPRE é montada nesse tamanho fixo (é o que
 *  garante que grades responsivas tipo md:grid-cols-3 caiam sempre no mesmo
 *  breakpoint, iguais à tela). O tamanho final na página real é feito depois,
 *  com um único zoom() que encolhe esse design pra caber. */
const DESIGN_W_MM: Record<'landscape' | 'portrait', number> = {
  landscape: 420 - 16,
  portrait: 297 - 16,
};

/** Orçamento de altura padrão: SEMPRE a dimensão física mais curta do A3
 *  (297mm), não importa a orientação pedida — é o que já está confirmado
 *  funcionando pra Cartazes/Pôsteres/Dossiê. NÃO MEXER aqui sem necessidade:
 *  esses documentos já foram validados e não devem ser reencolhidos. */
const SAFE_HEIGHT_MM = 297 - 16;

/** Toda folha ISO (A2, A3, A4, ...) tem a MESMA proporção entre lado maior e
 *  lado menor: maior = menor × √2. O Chrome lembra o último papel/orientação
 *  escolhido no diálogo entre um job de impressão e outro (visto na prática
 *  nas Fichas Técnicas: marcada A3, saiu impressa como A2 — bem menos enco-
 *  lhida do que os 281mm fixos assumiam, sobrando espaço em branco e letra
 *  minúscula à toa). Pra documentos que optarem com data-print-height="auto",
 *  a altura disponível é CALCULADA a partir da largura real medida (essa,
 *  sim, é confiável) em vez de um tamanho de papel fixo. Assumir que a
 *  largura medida é o lado MAIOR da folha (divide por √2) é a aposta segura:
 *  se a folha real for retrato, a altura calculada fica um pouco menor que a
 *  real — encolhe demais, nunca de menos — então nunca vaza pra 2ª folha. */
const SQRT2 = Math.SQRT2;

const clearFit = (el: HTMLElement) => {
  (el.style as any).zoom = '';
  (el.style as any).width = el.dataset.printFitOrigWidth || '';
  el.style.marginTop = '';
  el.style.marginLeft = '';
  delete el.dataset.printFitOrigWidth;
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
  sheets.forEach((el) => {
    const orientation = (el.dataset.printFit === 'portrait' ? 'portrait' : 'landscape') as
      | 'landscape'
      | 'portrait';
    const designWpx = DESIGN_W_MM[orientation] * MM_TO_PX;

    // Largura real disponível na folha, o que quer que o navegador tenha
    // escolhido (nem sempre é A3 — o diálogo de impressão às vezes ignora
    // o @page e usa o papel padrão dele). Medimos ANTES de fixar a largura
    // de design no elemento, pra pegar o espaço de verdade do pai.
    el.dataset.printFitOrigWidth = el.style.width;
    (el.style as any).zoom = '';
    el.style.width = '';
    const realAvailableW = el.parentElement?.clientWidth || designWpx;

    // Altura disponível: por padrão o valor fixo já validado (297mm, ver
    // SAFE_HEIGHT_MM). Documentos com data-print-height="auto" usam o cálculo
    // proporcional à largura real medida (ver comentário do SQRT2 acima).
    const designHpx =
      el.dataset.printHeight === 'auto' ? realAvailableW / SQRT2 : SAFE_HEIGHT_MM * MM_TO_PX;

    // Monta o conteúdo sempre na largura de design (garante que grades tipo
    // md:grid-cols-3 ativem do mesmo jeito que na tela, não dependendo do
    // papel real escolhido pelo navegador).
    el.style.width = `${designWpx}px`;
    const naturalH = el.scrollHeight || designHpx;

    const safety = readSafety(el);
    const widthScale = (realAvailableW * safety) / designWpx;
    const heightScale = (designHpx * safety) / naturalH;
    const scale = Math.min(1, widthScale, heightScale);

    // "zoom" (não "transform: scale") de propósito: transform só re-pinta
    // visualmente, não muda o tamanho de layout que o motor de paginação de
    // impressão enxerga — no Chrome isso corta o conteúdo pelo tamanho
    // ORIGINAL (a altura "errada" citada em bugs conhecidos do Chrome pra
    // print + transform). zoom encolhe de verdade o espaço ocupado.
    if (scale < 1) (el.style as any).zoom = String(scale);

    // zoom encolhe as duas dimensões igualmente, então quando a folha "sobra"
    // mais numa direção que na outra, o conteúdo fica jogado no canto
    // superior esquerdo. Centraliza a folga (horizontal e vertical) em vez
    // de deixar tudo empurrado pra um lado só.
    const renderedW = designWpx * scale;
    const renderedH = naturalH * scale;
    const leftoverW = Math.max(0, realAvailableW - renderedW);
    const leftoverH = Math.max(0, designHpx - renderedH);
    el.style.marginLeft = `${leftoverW / 2 / scale}px`;
    el.style.marginTop = `${leftoverH / 2 / scale}px`;
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
