import { POPItem } from '../types';

export const POPS_DATA: POPItem[] = [
  {
    id: "pop-01",
    code: "POP-01",
    title: "Abertura e Mise en Place da Cozinha",
    version: "1.0",
    date: "01/09/2026",
    targetSector: "Cozinha",
    objective: "Garantir que a cozinha inicie o turno com total higienização, insumos inspecionados, pré-preparos devidamente etiquetados e bancadas liberadas para o serviço de pico sem improvisos.",
    responsibleRole: "Auxiliar de Cozinha",
    checkerRole: "Cozinheiro Líder",
    frequency: "Diário (Início do Turno)",
    materialsNeeded: [
      "Uniforme completo (avental, touca, calçado fechado)",
      "Solução clorada / álcool 70%",
      "Etiquetas universais e caneta marcadora indelével",
      "Prancheta do Checklist Diário F-01",
      "Termômetro de alimentos e cubas gastronômicas limpas"
    ],
    steps: [
      {
        order: 1,
        title: "Higiene Pessoal e Paramentação",
        description: "Lavar as mãos e antebraços com sabonete bactericida por 40 segundos. Colocar touca protegendo 100% dos cabelos e avental limpo.",
        criticalControlPoint: "Nenhum adorno (anéis, relógios) é permitido na área de manipulação.",
        visualSignal: "green",
        requiredEvidence: "Checklist F-01 assinalado"
      },
      {
        order: 2,
        title: "Inspeção e Sanitização de Bancadas e Equipamentos",
        description: "Higienizar todas as superfícies de inox, chapas, fogões e tábuas com detergente neutro e pulverização de álcool 70%. Aguardar secagem natural.",
        criticalControlPoint: "Não utilizar panos reutilizáveis sujos. Usar papel descartável ou pano descartável novo.",
        visualSignal: "yellow",
        requiredEvidence: "Bancadas livres de resíduos"
      },
      {
        order: 3,
        title: "Verificação das Geladeiras e Freezers (Auditoria de Etiquetas)",
        description: "Abrir equipamentos de refrigeração e conferir etiquetas de todos os recipientes. Conferir datas de validade e integridade visual dos alimentos.",
        criticalControlPoint: "SEPARAR IMEDIATAMENTE qualquer produto sem etiqueta ou com validade vencida. Não utilizar.",
        visualSignal: "red",
        requiredEvidence: "Registro de perdas F-02 caso haja descarte"
      },
      {
        order: 4,
        title: "Mise en Place dos Pratos do Turno",
        description: "Cortar, porcionar e separar os insumos necessários (camarão limpo, carnes cortadas, jambu cozido, tucupi aferventado, molhos em bisnagas).",
        criticalControlPoint: "Fracionar apenas a quantidade prevista para o turno para evitar sobras excessivas.",
        visualSignal: "green",
        requiredEvidence: "Cubas organizadas por ordem de uso"
      },
      {
        order: 5,
        title: "Etiquetagem Imediata de Todo Insumo Fracionado",
        description: "Preencher a Etiqueta Universal (Produto, Data/Hora Preparo, Validade Técnica, Executor, Conferente) e colar no pote antes de guardar.",
        criticalControlPoint: "REGRA DE OURO: Primeiro identificar, depois armazenar. Sem etiqueta = Sem uso.",
        visualSignal: "blue",
        requiredEvidence: "100% das cubas e potes etiquetados"
      },
      {
        order: 6,
        title: "Liberação Técnica do Posto",
        description: "O Cozinheiro Líder faz o checklist visual da bancada, temperatura dos freezers e assina a liberação no formulário F-01.",
        criticalControlPoint: "A cozinha só é aberta para pedidos com a assinatura de liberação.",
        visualSignal: "green",
        requiredEvidence: "Assinatura no formulário F-01"
      }
    ],
    whatNotToDo: [
      "NUNCA iniciar a cocção de pedidos com bancadas desorganizadas ou sujas.",
      "NUNCA guardar cubas ou sacos plásticos na geladeira sem etiqueta adesiva completa.",
      "NUNCA descongelar carnes ou pescados em temperatura ambiente (utilizar refrigeração ou água corrente protegida).",
      "NUNCA usar baldes de produtos químicos ou não alimentícios para armazenar alimentos."
    ],
    nonComplianceReaction: "Caso seja encontrado item sem identificação na abertura, retirá-lo da linha de produção, registrar no livro de ocorrências e encaminhar para auditoria da Gestão."
  },
  {
    id: "pop-02",
    code: "POP-02",
    title: "Rastreabilidade, Fracionamento e Etiquetagem Universal",
    version: "1.0",
    date: "01/09/2026",
    targetSector: "Cozinha",
    objective: "Padronizar o processo de identificação obrigatória de 100% dos alimentos manipulados, abertos, preparados, porcionados ou reembalados no Bistrô Pai d'Égua.",
    responsibleRole: "Auxiliar de Cozinha / Cozinheiro",
    checkerRole: "Líder de Cozinha / Gestão Operacional",
    frequency: "A cada fracionamento ou preparo",
    materialsNeeded: [
      "Rolo de Etiquetas Universais Adesivas",
      "Caneta marcadora permanente preta",
      "Recipientes transparentes com tampa ou sacos plásticos atóxicos",
      "Balança de precisão para porcionamento"
    ],
    steps: [
      {
        order: 1,
        title: "Pesagem e Porcionamento Conforme Ficha Técnica",
        description: "Pesar o insumo na balança zerada conforme a porção padrão definida na ficha técnica do prato (ex: camarão 120g, carne de sol 150g, açaí 300g).",
        criticalControlPoint: "Não porcionar 'no olho'. A variação máxima tolerada é de +/- 3g.",
        visualSignal: "yellow",
        requiredEvidence: "Porções uniformes em gramas"
      },
      {
        order: 2,
        title: "Acondicionamento em Embalagem Limpa",
        description: "Inserir o alimento porcionado em saco plástico novo ou pote de polipropileno com tampa vedada.",
        criticalControlPoint: "Garantir que a superfície externa da embalagem esteja seca para que a etiqueta cole perfeitamente.",
        visualSignal: "green",
        requiredEvidence: "Embalagem selada ou fechada"
      },
      {
        order: 3,
        title: "Preenchimento Obrigatório dos 4 Campos da Etiqueta",
        description: "Preencher com letra de forma legível: 1. Nome do Produto + Corte/Sabor; 2. Data e Hora do Fracionamento; 3. Data e Hora limite de Validade; 4. Nome de quem produziu e de quem conferiu.",
        criticalControlPoint: "NUNCA inventar a validade. Consultar a Tabela Oficial de Validades do Bistrô.",
        visualSignal: "blue",
        requiredEvidence: "Etiqueta 100% preenchida sem campos em branco"
      },
      {
        order: 4,
        title: "Fixação Imediata na Embalagem",
        description: "Colar a etiqueta na face frontal e visível do recipiente ou pacote antes de colocá-lo na prateleira ou gaveta correspondente.",
        criticalControlPoint: "É expressamente proibido acumular recipientes para etiquetar 'depois que terminar tudo'.",
        visualSignal: "red",
        requiredEvidence: "Etiqueta afixada"
      },
      {
        order: 5,
        title: "Armazenamento no Endereço Correto (PEPS)",
        description: "Guardar o produto na prateleira designada, posicionando os itens de validade mais recente atrás dos itens mais antigos (Primeiro que Entra, Primeiro que Sai).",
        criticalControlPoint: "Alimentos crus sempre em prateleiras inferiores aos alimentos prontos para consumo.",
        visualSignal: "green",
        requiredEvidence: "Ordem PEPS respeitada"
      }
    ],
    whatNotToDo: [
      "NUNCA usar caneta esferográfica que borre ou fita crepe improvisada sem campos oficiais.",
      "NUNCA rasurar a data de validade de um produto.",
      "NUNCA deixar sacos de porções empilhados no balcão sem etiquetar.",
      "NUNCA colocar produto cru na mesma prateleira de molhos prontos sem tampa vedada."
    ],
    nonComplianceReaction: "Alimento sem etiqueta na geladeira é considerado descarte automático por risco de vigilância sanitária e será cobrado do responsável pelo turno."
  },
  {
    id: "pop-03",
    code: "POP-03",
    title: "Recebimento de Mercadorias, Armazenamento e PEPS",
    version: "1.0",
    date: "01/09/2026",
    targetSector: "Estoque",
    objective: "Assegurar que toda matéria-prima e insumo entregue por fornecedores seja rigorosamente inspecionada quanto a qualidade, peso, temperatura e integridade antes de ser aceita e estocada.",
    responsibleRole: "Responsável pelo Estoque / Auxiliar de Cozinha",
    checkerRole: "Gestão Operacional",
    frequency: "A cada entrega de fornecedor",
    materialsNeeded: [
      "Termômetro tipo espeto calibrado",
      "Balança de recebimento",
      "Prancheta de Recebimento F-03",
      "Estilete e álcool 70% para higienização de caixas"
    ],
    steps: [
      {
        order: 1,
        title: "Conferência de Documento e Pedido de Compra",
        description: "Confrontar a Nota Fiscal ou canhoto de entrega com a lista de pedido de compra autorizada pela gestão.",
        criticalControlPoint: "Recusar itens não solicitados ou em quantidade superior à autorizada.",
        visualSignal: "yellow",
        requiredEvidence: "Nota Fiscal conferida"
      },
      {
        order: 2,
        title: "Inspeção de Integridade, Embalagens e Validade",
        description: "Verificar se as caixas estão secas, sem amassados, sem sinais de insetos e se a validade de fábrica tem margem mínima aceitável.",
        criticalControlPoint: "Latas estufadas, sacos rasgados ou caixas molhadas devem ser devolvidos imediatamente.",
        visualSignal: "red",
        requiredEvidence: "Campo de integridade no formulário F-03"
      },
      {
        order: 3,
        title: "Aferição de Temperatura de Perecíveis",
        description: "Medir a temperatura de carnes (máx 4°C), congelados (máx -12°C) e laticínios (máx 7°C) no momento do descarregamento.",
        criticalControlPoint: "Se o caminhão estiver desligado ou o produto amolecido/descongelado, RECUSAR A ENTREGA.",
        visualSignal: "red",
        requiredEvidence: "Temperatura anotada no registro F-03"
      },
      {
        order: 4,
        title: "Pesagem de Hortifrúti, Carnes e Pescados",
        description: "Pesar 100% dos produtos vendidos por quilo na balança de recebimento e comparar com a quantidade faturada.",
        criticalControlPoint: "Descontar a tara de caixas plásticas de transporte.",
        visualSignal: "yellow",
        requiredEvidence: "Peso líquido anotado"
      },
      {
        order: 5,
        title: "Armazenamento Imediato no Endereço Padrão (PEPS)",
        description: "Guardar primeiro os congelados, depois os resfriados e por último os secos. Respeitar as categorias e o método PEPS.",
        criticalControlPoint: "Nenhum produto pode ficar sobre o chão (usar estrados e prateleiras a 15cm do piso).",
        visualSignal: "green",
        requiredEvidence: "Estoque organizado"
      },
      {
        order: 6,
        title: "Lançamento no Registro de Entrada e Alerta de Níveis",
        description: "Registrar a entrada no formulário F-03 e atualizar a contagem de estoque para atualizar o Termômetro de Níveis (Ideal/Mínimo).",
        criticalControlPoint: "Mercadoria entregue mas não registrada é considerada invisível para a gestão.",
        visualSignal: "blue",
        requiredEvidence: "Assinatura no F-03"
      }
    ],
    whatNotToDo: [
      "NUNCA assinar o canhoto da nota fiscal antes de pesar e inspecionar a mercadoria.",
      "NUNCA deixar caixas de congelados no corredor aguardando para serem guardadas.",
      "NUNCA estocar produtos de limpeza próximos a embalagens de alimentos ou descartáveis."
    ],
    nonComplianceReaction: "Em caso de divergência de peso, temperatura fora do padrão ou produto deteriorado, acionar a gestão imediatamente para emitir nota de devolução e não aceitar o item."
  },
  {
    id: "pop-04",
    code: "POP-04",
    title: "Preparo, Montagem e Liberação de Pedidos",
    version: "1.0",
    date: "01/09/2026",
    targetSector: "Cozinha",
    objective: "Garantir a reprodução fiel das fichas técnicas, tempo de expedição controlado, temperatura correta e apresentação impecável de todos os pratos servidos no salão ou delivery.",
    responsibleRole: "Cozinheiro",
    checkerRole: "Cozinheiro Líder / Garçom",
    frequency: "Contínuo durante o serviço",
    materialsNeeded: [
      "Fichas Técnicas Plastificadas na bancada",
      "Pratos e cumbucas aquecidas/higienizadas",
      "Utensílios de medição e pegadores por cor",
      "Campainha ou sistema de chamada de salão"
    ],
    steps: [
      {
        order: 1,
        title: "Leitura Cuidadosa da Comanda / Pedido",
        description: "Ler o pedido completo na ordem de chegada (FIFO). Verificar observações especiais (sem coentro, sem pimenta, ponto da carne).",
        criticalControlPoint: "Na dúvida sobre a letra da comanda, perguntar imediatamente ao garçom antes de iniciar a panela.",
        visualSignal: "yellow",
        requiredEvidence: "Comanda fixada no trilho de pedidos"
      },
      {
        order: 2,
        title: "Separação dos Insumos Padronizados",
        description: "Retirar apenas as porções já pesadas e etiquetadas da bancada de mise en place.",
        criticalControlPoint: "Não cortar carnes ou preparar insumos crus durante o pico se não estiverem no mise en place.",
        visualSignal: "green",
        requiredEvidence: "Insumos liberados"
      },
      {
        order: 3,
        title: "Cocção Conforme Parâmetros da Ficha Técnica",
        description: "Executar o tempo de fogo e ordem de ingredientes estritamente conforme a ficha técnica do prato.",
        criticalControlPoint: "Não alterar temperos ou quantidades por gosto pessoal do cozinheiro de plantão.",
        visualSignal: "green",
        requiredEvidence: "Padrão de sabor uniforme"
      },
      {
        order: 4,
        title: "Montagem, Finalização e Limpeza de Borda",
        description: "Montar o prato seguindo o layout visual da foto da ficha técnica. Limpar as bordas do prato com papel toalha descartável antes de expor na boqueta.",
        criticalControlPoint: "Prato com respingo de molho na borda não é liberado.",
        visualSignal: "yellow",
        requiredEvidence: "Apresentação idêntica à ficha técnica"
      },
      {
        order: 5,
        title: "Conferência Final e Toque de Liberação",
        description: "O Cozinheiro Líder confere: prato correto, temperatura fumegante, observações atendidas. Toca a campainha para o salão retirar.",
        criticalControlPoint: "Registrar imediatamente no formulário F-02 caso haja refação ou prato devolvido.",
        visualSignal: "blue",
        requiredEvidence: "Pedido entregue ao garçom"
      }
    ],
    whatNotToDo: [
      "NUNCA liberar prato frio ou que tenha ficado esperando mais de 2 minutos na boqueta.",
      "NUNCA ignorar observação de alergia ou restrição alimentar descrita na comanda.",
      "NUNCA compensar a falta de um ingrediente com outro sem autorização do cliente."
    ],
    nonComplianceReaction: "Se um prato for devolvido pelo cliente, refazer com prioridade máxima, pedir desculpas e anotar o motivo na Folha de Ocorrências e Perdas."
  },
  {
    id: "pop-05",
    code: "POP-05",
    title: "Fechamento da Cozinha, Higienização e Registro de Perdas",
    version: "1.0",
    date: "01/09/2026",
    targetSector: "Cozinha",
    objective: "Executar o fechamento diário com controle total de sobras, etiquetagem para conservação, descarte auditado com motivo e higienização profunda das instalações.",
    responsibleRole: "Auxiliar de Cozinha / Cozinheiro",
    checkerRole: "Gestão Operacional / Proprietários",
    frequency: "Diário (Fim do Turno)",
    materialsNeeded: [
      "Formulário de Registro de Perdas e Descartes F-02",
      "Checklist de Fechamento de Cozinha F-01",
      "Etiquetas universais e caneta indelével",
      "Sacos de lixo reforçados e produtos de limpeza pesada"
    ],
    steps: [
      {
        order: 1,
        title: "Triagem de Sobras e Alimentos Aproveitáveis",
        description: "Analisar as cubas do mise en place. O que estiver íntegro e em conformidade sanitária é transferido para pote limpo.",
        criticalControlPoint: "Alimentos que ficaram expostos a temperaturas inadequadas devem ser descartados.",
        visualSignal: "yellow",
        requiredEvidence: "Potes limpos com tampa"
      },
      {
        order: 2,
        title: "Re-etiquetagem Universal das Sobras",
        description: "Colar nova etiqueta com a data de validade recalculada conforme padrão sanitário. Sem etiqueta = descarte.",
        criticalControlPoint: "Não guardar potes sem identificação para o dia seguinte.",
        visualSignal: "red",
        requiredEvidence: "100% dos potes etiquetados"
      },
      {
        order: 3,
        title: "Pesagem e Registro Obrigatório de Perdas (F-02)",
        description: "Pesar tudo o que foi descartado (sobras impróprias, queimados, devoluções). Anotar no formulário F-02: Item, Quantidade, Motivo, Executor e Conferente.",
        criticalControlPoint: "Zero descarte invisível. Descartar sem anotar é infração operacional grave.",
        visualSignal: "blue",
        requiredEvidence: "Folha F-02 preenchida e assinada"
      },
      {
        order: 4,
        title: "Higienização Profunda de Equipamentos e Pisos",
        description: "Desengordurar chapas, fogões, coifas e bancadas. Varrer e lavar o piso com detergente desengraxante e rodo.",
        criticalControlPoint: "Lixo deve ser recolhido, sacos fechados e levados para a lixeira externa. Lixeiras internas higienizadas.",
        visualSignal: "green",
        requiredEvidence: "Piso e lixeiras limpas"
      },
      {
        order: 5,
        title: "Desligamento de Gás, Luzes e Travamento de Geladeiras",
        description: "Conferir válvulas de gás fechadas, exaustores desligados e freezers com portas bem vedadas.",
        criticalControlPoint: "Prevenção de acidentes e segurança patrimonial.",
        visualSignal: "red",
        requiredEvidence: "Válvulas checadas"
      },
      {
        order: 6,
        title: "Assinatura do Checklist e Envio à Gestão",
        description: "Preencher e assinar o Checklist F-01. Deixar a prancheta no local de guarda oficial.",
        criticalControlPoint: "A gestão audita o fechamento na manhã seguinte.",
        visualSignal: "green",
        requiredEvidence: "Assinaturas no F-01"
      }
    ],
    whatNotToDo: [
      "NUNCA deixar panelas ou cubas sujas na pia 'para lavar amanhã de manhã'.",
      "NUNCA deixar sacos de lixo pernoitando dentro da cozinha.",
      "NUNCA omitir perdas ou quebras de insumos no registro diário."
    ],
    nonComplianceReaction: "Se a cozinha for encontrada suja ou desorganizada na manhã seguinte, o responsável pelo fechamento será notificado na Escada de Correção (Nível 1 ou 2)."
  },
  {
    id: "pop-06",
    code: "POP-06",
    title: "Salão: Recepção, Atendimento e Comunicação",
    version: "1.0",
    date: "01/09/2026",
    targetSector: "Salão",
    objective: "Estabelecer o protocolo de atendimento cordial e eficiente no salão do Bistrô Pai d'Égua, garantindo pedidos claros para a cozinha e hospitalidade autêntica.",
    responsibleRole: "Garçom / Líder de Salão",
    checkerRole: "Gestão Operacional",
    frequency: "Contínuo durante o expediente",
    materialsNeeded: [
      "Cardápios limpos e atualizados",
      "Bloco de comandas ou comanda eletrônica",
      "Caneta de escrita nítida",
      "Pano de limpeza de mesas exclusivo (com pulverizador)"
    ],
    steps: [
      {
        order: 1,
        title: "Abertura do Salão e Alinhamento de Mesas",
        description: "Higienizar mesas e cadeiras. Verificar saleiros, paliteiros e guardanapos abastecidos. Ligar iluminação e som ambiente.",
        criticalControlPoint: "Cardápios devem estar sem manchas de gordura ou dobras feias.",
        visualSignal: "green",
        requiredEvidence: "Checklist de Salão F-06"
      },
      {
        order: 2,
        title: "Recepção e Acomodação dos Clientes",
        description: "Cumprimentar o cliente em até 30 segundos após a entrada: 'Olá, sejam muito bem-vindos ao Bistrô Pai d'Égua!'. Conduzir à mesa.",
        criticalControlPoint: "Nunca deixar cliente em pé esperando sem contato visual e saudação.",
        visualSignal: "green",
        requiredEvidence: "Acolhimento imediato"
      },
      {
        order: 3,
        title: "Apresentação do Cardápio e Anotação do Pedido",
        description: "Oferecer bebidas e entradas primeiro. Anotar o pedido com letra legível, especificando número da mesa, quantidade e observações detalhadas.",
        criticalControlPoint: "REPETIR O PEDIDO para o cliente em voz alta antes de encaminhar para a cozinha.",
        visualSignal: "yellow",
        requiredEvidence: "Comanda preenchida sem erros"
      },
      {
        order: 4,
        title: "Comunicação Clara com a Cozinha",
        description: "Colocar a comanda no trilho de pedidos da cozinha. Se houver restrição crítica (ex: alergia a camarão), avisar verbalmente o cozinheiro.",
        criticalControlPoint: "Não entrar na cozinha para conversar ou atrapalhar a linha de fogo.",
        visualSignal: "blue",
        requiredEvidence: "Comanda no trilho"
      },
      {
        order: 5,
        title: "Acompanhamento da Mesa e Retirada de Pratos",
        description: "Verificar se os clientes precisam de mais bebidas. Retirar pratos vazios assim que todos na mesa terminarem, perguntando sobre sobremesas e cafés.",
        criticalControlPoint: "Mesa suja com pratos vazios causa má impressão aos clientes vizinhos.",
        visualSignal: "green",
        requiredEvidence: "Mesa limpa e organizada"
      },
      {
        order: 6,
        title: "Fechamento de Conta e Despedida Acolhedora",
        description: "Apresentar a prévia da conta com discrição. Conduzir o cliente ao caixa ou processar pagamento na mesa. Agradecer a visita.",
        criticalControlPoint: "Conferir se todos os itens consumidos foram cobrados corretamente.",
        visualSignal: "green",
        requiredEvidence: "Comprovante de pagamento"
      }
    ],
    whatNotToDo: [
      "NUNCA mexer no celular pessoal durante o atendimento no salão.",
      "NUNCA discutir com clientes; se houver reclamação, ouvir com empatia e acionar o líder.",
      "NUNCA prometer prazos irreais de cozinha sem checar com o cozinheiro."
    ],
    nonComplianceReaction: "Falhas de anotação de pedidos que gerem refação de pratos serão anotadas na ficha de ocorrências para treinamento no alinhamento semanal."
  },
  {
    id: "pop-07",
    code: "POP-07",
    title: "Caixa: Abertura, Sangrias, Exceções e Fechamento Blindado",
    version: "1.0",
    date: "01/09/2026",
    targetSector: "Caixa",
    objective: "Garantir a blindagem financeira total do restaurante, com rastreabilidade de meios de pagamento, conferência cega de valores e controle rigoroso de descontos e sangrias.",
    responsibleRole: "Operador de Caixa",
    checkerRole: "Gestão Operacional / Proprietários",
    frequency: "A cada abertura e fechamento de turno",
    materialsNeeded: [
      "Folha de Controle de Caixa F-05",
      "Malote com fundo de troco oficial",
      "Calculadora",
      "Maquinetas de cartão carregadas e bobinas de reserva"
    ],
    steps: [
      {
        order: 1,
        title: "Abertura com Fundo de Troco Contado",
        description: "Contar o dinheiro em espécie na presença do conferente. Registrar o valor exato na Folha F-05 e no sistema antes de iniciar as vendas.",
        criticalControlPoint: "Não iniciar vendas se o valor do fundo estiver divergente do registrado no malote.",
        visualSignal: "yellow",
        requiredEvidence: "Fundo registrado e assinado no F-05"
      },
      {
        order: 2,
        title: "Recebimento Rastreável por Meio de Pagamento",
        description: "Ao fechar cada conta, registrar o valor exato no respectivo meio: Dinheiro, Cartão Crédito, Cartão Débito, PIX ou Vale Refeição.",
        criticalControlPoint: "Conferir no comprovante do PIX o nome do titular e o valor exato antes de liberar o cliente.",
        visualSignal: "green",
        requiredEvidence: "Comprovantes anexados"
      },
      {
        order: 3,
        title: "Sangrias de Caixa com Motivo e Dupla Assinatura",
        description: "Quando o valor em dinheiro atingir o teto de segurança, retirar o excedente, preencher o comprovante de sangria com o motivo e assinar.",
        criticalControlPoint: "Toda sangria exige assinatura do Operador de Caixa E da Gestão/Proprietário.",
        visualSignal: "blue",
        requiredEvidence: "Recibo de sangria assinado"
      },
      {
        order: 4,
        title: "Autorização de Descontos, Cortesias e Cancelamentos",
        description: "Nenhum desconto ou cortesia pode ser lançado pelo caixa sem a senha de autorização ou assinatura prévia da Gestão/Proprietários.",
        criticalControlPoint: "Cancelamento de item sem justificativa comprovada é tratado como risco de desvio.",
        visualSignal: "red",
        requiredEvidence: "Campo de autorização no F-05"
      },
      {
        order: 5,
        title: "Fechamento Cego e Apuração de Divergências",
        description: "No fim do turno, o operador conta todo o dinheiro e soma os relatórios de maquininha. Confronta o Valor Apurado com o Valor Esperado pelo sistema.",
        criticalControlPoint: "Divergências (sobras ou faltas) NÃO podem ser escondidas ou compensadas. Devem ser anotadas no F-05.",
        visualSignal: "blue",
        requiredEvidence: "Fechamento assinado por ambas as partes"
      }
    ],
    whatNotToDo: [
      "NUNCA compartilhar senha ou PIN de caixa com outros funcionários.",
      "NUNCA pagar compras emergenciais com dinheiro do caixa sem emissão imediata de vale/recibo de sangria.",
      "NUNCA deixar gaveta de dinheiro aberta sem operador no posto."
    ],
    nonComplianceReaction: "Divergências recorrentes de caixa sem justificativa comprovada serão submetidas à investigação interna e escaladas na Escada de Correção para decisão da diretoria."
  }
];
