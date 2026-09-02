import { MasterDossierSection, PhotographicEvidence } from '../types';

export const MASTER_DOSSIER_HEADER = {
  title: "DOSSIÊ MESTRE DE IMPLANTAÇÃO",
  subtitle: "Arquitetura Operacional do Bistrô Pai d'Égua",
  purpose: "Documento-fonte para treinamento de equipe, criação de POPs, checklists, cartazes visuais, mapas mentais e futuro sistema digital. Organiza o que foi observado, o que foi decidido e o que ainda precisa ser validado no campo.",
  version: "1.1",
  date: "01 de setembro de 2026",
  status: "Diagnóstico e Validação de Campo",
  author: "Gestão Operacional & Consultoria",
  company: "Bistrô Pai d'Égua"
};

export const MASTER_DOSSIER_SECTIONS: MasterDossierSection[] = [
  {
    id: "leitura-rapida",
    number: "0",
    title: "Leitura Rápida: O que este projeto resolve",
    content: [
      "O Bistrô Pai d’Égua opera hoje com forte dependência de pessoas, memória e improviso. Não há processos desenhados de ponta a ponta, controles consistentes de estoque, rastreabilidade de produção, cálculo de desperdício, rotina confiável de caixa ou estrutura operacional pronta para crescer em delivery.",
      "A transição necessária é mover a operação do Degrau 1 (Pessoas, Memória e Improviso) para o Degrau 2 (Padrão, Responsabilidade e Registro), preparando o terreno seguro para o Degrau 3 (Crescimento, Delivery e Escala)."
    ],
    callouts: [
      {
        type: "decision",
        title: "A Decisão Central",
        text: "Não se acelera o caos. A expansão de delivery, marketing e novas vendas está pausada até a operação se estabilizar. O negócio precisa deixar de depender de 'quem sabe fazer' e passar a funcionar por sistema."
      }
    ],
    tables: [
      {
        headers: ["Objetivo do projeto", "Como será alcançado"],
        rows: [
          ["Organizar sem burocratizar", "Poucos processos críticos, linguagem simples, folhas práticas no ponto de trabalho e registros rápidos."],
          ["Reduzir improviso", "Função definida, sequência de trabalho, substituição prevista e auditoria diária curta."],
          ["Dar rastreabilidade", "Identificação de toda produção/fracionamento, perdas registradas e autoria de quem executa/confere."],
          ["Prevenir rupturas", "Estoque ideal, mínimo e crítico; compras disparadas antes de acabar."],
          ["Criar gestão por fatos", "Checklists, inventários, perdas, caixa e indicadores antes de decisões de CMV e expansão."],
          ["Preparar crescimento", "Sistema digital individual e mapas visuais após o processo em papel ser testado."]
        ]
      }
    ]
  },
  {
    id: "diagnostico",
    number: "1",
    title: "Contexto e Diagnóstico Operacional (Raio-X)",
    subtitle: "1.1 Estrutura humana observada e riscos",
    content: [
      "A operação regular trabalha, em média, com cerca de seis pessoas. Há cozinheiro e auxiliar de cozinha; no salão, há garçom que também abre e organiza o restaurante, além de auxiliar de salão. Nos fins de semana, quando há maior movimento, a equipe aumenta. Os proprietários realizam compras e tomam decisões, mas não existe um gerente formal nem estrutura contínua de controle operacional.",
      "Horário de funcionamento ao público: quarta 18h30–23h00, quinta 18h00–23h00, sexta 18h30–23h00, sábado e domingo 12h00–23h30. Fechado segunda e terça. Portanto, de quarta a sexta a operação é só jantar; sábado e domingo é almoço e jantar contínuos, com pico maior. A equipe da cozinha entra cerca de 3 horas antes da abertura para o pré-preparo.",
      "Principais causas identificadas:",
      "• Não existe dono formal de processo: tarefas relevantes ficam distribuídas entre 'a cozinha', 'o pessoal' ou os proprietários.",
      "• A rotina ocorre por memória e hábito, e não por instrução, checklist, registro ou auditoria.",
      "• A compra começa quando a falta já aconteceu; não há previsão baseada em giro, mínimo, prazo de fornecedor e estoque de segurança.",
      "• Produtos preparados ou fracionados não têm rastreabilidade consistente: é difícil saber quando foram feitos, por quem e até quando podem ser usados.",
      "• A falta de evidência torna impossível calcular desperdício, comparar consumo real com consumo esperado e corrigir desvios.",
      "• A gestão é puxada para a execução; sem processo, quem deveria coordenar passa a apagar incêndio."
    ],
    callouts: [
      {
        type: "principle",
        title: "Leitura da Situação",
        text: "O problema principal não é a ausência de software. Primeiro faltam padrão, disciplina de registro e definição de responsabilidade. A tecnologia será o espelho da rotina aprovada, nunca um substituto para ela."
      }
    ],
    tables: [
      {
        headers: ["Área", "Cenário atual relatado (Sintoma)", "Risco operacional (Consequência)"],
        rows: [
          ["Gestão", "Proprietários centralizam decisões sem rotina gerencial estruturada.", "Decisões reativas; operação para na ausência dos donos."],
          ["Pessoas", "Ausência de pessoa fixa em momentos críticos; proprietária entra na cozinha para apagar incêndios.", "Apagamento de incêndios diário e operação vulnerável a faltas."],
          ["Cozinha", "Processo informal e por memória; tarefas pouco claras.", "Variação de qualidade, atrasos, perdas e conflitos."],
          ["Estoque", "Sem entrada/saída/inventário; compra por percepção (quando acaba).", "Ruptura, emergências, desperdício e custo invisível."],
          ["Produção", "Sem controle consistente de validade, embalagem ou responsável.", "Descarte indevido e zero rastreabilidade."],
          ["Caixa", "Sem abertura/fechamento consistente, conferência ou blindagem.", "Divergência financeira invisível e gestão sem números."],
          ["Delivery & Digital", "Sem estrutura estável de motoboy ou presença digital pronta.", "Expansão desordenada pode colapsar a operação."]
        ]
      }
    ]
  },
  {
    id: "principios",
    number: "2",
    title: "Norte Operacional e os 6 Princípios Inegociáveis",
    subtitle: "As regras do jogo para garantir previsibilidade e excelência",
    content: [
      "O resultado desejado é um Bistrô que entregue padrão mesmo em dias de pico, em trocas de equipe ou na ausência de uma pessoa específica. Isso significa operação previsível, alimento identificado, estoque confiável, atendimento repetível, caixa conferido e gestão com informação suficiente para agir antes da crise."
    ],
    tables: [
      {
        headers: ["Princípio Inegociável", "Aplicação Prática no Bistrô"],
        rows: [
          ["1. Responsável definido", "Toda atividade crítica terá executor, conferente e regra de substituição por cargo."],
          ["2. Registro é parte do trabalho", "Nada entra, sai, é preparado, descartado, consumido internamente ou dado como cortesia sem registro."],
          ["3. Primeiro identificar, depois armazenar", "Produto aberto, preparado, porcionado, fracionado ou reembalado recebe etiqueta antes de ser guardado."],
          ["4. Padrão antes de velocidade", "O trabalho correto é treinado e repetido; só então mede-se ganho de tempo e velocidade."],
          ["5. Fatos contra conversas", "Ocorrência não fica em bate-boca: tem fato, responsável, ação, prazo e retorno."],
          ["6. Mudança controlada (Padrão de Franquia)", "Melhorias são testadas e aprovadas antes de virar regra. Não se criam regras paralelas na cabeça de cada um."]
        ]
      }
    ]
  },
  {
    id: "arquitetura",
    number: "3",
    title: "Arquitetura da Informação (Quem usa o quê)",
    subtitle: "Distribuição piramidal da complexidade de documentos",
    content: [
      "O sistema é composto por camadas que têm funções diferentes. O erro comum é entregar um manual enorme para quem precisa apenas saber a sequência do turno. A gestão usa a visão completa; a operação usa instruções curtas e visuais."
    ],
    callouts: [
      {
        type: "warning",
        title: "Linguagem de Franquia",
        text: "O padrão oficial não é uma sugestão. A equipe pode propor melhoria, mas não cria uma regra paralela. A mudança precisa ser testada, aprovada e atualizada para que todos trabalhem do mesmo modo."
      }
    ],
    tables: [
      {
        headers: ["Camada", "Usuário Principal", "Entrega e Foco"],
        rows: [
          ["Gestão Visual (Cartazes)", "Equipe no local de trabalho (Cozinha/Salão)", "Foco: Ação imediata, ícones, setas, cores e comandos rápidos."],
          ["Checklists e POPs", "Executor e Conferente", "Foco: Prova de abertura/fechamento, passo a passo crítico e conferência."],
          ["Sistema Digital e Auditoria", "Equipe e Gestão", "Foco: Rastreabilidade, permissões por cargo, histórico e correção de falhas."],
          ["Manual-Mãe", "Gestão e Proprietários", "Foco: Políticas, regras, indicadores estratégicos e governança."]
        ]
      }
    ]
  },
  {
    id: "fluxo-mestre",
    number: "4",
    title: "O Fluxo-Mestre da Operação",
    subtitle: "A cadeia sequencial de 6 elos que move o restaurante",
    content: [
      "FLUXO-MESTRE INTEGRADO:",
      "1. Comprar & Receber -> 2. Armazenar -> 3. Preparar -> 4. Vender -> 5. Caixa -> 6. Gerir"
    ],
    tables: [
      {
        headers: ["Etapa", "Pergunta de Controle", "Registro / Evidência Obrigatória"],
        rows: [
          ["1. Comprar & Receber", "Chegou certo, íntegro e na quantidade/temperatura corretas?", "Registro de recebimento e nota/pedido."],
          ["2. Armazenar", "Está no lugar correto e com validade e categoria visíveis?", "Inventário e alerta de nível mínimo/crítico."],
          ["3. Preparar", "Foi porcionado e etiquetado antes de guardar/utilizar?", "Etiqueta universal, ficha técnica e registro de perdas."],
          ["4. Vender", "O pedido foi completo, legível e dentro do padrão de atendimento?", "Comanda/pedido e registro de ocorrências."],
          ["5. Caixa", "Toda venda, sangria e meio de pagamento bate com o apurado?", "Folha de abertura, sangria e fechamento blindado."],
          ["6. Gerir", "O que os dados do turno exigem corrigir e planejar?", "Relatório diário, painel do dia 1 e reunião semanal."]
        ]
      }
    ]
  },
  {
    id: "matriz-autoridade",
    number: "5",
    title: "Matriz de Autoridade e Descritivo de Cargos",
    subtitle: "Definição oficial de funções, atribuições diárias e limites inegociáveis",
    content: [
      "A operação do Bistrô Pai d'Égua não pode depender de boa vontade difusa ou de 'todo mundo faz um pouco de tudo'. Cada posto tem um responsável nominal, atribuições detalhadas por horário de turno e limites claros do que é expressamente proibido.",
      "Abaixo estão os descritivos oficiais de cada cargo, com destaque central para as funções do Auxiliar de Cozinha, Cozinheiro Líder, Encarregado de Estoque, Líder de Salão e Operador de Caixa."
    ],
    callouts: [
      {
        type: "principle",
        title: "Princípio do Dono de Posto",
        text: "Cada processo crítico tem um executor nominal e um conferente qualificado. O Auxiliar de Cozinha é o pilar de sustentação da segurança alimentar, do mise en place e da rastreabilidade da produção."
      }
    ],
    tables: [
      {
        headers: ["Cargo / Função", "Missão Central", "Subordinação Direta", "O Limite Crítico (O que NUNCA Fazer)"],
        rows: [
          ["Auxiliar de Cozinha (Mise en Place & Higiene)", "Pré-preparo de insumos, porcionamento, etiquetagem obrigatória de 100% dos alimentos fracionados, reabastecimento do rechaud, esterilização de bancadas e louça zero no tanque.", "Reporta ao Cozinheiro Líder e Gestão Operacional", "NUNCA guardar alimentos na geladeira sem a Etiqueta Universal preenchida; NUNCA usar panos de tecido em bancadas; NUNCA alterar proporções de receitas."],
          ["Cozinheiro Líder (Chef de Cozinha)", "Comando da cocção, controle de fichas técnicas, padrão de sabor e apresentação, tempo de saída de comandas e validação do F-01 de abertura e fechamento.", "Reporta à Gestão Operacional e Diretoria", "NUNCA liberar prato fora do padrão; NUNCA mascarar alimento em início de perda com temperos; NUNCA deixar falha crítica sem registro no F-02."],
          ["Encarregado de Estoque (Almoxarife)", "Recebimento técnico com balança e termômetro, regra PEPS, controle do Termômetro de Ruptura e compras disparadas no nível amarelo.", "Reporta à Gestão Operacional e Compras", "NUNCA aceitar mercadoria sem conferência de peso/temperatura; NUNCA permitir produtos de limpeza misturados com descartáveis ou alimentos."],
          ["Líder de Salão (Atendente / Garçom)", "Hospitalidade no padrão paraense, organização e alinhamento de mesas, anotação precisa de pedidos e acompanhamento do tempo de atendimento.", "Reporta à Gestão Operacional", "NUNCA deixar cliente esperando recepção; NUNCA acumular louça suja em mesas; NUNCA usar celular pessoal durante o atendimento."],
          ["Operador Líder de Caixa", "Abertura com conferência de troco, registro rigoroso de vendas, conferência de PIX bancário, sangrias com dupla assinatura e fechamento cego no F-03.", "Reporta à Diretoria Financeira", "NUNCA compartilhar senha/PIN do PDV; NUNCA liberar pedido sem confirmação bancária; NUNCA ignorar divergências no fechamento."],
          ["Gestão Operacional & Diretoria", "Auditoria semanal, treinamento continuado, controle de CMV, escala e cumprimento dos 6 Princípios Inegociáveis.", "Franqueador / Diretoria Executiva", "NUNCA absorver tarefas operacionais diárias em substituição a processos que devem ser executados pela equipe treinada."]
        ]
      }
    ]
  },
  {
    id: "descritivo-auxiliar-cozinha",
    number: "5.1",
    title: "Descritivo Detalhado: Cargo de Auxiliar de Cozinha",
    subtitle: "Atribuições completas, rotina horária, EPIs obrigatórios e checklists operacionais",
    content: [
      "CARGO OFICIAL: Auxiliar de Cozinha & Mise en Place (CBO 5135-05)",
      "Setor: Cozinha, Pré-Preparo, Buffet Rechaud & Higienização Sanitária",
      "Superior Imediato: Cozinheiro Líder (Chef Manoel)",
      "",
      "1. MISSÃO CENTRAL DO CARGO:",
      "Executar com rigor técnico, pontualidade e disciplina sanitária todo o pré-preparo de alimentos (mise en place), porcionamento de carnes e guarnições, etiquetagem e rastreabilidade universal obrigatória, montagem e reposição ágil do buffet rechaud (70°C), lavagem contínua de utensílios pelo método 'sujou, lavou' (evitando acúmulo no tanque) e higienização profunda do posto de trabalho, garantindo que o Cozinheiro Líder tenha todos os insumos prontos para o serviço de pico sem atrasos.",
      "",
      "2. ATRIBUIÇÕES E ROTINAS POR FASE DO TURNO:",
      "Horário do Bistrô: Sáb–Dom serviço das 12h00 às 23h30 (almoço e jantar) · Qua–Sex das 18h00/18h30 às 23h00 (jantar). Fechado segunda e terça. A cozinha entra cerca de 3h antes de abrir as portas.",
      "• FASE 1: PRÉ-PREPARO (antes de abrir — Sáb–Dom a partir das 09h00, Qua–Sex a partir das 15h30)",
      "  - Ao entrar: Paramentação com EPIs limpos (touca 100% dos cabelos, avental impermeável, botas antiderrapantes, unhas curtas e sem adornos). Lavagem e assepsia das mãos por 40 segundos.",
      "  - +15 min: Sanitização de bancadas de inox, tábuas de corte coloridas e cubas GN com álcool 70% e solução desinfetante.",
      "  - +30 min: Auditoria de geladeiras e freezers — checar 100% das etiquetas adesivas e validades; descartar ou isolar qualquer item sem identificação.",
      "  - ~2h antes de abrir: Abastecer o banho-maria do rechaud com água limpa, ligar o aquecimento e certificar temperatura mínima de 70°C.",
      "  - ~2h antes de abrir: Posicionar as preparações base no rechaud (arroz branco, feijão preto, baião de dois, vatapá, maniçoba, arroz paraense).",
      "  - ~90 min antes: Mise en place de vegetais e guarnições: cebolas em rodelas, limões em 4 partes meia-lua (sem sementes), vinagrete em cubinhos, farofa crocante e brunoise fina de temperos.",
      "  - ~60 min antes: Pré-preparo de proteínas e insumos amazônicos: dessalgue e limpeza de camarão, catação e lavagem de jambu, aquecimento de tucupi e porcionamento de carnes.",
      "  - ~30 min antes: ETIQUETAGEM OBRIGATÓRIA: preencher a Etiqueta Universal (Produto, Data/Hora, Validade Técnica, Executor, Conferente) e colar em cada cuba antes de armazenar.",
      "  - Antes de abrir: Apoiar o Cozinheiro Líder na conferência e assinatura do Formulário de Abertura F-01.",
      "",
      "• FASE 2: SERVIÇO AO PÚBLICO (Sáb–Dom 12h00 às 23h30 · Qua–Sex 18h00/18h30 às 23h00)",
      "  - Monitorar o nível das cubas no rechaud e fazer a reposição imediata antes de atingir o nível amarelo de escassez.",
      "  - Operar a fritadeira (bolinhos de tacacá, dadinhos de tapioca, batatas, macaxeira frita) seguindo rigorosamente os tempos da ficha técnica.",
      "  - Manter as bancadas limpas e secas durante a saída de comandas.",
      "  - Lavar panelas, recipientes e utensílios continuamente, mantendo a pia e o tanque sempre livres e desobstruídos (corrigindo a Foto 10).",
      "  - Trocar o saco de lixo das lixeiras de pedal ao atingir 2/3 da capacidade e higienizar as mãos imediatamente após.",
      "  - Registrar sobras ou perdas imprevistas no Formulário F-02 (Registro de Perdas & Descarte).",
      "",
      "• FASE 3: FECHAMENTO E ENCERRAMENTO (após o último cliente — Sáb–Dom a partir das 23h30, Qua–Sex a partir das 23h00)",
      "  - Transferir sobras aproveitáveis do rechaud para recipientes higienizados menores.",
      "  - Aplicar NOVA Etiqueta Universal com data/hora de fechamento e nova validade sob refrigeração.",
      "  - Desligar, esvaziar a água e sanitizar o rechaud e cubas GN.",
      "  - Limpeza pesada e desengorduramento de coifas, fogões industriais, chapas e bancadas de inox.",
      "  - Lavagem e desinfecção de pisos e ralos com água e desinfetante clorado.",
      "  - Guardar utensílios limpos nas prateleiras mapeadas por categoria (corrigindo a Foto 8).",
      "  - Assinar o checklist de fechamento no F-01 e reportar o status final ao Cozinheiro Líder."
    ],
    callouts: [
      {
        type: "warning",
        title: "Regras de Ouro e Proibições do Auxiliar de Cozinha",
        text: "1) NUNCA guardar produto na geladeira sem a Etiqueta Universal preenchida. 2) NUNCA descongelar carnes/camarão em temperatura ambiente ou com água quente. 3) NUNCA usar panos de prato de tecido em bancadas. 4) NUNCA misturar produtos químicos junto a alimentos ou descartáveis."
      }
    ],
    tables: [
      {
        headers: ["EPI Obrigatório", "Finalidade de Proteção", "Norma de Segurança"],
        rows: [
          ["Touca descartável / Gorro", "Proteção de 100% dos cabelos contra queda física em alimentos.", "RDC 216 / Boas Práticas"],
          ["Avental impermeável de PVC", "Proteção contra respingos de água, gordura e produtos químicos na lavagem.", "NR-06 / Proteção Térmica/Líquida"],
          ["Avental de tecido limpo", "Uso exclusivo nas bancadas de manipulação e corte de mise en place.", "Boas Práticas de Fabricação"],
          ["Calçado de segurança antiderrapante fechado", "Prevenção contra escorregões em pisos molhados e queda de objetos cortantes.", "NR-06 / NR-32"],
          ["Luvas nitrílicas descartáveis", "Manipulação higiênica de alimentos prontos para consumo e guarnições frias.", "RDC 216"],
          ["Luvas térmicas de cano longo", "Manuseio seguro de cubas quentes do rechaud, assadeiras e panelas pesadas.", "Segurança Ocupacional"]
        ]
      }
    ]
  },
  {
    id: "sistema-cozinha",
    number: "6",
    title: "Sistema Operacional da Cozinha: O Ciclo do Turno",
    subtitle: "As 3 Fases fundamentais: Pré-preparo, Serviço ao público e Fechamento",
    content: [
      "Horário: Sáb–Dom serviço 12h00–23h30 · Qua–Sex serviço 18h00/18h30–23h00. Fechado seg e ter. A equipe entra ~3h antes de abrir.",
      "Fase 1: Pré-preparo (antes de abrir as portas)",
      "1. Higiene pessoal, uniforme e preparação do posto de trabalho.",
      "2. Conferência de bancada, utensílios, equipamentos e condições de limpeza.",
      "3. Verificação de geladeiras e freezers: etiqueta, validade, integridade e organização.",
      "4. Separação imediata de item sem identificação, condição inadequada ou validade indefinida (produto sem etiqueta é separado e não volta ao estoque).",
      "5. Mise en place: separar, porcionar e preparar insumos do turno.",
      "6. Etiquetar imediatamente todo produto aberto, preparado ou fracionado.",
      "7. Conferência técnica do cozinheiro e liberação do posto.",
      "",
      "Fase 2: Serviço ao público",
      "8. Leitura correta do pedido (sem improvisos ou adivinhações).",
      "9. Separação de insumos liberados e identificados.",
      "10. Cocção e montagem seguindo rigorosamente a ficha técnica.",
      "11. Conferência final de apresentação antes da liberação.",
      "12. Registro em tempo real de devoluções, descartes ou perdas no momento em que acontecem.",
      "",
      "Fase 3: Fechamento (após o último cliente)",
      "13. Separação de sobras aproveitáveis conforme padrão.",
      "14. Embalagem e etiquetagem obrigatória de tudo o que será armazenado.",
      "15. Registro de todas as perdas do turno.",
      "16. Higienização total de equipamentos, bancadas e pisos.",
      "17. Assinatura do checklist de fechamento e envio de pendências à gestão."
    ]
  },
  {
    id: "rastreabilidade",
    number: "7",
    title: "A Regra de Ouro: Rastreabilidade Universal",
    subtitle: "Padrão mandatório para todos os alimentos manipulados, porcionados ou abertos",
    content: [
      "A regra não é exclusiva para açaí. Ela vale para tudo que for manipulado, aberto, preparado, porcionado, fracionado ou reembalado: açaí, camarão, carnes, frango, peixe, molhos, polpas, porções e pré-preparos.",
      "A mesma etiqueta e o mesmo fluxo evitam que a equipe precise decorar regras diferentes para cada produto."
    ],
    callouts: [
      {
        type: "decision",
        title: "Regra de Ouro Mandatória",
        text: "Primeiro identificar, depois armazenar. Produto sem etiqueta não entra na produção, não volta para a geladeira e não é liberado para o cliente. Sem etiqueta = Sem uso."
      }
    ],
    tables: [
      {
        headers: ["Campo na Etiqueta", "Função e Por que Existe"],
        rows: [
          ["Nome do Produto", "Localização: Evita trocas e permite achar o item exato rapidamente."],
          ["Data / Hora de Preparo", "Histórico: Rastreia exatamente quando a manipulação ocorreu."],
          ["Data de Validade", "Segurança: Define limite de uso por padrão técnico (nunca preencher por 'chute')."],
          ["Responsável / Conferente", "Autoria: Permite treinamento cirúrgico em caso de falha e comprova liberação."]
        ]
      }
    ]
  },
  {
    id: "estoque-ruptura",
    number: "8",
    title: "Prevenção de Ruptura: Gestão de Estoque",
    subtitle: "O Termômetro Operacional de Níveis e Compras Antecipadas",
    content: [
      "A disponibilidade do cardápio não pode depender de alguém avisar que acabou no início do serviço. O estoque precisa antecipar a necessidade e disparar compra antes da ruptura previsível."
    ],
    callouts: [
      {
        type: "goal",
        title: "Meta Operacional",
        text: "Ruptura previsível deve ser ZERO. 'Avisar que acabou' durante o serviço não é rotina aceitável."
      }
    ],
    tables: [
      {
        headers: ["Nível do Termômetro", "Significado Operacional", "Ação Obrigatória Imediata"],
        rows: [
          ["Nível Ideal (Verde)", "Quantidade que mantém a operação tranquila até o próximo ciclo.", "Manter na faixa padrão."],
          ["Nível Mínimo (Amarelo)", "O ponto de gatilho do pedido.", "Ação obrigatória: Registrar necessidade e disparar compra agora."],
          ["Nível Crítico (Laranja)", "Ameaça iminente à operação.", "Gestão atua imediatamente para evitar o colapso do item."],
          ["Ruptura (Vermelho)", "Falha sistêmica: indisponível para venda.", "Tratar como ocorrência grave, investigar causa e calibrar estoque mínimo."]
        ]
      }
    ]
  },
  {
    id: "salao-caixa",
    number: "9",
    title: "Frente de Loja: Salão e Blindagem de Caixa",
    subtitle: "Hospitalidade no atendimento e segurança financeira inegociável",
    content: [
      "Salão (Fluxo e Hospitalidade):",
      "• Abertura: Limpeza, mesas, cardápios, equipamentos e comunicação do turno.",
      "• Atendimento: Recepção calorosa, anotação de pedido, confirmação de observações e acompanhamento.",
      "• Comunicação: Pedido legível para a cozinha e retorno de tempo ao cliente.",
      "• Fechamento: Devolução de materiais, organização e checklist final.",
      "",
      "Caixa (Blindagem Financeira):",
      "• Abertura: Fundo inicial registrado e responsável formal logado.",
      "• Segurança: Venda bate exatamente com o meio de pagamento recebido; sangrias exigem motivo e dupla checagem.",
      "• Exceções: Descontos, cortesias e cancelamentos exigem autorização definida no sistema/registro.",
      "• Fechamento: Comparar esperado vs. apurado. Divergências não são ignoradas: são registradas e auditadas."
    ]
  },
  {
    id: "digital-analogico",
    number: "10",
    title: "Digital vs. Analógico: A Transição Híbrida",
    subtitle: "A tecnologia como espelho da rotina aprovada, com contingência total em papel",
    content: [
      "No início da implantação, o Bistrô Pai d'Égua trabalhará com formulário impresso e registro digital em paralelo.",
      "1. Acesso Individual (PIN/QR): Fim do 'login genérico' por setor. O sistema guarda a autoria de quem registrou e conferiu.",
      "2. Espelho do Papel: A tecnologia reflete a rotina aprovada, não inventa complexidades novas.",
      "3. Visão por Cargo: A tela é limpa. Cozinha vê produção; Estoque vê níveis; Caixa vê pagamentos.",
      "4. Contingência (Backup): Na queda de energia ou internet, a prancheta de papel assume sem parar a operação. O lançamento digital é feito depois, preservando o horário real."
    ]
  },
  {
    id: "dicionario-visual",
    number: "11",
    title: "O Dicionário da Gestão Visual",
    subtitle: "Linguagem universal de cores, setas e sinalizações no ambiente de trabalho",
    content: [
      "A gestão visual cria cartazes de uma página com comandos curtos, cores padronizadas e fotos reais."
    ],
    tables: [
      {
        headers: ["Código Visual", "Significado Fixo na Operação"],
        rows: [
          ["🟢 Verde", "Pode seguir. Etapa concluída com sucesso."],
          ["🟡 Amarelo", "Ponto de atenção. Conferência obrigatória antes de continuar."],
          ["🔴 Vermelho", "Parar operação. Separar produto e avisar liderança."],
          ["🔵 Azul", "Ação de registro obrigatória (no formulário ou sistema)."],
          ["➡️ Setas Direcionais", "Apontam a ordem exata do fluxo (não confiar na memória)."],
          ["📷 Fotos Reais", "Sinalização usa fotos reais de equipamentos e pratos do Bistrô Pai d'Égua."]
        ]
      }
    ]
  },
  {
    id: "cronograma-correcao",
    number: "12",
    title: "Cronograma de Instalação e Escada de Correção",
    subtitle: "O plano de 30 dias e a metodologia justa de cobrança por etapas",
    content: [
      "Fases de Implantação:",
      "• Fase 1 (Dia 0): Patrocínio - Regras definidas, liderança alinhada e reunião semanal fixada.",
      "• Fase 2 (Dias 1-7): Controle Inicial - Organização física, etiquetas obrigatórias e inventário zero.",
      "• Fase 3 (Dias 8-21): Padronização - POPs treinados e fichas técnicas piloto.",
      "• Fase 4 (Dias 22-30): Estabilização - Auditoria diária, medição de aderência e cobertura de escala.",
      "• Fase 5 (Pós-30 dias): Melhoria Contínua - CMV real x teórico, margem, metas e expansão de delivery.",
      "",
      "Escada de Correção Operacional:",
      "1. Ajuste (Falha simples) -> Demonstrar o padrão e registrar orientação.",
      "2. Reforço (Dúvida/Reincidência) -> Treinar de novo e observar uma execução completa.",
      "3. Plano (Falha repetida) -> Ação documentada com prazo e conferência.",
      "4. Decisão (Descumprimento consciente) -> Ação de RH pela diretoria."
    ]
  },
  {
    id: "painel-dia-1",
    number: "13",
    title: "O Painel do 'Dia 1' (Foco no Processo)",
    subtitle: "Indicadores operacionais que antecedem as decisões financeiras",
    content: [
      "Nos primeiros 30 dias, a prioridade não é cobrar lucro ou CMV sem dados limpos. O foco é a disciplina do processo:"
    ],
    callouts: [
      {
        type: "goal",
        title: "Critério de Sucesso",
        text: "O projeto funciona quando um funcionário novo entende sua função, executa com o material visual, registra o que fez e não precisa que a gestão faça por ele."
      }
    ],
    tables: [
      {
        headers: ["Indicador do Dia 1", "O que Mede", "Status nos Primeiros 30 Dias"],
        rows: [
          ["Aderência a Checklists (%)", "Mede onde o padrão está sendo cumprido ou falhando.", "Ativo no Dia 1"],
          ["Ocorrências de Ruptura", "Conta as vezes em que a operação parou por falta de item.", "Ativo no Dia 1"],
          ["Perdas por Motivo", "Quantidade e produto descartado com o motivo exato.", "Ativo no Dia 1"],
          ["CMV Real x Teórico", "Desbloqueado após 30 dias de registros consistentes.", "🔒 Bloqueado"],
          ["Margem de Lucro Real", "Desbloqueado após inventários e fichas técnicas auditadas.", "🔒 Bloqueado"]
        ]
      }
    ]
  }
];

export const PHOTOGRAPHIC_AUDIT_DATA: PhotographicEvidence[] = [
  {
    id: 1,
    title: "Gestão visual já existente na cozinha",
    photoNumber: "Foto 1",
    imagePlaceholderText: "4 cartazes expostos: cores de tábuas, higienização de bancadas, higienização de fogões e coleta de amostras",
    whatImageProves: "Há quatro materiais expostos na parede: cores de tábuas por categoria, higienização de bancadas, higienização de fogões/chapas e coleta de amostra. Eles comprovam intenção prévia de orientar a equipe.",
    operationalConclusion: "A gestão visual já é culturalmente aceita no local. Porém, os cartazes necessitam de controle de versão, posicionamento por tarefa, plastificação e revisão do conteúdo.",
    recommendedAction: "Inventariar os cartazes atuais; validar conteúdo; substituir por versões padronizadas, plastificadas, datadas e identificadas por setor.",
    evidenceLimit: "A foto não permite confirmar se os cartazes estão atualizados ou se o procedimento é efetivamente executado.",
    priority: "Primeiros 7 dias"
  },
  {
    id: 2,
    title: "Checklist de cozinha em condição inadequada",
    photoNumber: "Foto 2",
    imagePlaceholderText: "Folha de checklist rasgada, manchada de gordura sobre bancada ao lado de alimentos",
    whatImageProves: "Existe uma tentativa de checklist (abertura, mise en place, higienização, fechamento). O papel está rasgado, manchado e depositado sobre a superfície de manipulação.",
    operationalConclusion: "O suporte físico atual e o controle documental não sustentam o uso diário confiável. Papel sujo sobre bancada gera risco de contaminação.",
    recommendedAction: "Retirar o papel da bancada; reconstruir checklist com campos de executor, conferente e versão; disponibilizar em prancheta de acrílico lavável fora da área de alimentos.",
    evidenceLimit: "A imagem não prova quais itens são cumpridos ou quem preenche; exige observação direta.",
    priority: "Imediata"
  },
  {
    id: 3,
    title: "Receitas expostas na estação de produção",
    photoNumber: "Foto 3",
    imagePlaceholderText: "Folhas soltas de receitas (tacacá, arroz paraense, maniçoba, vatapá) coladas com fita atrás da estação",
    whatImageProves: "Há folhas de receitas para tacacá, arroz paraense, feijão preto, baião de dois, vatapá e maniçoba fixadas atrás da estação. A fonte é pequena e são folhas isoladas.",
    operationalConclusion: "O conhecimento técnico existe, mas está desestruturado. Faltam fichas técnicas oficiais com rendimento, custo, fotos de montagem e controle de versão.",
    recommendedAction: "Recolher as anotações; transformar em fichas técnicas padronizadas; disponibilizar guia visual plastificado na bancada de montagem.",
    evidenceLimit: "Não é possível validar ingredientes ou proporções pela foto; deve ser conferido na prática com a equipe.",
    priority: "Primeiros 30 dias"
  },
  {
    id: 4,
    title: "Armazenamento misto de descartáveis e materiais de limpeza",
    photoNumber: "Foto 4",
    imagePlaceholderText: "Armário aberto com descartáveis, vassoura, produtos químicos de limpeza e itens diversos juntos",
    whatImageProves: "Área de armário com grande volume de descartáveis, vassoura, recipientes químicos de limpeza e objetos diversos misturados.",
    operationalConclusion: "Falta segregação física entre materiais de consumo do cliente e produtos de limpeza. Risco de contaminação e dificuldade de inventário.",
    recommendedAction: "Criar zonas exclusivas; colocar descartáveis em prateleiras fechadas e limpas; transferir produtos químicos para armário exclusivo de limpeza.",
    evidenceLimit: "A foto não mostra o fluxo completo do armário, mas aponta risco organizacional evidente.",
    priority: "Imediata"
  },
  {
    id: 5,
    title: "Armazenamento refrigerado com porções sem rastreabilidade",
    photoNumber: "Foto 5",
    imagePlaceholderText: "Freezer/geladeira com sacos e balde reaproveitado sem etiquetas completas",
    whatImageProves: "Porções em sacos plásticos, recipientes variados e um balde dentro do equipamento. Há marcações manuais nas prateleiras, mas não há etiquetas nas embalagens.",
    operationalConclusion: "Identificar a prateleira não basta: se o pote for movido, perde-se a validade e a autoria. Risco sanitário e de desperdício.",
    recommendedAction: "Implantar etiqueta universal adesiva em cada saco/pote; padronizar recipientes transparentes com tampa; banir baldes reaproveitados.",
    evidenceLimit: "A foto não confirma temperatura interna ou validade real do conteúdo.",
    priority: "Imediata"
  },
  {
    id: 6,
    title: "Anotações de produção e ficha manuscrita",
    photoNumber: "Foto 6",
    imagePlaceholderText: "Ficha rasgada escrita à mão de Bolinho de Tacacá colada no azulejo",
    whatImageProves: "Ficha manuscrita de 'Bolinho de Tacacá' com rendimento aproximado e tarefas do dia, afixada de forma precária no azulejo.",
    operationalConclusion: "Tentativa louvável da equipe de padronizar a receita, mas sem robustez documental e sem padrão de montagem.",
    recommendedAction: "Digitalizar e calibrar os pesos da receita; criar ficha técnica oficial ilustrada com rendimento validado e passos de segurança.",
    evidenceLimit: "Não é possível validar o custo ou rendimento real sem pesagem técnica.",
    priority: "Primeiros 30 dias"
  },
  {
    id: 7,
    title: "Porções armazenadas em equipamento refrigerado",
    photoNumber: "Foto 7",
    imagePlaceholderText: "Sacos com polpas e produtos escuros empilhados sem identificação",
    whatImageProves: "Múltiplos sacos empilhados com polpas ou produtos escuros sem etiqueta individual visível.",
    operationalConclusion: "Reforça a necessidade da Regra de Ouro: todo alimento fracionado precisa ser identificado antes de ser guardado.",
    recommendedAction: "Separar os itens; inspecionar validade; aplicar etiquetas em 100% dos pacotes; organizar por gavetas PEPS.",
    evidenceLimit: "Não é possível aferir a data de embalagem sem etiqueta.",
    priority: "Imediata"
  },
  {
    id: 8,
    title: "Prateleira com categorias misturadas",
    photoNumber: "Foto 8",
    imagePlaceholderText: "Estante com pratos limpos, temperos, embalagens plásticas e produtos de limpeza próximos",
    whatImageProves: "Estante de aço reunindo utensílios limpos, ingredientes abertos, caixas de papelão e proximidade com produtos de limpeza.",
    operationalConclusion: "A mistura de funções retarda o trabalho, favorece quedas e prejudica o padrão de higiene e controle de estoque.",
    recommendedAction: "Mapear as prateleiras com faixas de cores e etiquetas de endereço; isolar utensílios em caixas plásticas com tampa.",
    evidenceLimit: "A foto não detalha o estado de conservação interno dos recipientes.",
    priority: "Primeiros 7 dias"
  },
  {
    id: 9,
    title: "Contagem manual de descartáveis e materiais",
    photoNumber: "Foto 9",
    imagePlaceholderText: "Prancheta com tabela manuscrita colada na porta do armário",
    whatImageProves: "Folha com lista de descartáveis, copos e sacos com números escritos à caneta, presa na porta.",
    operationalConclusion: "A equipe já tem iniciativa de contagem! Falta apenas transformar a folha solta em um Inventário Oficial com níveis de estoque e responsável.",
    recommendedAction: "Migrar a folha para o modelo oficial F-04 (Inventário de Estoque Crítico) com estoque mínimo e disparador de compras.",
    evidenceLimit: "A foto não esclarece a frequência das anotações.",
    priority: "Primeiros 7 dias"
  },
  {
    id: 10,
    title: "Área de lavagem/tanque com objetos acumulados",
    photoNumber: "Foto 10",
    imagePlaceholderText: "Tanque inox com roupas, sacolas e botijão de gás ao lado",
    whatImageProves: "Área de tanque com sacos, panos e botijão ao lado sem segregação.",
    operationalConclusion: "A área de higienização não pode ser usada como depósito ou apoio temporário. Prejudica o fluxo de limpeza.",
    recommendedAction: "Desobstruir a pia; definir área exclusiva para cilindros e lavagem; afixar cartaz de higienização correta.",
    evidenceLimit: "A foto não mostra se a torneira está funcionando.",
    priority: "Imediata"
  }
];
