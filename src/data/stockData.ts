import { StockItem, StockLevelKey } from '../types';

/* ================================================================== */
/*  ESTOQUE & TERMÔMETRO DE RUPTURA — Dossiê §8                         */
/*  Ideal (verde) → Mínimo (amarelo, dispara compra) →                  */
/*  Crítico (laranja, gestão atua) → Ruptura (vermelho, ocorrência)     */
/* ================================================================== */

const STOCK_KEY = 'bistro_pai_degua_estoque_v1';

export const STOCK_CATEGORIES = [
  'Insumo Amazônico',
  'Proteínas & Pescados',
  'Hortifrúti & Temperos',
  'Secos, Grãos & Farináceos',
  'Laticínios',
  'Bebidas',
  'Descartáveis',
  'Limpeza & Químicos',
] as const;

export const LEVEL_META: Record<
  StockLevelKey,
  { label: string; hex: string; barClass: string; textClass: string; chipClass: string; action: string; order: number }
> = {
  ruptura: {
    label: 'Ruptura',
    hex: '#e11d48',
    barClass: 'bg-rose-500',
    textClass: 'text-rose-700',
    chipClass: 'bg-rose-100 text-rose-800 border-rose-300',
    action: 'Indisponível para venda. Tratar como ocorrência grave, investigar a causa e recalibrar o mínimo.',
    order: 0,
  },
  critico: {
    label: 'Crítico',
    hex: '#ea580c',
    barClass: 'bg-orange-500',
    textClass: 'text-orange-700',
    chipClass: 'bg-orange-100 text-orange-800 border-orange-300',
    action: 'Ameaça iminente à operação. A gestão atua imediatamente para não deixar cair em ruptura.',
    order: 1,
  },
  minimo: {
    label: 'Mínimo',
    hex: '#d97706',
    barClass: 'bg-amber-500',
    textClass: 'text-amber-700',
    chipClass: 'bg-amber-100 text-amber-800 border-amber-300',
    action: 'Ponto de gatilho do pedido. Registrar a necessidade e disparar a compra agora.',
    order: 2,
  },
  ideal: {
    label: 'Ideal',
    hex: '#059669',
    barClass: 'bg-emerald-500',
    textClass: 'text-emerald-700',
    chipClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    action: 'Quantidade mantém a operação tranquila até o próximo ciclo. Manter na faixa padrão.',
    order: 3,
  },
};

export const stockLevel = (item: StockItem): StockLevelKey => {
  if (item.current <= 0) return 'ruptura';
  if (item.current <= item.critical) return 'critico';
  if (item.current <= item.min) return 'minimo';
  return 'ideal';
};

/** Quanto comprar para voltar ao nível ideal. */
export const suggestedPurchase = (item: StockItem): number =>
  Math.max(0, Math.round((item.ideal - item.current) * 100) / 100);

/** Posição da quantidade atual na régua 0 → ideal (%), para o mini-termômetro. */
export const fillPercent = (item: StockItem): number => {
  const span = item.ideal || 1;
  return Math.max(0, Math.min(100, Math.round((item.current / span) * 100)));
};

export const needsPurchase = (item: StockItem): boolean => {
  const l = stockLevel(item);
  return l === 'minimo' || l === 'critico' || l === 'ruptura';
};

export const DEFAULT_STOCK: StockItem[] = [
  // Insumo Amazônico
  { id: 'st-tucupi', name: 'Tucupi', category: 'Insumo Amazônico', unit: 'L', current: 3, ideal: 24, min: 8, critical: 4, supplier: 'Feira do Ver-o-Peso', leadTimeDays: 1, location: 'Câmara fria — Prat. A1', perishable: true },
  { id: 'st-jambu', name: 'Jambu (maço)', category: 'Insumo Amazônico', unit: 'mç', current: 10, ideal: 30, min: 12, critical: 6, supplier: 'Feira do Ver-o-Peso', leadTimeDays: 1, location: 'Geladeira 2 — Gaveta hortifrúti', perishable: true },
  { id: 'st-maniva', name: 'Maniva moída (maniçoba)', category: 'Insumo Amazônico', unit: 'kg', current: 32, ideal: 40, min: 15, critical: 8, supplier: 'Distribuidor Regional', leadTimeDays: 3, location: 'Freezer 1 — Gaveta B', perishable: true, notes: 'Repor 10 kg toda quarta (controle de lote).' },
  { id: 'st-goma', name: 'Goma de tapioca hidratada', category: 'Insumo Amazônico', unit: 'kg', current: 5, ideal: 15, min: 6, critical: 3, supplier: 'Feira do Ver-o-Peso', leadTimeDays: 1, location: 'Geladeira 1 — Prat. B2', perishable: true },
  { id: 'st-farinha-agua', name: "Farinha d'água", category: 'Insumo Amazônico', unit: 'kg', current: 24, ideal: 30, min: 12, critical: 6, supplier: 'Distribuidor Regional', leadTimeDays: 2, location: 'Estoque seco — Prat. 3' },
  { id: 'st-acai', name: 'Polpa de açaí (grosso)', category: 'Insumo Amazônico', unit: 'kg', current: 0, ideal: 40, min: 15, critical: 8, supplier: 'Batedeira Parceira', leadTimeDays: 1, location: 'Freezer 2 — Gaveta A', perishable: true, notes: 'Item de alto giro no fim de semana.' },

  // Proteínas & Pescados
  { id: 'st-camarao-seco', name: 'Camarão seco', category: 'Proteínas & Pescados', unit: 'kg', current: 3.5, ideal: 10, min: 4, critical: 2, supplier: 'Peixaria do Porto', leadTimeDays: 2, location: 'Estoque seco — Prat. 1', notes: 'Vatapá e tacacá dependem deste item.' },
  { id: 'st-camarao-fresco', name: 'Camarão regional limpo', category: 'Proteínas & Pescados', unit: 'kg', current: 14.4, ideal: 18, min: 7, critical: 4, supplier: 'Peixaria do Porto', leadTimeDays: 1, location: 'Câmara fria — Prat. C1', perishable: true },
  { id: 'st-charque', name: 'Charque dessalgado', category: 'Proteínas & Pescados', unit: 'kg', current: 16, ideal: 20, min: 8, critical: 4, supplier: 'Açougue Central', leadTimeDays: 2, location: 'Câmara fria — Prat. C2', perishable: true },
  { id: 'st-frango', name: 'Peito de frango', category: 'Proteínas & Pescados', unit: 'kg', current: 20, ideal: 25, min: 10, critical: 5, supplier: 'Açougue Central', leadTimeDays: 2, location: 'Freezer 1 — Gaveta A', perishable: true },
  { id: 'st-filhote', name: 'Filhote em posta', category: 'Proteínas & Pescados', unit: 'kg', current: 12, ideal: 15, min: 6, critical: 3, supplier: 'Peixaria do Porto', leadTimeDays: 1, location: 'Câmara fria — Prat. C3', perishable: true },

  // Hortifrúti & Temperos
  { id: 'st-cebola', name: 'Cebola', category: 'Hortifrúti & Temperos', unit: 'kg', current: 16, ideal: 20, min: 8, critical: 4, supplier: 'CEASA', leadTimeDays: 1, location: 'Estoque seco — Bombona 1' },
  { id: 'st-tomate', name: 'Tomate', category: 'Hortifrúti & Temperos', unit: 'kg', current: 12, ideal: 15, min: 6, critical: 3, supplier: 'CEASA', leadTimeDays: 1, location: 'Geladeira 2 — Gaveta hortifrúti', perishable: true },
  { id: 'st-pimenta-cheiro', name: 'Pimenta de cheiro', category: 'Hortifrúti & Temperos', unit: 'kg', current: 1.2, ideal: 4, min: 1.5, critical: 0.7, supplier: 'Feira do Ver-o-Peso', leadTimeDays: 1, location: 'Geladeira 2 — Gaveta hortifrúti', perishable: true },
  { id: 'st-chicoria', name: 'Chicória do Pará (maço)', category: 'Hortifrúti & Temperos', unit: 'mç', current: 16, ideal: 20, min: 8, critical: 4, supplier: 'Feira do Ver-o-Peso', leadTimeDays: 1, location: 'Geladeira 2 — Gaveta hortifrúti', perishable: true },
  { id: 'st-limao', name: 'Limão', category: 'Hortifrúti & Temperos', unit: 'kg', current: 9.6, ideal: 12, min: 5, critical: 2, supplier: 'CEASA', leadTimeDays: 1, location: 'Geladeira 2 — Gaveta hortifrúti', perishable: true },
  { id: 'st-alho', name: 'Alho', category: 'Hortifrúti & Temperos', unit: 'kg', current: 4.8, ideal: 6, min: 2.5, critical: 1, supplier: 'CEASA', leadTimeDays: 2, location: 'Estoque seco — Prat. 2' },

  // Secos, Grãos & Farináceos
  { id: 'st-arroz', name: 'Arroz branco', category: 'Secos, Grãos & Farináceos', unit: 'kg', current: 40, ideal: 50, min: 20, critical: 10, supplier: 'Atacado São Braz', leadTimeDays: 3, location: 'Estoque seco — Prat. 4' },
  { id: 'st-feijao-preto', name: 'Feijão preto', category: 'Secos, Grãos & Farináceos', unit: 'kg', current: 24, ideal: 30, min: 12, critical: 6, supplier: 'Atacado São Braz', leadTimeDays: 3, location: 'Estoque seco — Prat. 4' },
  { id: 'st-oleo', name: 'Óleo de soja', category: 'Secos, Grãos & Farináceos', unit: 'L', current: 19.2, ideal: 24, min: 9, critical: 4, supplier: 'Atacado São Braz', leadTimeDays: 3, location: 'Estoque seco — Prat. 5' },
  { id: 'st-manteiga-garrafa', name: 'Manteiga de garrafa', category: 'Secos, Grãos & Farináceos', unit: 'L', current: 8, ideal: 10, min: 4, critical: 2, supplier: 'Distribuidor Regional', leadTimeDays: 2, location: 'Estoque seco — Prat. 2' },

  // Laticínios
  { id: 'st-queijo-coalho', name: 'Queijo coalho', category: 'Laticínios', unit: 'kg', current: 11.2, ideal: 14, min: 6, critical: 3, supplier: 'Laticínio Regional', leadTimeDays: 2, location: 'Geladeira 1 — Prat. A1', perishable: true },
  { id: 'st-leite-coco', name: 'Leite de coco', category: 'Laticínios', unit: 'L', current: 14.4, ideal: 18, min: 7, critical: 3, supplier: 'Atacado São Braz', leadTimeDays: 3, location: 'Estoque seco — Prat. 3' },

  // Bebidas
  { id: 'st-refri', name: 'Refrigerante (lata)', category: 'Bebidas', unit: 'un', current: 96, ideal: 120, min: 48, critical: 24, supplier: 'Distribuidora de Bebidas', leadTimeDays: 2, location: 'Depósito de bebidas' },
  { id: 'st-agua', name: 'Água mineral 500ml', category: 'Bebidas', unit: 'un', current: 76.8, ideal: 96, min: 40, critical: 20, supplier: 'Distribuidora de Bebidas', leadTimeDays: 2, location: 'Depósito de bebidas' },
  { id: 'st-suco-polpa', name: 'Polpa de fruta (cupuaçu/taperebá)', category: 'Bebidas', unit: 'kg', current: 12.8, ideal: 16, min: 6, critical: 3, supplier: 'Batedeira Parceira', leadTimeDays: 1, location: 'Freezer 2 — Gaveta B', perishable: true },

  // Descartáveis
  { id: 'st-copo-descartavel', name: 'Copo descartável 300ml', category: 'Descartáveis', unit: 'ct', current: 9.6, ideal: 12, min: 5, critical: 2, supplier: 'Embalagens Belém', leadTimeDays: 3, location: 'Almox. — Prat. fechada 1', notes: 'Contagem manual da Foto 9 vira este item.' },
  { id: 'st-marmita', name: 'Marmita delivery (isopor)', category: 'Descartáveis', unit: 'ct', current: 12, ideal: 15, min: 6, critical: 3, supplier: 'Embalagens Belém', leadTimeDays: 3, location: 'Almox. — Prat. fechada 1' },
  { id: 'st-saco-lixo', name: 'Saco de lixo 100L', category: 'Descartáveis', unit: 'pct', current: 9.6, ideal: 12, min: 5, critical: 2, supplier: 'Embalagens Belém', leadTimeDays: 3, location: 'Almox. — Prat. fechada 2' },
  { id: 'st-etiqueta', name: 'Rolo de etiqueta universal adesiva', category: 'Descartáveis', unit: 'rl', current: 2, ideal: 8, min: 3, critical: 1, supplier: 'Papelaria Central', leadTimeDays: 2, location: 'Almox. — Prat. fechada 2', notes: 'Sem etiqueta = sem uso. Nunca deixar zerar.' },

  // Limpeza & Químicos
  { id: 'st-alcool70', name: 'Álcool 70%', category: 'Limpeza & Químicos', unit: 'L', current: 12, ideal: 15, min: 6, critical: 3, supplier: 'Distribuidora de Higiene', leadTimeDays: 3, location: 'Armário de químicos (isolado)' },
  { id: 'st-detergente', name: 'Detergente neutro', category: 'Limpeza & Químicos', unit: 'L', current: 14.4, ideal: 18, min: 7, critical: 3, supplier: 'Distribuidora de Higiene', leadTimeDays: 3, location: 'Armário de químicos (isolado)' },
  { id: 'st-desengordurante', name: 'Desengordurante', category: 'Limpeza & Químicos', unit: 'L', current: 8, ideal: 10, min: 4, critical: 2, supplier: 'Distribuidora de Higiene', leadTimeDays: 3, location: 'Armário de químicos (isolado)' },
  { id: 'st-cloro', name: 'Cloro / desinfetante clorado', category: 'Limpeza & Químicos', unit: 'L', current: 12.8, ideal: 16, min: 6, critical: 3, supplier: 'Distribuidora de Higiene', leadTimeDays: 3, location: 'Armário de químicos (isolado)' },
];

export const loadStock = (): StockItem[] => {
  try {
    const saved = localStorage.getItem(STOCK_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Falha ao carregar estoque', e);
  }
  return DEFAULT_STOCK;
};

export const saveStock = (items: StockItem[]): void => {
  try {
    localStorage.setItem(STOCK_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Falha ao salvar estoque', e);
  }
};
