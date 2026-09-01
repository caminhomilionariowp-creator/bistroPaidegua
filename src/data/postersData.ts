import { PosterSlide } from '../types';

export const POSTERS_DATA: PosterSlide[] = [
  {
    id: "poster-01-cozinha",
    posterNumber: 1,
    giantNumber: "01",
    title: "Sistema Operacional da Cozinha: O Ciclo do Turno",
    subtitle: "Padrão de 3 Fases para Abertura, Serviço de Pico e Fechamento com Rastreabilidade",
    category: "Cozinha",
    sectorId: "cozinha",
    orientation: "landscape",
    colorTheme: "green",
    characterId: "chef_manel",
    characterTitle: "Chef Manel • Líder de Cozinha",
    characterQuote: "Produto sem etiqueta na Abertura ou Fechamento é separado imediatamente. Aqui ninguém improvisa!",
    keyDecision: "Produto sem etiqueta na Abertura ou Fechamento é separado e NÃO volta ao estoque organizado.",
    goldenRule: "Bancada limpa, mise en place pesado e 100% etiquetado antes do primeiro cliente entrar.",
    elements: [
      {
        type: "flow",
        data: {
          phases: [
            {
              number: "Fase 1",
              title: "Abertura (Manhã)",
              time: "08h00 às 11h00",
              color: "border-emerald-500 bg-emerald-50/70 text-emerald-950",
              badgeColor: "bg-emerald-600 text-white",
              icon: "Sun",
              items: [
                "Conferência de bancadas, cubas, chão e equipamentos.",
                "Verificação de temperaturas das geladeiras (0° a 4°C) e freezers (-18°C).",
                "Mise en place dos pratos principais e etiquetagem imediata de cada porção.",
                "Liberação formal do posto pelo Cozinheiro Líder antes do serviço."
              ]
            },
            {
              number: "Fase 2",
              title: "Serviço (Pico)",
              time: "11h00 às 15h00 / 18h00 às 22h00",
              color: "border-amber-500 bg-amber-50/70 text-amber-950",
              badgeColor: "bg-amber-600 text-white",
              icon: "Flame",
              items: [
                "Leitura atenta da comanda de pedido (sem 'achismos' ou memória).",
                "Separação de insumos liberados com data de validade ativa.",
                "Cocção e montagem seguindo à risca a Ficha Técnica Oficial.",
                "Registro imediato de qualquer sobra, quebra ou devolução no F-02."
              ]
            },
            {
              number: "Fase 3",
              title: "Fechamento (Noite)",
              time: "22h00 às 00h00",
              color: "border-blue-500 bg-blue-50/70 text-blue-950",
              badgeColor: "bg-blue-600 text-white",
              icon: "Moon",
              items: [
                "Separação de sobras aproveitáveis em recipientes higienizados.",
                "Etiquetagem de 100% do que for guardado com data limite.",
                "Higienização total de bancadas, ralos, tábuas e cubas.",
                "Assinatura do checklist de fechamento e entrega das pendências à liderança."
              ]
            }
          ]
        }
      }
    ],
    signals: [
      {
        colorCode: "VERDE",
        hex: "#10b981",
        title: "Pode Seguir",
        action: "Bancada higienizada, insumos etiquetados e fichas técnicas seguidas.",
        iconName: "CheckCircle2"
      },
      {
        colorCode: "AMARELO",
        hex: "#f59e0b",
        title: "Atenção",
        action: "Insumo próximo do vencimento (usar primeiro) ou temperatura instável.",
        iconName: "AlertTriangle"
      },
      {
        colorCode: "VERMELHO",
        hex: "#ef4444",
        title: "Parar Imediatamente",
        action: "Produto sem etiqueta ou vencido. Isolar e NÃO servir ao cliente!",
        iconName: "XCircle"
      },
      {
        colorCode: "AZUL",
        hex: "#3b82f6",
        title: "Registro Obrigatório",
        action: "Anotar quebras, perdas e trocas no formulário F-02 de descarte.",
        iconName: "FileSpreadsheet"
      }
    ]
  },
  {
    id: "poster-02-rastreabilidade",
    posterNumber: 2,
    giantNumber: "02",
    title: "A Regra de Ouro: Rastreabilidade Universal",
    subtitle: "Válido para Açaí, Carnes, Peixes, Molhos, Polpas e Todos os Pré-preparos",
    category: "Rastreabilidade",
    sectorId: "cozinha",
    orientation: "landscape",
    colorTheme: "green",
    characterId: "chef_manel",
    characterTitle: "Chef Manel • Cozinha Segura",
    characterQuote: "Primeiro identificar, depois armazenar. Sem etiqueta = Sem uso. Produto sem etiqueta não entra em prato de cliente!",
    keyDecision: "Primeiro identificar, depois armazenar. Sem etiqueta = Sem uso. Produto sem etiqueta não entra em prato de cliente.",
    goldenRule: "Todo produto aberto, fracionado ou pré-preparado recebe a Etiqueta Universal antes de ir para a refrigeração.",
    elements: [
      {
        type: "banner",
        data: {
          labelFields: [
            {
              number: "1",
              field: "[Nome do Produto / Corte]",
              explain: "Evita trocas na correria e garante que o auxiliar encontre o corte ou molho exato em segundos."
            },
            {
              number: "2",
              field: "[Data & Hora de Preparo]",
              explain: "Rastreia o momento exato em que a embalagem foi aberta ou manipulada pelo cozinheiro."
            },
            {
              number: "3",
              field: "[Data & Hora de Validade]",
              explain: "Segurança biológica inegociável. Nunca preencher por 'chute'. Seguir a tabela de validade."
            },
            {
              number: "4",
              field: "[Responsável & Conferente]",
              explain: "Autoria profissional. Comprova quem preparou e quem validou a conformidade do lote."
            }
          ]
        }
      }
    ],
    signals: [
      {
        colorCode: "VERDE",
        hex: "#10b981",
        title: "Etiqueta Válida",
        action: "4 campos preenchidos de forma legível à caneta indelével.",
        iconName: "CheckCircle2"
      },
      {
        colorCode: "AMARELO",
        hex: "#f59e0b",
        title: "Validade Próxima",
        action: "Produto no último dia de consumo. Prioridade absoluta na saída.",
        iconName: "Clock"
      },
      {
        colorCode: "VERMELHO",
        hex: "#ef4444",
        title: "Sem Etiqueta / Vencido",
        action: "PROIBIDO O USO. Separar na caixa vermelha de descarte.",
        iconName: "AlertOctagon"
      },
      {
        colorCode: "AZUL",
        hex: "#3b82f6",
        title: "Auditoria Diária",
        action: "Conferir 100% dos potes no início e fechamento do turno.",
        iconName: "ClipboardCheck"
      }
    ]
  },
  {
    id: "poster-03-estoque",
    posterNumber: 3,
    giantNumber: "03",
    title: "Prevenção de Ruptura & Gestão de Estoque",
    subtitle: "O Termômetro Operacional de Gatilho de Compras e a Regra P.E.P.S.",
    category: "Estoque",
    sectorId: "estoque",
    orientation: "landscape",
    colorTheme: "yellow",
    characterId: "ze_estoque",
    characterTitle: "Zé do Estoque • Almoxarifado & Compras",
    characterQuote: "Ruptura previsível é ZERO! 'Avisar que acabou' durante o pico não é rotina aceitável em restaurante profissional!",
    keyDecision: "Ruptura previsível deve ser ZERO. 'Avisar que acabou' durante o serviço não é rotina aceitável.",
    goldenRule: "Regra P.E.P.S.: O primeiro lote que entra é rigorosamente o primeiro que sai para o pré-preparo.",
    elements: [
      {
        type: "thermometer",
        data: {
          levels: [
            {
              level: "Nível Ideal",
              color: "bg-emerald-500 text-white",
              badge: "Nível Ideal",
              desc: "Quantidade que mantém a operação tranquila até o próximo ciclo programado de entregas.",
              action: "Ação: Manter na faixa padrão de segurança e rotatividade PEPS."
            },
            {
              level: "Nível Mínimo",
              color: "bg-amber-400 text-stone-950",
              badge: "Nível Mínimo (Gatilho)",
              desc: "O ponto exato de disparo da compra obrigatória com os fornecedores homologados.",
              action: "Ação obrigatória: Registrar no F-01 e disparar pedido de compra no mesmo dia."
            },
            {
              level: "Nível Crítico",
              color: "bg-orange-500 text-white",
              badge: "Nível Crítico",
              desc: "Ameaça iminente ao cardápio e atendimento das mesas no próximo turno.",
              action: "Ação: Gestão aciona fornecedor de emergência para evitar o colapso do item."
            },
            {
              level: "Ruptura",
              color: "bg-rose-600 text-white",
              badge: "Ruptura Total",
              desc: "Falha grave de gestão. Item indisponível para venda ao cliente.",
              action: "Ação: Tratar como Não-Conformidade, investigar a causa e recalcular estoque mínimo."
            }
          ]
        }
      }
    ],
    signals: [
      {
        colorCode: "VERDE",
        hex: "#10b981",
        title: "Estoque Seguro",
        action: "Quantidades dentro da margem ideal com lotes organizados por data.",
        iconName: "Boxes"
      },
      {
        colorCode: "AMARELO",
        hex: "#f59e0b",
        title: "Disparar Pedido",
        action: "Item atingiu o nível mínimo. Lançar no F-01 e enviar a compras.",
        iconName: "ShoppingCart"
      },
      {
        colorCode: "VERMELHO",
        hex: "#ef4444",
        title: "Risco de Ruptura",
        action: "Alerta vermelho: Menos de 24h de insumo. Liderança atua de imediato.",
        iconName: "ShieldAlert"
      },
      {
        colorCode: "AZUL",
        hex: "#3b82f6",
        title: "Balança na Entrada",
        action: "Pesar 100% dos insumos no recebimento antes de assinar a nota.",
        iconName: "Scale"
      }
    ]
  },
  {
    id: "poster-04-salao",
    posterNumber: 4,
    giantNumber: "04",
    title: "Frente de Salão: Hospitalidade Pai d'Égua",
    subtitle: "Fluxo de Encantamento do Cliente, Agilidade de Mesa e Retorno Preciso",
    category: "Salão",
    sectorId: "salao",
    orientation: "landscape",
    colorTheme: "blue",
    characterId: "dona_flor",
    characterTitle: "Dona Flor • Líder de Hospitalidade & Atendimento",
    characterQuote: "Receber com o calor e a alegria paraense, mesa impecável e comunicação sem ruídos com a cozinha!",
    keyDecision: "O cliente deve sentir acolhimento desde o primeiro 'boa tarde' até a despedida calorosa na saída.",
    goldenRule: "Comanda 100% legível com observações claras e alinhamento do tempo real de preparo dos pratos.",
    elements: [
      {
        type: "flow",
        data: {
          phases: [
            {
              number: "Etapa 1",
              title: "Abertura & Posto",
              time: "Antes da Casa Abrir",
              color: "border-rose-400 bg-rose-50/70 text-rose-950",
              badgeColor: "bg-rose-600 text-white",
              icon: "Sparkles",
              items: [
                "Alinhamento de mesas e cadeiras com espaçamento confortável.",
                "Limpeza e abastecimento de galheteiros, guardanapos e sachês.",
                "Cardápios físicos impecáveis e QR codes testados.",
                "Conferência do som ambiente e climatização do salão."
              ]
            },
            {
              number: "Etapa 2",
              title: "Recepção & Pedido",
              time: "Durante o Atendimento",
              color: "border-amber-400 bg-amber-50/70 text-amber-950",
              badgeColor: "bg-amber-600 text-white",
              icon: "Smile",
              items: [
                "Acolhimento imediato (menos de 60 segundos após sentar).",
                "Sugestão de entradas típicas, sucos regionais e pratos do dia.",
                "Anotação precisa de restrições alimentares ou pedidos sem coentro/cebola.",
                "Confirmação verbal do pedido com o cliente antes de enviar à cozinha."
              ]
            },
            {
              number: "Etapa 3",
              title: "Entrega & Acompanhamento",
              time: "Durante a Refeição",
              color: "border-emerald-400 bg-emerald-50/70 text-emerald-950",
              badgeColor: "bg-emerald-600 text-white",
              icon: "CheckSquare",
              items: [
                "Entrega ágil das bebidas e entradas em menos de 8 minutos.",
                "Servir os pratos quentes com descrição apetitosa dos ingredientes.",
                "Retorno à mesa após 3 minutos: 'Está tudo a gosto da mesa?'.",
                "Retirada discreta de pratos e copos vazios sem interromper conversas."
              ]
            },
            {
              number: "Etapa 4",
              title: "Fechamento & Despedida",
              time: "Encerramento da Mesa",
              color: "border-blue-400 bg-blue-50/70 text-blue-950",
              badgeColor: "bg-blue-600 text-white",
              icon: "HeartHandshake",
              items: [
                "Apresentação da conta com clareza e divisão de valores se solicitado.",
                "Agradecimento caloroso convidando para a próxima visita.",
                "Higienização imediata da mesa para o próximo cliente (mesa pronta em 2 min).",
                "Assinatura do checklist de salão ao final do expediente."
              ]
            }
          ]
        }
      }
    ],
    signals: [
      {
        colorCode: "VERDE",
        hex: "#10b981",
        title: "Mesa Liberada",
        action: "Mesa limpa, sanitizada e pronta para receber o próximo cliente.",
        iconName: "Sparkles"
      },
      {
        colorCode: "AMARELO",
        hex: "#f59e0b",
        title: "Atenção ao Tempo",
        action: "Tempo de mesa passando de 20 min sem prato. Informar o salão.",
        iconName: "Clock"
      },
      {
        colorCode: "VERMELHO",
        hex: "#ef4444",
        title: "Cliente Insatisfeito",
        action: "Acionar a Líder Dona Flor na hora para resolução imediata e cortesia.",
        iconName: "UserX"
      },
      {
        colorCode: "AZUL",
        hex: "#3b82f6",
        title: "Registro de Elogios",
        action: "Anotar feedbacks de clientes e sugestões para o alinhamento de equipe.",
        iconName: "MessageSquareHeart"
      }
    ]
  },
  {
    id: "poster-05-caixa",
    posterNumber: 5,
    giantNumber: "05",
    title: "Frente de Caixa: Blindagem Financeira",
    subtitle: "Controle Rigoroso de Troco, Sangrias com Dupla Assinatura e Conferência Cega",
    category: "Caixa",
    sectorId: "caixa",
    orientation: "landscape",
    colorTheme: "blue",
    characterId: "camila_caixa",
    characterTitle: "Camila do Caixa • Operadora Líder & Fechamento",
    characterQuote: "Venda lançada confere 100% com o recebido. Sangria e desconto só com dupla checagem assinada!",
    keyDecision: "Venda bate exatamente com o meio de pagamento (Dinheiro, PIX ou Cartão). Diferenças são auditadas na hora.",
    goldenRule: "A conferência de fechamento é cega: o operador conta os valores sem ver o relatório prévio do sistema.",
    elements: [
      {
        type: "grid",
        data: {
          columns: [
            {
              title: "1. Abertura do Caixa (Fundo de Troco)",
              color: "bg-blue-50/80 border-blue-300 text-blue-950",
              steps: [
                { title: "Contagem Inicial", desc: "Contar o fundo de troco fixo de R$ 150,00 na presença de testemunha." },
                { title: "Login Individual", desc: "Operar unicamente no login pessoal do operador. Nunca emprestar senha." },
                { title: "Bobinas & Sistema", desc: "Checar suprimento de bobinas fiscais e conexão das maquininhas de cartão." }
              ]
            },
            {
              title: "2. Operação & Lançamentos",
              color: "bg-emerald-50/80 border-emerald-300 text-emerald-950",
              steps: [
                { title: "Lançamento Fiel", desc: "Toda bebida, sobremesa ou taxa é registrada no sistema antes do recebimento." },
                { title: "Validação de PIX", desc: "Conferir o comprovante na tela do banco do Bistrô antes de liberar a comanda." },
                { title: "Cortesias e Descontos", desc: "Exigem autorização formal do gerente com código de liberação no sistema." }
              ]
            },
            {
              title: "3. Sangrias Programadas",
              color: "bg-amber-50/80 border-amber-300 text-amber-950",
              steps: [
                { title: "Gatilho de Valor", desc: "Caixa acumulou mais de R$ 500 em dinheiro físico? Realizar sangria imediata." },
                { title: "Dupla Assinatura", desc: "Operador e Gerente assinam o comprovante de sangria no formulário F-03." },
                { title: "Guarda em Cofre", desc: "Dinheiro sangrado vai direto para o cofre seguro da administração." }
              ]
            },
            {
              title: "4. Fechamento Cego",
              color: "bg-purple-50/80 border-purple-300 text-purple-950",
              steps: [
                { title: "Contagem Cega", desc: "Operador preenche a folha F-03 com os totais em mãos sem ver o sistema." },
                { title: "Confronto de Lotes", desc: "Emissão da leitura X/Z e conferência dos lotes de cartões e PIX." },
                { title: "Divergência Zero", desc: "Diferenças acima de R$ 2,00 geram relatório de ocorrência com apuração imediata." }
              ]
            }
          ]
        }
      }
    ],
    signals: [
      {
        colorCode: "VERDE",
        hex: "#10b981",
        title: "Caixa 100% Batido",
        action: "Valor apurado confere centavo por centavo com as vendas do sistema.",
        iconName: "ShieldCheck"
      },
      {
        colorCode: "AMARELO",
        hex: "#f59e0b",
        title: "Alerta de Sangria",
        action: "Caixa atingiu teto de cédulas. Fazer sangria com o gerente agora.",
        iconName: "Banknote"
      },
      {
        colorCode: "VERMELHO",
        hex: "#ef4444",
        title: "Divergência de Caixa",
        action: "Diferença não justificada. Auditar cupons e câmeras com a gerência.",
        iconName: "AlertTriangle"
      },
      {
        colorCode: "AZUL",
        hex: "#3b82f6",
        title: "Assinatura do F-03",
        action: "Assinar e anexar os canhotos de cartão no envelope do dia.",
        iconName: "FileCheck"
      }
    ]
  },
  {
    id: "poster-06-governanca",
    posterNumber: 6,
    giantNumber: "06",
    title: "Dicionário Visual & Os 6 Princípios Inegociáveis",
    subtitle: "Código de Cores Oficiais, Símbolos e a Cultura Operacional Bistrô Pai d'Égua",
    category: "Governança",
    sectorId: "gerencia",
    orientation: "landscape",
    colorTheme: "neutral",
    characterId: "seu_silva",
    characterTitle: "Seu Silva • Diretoria & Governança",
    characterQuote: "O padrão não é opcional! A equipe sugere melhorias, mas ninguém cria regras paralelas.",
    keyDecision: "A gestão visual serve para guiar a ação imediata no calor da operação sem precisar ler manuais longos.",
    goldenRule: "Quem segue o padrão protege a si mesmo, a equipe e a reputação do Bistrô Pai d'Égua.",
    elements: [
      {
        type: "dictionary",
        data: {
          colors: [
            { code: "VERDE", hex: "#10b981", title: "Pode Seguir (Conforme)", desc: "Etapa concluída com sucesso, padrão comprovado e insumo seguro liberado." },
            { code: "AMARELO", hex: "#f59e0b", title: "Ponto de Atenção (Conferir)", desc: "Conferência obrigatória antes de avançar para a próxima etapa operacional." },
            { code: "VERMELHO", hex: "#ef4444", title: "Parar Operação (Bloqueio)", desc: "Separar produto imediatamente na caixa de descarte e acionar a liderança." },
            { code: "AZUL", hex: "#3b82f6", title: "Registro Obrigatório (Anotar)", desc: "Ação que exige anotação imediata no formulário de prancheta ou sistema digital." }
          ],
          principles: [
            { num: "1", title: "Responsável Definido", desc: "Toda atividade crítica terá executor, conferente e regra de substituição por cargo." },
            { num: "2", title: "Registro é Trabalho", desc: "Nada entra, sai, é preparado ou descartado sem o devido registro em formulário." },
            { num: "3", title: "Primeiro Identificar, Depois Armazenar", desc: "Produto fracionado recebe etiqueta antes de ser guardado. Sem etiqueta = Sem uso." },
            { num: "4", title: "Padrão Antes de Velocidade", desc: "O trabalho correto é treinado primeiro; só então busca-se agilidade no pico." },
            { num: "5", title: "Fatos Contra Conversas", desc: "Ocorrência não é boato: tem fato, responsável, ação corretiva e prazo definido." },
            { num: "6", title: "Mudança Controlada", desc: "Padrão de franquia: sugestões de melhoria são testadas e validadas antes de virar regra." }
          ]
        }
      }
    ],
    signals: [
      {
        colorCode: "VERDE",
        hex: "#10b981",
        title: "Padrão Franquia",
        action: "Processo auditado e aprovado com 100% de aderência da equipe.",
        iconName: "Award"
      },
      {
        colorCode: "AMARELO",
        hex: "#f59e0b",
        title: "Reciclagem / Treinamento",
        action: "Dúvida na equipe? Treinar novamente com base no cartaz do posto.",
        iconName: "HelpCircle"
      },
      {
        colorCode: "VERMELHO",
        hex: "#ef4444",
        title: "Não Conformidade",
        action: "Descumprimento de regra inegociável. Aplicar escada disciplinar.",
        iconName: "AlertCircle"
      },
      {
        colorCode: "AZUL",
        hex: "#3b82f6",
        title: "Auditoria Semanal",
        action: "Diretoria passa o checklist geral de conformidade toda segunda-feira.",
        iconName: "FileCheck2"
      }
    ]
  }
];
