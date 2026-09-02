export type DocumentCategory =
  | 'painel'
  | 'dossier'
  | 'posters'
  | 'checklists'
  | 'team'
  | 'pops'
  | 'forms'
  | 'labels'
  | 'recipes'
  | 'illustrator';

/* ===== Painel do "Dia 1" — Indicadores operacionais (Dossiê §13) ===== */

export type OccurrenceType = 'ruptura' | 'perda' | 'nao_conformidade' | 'elogio';

export interface OperationalOccurrence {
  id: string;
  date: string;            // ISO yyyy-mm-dd
  time: string;            // HH:MM
  type: OccurrenceType;
  sector: 'cozinha' | 'estoque' | 'salao' | 'caixa' | 'limpeza' | 'gerencia';
  item: string;            // insumo / prato / processo envolvido
  reason: string;          // motivo exato (obrigatório pela Regra 5: fatos contra conversas)
  quantity?: string;       // ex.: "2,4 kg", "3 un"
  estimatedLossBRL?: number;
  registeredBy: string;    // autoria
  actionTaken?: string;
  correctionStep?: 1 | 2 | 3 | 4; // Escada de Correção
  resolved?: boolean;
}

export type PrincipleSignal = 'verde' | 'amarelo' | 'vermelho' | 'auto';

export interface PrincipleStatusEntry {
  signal: PrincipleSignal;
  note?: string;
  updatedAt?: string;
}

export interface MasterDossierSection {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  content: string[];
  tables?: {
    headers: string[];
    rows: string[][];
  }[];
  quotes?: string[];
  callouts?: {
    type: 'decision' | 'warning' | 'principle' | 'goal';
    title: string;
    text: string;
  }[];
  isLiveDraft?: boolean;
}

export interface PhotographicEvidence {
  id: number;
  title: string;
  photoNumber: string;
  imagePlaceholderText: string;
  customImageUri?: string;
  userAnnotations?: string[];
  whatImageProves: string;
  operationalConclusion: string;
  recommendedAction: string;
  evidenceLimit: string;
  priority: 'Imediata' | 'Primeiros 7 dias' | 'Primeiros 30 dias';
}

export type SectorKey = 'cozinha' | 'estoque' | 'salao' | 'caixa' | 'gerencia' | 'limpeza';

export interface EmployeeAccount {
  id: string;
  name: string;
  role: string;
  primarySector: 'cozinha' | 'estoque' | 'salao' | 'caixa' | 'gerencia';
  allowedSectors: ('cozinha' | 'estoque' | 'salao' | 'caixa' | 'gerencia')[];
  pin: string;
  phone: string;
  shift: string;
  badgeNumber: string;
  photoUrl: string;
  isManager?: boolean;
  active?: boolean;
  mainDuty?: string;
  secondaryContact?: string;
}

export interface ResponsibleLeader {
  id: string;
  sectorId: 'cozinha' | 'estoque' | 'salao' | 'caixa' | 'gerencia';
  sectorName: string;
  name: string;
  role: string;
  photoUrl: string; // Avatar ID or custom base64 image
  phone: string;
  shift: string;
  mainDuty: string;
  secondaryContact?: string;
}

export interface ChecklistItemData {
  id: string;
  sector: 'cozinha' | 'estoque' | 'salao' | 'caixa' | 'limpeza';
  shift: 'abertura' | 'servico' | 'fechamento' | 'geral';
  title: string;
  description: string;
  critical: boolean;
  status: 'pendente' | 'em_andamento' | 'concluido' | 'nao_conforme';
  completedAt?: string;
  notes?: string;
  evidencePhoto?: string;
  roleResponsible?: 'auxiliar_cozinha' | 'chefe_cozinha' | 'estoquista' | 'atendente' | 'caixa' | 'ambos_cozinha';
}

export interface PosterSignalItem {
  colorCode: 'VERDE' | 'AMARELO' | 'VERMELHO' | 'AZUL';
  hex: string;
  title: string;
  action: string;
  iconName: string;
}

export interface PosterSlide {
  id: string;
  posterNumber: number; // 1 to 6
  giantNumber: string; // "01", "02", "03", "04", "05", "06"
  title: string;
  subtitle: string;
  category: 'Cozinha' | 'Rastreabilidade' | 'Estoque' | 'Salão' | 'Caixa' | 'Governança';
  sectorId: 'cozinha' | 'estoque' | 'salao' | 'caixa' | 'gerencia';
  orientation: 'landscape' | 'portrait';
  colorTheme: 'green' | 'yellow' | 'red' | 'blue' | 'neutral';
  characterId: 'chef_manel' | 'ze_estoque' | 'dona_flor' | 'camila_caixa' | 'seu_silva';
  characterQuote: string;
  characterTitle: string;
  elements: {
    type: 'banner' | 'flow' | 'grid' | 'thermometer' | 'pyramid' | 'dictionary' | 'timeline' | 'callout' | 'table' | 'stamps';
    data: any;
  }[];
  signals: PosterSignalItem[];
  keyDecision: string;
  goldenRule: string;
  customNotes?: string;
}

export interface POPItem {
  id: string;
  code: string;
  title: string;
  version: string;
  date: string;
  targetSector: 'Cozinha' | 'Estoque' | 'Salão' | 'Caixa' | 'Geral';
  objective: string;
  responsibleRole: string;
  checkerRole: string;
  frequency: string;
  materialsNeeded: string[];
  steps: {
    order: number;
    title: string;
    description: string;
    criticalControlPoint?: string;
    visualSignal?: 'green' | 'yellow' | 'red' | 'blue';
    requiredEvidence?: string;
  }[];
  whatNotToDo: string[];
  nonComplianceReaction: string;
  customIllustration?: string;
}

export interface OperationalForm {
  id: string;
  code: string;
  title: string;
  sector: 'Cozinha' | 'Estoque' | 'Salão' | 'Caixa' | 'Gestão';
  purpose: string;
  frequency: 'Diário por Turno' | 'Por Ocorrência' | 'Por Entrada' | 'Semanal';
  fields: {
    id: string;
    label: string;
    type: 'text' | 'checkbox' | 'number' | 'time' | 'select' | 'signature';
    options?: string[];
    placeholder?: string;
    width?: 'full' | 'half' | 'third';
  }[];
  tableTemplate?: {
    columns: string[];
    defaultRowsCount: number;
    sampleRows?: string[][];
  };
  signatureBlock: {
    executorTitle: string;
    checkerTitle: string;
  };
}

export interface UniversalLabelTemplate {
  id: string;
  productName: string;
  complement?: string;
  prepDate: string;
  prepTime: string;
  expiryDate: string;
  expiryTime: string;
  executor: string;
  checker: string;
  lotLocation?: string;
  category: 'Açaí' | 'Carnes & Peixes' | 'Molhos' | 'Pré-preparo' | 'Polpas' | 'Outros';
  notes?: string;
}

export interface RecipeTechSheet {
  id: string;
  code: string;
  dishName: string;
  category: string;
  standardYield: string;
  portionWeight: string;
  prepTimeMinutes: number;
  costEstimate?: string;
  ingredients: {
    item: string;
    grossQty: string;
    unit: string;
    prePrepNotes?: string;
  }[];
  equipmentUtensils: string[];
  stepByStep: string[];
  platingStandard: string[];
  criticalSafetyNotes: string[];
  imageUrl?: string;
  author: string;
  validatedBy: string;
  version: string;
}
