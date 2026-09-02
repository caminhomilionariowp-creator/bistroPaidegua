export interface JobRoleDescriptor {
  id: string;
  title: string;
  department: string;
  cboCode: string;
  directSupervisor: string;
  subordinates: string;
  workingShift: string;
  summary: string;
  keyResponsibilities: string[];
  shiftRoutine: {
    phase: string;
    timeRange: string;
    tasks: string[];
  }[];
  rulesOfGold: string[];
  prohibitions: string[];
  requiredEpi: string[];
  performanceMetrics: string[];
  toolsAndEquipments: string[];
}

export const JOB_ROLES_DATA: JobRoleDescriptor[] = [
  {
    id: 'auxiliar-cozinha',
    title: 'Auxiliar de Cozinha & Mise en Place',
    department: 'Cozinha, Pré-Preparo & Higienização',
    cboCode: '5135-05 (Auxiliar nos Serviços de Alimentação)',
    directSupervisor: 'Cozinheiro Líder (Chef Manoel) e Gestão Operacional',
    subordinates: 'Não possui subordinados diretos',
    workingShift: 'Entra ~3h antes de abrir · Sáb–Dom a partir das 09h00 (serviço 12h00–23h30) · Qua–Sex a partir das 15h30 (serviço 18h00/18h30–23h00). Fechado seg e ter.',
    summary: 'Responsável pela execução técnica do pré-preparo (mise en place), porcionamento de insumos, etiquetagem e rastreabilidade universal obrigatória, esterilização de cubas e superfícies, reposição ágil do rechaud durante o serviço e higienização contínua do posto de trabalho, garantindo que o Cozinheiro Líder opere com máxima eficiência, segurança dos alimentos e zero improviso.',
    keyResponsibilities: [
      'Executar o corte, pesagem e pré-preparo de vegetais, guarnições e insumos regionais (jambu, tucupi, camarão, carnes, farofas e molhos).',
      'Aplicar a Etiqueta Universal em 100% dos alimentos manipulados, abertos, porcionados ou fracionados antes do armazenamento na refrigeração.',
      'Higienizar e sanitizar bancadas de inox, tábuas de corte por cor, facas, cubas GN e equipamentos com álcool 70% e solução desinfetante.',
      'Abastecer com água, ligar e monitorar o banho-maria do rechaud (temperatura mínima de 70°C) e posicionar as 6 cubas base na abertura.',
      'Repor insumos no buffet e na linha de cocção durante todo o serviço de pico com rapidez e sem deixar faltar preparações.',
      'Realizar a lavagem contínua de panelas, formas e utensílios pelo método "sujou, lavou", impedindo o acúmulo de louça no tanque.',
      'Apoiar na operação de fritadeiras e montagens simples sob orientação direta do Cozinheiro Líder.',
      'Registrar todas as perdas e descartes de insumos no Formulário F-02 indicando o motivo exato (sobra, queima, validade).',
      'Auxiliar na contagem de insumos perecíveis e participar do fechamento da cozinha com limpeza pesada de pisos, ralos e coifas.'
    ],
    shiftRoutine: [
      {
        phase: '1. Pré-preparo (antes de abrir as portas)',
        timeRange: 'Sáb–Dom 09h00–12h00 · Qua–Sex 15h30–18h00',
        tasks: [
          'Ao entrar: Paramentação completa (touca, avental, bota antiderrapante) e assepsia rigorosa das mãos por 40 segundos.',
          '+15 min: Sanitização de bancadas, tábuas e cubas gastronômicas com álcool 70%.',
          '+30 min: Auditoria de geladeiras e freezers — verificar etiquetas e validades; separar imediatamente qualquer item sem identificação.',
          '2h antes de abrir: Abastecer o rechaud com água limpa, ligar o aquecimento e verificar a temperatura mínima de 70°C.',
          '2h antes de abrir: Organizar as preparações base no rechaud (arroz branco, feijão preto, baião de dois, vatapá, maniçoba, arroz paraense).',
          '90 min antes: Mise en place de guarnições — cebola em rodelas, limão em meia-lua, vinagrete em cubos, farofa crocante e brunoise fina.',
          '60 min antes: Pré-preparo de proteínas e insumos amazônicos — dessalgue e limpeza de camarão, catação de jambu, aquecimento de tucupi, porcionamento de carnes.',
          '30 min antes: Etiquetagem de 100% das cubas de mise en place com a Etiqueta Universal (data/hora, validade, executor e conferente).',
          'Antes de abrir: Auxiliar o Cozinheiro Líder na conferência final e assinatura da prancheta F-01 de Abertura.'
        ]
      },
      {
        phase: '2. Serviço ao público',
        timeRange: 'Sáb–Dom 12h00–23h30 (almoço e jantar) · Qua–Sex 18h00/18h30–23h00 (jantar)',
        tasks: [
          'Monitorar o nível das cubas do rechaud e repor imediatamente antes de atingir o nível crítico.',
          'Operar a fritadeira (bolinhos de tacacá, macaxeira frita, dadinhos de tapioca, iscas de peixe) seguindo os tempos de ficha técnica.',
          'Manter a bancada de apoio limpa e seca a todo momento durante os pedidos.',
          'Lavar panelas, cubas vazias e utensílios continuamente, evitando acúmulo de louça suja no tanque.',
          'Trocar o saco de lixo das lixeiras de pedal ao atingir 2/3 da capacidade e higienizar as mãos imediatamente após.',
          'Aos sábados e domingos: reforço de mise en place na virada do almoço para o jantar, sem parar o serviço.',
          'Registrar descartes ou sobras imprevistas na prancheta F-02 de Registro de Perdas.'
        ]
      },
      {
        phase: '3. Fechamento e encerramento (após o último cliente)',
        timeRange: 'Sáb–Dom a partir das 23h30 · Qua–Sex a partir das 23h00',
        tasks: [
          'Transferir preparações remanescentes do rechaud para recipientes higienizados menores.',
          'Aplicar nova Etiqueta Universal em todas as sobras com data/hora de fechamento e nova validade sob refrigeração.',
          'Desligar, esvaziar a água e higienizar o rechaud e as cubas.',
          'Limpeza e desengorduramento de coifas, fogões, chapas e bancadas de inox com desengordurante homologado.',
          'Varrição e lavagem do piso com detergente alcalino e desinfetante clorado.',
          'Guarda de utensílios limpos nas prateleiras organizadas por cor e categoria.',
          'Assinar o checklist de fechamento no F-01 e comunicar ocorrências do dia ao Chef Manoel.'
        ]
      }
    ],
    rulesOfGold: [
      'REGRA DE OURO DA ETIQUETA: Primeiro identificar, depois armazenar. Nenhum pote, cuba ou saco plástico entra na geladeira sem a Etiqueta Universal preenchida.',
      'REGRA DO PEPS: Primeiro que Entra, Primeiro que Sai. Ao abastecer a bancada ou refrigeração, os itens com validade mais próxima ficam sempre na frente.',
      'REGRA DA TEMPERATURA: Alimentos quentes no rechaud mantidos sempre acima de 60°C; alimentos frios e pescados mantidos abaixo de 5°C.',
      'REGRA DAS TÁBUAS POR COR: Verde para vegetais/frutas; Vermelha para carnes vermelhas; Azul para pescados/camarão; Branca para laticínios/prontos.',
      'REGRA DA LOUÇA ZERO: Nunca deixar panelas e recipientes acumularem no tanque durante o turno (evitando o gargalo da Foto 10).'
    ],
    prohibitions: [
      'NUNCA guardar qualquer alimento na refrigeração ou no estoque seco sem a Etiqueta Universal devidamente preenchida.',
      'NUNCA descongelar camarão, peixes ou carnes em temperatura ambiente ou com água quente (usar descongelamento sob refrigeração).',
      'NUNCA utilizar panos de prato de tecido para limpar bancadas ou secar louças (usar papel toalha descartável ou secagem natural).',
      'NUNCA utilizar baldes ou embalagens de produtos químicos/tintas para armazenar alimentos (corrigindo a Foto 5).',
      'NUNCA alterar quantidades, ingredientes ou proporções de temperos sem a autorização expressa do Cozinheiro Líder.',
      'NUNCA transitar com sapatos abertos, roupas sem touca ou adornos (anéis, pulseiras, brincos, relógios) na cozinha.',
      'NUNCA misturar produtos químicos de limpeza junto com alimentos ou embalagens descartáveis (corrigindo a Foto 4 e Foto 8).'
    ],
    requiredEpi: [
      'Touca descartável ou gorro cobrindo 100% dos cabelos.',
      'Avental de PVC impermeável (para lavagem de utensílios e manipulação com água).',
      'Avental de tecido limpo (para preparo em bancadas e mise en place).',
      'Calçado fechado profissional de segurança antiderrapante e impermeável (NR-06).',
      'Luvas nitrílicas descartáveis (para manipulação de alimentos prontos para consumo).',
      'Luvas térmicas de cano longo (para manuseio de assadeiras, fornos e cubas aquecidas do rechaud).'
    ],
    performanceMetrics: [
      'Índice de conformidade de etiquetagem nas geladeiras e bancadas (Meta: 100%).',
      'Zero ocorrências de alimentos vencidos ou sem identificação no posto.',
      'Tempo de reposição do rechaud durante o serviço de pico (Meta: < 3 minutos).',
      'Avaliação de higiene e organização da estação no fechamento de turno.',
      'Assiduidade no preenchimento dos checklists F-01 e F-02.'
    ],
    toolsAndEquipments: [
      'Facas de corte profissional (chef, legumes e desossa) e chaira.',
      'Tábuas de polietileno coloridas (Verde, Vermelha, Azul e Branca).',
      'Cubas Gastronômicas GN (Inox e Policarbonato transparente) com tampas.',
      'Balança digital de precisão para porcionamento (gramas).',
      'Rolo de Etiquetas Universais Adesivas e canetas marcadoras permanentes.',
      'Termômetro digital de espeto para controle de temperaturas.',
      'Processador manual de alimentos, mandoline e liquidificador industrial.',
      'Fritadeira elétrica e cestos de fritura inox.'
    ]
  },
  {
    id: 'cozinheiro-lider',
    title: 'Cozinheiro Líder (Chef de Cozinha)',
    department: 'Cozinha & Segurança dos Alimentos',
    cboCode: '5135-05 / 5134-05 (Cozinheiro Geral / Chef de Partida)',
    directSupervisor: 'Gestão Operacional e Diretoria',
    subordinates: 'Auxiliar de Cozinha, Ajudantes e Estagiários de Cozinha',
    workingShift: 'Entra ~3h antes de abrir junto com a cozinha · Sáb–Dom serviço 12h00–23h30 · Qua–Sex serviço 18h00/18h30–23h00. Fechado seg e ter.',
    summary: 'Responsável técnico pelo padrão de sabor, apresentação dos pratos, controle rigoroso das Fichas Técnicas, gestão do tempo de saída das comandas, liderança do time da cozinha e validação dos checklists diários F-01 e F-02.',
    keyResponsibilities: [
      'Comandar a linha de cocção, finalização e montagem de 100% dos pratos do cardápio conforme as Fichas Técnicas.',
      'Supervisionar e orientar o trabalho do Auxiliar de Cozinha no mise en place, etiquetagem e higiene.',
      'Auditar o rechaud na abertura e durante todo o serviço garantindo sabor, calor e textura autênticos.',
      'Conferir a comanda impressa e liberar pedidos dentro do tempo padrão (< 15 minutos em média).',
      'Assinar a liberação formal do turno no Checklist F-01 de Abertura e Fechamento.',
      'Identificar e registrar ocorrências de quebra de padrão, devolução de pratos ou necessidade de compra.'
    ],
    shiftRoutine: [
      {
        phase: '1. Pré-preparo & Validação Técnica (antes de abrir)',
        timeRange: 'Sáb–Dom 09h00–12h00 · Qua–Sex 15h30–18h00',
        tasks: [
          'Conferência dos caldeirões de bases paraenses (maniçoba em fervura, tucupi aferventado com alho e chicória, vatapá).',
          'Auditoria do mise en place montado pelo Auxiliar de Cozinha.',
          'Assinatura de liberação do posto no F-01.'
        ]
      },
      {
        phase: '2. Serviço ao público',
        timeRange: 'Sáb–Dom 12h00–23h30 · Qua–Sex 18h00/18h30–23h00',
        tasks: [
          'Comando das comandas da cozinha e distribuição de tarefas.',
          'Cocção das proteínas grelhadas, fritas ou cozidas no ponto exato.',
          'Empratamento e validação visual de apresentação antes da entrega ao garçom.'
        ]
      },
      {
        phase: '3. Fechamento & Inventário Diário',
        timeRange: 'Pós-Serviço',
        tasks: [
          'Validação da etiquetagem de sobras e inspeção das geladeiras.',
          'Conferência do registro de perdas F-02 com justificativas técnicas.',
          'Alinhamento de compras de reposição com o Encarregado de Estoque.'
        ]
      }
    ],
    rulesOfGold: [
      'NUNCA liberar prato fora do padrão da ficha técnica ou com apresentação deficiente.',
      'Garantir que nenhum insumo seja utilizado sem a Etiqueta Universal visível.',
      'Conduzir o serviço com liderança respeitosa, comunicação clara e foco na agilidade.'
    ],
    prohibitions: [
      'NUNCA alterar receitas clássicas da casa sem validação prévia da Diretoria.',
      'NUNCA mascarar alimento em início de deterioração com temperos.'
    ],
    requiredEpi: [
      'Dólmã ou jaleco limpo, calça de segurança, touca/chapéu de cozinheiro, avental e sapatos antiderrapantes.'
    ],
    performanceMetrics: [
      'Tempo médio de saída de pedidos.',
      'Índice de satisfação dos clientes com os pratos e devoluções zero por falha de sabor.',
      'Aderência às fichas técnicas e redução de desperdício.'
    ],
    toolsAndEquipments: [
      'Fogão industrial, forno combinado, grelhas, chapas e batedores.',
      'Facas de precisão e termômetro de sonda.'
    ]
  },
  {
    id: 'estoquista-almoxarife',
    title: 'Encarregado de Estoque & Almoxarifado',
    department: 'Estoque, Almoxarifado & Suprimentos',
    cboCode: '4141-05 (Almoxarife / Estoquista)',
    directSupervisor: 'Gestão Operacional e Compras',
    subordinates: 'Ajudantes de Carga / Descarga',
    workingShift: 'Recebe fornecedores pela manhã/tarde e prepara o estoque antes do serviço. Fechado seg e ter.',
    summary: 'Responsável pelo recebimento qualificado de mercadorias no ato da entrega (com balança e termômetro), conferência de notas fiscais, organização e controle do estoque seco e refrigerado, aplicação do PEPS e monitoramento do Termômetro de Ruptura.',
    keyResponsibilities: [
      'Receber fornecedores conferindo peso na balança, temperatura de congelados e integridade de embalagens.',
      'Registrar todas as entradas no formulário F-01 de Recebimento de Mercadorias.',
      'Etiquetar e armazenar os produtos imediatamente nos seus endereços corretos nas prateleiras e câmaras.',
      'Manter o estoque seco segregado de produtos de limpeza (corrigindo a Foto 4 e 8).',
      'Monitorar o Termômetro de Ruptura e disparar alertas de compra quando atingir o Nível Amarelo (Mínimo).',
      'Realizar a contagem física semanal de 100% dos itens críticos e insumos estratégicos.'
    ],
    shiftRoutine: [
      {
        phase: '1. Recebimento e Conferência',
        timeRange: 'Manhã / início da tarde (antes do serviço)',
        tasks: [
          'Conferência física com balança de pescados, carnes e hortifrúti.',
          'Conferência de validade da nota fiscal e rejeição de itens avariados.',
          'Armazenamento imediato dos congelados e resfriados.'
        ]
      },
      {
        phase: '2. Organização e PEPS',
        timeRange: 'Antes de abrir as portas',
        tasks: [
          'Abastecimento dos estoques operacionais da cozinha e salão.',
          'Garantia do alinhamento PEPS nas prateleiras.',
          'Controle de embalagens descartáveis e produtos de limpeza isolados.'
        ]
      },
      {
        phase: '3. Fim do Turno: Inventário & Compras',
        timeRange: 'Fim do expediente do estoque',
        tasks: [
          'Lançamento de baixas e contagem de itens de alto giro.',
          'Emissão do Relatório de Itens em Nível Mínimo para o setor de Compras.'
        ]
      }
    ],
    rulesOfGold: [
      'NUNCA aceitar mercadoria perecível sem pesagem na balança e aferição de temperatura.',
      'NUNCA permitir que produtos químicos fiquem no mesmo armário de descartáveis ou alimentos.'
    ],
    prohibitions: [
      'NUNCA liberar mercadoria do estoque sem requisição ou registro de saída.',
      'NUNCA deixar compras chegarem a zero para avisar a necessidade de aquisição.'
    ],
    requiredEpi: [
      'Botas de segurança com biqueira, luvas de proteção para carga e jaqueta térmica para câmara fria.'
    ],
    performanceMetrics: [
      'Zero rupturas operacionais no cardápio por falha de controle.',
      'Acuracidade de inventário (> 98%).'
    ],
    toolsAndEquipments: [
      'Balança de piso (até 300kg) e balança de bancada, termômetro infravermelho e leitor de código.'
    ]
  },
  {
    id: 'atendente-garcom',
    title: 'Líder de Salão & Atendente Pai d\'Égua',
    department: 'Salão, Atendimento & Hospitalidade',
    cboCode: '5134-05 (Garçom / Atendente de Restaurante)',
    directSupervisor: 'Gestão Operacional',
    subordinates: 'Cumins, Auxiliares de Salão e Ajudantes',
    workingShift: 'Sáb–Dom 12h00–23h30 (almoço e jantar) · Qua–Sex 18h00/18h30–23h00 (jantar). Entra ~1h antes para abrir o salão. Fechado seg e ter.',
    summary: 'Responsável pela recepção calorosa e acolhedora dos clientes no autêntico padrão paraense, organização impecável do salão e mesas, anotação e transmissão precisa dos pedidos à cozinha, serviço de mesa ágil e garantia de uma experiência gastronômica memorável.',
    keyResponsibilities: [
      'Receber os clientes com cordialidade, sorriso e apresentação do conceito gastronômico paraense.',
      'Organizar, higienizar e alinhar todas as mesas, cadeiras, galheteiros e cardápios.',
      'Anotar pedidos com clareza (sem rasuras ou abreviações duvidosas) e transmitir à cozinha.',
      'Servir pratos e bebidas com elegância, atenção aos detalhes e temperatura correta.',
      'Acompanhar a satisfação dos clientes durante a refeição e solucionar dúvidas com agilidade.',
      'Realizar o fechamento do salão com recolhimento de materiais e conferência de mesas.'
    ],
    shiftRoutine: [
      {
        phase: '1. Abertura do Salão',
        timeRange: '~1h antes de abrir',
        tasks: [
          'Limpeza e sanitização de mesas e cadeiras com álcool 70%.',
          'Alinhamento de galheteiros, farinheiras, pimentas da casa e guardanapos.',
          'Verificação dos cardápios físicos e checagem de pratos especiais do dia com a cozinha.'
        ]
      },
      {
        phase: '2. Atendimento ao Cliente',
        timeRange: 'Sáb–Dom 12h00–23h30 · Qua–Sex 18h00/18h30–23h00',
        tasks: [
          'Acolhimento na porta, acomodação e entrega de cardápios.',
          'Sugestão de entradas regionais (bolinho de tacacá, dadinho de tapioca, sucos regionais).',
          'Entrega rápida de bebidas e acompanhamento do tempo de saída dos pratos.',
          'Fechamento e entrega de conta com clareza.'
        ]
      },
      {
        phase: '3. Fechamento do Salão',
        timeRange: 'Pós-Atendimento',
        tasks: [
          'Recolhimento de louças, higienização final de mesas e organização das cadeiras.',
          'Guarda de galheteiros em local protegido e varrição do salão.'
        ]
      }
    ],
    rulesOfGold: [
      'Hospitalidade calorosa e acolhimento imediato: nenhum cliente espera mais de 1 minuto sem ser recebido.',
      'Atenção máxima a restrições alimentares e alergias comunicadas pelo cliente.'
    ],
    prohibitions: [
      'NUNCA discutir com clientes ou na frente do salão.',
      'NUNCA utilizar o celular pessoal durante o atendimento em salão.'
    ],
    requiredEpi: [
      'Uniforme padrão passado, avental de salão, calçado confortável antiderrapante e crachá visível.'
    ],
    performanceMetrics: [
      'NPS e índice de satisfação do cliente no atendimento.',
      'Ticket médio por mesa e velocidade no fechamento de contas.'
    ],
    toolsAndEquipments: [
      'Bandejas antiderrapantes, comandas eletrônicas/físicas e panos descartáveis.'
    ]
  },
  {
    id: 'operador-caixa',
    title: 'Operador Líder de Caixa & Frente Financeira',
    department: 'Frente de Caixa & Tesouraria',
    cboCode: '4211-25 (Operador de Caixa)',
    directSupervisor: 'Diretoria Financeira e Gestão Operacional',
    subordinates: 'Operadores de Caixa Suplementares',
    workingShift: 'Turnos A e B',
    summary: 'Responsável pela abertura, operação e blindagem financeira do caixa, registro rigoroso de todos os meios de pagamento (dinheiro, PIX, cartões), emissão de cupons fiscais, controle de sangrias com dupla assinatura e conferência cega no fechamento diário F-03.',
    keyResponsibilities: [
      'Realizar a abertura do caixa com conferência física e registro do Fundo de Troco inicial.',
      'Registrar todas as vendas e recebimentos com identificação precisa do meio de pagamento.',
      'Realizar sangrias de segurança quando o volume em dinheiro atingir o limite estipulado.',
      'Validar cortesias, cancelamentos ou descontos somente mediante autorização por escrito da Gestão.',
      'Executar o fechamento cego de caixa no fim do turno e preencher o Formulário F-03 com assinatura.',
      'Entregar o malote financeiro lacrado ao responsável designado.'
    ],
    shiftRoutine: [
      {
        phase: '1. Abertura',
        timeRange: 'Início do Turno',
        tasks: [
          'Contagem física do fundo de troco.',
          'Abertura do sistema e teste de bobinas e impressora fiscal.'
        ]
      },
      {
        phase: '2. Operação',
        timeRange: 'Durante o Turno',
        tasks: [
          'Recebimento ágil e educado das contas de salão e balcão.',
          'Execução de sangrias periódicas com dupla assinatura.',
          'Conferência instantânea de comprovantes de PIX na conta oficial da empresa.'
        ]
      },
      {
        phase: '3. Fechamento Cego',
        timeRange: 'Fim do Turno',
        tasks: [
          'Contagem de valores sem consultar o relatório do sistema (Conferência Cega).',
          'Preenchimento do F-03 e confronto de divergências com a gerência.'
        ]
      }
    ],
    rulesOfGold: [
      'REGRA DA BLINDAGEM: Toda venda é registrada. Nenhuma saída de dinheiro ocorre sem comprovante e dupla assinatura.',
      'REGRA DO PIX: Só liberar pedido após confirmação na tela oficial de recebimento bancário.'
    ],
    prohibitions: [
      'NUNCA compartilhar senha ou PIN de operador com terceiros.',
      'NUNCA guardar dinheiro pessoal dentro da gaveta do caixa do restaurante.'
    ],
    requiredEpi: [
      'Uniforme padrão com crachá oficial de identificação.'
    ],
    performanceMetrics: [
      'Divergência de caixa zero (fechamento 100% conciliado).',
      'Velocidade e ausência de filas no momento do pagamento.'
    ],
    toolsAndEquipments: [
      'PDV com computador, gaveta automática, máquina de cartão e impressora térmica.'
    ]
  }
];
