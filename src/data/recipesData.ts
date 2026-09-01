import { RecipeTechSheet } from '../types';

export const RECIPES_DATA: RecipeTechSheet[] = [
  {
    id: "rec-tacaca",
    code: "FT-01",
    dishName: "Tacacá Tradicional Pai d'Égua",
    category: "Especialidade Paraense",
    standardYield: "1 cuia padrão (450ml)",
    portionWeight: "450ml (1 Cuia Completa)",
    prepTimeMinutes: 5,
    costEstimate: "R$ 16,50 por cuia",
    ingredients: [
      { item: "Tucupi Amarelo Temperado", grossQty: "250", unit: "ml", prePrepNotes: "Fervido com alho, chicória do Pará e pimenta de cheiro (fumegante a 90°C)" },
      { item: "Goma de Tapioca Líquida", grossQty: "120", unit: "ml", prePrepNotes: "Cozida em água e sal até ficar translúcida e elástica" },
      { item: "Jambu Cozido", grossQty: "40", unit: "g", prePrepNotes: "Aferventado em água e sal, escorrido e morno" },
      { item: "Camarão Seco Desalgado", grossQty: "4 a 5", unit: "un", prePrepNotes: "Grandes inteiros, aferventados e limpos" },
      { item: "Molho de Pimenta de Cheiro no Tucupi", grossQty: "5", unit: "ml", prePrepNotes: "Servido a gosto do cliente na hora" }
    ],
    equipmentUtensils: [
      "Cuia de tacacá paraense com suporte de palha",
      "Concha dosadora de madeira/inox para goma",
      "Concha dosadora para tucupi fervente",
      "Pegador de inox para camarão e jambu"
    ],
    stepByStep: [
      "1. Escaldar a cuia limpa com água quente antes de iniciar o preparo.",
      "2. Colocar 1 concha de goma de tapioca líquida quente no fundo da cuia (120ml).",
      "3. Despejar 1 concha generosa de tucupi fervente temperado (250ml) sobre a goma.",
      "4. Acomodar o maço de jambu (40g) delicadamente em uma das laterais da cuia.",
      "5. Dispor os camarões secos desalgados (4 a 5 unidades selecionadas) no topo central.",
      "6. Consultar o cliente quanto à pimenta de cheiro e gotejar o molho tucupi com pimenta.",
      "7. Servir imediatamente fumegante no suporte artesanal de palha, acompanhado de palito de madeira."
    ],
    platingStandard: [
      "Cuia artesanal sobre suporte de palha trançada.",
      "Servir sempre borbulhando de quente (mínimo 80°C).",
      "Superfície limpa sem respingos no suporte de palha."
    ],
    criticalSafetyNotes: [
      "🔴 Tucupi deve ser fervido previamente por no mínimo 40 minutos para eliminação do ácido cianídrico.",
      "🟡 Camarão seco desalgado sob refrigeração a ≤4°C com etiqueta universal (máx 48h)."
    ],
    author: "Chef Manel",
    validatedBy: "Gestão Operacional",
    version: "1.1"
  },
  {
    id: "rec-arroz-paraense",
    code: "FT-02",
    dishName: "Arroz Paraense com Camarão e Jambu",
    category: "Rechaud / Prato Principal",
    standardYield: "4 porções de 350g (ou 1 cuba GN para rechaud)",
    portionWeight: "350g por prato",
    prepTimeMinutes: 25,
    costEstimate: "R$ 21,00 por porção",
    ingredients: [
      { item: "Arroz Agulhinha Cozido no Tucupi", grossQty: "800", unit: "g", prePrepNotes: "Cozido al dente com caldo de tucupi e alho" },
      { item: "Camarão Rosa Limpo / Camarão Seco", grossQty: "400", unit: "g", prePrepNotes: "Salteado no alho e azeite" },
      { item: "Jambu Cozido e Picado", grossQty: "200", unit: "g", prePrepNotes: "Aferventado em água com sal" },
      { item: "Tucupi Amarelo Concentrado", grossQty: "150", unit: "ml", prePrepNotes: "Para umedecer na frigideira ou rechaud" },
      { item: "Alho Picado e Chicória do Pará", grossQty: "30", unit: "g", prePrepNotes: "Mise en place fresco picado miúdo" },
      { item: "Manteiga de Garrafa", grossQty: "40", unit: "ml", prePrepNotes: "Para finalização e brilho" }
    ],
    equipmentUtensils: [
      "Frigideira Wok grande ou Panela de fundo grosso",
      "Espátula de silicone resistente ao calor",
      "Cuba GN 1/2 inox para Rechaud Buffet"
    ],
    stepByStep: [
      "1. Em frigideira ou wok aquecida com manteiga de garrafa, dourar o alho e a chicória picada.",
      "2. Adicionar o camarão e saltear por 2 a 3 minutos até ficar rosado e suculento.",
      "3. Acrescentar o jambu cozido picado e misturar delicadamente.",
      "4. Adicionar o arroz cozido no tucupi e regar com os 150ml de tucupi concentrado.",
      "5. Saltear vigorosamente até homogeneizar a cor amarela viva e o aroma característico.",
      "6. Ajustar o sal e finalizar com fio de manteiga de garrafa.",
      "7. Transferir para a cuba aquecida do rechaud (banho-maria a ≥65°C) ou empratar direto."
    ],
    platingStandard: [
      "Para rechaud: decorado com camarões inteiros e folhas de jambu no topo.",
      "Para prato individual: prato fundo de cerâmica com folhas de jambu e camarões em destaque."
    ],
    criticalSafetyNotes: [
      "🔴 Manter no rechaud sob temperatura mínima de 60°C a 65°C contínua.",
      "🟡 Reabastecer a cuba do rechaud em lotes menores para manter o arroz sempre úmido e fresco."
    ],
    author: "Chef Manel",
    validatedBy: "Gestão Operacional",
    version: "1.1"
  },
  {
    id: "rec-feijao-preto",
    code: "FT-03",
    dishName: "Feijão Preto Temperado Pai d'Égua",
    category: "Rechaud / Guarnição Base",
    standardYield: "1 cuba GN profunda (aprox. 3,5 kg)",
    portionWeight: "150g por concha",
    prepTimeMinutes: 50,
    costEstimate: "R$ 6,80 por kg",
    ingredients: [
      { item: "Feijão Preto Selecionado", grossQty: "1", unit: "kg", prePrepNotes: "Catado, lavado e hidratado por 8 horas" },
      { item: "Bacon em Cubos", grossQty: "250", unit: "g", prePrepNotes: "Picado em cubinhos de 1cm" },
      { item: "Charque Desalgado e Cozido", grossQty: "200", unit: "g", prePrepNotes: "Cortado em cubos pequenos" },
      { item: "Alho Picado Bem Miúdo", grossQty: "50", unit: "g", prePrepNotes: "Mise en place diário" },
      { item: "Cebola Picada Bem Miúdo", grossQty: "150", unit: "g", prePrepNotes: "Mise en place diário" },
      { item: "Folhas de Louro", grossQty: "4", unit: "un", prePrepNotes: "Secas inteiras" },
      { item: "Cominho em Pó e Pimenta-do-Reino", grossQty: "5", unit: "g", prePrepNotes: "Tempero seco padrão" },
      { item: "Cheiro-Verde Picado (com talos)", grossQty: "50", unit: "g", prePrepNotes: "Finalização aromática" }
    ],
    equipmentUtensils: [
      "Panela de pressão industrial 10L ou Caldeirão",
      "Frigideira para refogado de alho e bacon",
      "Concha dosadora de inox",
      "Cuba GN 1/2 profunda para rechaud"
    ],
    stepByStep: [
      "1. Cozinhar o feijão preto hidratado com as folhas de louro na pressão por 30 a 35 minutos até os grãos ficarem macios.",
      "2. Em panela separada, dourar o bacon e o charque desalgado até soltarem a gordura.",
      "3. Adicionar a cebola picada e refogar até murchar; juntar o alho e dourar sem queimar.",
      "4. Adicionar 2 conchas do feijão cozido ao refogado e amassar com as costas da concha para engrossar o caldo.",
      "5. Devolver todo o refogado à panela principal de feijão.",
      "6. Adicionar o cominho, pimenta-do-reino e sal a gosto. Deixar ferver em fogo baixo por 15 minutos para apurar o caldo.",
      "7. Finalizar com o cheiro-verde picado e transferir para a cuba aquecida do rechaud."
    ],
    platingStandard: [
      "Caldo espesso e aveludado, grãos inteiros e macios, com pedacinhos visíveis de bacon e charque.",
      "No rechaud: mexer suavemente a cada 30 minutos para manter homogeneidade."
    ],
    criticalSafetyNotes: [
      "🔴 Temperatura no rechaud não pode baixar de 60°C.",
      "🟡 Sobras do feijão devem ser resfriadas rapidamente e etiquetadas (Validade: 72h em refrigeração ≤4°C)."
    ],
    author: "Chef Manel",
    validatedBy: "Gestão Operacional",
    version: "1.1"
  },
  {
    id: "rec-baiao-de-dois",
    code: "FT-04",
    dishName: "Baião de Dois Regional com Queijo Coalho",
    category: "Rechaud / Prato Principal",
    standardYield: "1 cuba GN (aprox. 3 kg)",
    portionWeight: "250g por porção",
    prepTimeMinutes: 40,
    costEstimate: "R$ 14,20 por kg",
    ingredients: [
      { item: "Feijão Fradinho / Corda Cozido al dente", grossQty: "800", unit: "g", prePrepNotes: "Grãos firmes, escorridos (guardar caldo)" },
      { item: "Arroz Agulhinha Cozido", grossQty: "1000", unit: "g", prePrepNotes: "Cozido soltinho no caldo do feijão" },
      { item: "Queijo Coalho em Cubos", grossQty: "350", unit: "g", prePrepNotes: "Cortado em cubos de 1,5cm e levemente grelhado" },
      { item: "Carne de Sol / Charque Desfiado", grossQty: "300", unit: "g", prePrepNotes: "Cozido, desfiado e dourado" },
      { item: "Bacon em Cubinhos", grossQty: "150", unit: "g", prePrepNotes: "Crocante" },
      { item: "Manteiga de Garrafa", grossQty: "50", unit: "ml", prePrepNotes: "Para refogado e brilho" },
      { item: "Cebola Roxa e Alho Picados", grossQty: "100", unit: "g", prePrepNotes: "Mise en place" },
      { item: "Coentro e Cebolinha Picados", grossQty: "60", unit: "g", prePrepNotes: "Fresco picado fininho" }
    ],
    equipmentUtensils: [
      "Panela grande ou Wok de ferro",
      "Espátula grande de inox",
      "Cuba GN 1/2 de rechaud"
    ],
    stepByStep: [
      "1. Dourar o bacon e o charque desfiado na manteiga de garrafa.",
      "2. Juntar a cebola roxa e o alho picado, refogando até perfumar.",
      "3. Adicionar o feijão fradinho cozido al dente e envolver nos sabores da gordura.",
      "4. Incorporar o arroz cozido aos poucos, misturando delicadamente de baixo para cima para não quebrar os grãos.",
      "5. Adicionar um pouco do caldo do feijão para dar cremosidade sem empapar.",
      "6. Desligar o fogo, adicionar os cubos de queijo coalho e o cheiro-verde abundante.",
      "7. Regar com um fio generoso de manteiga de garrafa e transferir para o rechaud."
    ],
    platingStandard: [
      "Arroz e feijão perfeitamente integrados com queijo coalho derretendo e cheiro-verde vívido.",
      "Decorar o topo da cuba com tiras de queijo coalho dourado na chapa."
    ],
    criticalSafetyNotes: [
      "🔴 Manter no rechaud a ≥60°C. Nunca deixar ressecar (borrifar levemente caldo se necessário).",
      "🟡 Queijo coalho deve ser mantido refrigerado até o momento do preparo."
    ],
    author: "Chef Manel",
    validatedBy: "Gestão Operacional",
    version: "1.1"
  },
  {
    id: "rec-vatapa-paraense",
    code: "FT-05",
    dishName: "Vatapá Paraense Tradicional",
    category: "Rechaud / Especialidade",
    standardYield: "1 cuba GN profunda (aprox. 3 kg)",
    portionWeight: "200g por porção",
    prepTimeMinutes: 45,
    costEstimate: "R$ 18,90 por kg",
    ingredients: [
      { item: "Pão Francês Amanhecido ou Farinha de Trigo", grossQty: "400", unit: "g", prePrepNotes: "Amolecido em leite de coco e caldo de camarão" },
      { item: "Camarão Seco Desalgado", grossQty: "500", unit: "g", prePrepNotes: "Parte triturada no caldo, parte inteira para refogado" },
      { item: "Leite de Coco Artesanal", grossQty: "500", unit: "ml", prePrepNotes: "Concentrado" },
      { item: "Azeite de Dendê Puro", grossQty: "100", unit: "ml", prePrepNotes: "Dendê de boa qualidade" },
      { item: "Amendoim e Castanha-do-Pará Torrados", grossQty: "150", unit: "g", prePrepNotes: "Moídos finos" },
      { item: "Cebola, Alho, Tomate e Pimentão Picados", grossQty: "250", unit: "g", prePrepNotes: "Mise en place completo" },
      { item: "Chicória do Pará e Cheiro-Verde", grossQty: "50", unit: "g", prePrepNotes: "Picados miúdo" }
    ],
    equipmentUtensils: [
      "Liquidificador industrial",
      "Panela de fundo grosso grande",
      "Colher de polietileno resistente",
      "Cuba GN profunda para rechaud"
    ],
    stepByStep: [
      "1. No liquidificador, bater o pão amolecido com o leite de coco, castanhas moídas e metade do camarão seco com um pouco de caldo.",
      "2. Em panela grande, aquecer metade do azeite de dendê e refogar a cebola, alho, pimentão, tomate e chicória picados.",
      "3. Adicionar o camarão seco inteiro e refogar por 3 minutos.",
      "4. Despejar a massa batida na panela, mexendo vigorosamente em fogo médio sem parar.",
      "5. Cozinhar até a massa engrossar, soltar do fundo da panela e ficar com textura lisa, brilhante e aveludada (cerca de 20 a 25 min).",
      "6. Adicionar o restante do azeite de dendê para dar cor e brilho característico.",
      "7. Finalizar com cheiro-verde fresco e transferir para a cuba aquecida do rechaud."
    ],
    platingStandard: [
      "Creme aveludado de cor alaranjada intensa e aroma marcante de dendê e camarão.",
      "No rechaud: decorado com camarões secos inteiros no topo."
    ],
    criticalSafetyNotes: [
      "🔴 Manter no banho-maria do rechaud a ≥65°C. Mexer a cada 20 minutos para não formar película ressecada.",
      "🟡 Validade máxima: 48h em geladeira (0 a 4°C) com etiqueta universal."
    ],
    author: "Chef Manel",
    validatedBy: "Gestão Operacional",
    version: "1.1"
  },
  {
    id: "rec-manicoba",
    code: "FT-06",
    dishName: "Maniçoba Tradicional Paraense",
    category: "Rechaud / Patrimônio Culinário",
    standardYield: "1 caldeirão / 1 cuba GN profunda (aprox. 5 kg)",
    portionWeight: "300g por porção",
    prepTimeMinutes: 180,
    costEstimate: "R$ 24,50 por kg",
    ingredients: [
      { item: "Maniva Moída Pré-cozida", grossQty: "3", unit: "kg", prePrepNotes: "Cozida por 7 dias obrigatórios (* Toda quarta colocar 10kg de maniva para renovação de lote)" },
      { item: "Charque Bovino Desalgado", grossQty: "600", unit: "g", prePrepNotes: "Cortado em pedaços médios" },
      { item: "Costelinha de Porco Defumada", grossQty: "500", unit: "g", prePrepNotes: "Aferventada e cortada" },
      { item: "Lombo Suíno Salgado Desalgado", grossQty: "400", unit: "g", prePrepNotes: "Em cubos médios" },
      { item: "Linguiça Paio e Calabresa Defumada", grossQty: "500", unit: "g", prePrepNotes: "Fatiadas em rodelas grossas" },
      { item: "Bacon em Pedaços", grossQty: "300", unit: "g", prePrepNotes: "Dourado" },
      { item: "Alho Amassado e Folhas de Louro", grossQty: "80", unit: "g", prePrepNotes: "Tempero base" },
      { item: "Pimenta de Cheiro Amassada", grossQty: "30", unit: "g", prePrepNotes: "Aroma paraense" }
    ],
    equipmentUtensils: [
      "Caldeirão de ferro ou inox pesado",
      "Concha grande de cabo longo",
      "Cuba GN profunda inox para rechaud buffet"
    ],
    stepByStep: [
      "1. REGRA SANITÁRIA INEGOCIÁVEL: A maniva crua deve ferver ininterruptamente por 7 dias para eliminação total do ácido cianídrico. Toda quarta-feira colocar 10kg de maniva fresca no ciclo de cozimento.",
      "2. No 4º dia de fervura da maniva, adicionar as carnes mais duras (charque, lombo e costelinha desalgados).",
      "3. No 5º e 6º dias, adicionar o paio, calabresa defumada e o bacon.",
      "4. Temperar com alho amassado dourado, folhas de louro e pimenta de cheiro.",
      "5. Deixar ferver até a maniva ficar escura, oleosa, macia e as carnes desmanchando.",
      "6. Ajustar o sal no último dia.",
      "7. Para o serviço do rechaud: transferir a porção do turno para a cuba aquecida e manter fumegante."
    ],
    platingStandard: [
      "Massa preta/verde-escura brilhante e densa, com fartura de carnes variadas e paio fatiado.",
      "Servir acompanhado obrigatoriamente de arroz branco e farinha d'água de Bragança."
    ],
    criticalSafetyNotes: [
      "🔴 NUNCA servir maniva com menos de 7 dias de fervura comprovada no livro de cocção da cozinha.",
      "🔴 Manter no rechaud a ≥65°C constante."
    ],
    author: "Chef Manel",
    validatedBy: "Gestão Operacional",
    version: "1.1"
  }
];

