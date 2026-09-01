import { ChecklistItemData } from '../types';

export const DEFAULT_CHECKLIST_ITEMS: ChecklistItemData[] = [
  // COZINHA - ABERTURA & PREPARAÇÕES BASE (Foto 3 do Restaurante)
  {
    id: 'chk-coz-01',
    sector: 'cozinha',
    shift: 'abertura',
    roleResponsible: 'auxiliar_cozinha',
    title: 'Acender as luzes da cozinha e exaustão',
    description: 'Ligar iluminação geral, exaustores e conferir ventilação.',
    critical: false,
    status: 'concluido',
    completedAt: '08:00'
  },
  {
    id: 'chk-coz-02',
    sector: 'cozinha',
    shift: 'abertura',
    roleResponsible: 'auxiliar_cozinha',
    title: 'Ligar o rechaud e colocar as comidas que estão na geladeira',
    description: 'Abastecer a água do banho-maria do rechaud, ligar aquecimento (70°C) e posicionar as cubas.',
    critical: true,
    status: 'concluido',
    completedAt: '08:15',
    notes: 'Rechaud aquecido a 70°C.'
  },
  {
    id: 'chk-coz-03',
    sector: 'cozinha',
    shift: 'abertura',
    roleResponsible: 'ambos_cozinha',
    title: 'Separar preparações base do Buffet Rechaud',
    description: 'Organizar as 6 cubas: Arroz Branco, Feijão Preto, Baião de Dois, Vatapá, Maniçoba e Arroz Paraense.',
    critical: true,
    status: 'concluido',
    completedAt: '08:30'
  },
  {
    id: 'chk-coz-04',
    sector: 'cozinha',
    shift: 'abertura',
    roleResponsible: 'chefe_cozinha',
    title: 'Controle de Lote da Maniçoba (* Toda quarta-feira colocar 10kg de maniva)',
    description: 'Verificar o caldeirão de fervura contínua da maniva, tempero e registrar no livro de cocção.',
    critical: true,
    status: 'concluido',
    completedAt: '08:45',
    notes: 'Lote semanal de 10kg de maniva adicionado conforme rotina de quarta.'
  },

  // MISE EN PLACE (Foto 3) - Responsabilidade Primária: Auxiliar de Cozinha
  {
    id: 'chk-mep-01',
    sector: 'cozinha',
    shift: 'abertura',
    roleResponsible: 'auxiliar_cozinha',
    title: 'Cebola cortada em rodelas',
    description: 'Fatiar rodelas uniformes para guarnições e montagens.',
    critical: false,
    status: 'concluido',
    completedAt: '09:00'
  },
  {
    id: 'chk-mep-02',
    sector: 'cozinha',
    shift: 'abertura',
    roleResponsible: 'auxiliar_cozinha',
    title: 'Limões cortados em meia lua',
    description: 'Cortar limões frescos em 4 partes meia-lua e retirar sementes visíveis.',
    critical: false,
    status: 'concluido',
    completedAt: '09:10'
  },
  {
    id: 'chk-mep-03',
    sector: 'cozinha',
    shift: 'abertura',
    roleResponsible: 'ambos_cozinha',
    title: 'Vinagrete pronto e temperado',
    description: 'Tomate, cebola e pimentão em cubinhos com vinagre, azeite e cheiro verde.',
    critical: true,
    status: 'concluido',
    completedAt: '09:25'
  },
  {
    id: 'chk-mep-04',
    sector: 'cozinha',
    shift: 'abertura',
    roleResponsible: 'auxiliar_cozinha',
    title: 'Farofa pronta crocante',
    description: 'Garantir cuba de farofa temperada fresca na manteiga e cebola.',
    critical: false,
    status: 'concluido',
    completedAt: '09:35'
  },
  {
    id: 'chk-mep-05',
    sector: 'cozinha',
    shift: 'abertura',
    roleResponsible: 'auxiliar_cozinha',
    title: 'Cebola, pimentão e tomates picados bem miúdo (Brunoise)',
    description: 'Picar legumes bem fininhos para bases de molho, vatapá e refogados do dia.',
    critical: true,
    status: 'em_andamento'
  },
  {
    id: 'chk-mep-06',
    sector: 'cozinha',
    shift: 'abertura',
    roleResponsible: 'auxiliar_cozinha',
    title: 'Cheiro-verde picado (aproveitar os talos)',
    description: 'Lavar, centrifugar e picar bem fininho. Usar os talos nos caldos de feijão e tucupi.',
    critical: false,
    status: 'em_andamento'
  },
  {
    id: 'chk-mep-07',
    sector: 'cozinha',
    shift: 'abertura',
    roleResponsible: 'auxiliar_cozinha',
    title: 'Ralar 2 cenouras e cortar repolho fino para salada',
    description: 'Higienizar hortifrúti em solução clorada, ralar e armazenar em pote hermético com etiqueta.',
    critical: false,
    status: 'pendente'
  },

  // PREPAROS ESPECIAIS & SERVIÇO (Foto 3) - Dividido entre Chefe e Auxiliar
  {
    id: 'chk-prep-01',
    sector: 'cozinha',
    shift: 'servico',
    roleResponsible: 'chefe_cozinha',
    title: 'Tirar da geladeira as porções de charque e camarão (Para a Chapa Pai d\'Égua)',
    description: 'Pesar e liberar porções para a estação da chapa quente e cocção nobre.',
    critical: true,
    status: 'pendente'
  },
  {
    id: 'chk-prep-02',
    sector: 'cozinha',
    shift: 'servico',
    roleResponsible: 'auxiliar_cozinha',
    title: 'Trocar o óleo se necessário (ou apenas limpar o reservatório)',
    description: 'Testar com fita de peróxido/qualidade do óleo da fritadeira e filtrar resíduos.',
    critical: true,
    status: 'pendente'
  },
  {
    id: 'chk-prep-03',
    sector: 'cozinha',
    shift: 'servico',
    roleResponsible: 'chefe_cozinha',
    title: 'Empanar o peixe e fritar sob demanda',
    description: 'Empanamento crocante na hora do pedido para manter textura perfeita e ponto exato.',
    critical: true,
    status: 'pendente'
  },
  {
    id: 'chk-prep-04',
    sector: 'cozinha',
    shift: 'servico',
    roleResponsible: 'ambos_cozinha',
    title: 'Refogar salada e legumes quentes do turno',
    description: 'Saltear no azeite com alho antes da abertura do salão.',
    critical: false,
    status: 'pendente'
  },

  // REPOSIÇÃO, CONFERÊNCIA & HIGIENIZAÇÃO (Foto 3)
  {
    id: 'chk-rep-01',
    sector: 'cozinha',
    shift: 'servico',
    roleResponsible: 'auxiliar_cozinha',
    title: 'Lavar a louça utilizada no pré-preparo (Regra: Sujou, Lavou)',
    description: 'Manter a pia livre de louças sujas acumuladas durante a manhã e liberar cubas.',
    critical: true,
    status: 'em_andamento'
  },
  {
    id: 'chk-rep-02',
    sector: 'cozinha',
    shift: 'servico',
    roleResponsible: 'auxiliar_cozinha',
    title: 'Abastecer o frigo (balcão refrigerado)',
    description: 'Conferir bebidas, guarnições resfriadas e molhos na temperatura correta.',
    critical: false,
    status: 'pendente'
  },
  {
    id: 'chk-rep-03',
    sector: 'cozinha',
    shift: 'servico',
    roleResponsible: 'auxiliar_cozinha',
    title: 'Verificar se tem batata e macaxeira na geladeira',
    description: 'Conferir estoque de batata palito e macaxeira cozida para porções fritas.',
    critical: false,
    status: 'pendente'
  },
  {
    id: 'chk-rep-04',
    sector: 'cozinha',
    shift: 'servico',
    roleResponsible: 'auxiliar_cozinha',
    title: 'Abastecer ketchup, maionese e molhos de mesa',
    description: 'Repor bisnagas de molhos e limpar bicos dosadores.',
    critical: false,
    status: 'pendente'
  },

  // FECHAMENTO DA COZINHA (Foto 3)
  {
    id: 'chk-fec-01',
    sector: 'cozinha',
    shift: 'fechamento',
    roleResponsible: 'ambos_cozinha',
    title: 'Guardar sobras de forma adequada (etiquetadas e datadas)',
    description: 'Nenhum alimento sem Etiqueta Universal. Cobrir com tampa ou filme PVC.',
    critical: true,
    status: 'pendente'
  },
  {
    id: 'chk-fec-02',
    sector: 'cozinha',
    shift: 'fechamento',
    roleResponsible: 'chefe_cozinha',
    title: 'Descartar itens fora do padrão e registrar no F-02',
    description: 'Pesar e anotar todas as perdas e quebras do turno com causa raiz.',
    critical: true,
    status: 'pendente'
  },
  {
    id: 'chk-fec-03',
    sector: 'cozinha',
    shift: 'fechamento',
    roleResponsible: 'auxiliar_cozinha',
    title: 'Higienizar panelas, fogão e chapas com desencrustante',
    description: 'Raspar incrustações, aplicar produto químico adequado, enxaguar e secar.',
    critical: true,
    status: 'pendente'
  },
  {
    id: 'chk-fec-04',
    sector: 'cozinha',
    shift: 'fechamento',
    roleResponsible: 'auxiliar_cozinha',
    title: 'Limpar bancadas e pias (álcool 70%)',
    description: 'Passar esponja com detergente, enxaguar e borrifar álcool 70% deixando secar.',
    critical: true,
    status: 'pendente'
  },
  {
    id: 'chk-fec-05',
    sector: 'cozinha',
    shift: 'fechamento',
    roleResponsible: 'chefe_cozinha',
    title: 'Anotar itens que precisam ser repostos no estoque',
    description: 'Preencher lista de reposição para compras do dia seguinte.',
    critical: false,
    status: 'pendente'
  },
  {
    id: 'chk-fec-06',
    sector: 'cozinha',
    shift: 'fechamento',
    roleResponsible: 'ambos_cozinha',
    title: 'Desligar equipamentos não essenciais, luzes e torneiras',
    description: 'Fechar válvulas de gás, desligar exaustor e trancar câmaras.',
    critical: true,
    status: 'pendente'
  },
  {
    id: 'chk-fec-07',
    sector: 'cozinha',
    shift: 'fechamento',
    roleResponsible: 'chefe_cozinha',
    title: 'Revisar checklist com a equipe antes de sair',
    description: 'Cozinheiro Líder confere assinaturas e libera a equipe.',
    critical: true,
    status: 'pendente'
  },

  // ESTOQUE
  {
    id: 'chk-est-01',
    sector: 'estoque',
    shift: 'abertura',
    title: 'Conferência de Recebimento com Balança e NF (F-01)',
    description: 'Pesar camarão, peixes e polpas na presença do entregador. Recusar caixas violadas ou sem refrigeração.',
    critical: true,
    status: 'concluido',
    completedAt: '09:00',
    notes: 'Fornecedor de Açaí entregou 40L com NF 4589. Padrão excelente.'
  },
  {
    id: 'chk-est-02',
    sector: 'estoque',
    shift: 'abertura',
    title: 'Aplicação da Regra P.E.P.S. nas Prateleiras',
    description: 'Colocar os novos lotes atrás dos antigos. Produtos mais antigos ficam na frente para consumo imediato.',
    critical: true,
    status: 'concluido',
    completedAt: '09:30'
  },
  {
    id: 'chk-est-03',
    sector: 'estoque',
    shift: 'servico',
    title: 'Checagem do Termômetro de Gatilho de Compras',
    description: 'Verificar itens com estoque abaixo do Nível Mínimo e emitir a lista de compras para a diretoria.',
    critical: true,
    status: 'em_andamento'
  },
  {
    id: 'chk-est-04',
    sector: 'estoque',
    shift: 'fechamento',
    title: 'Controle de Acesso e Trancamento das Câmaras',
    description: 'Câmaras frias trancadas com cadeado e chaves entregues ao responsável do turno.',
    critical: false,
    status: 'pendente'
  },

  // SALÃO
  {
    id: 'chk-sal-01',
    sector: 'salao',
    shift: 'abertura',
    title: 'Alinhamento de Mesas, Cadeiras e Limpeza Geral',
    description: 'Passar álcool 70% nas mesas e cadeiras. Verificar se os pés das mesas estão firmes sem balançar.',
    critical: false,
    status: 'concluido',
    completedAt: '10:30'
  },
  {
    id: 'chk-sal-02',
    sector: 'salao',
    shift: 'abertura',
    title: 'Abastecimento de Galheteiros, Guardanapos e Cardápios',
    description: 'Azeite, tucupi, pimenta regional e guardanapos cheios e sem marcas de dedos.',
    critical: false,
    status: 'concluido',
    completedAt: '10:45'
  },
  {
    id: 'chk-sal-03',
    sector: 'salao',
    shift: 'servico',
    title: 'Tempo de Acolhimento (< 60 seg) e Entrega de Bebidas',
    description: 'Receber todo cliente com saudação calorosa e servir a primeira bebida em menos de 5 minutos.',
    critical: true,
    status: 'em_andamento'
  },
  {
    id: 'chk-sal-04',
    sector: 'salao',
    shift: 'fechamento',
    title: 'Conferência e Devolução de Comandas e Tablets (* Sempre mandar pratos e talheres...)',
    description: 'Recolher blocos de comanda, tablets de pedido e conferir reposição de louças para o turno seguinte.',
    critical: true,
    status: 'pendente'
  },

  // CAIXA
  {
    id: 'chk-cax-01',
    sector: 'caixa',
    shift: 'abertura',
    title: 'Conferência do Fundo de Troco Inicial (R$ 150,00)',
    description: 'Contar cédulas e moedas na presença do gerente e assinar a abertura no F-03.',
    critical: true,
    status: 'concluido',
    completedAt: '11:00',
    notes: 'Troco conferido e exato: R$ 150,00.'
  },
  {
    id: 'chk-cax-02',
    sector: 'caixa',
    shift: 'servico',
    title: 'Controle de Sangrias ao Atingir R$ 500 em Dinheiro',
    description: 'Emitir comprovante de sangria no sistema e colher assinatura do gerente para envio ao cofre.',
    critical: true,
    status: 'pendente'
  },
  {
    id: 'chk-cax-03',
    sector: 'caixa',
    shift: 'fechamento',
    title: 'Fechamento Cego de Caixa & Confronto de PIX / Cartões',
    description: 'Contar dinheiro sem ver o sistema, emitir leitura fiscal e preencher o formulário F-03.',
    critical: true,
    status: 'pendente'
  },

  // LIMPEZA GERAL
  {
    id: 'chk-lim-01',
    sector: 'limpeza',
    shift: 'geral',
    title: 'Higienização e Reposição dos Banheiros de Clientes',
    description: 'Checagem a cada 60 minutos: papel toalha, sabonete líquido, cheiro agradável e lixeiras vazias.',
    critical: true,
    status: 'em_andamento'
  },
  {
    id: 'chk-lim-02',
    sector: 'limpeza',
    shift: 'fechamento',
    title: 'Descarte Seguro do Lixo e Lavagem dos Contêineres',
    description: 'Retirar sacos pretos para a área externa de coleta e lavar os tambores com cloro.',
    critical: true,
    status: 'pendente'
  }
];

const CHECKLIST_STORAGE_KEY = 'bistro_pai_degua_checklists_v2';

export const loadChecklistItems = (): ChecklistItemData[] => {
  try {
    const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load checklist items from localStorage', e);
  }
  return DEFAULT_CHECKLIST_ITEMS;
};

export const saveChecklistItems = (items: ChecklistItemData[]): void => {
  try {
    localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save checklist items to localStorage', e);
  }
};

