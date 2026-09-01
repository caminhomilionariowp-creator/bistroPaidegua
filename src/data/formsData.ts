import { OperationalForm } from '../types';

export const FORMS_DATA: OperationalForm[] = [
  {
    id: "f-01",
    code: "F-01",
    title: "Checklist Diário Operacional de Cozinha (Abertura / Fechamento)",
    sector: "Cozinha",
    purpose: "Garantir a execução e comprovação das rotinas de abertura, mise en place, etiquetas, segurança alimentar e fechamento da cozinha.",
    frequency: "Diário por Turno",
    fields: [
      { id: "date", label: "Data", type: "text", placeholder: "DD/MM/AAAA", width: "third" },
      { id: "shift", label: "Turno", type: "select", options: ["Almoço", "Jantar", "Integral"], width: "third" },
      { id: "leader", label: "Cozinheiro Líder", type: "text", placeholder: "Nome do Cozinheiro", width: "third" }
    ],
    tableTemplate: {
      columns: ["Fase / Item de Verificação", "Padrão Exigido", "Status (C / NC)", "Hora", "Obs / Pendência"],
      defaultRowsCount: 12,
      sampleRows: [
        ["1. Higiene & Uniformes", "Equipe 100% de touca, avental limpo e sem adornos", "C", "09:30", "Conforme"],
        ["2. Bancadas & Superfícies", "Inox limpo, desengordurado e sanitizado com álcool 70%", "C", "09:40", "Conforme"],
        ["3. Geladeiras & Freezers", "Temperatura correta (Geladeira ≤4°C / Freezer ≤-12°C)", "C", "09:45", "Geladeira em 3.2°C"],
        ["4. Auditoria de Etiquetas", "100% dos recipientes identificados com validade em dia", "C", "09:50", "Sem itens vencidos"],
        ["5. Mise en Place do Turno", "Porções pesadas conforme fichas técnicas", "C", "10:30", "Camarão e carnes pesados"],
        ["6. Etiquetagem Pré-Preparo", "Etiqueta universal em todos os potes e cubas", "C", "10:45", "Conforme"],
        ["7. Gás e Queimadores", "Chamas reguladas, mangueiras e registros seguros", "C", "10:50", "Conforme"],
        ["8. Liberação de Abertura", "Cozinheiro líder assina e autoriza a operação", "C", "11:00", "Liberado para pedidos"],
        ["9. Triagem de Sobras (Fech.)", "Sobras separadas em potes limpos com nova etiqueta", "C", "23:00", "Sobras identificadas"],
        ["10. Registro de Perdas (F-02)", "Todas as perdas pesadas e anotadas com motivo", "C", "23:15", "Lançado no F-02"],
        ["11. Higienização Geral (Fech.)", "Chapa, fogão, coifa, cubas e chão lavados e desengordurados", "C", "23:45", "Piso lavado"],
        ["12. Segurança Noturna", "Gás desligado, torneiras fechadas e freezers travados", "C", "23:55", "Válvulas checadas"]
      ]
    },
    signatureBlock: {
      executorTitle: "Executor (Auxiliar de Cozinha)",
      checkerTitle: "Conferente / Líder de Cozinha"
    }
  },
  {
    id: "f-02",
    code: "F-02",
    title: "Registro Diário de Perdas, Descartes e Refações",
    sector: "Cozinha",
    purpose: "Registrar 100% dos alimentos e insumos descartados, queimados, vencidos ou com erro de preparo para auditoria de custos e treinamento.",
    frequency: "Por Ocorrência",
    fields: [
      { id: "date", label: "Data", type: "text", placeholder: "DD/MM/AAAA", width: "half" },
      { id: "sector", label: "Setor / Área", type: "text", placeholder: "Cozinha / Salão", width: "half" }
    ],
    tableTemplate: {
      columns: ["Hora", "Produto / Insumo", "Quantidade (g / un)", "Motivo Exato da Perda", "Executor", "Conferente", "Ação Corretiva"],
      defaultRowsCount: 10,
      sampleRows: [
        ["12:40", "Porção Camarão Rosa", "120g", "Erro de cocção (passou do ponto)", "João", "Carlos", "Treinar tempo de fogo"],
        ["14:10", "Bolinho de Tacacá", "3 un", "Queda na bancada durante transporte", "Maria", "Carlos", "Ajustar pegador"],
        ["23:10", "Tucupi aferventado", "400ml", "Sobra não resfriada a tempo", "Lucas", "Carlos", "Adequar resfriamento"]
      ]
    },
    signatureBlock: {
      executorTitle: "Responsável pelo Registro",
      checkerTitle: "Gestão Operacional / Líder"
    }
  },
  {
    id: "f-03",
    code: "F-03",
    title: "Folha de Recebimento de Mercadorias e Conferência",
    sector: "Estoque",
    purpose: "Conferir qualidade, temperatura, validade e peso de todas as matérias-primas entregues por fornecedores antes da aceitação.",
    frequency: "Por Entrada",
    fields: [
      { id: "date", label: "Data da Entrega", type: "text", placeholder: "DD/MM/AAAA", width: "third" },
      { id: "supplier", label: "Fornecedor", type: "text", placeholder: "Nome do Fornecedor", width: "third" },
      { id: "invoice", label: "Nº Nota / Pedido", type: "text", placeholder: "NF-e 0000", width: "third" }
    ],
    tableTemplate: {
      columns: ["Item / Produto", "Qtd Nota", "Qtd Recebida (Balança)", "Temp (°C)", "Validade Fábrica", "Integridade", "Status (Aprov / Recus)"],
      defaultRowsCount: 8,
      sampleRows: [
        ["Camarão Rosa G", "10 kg", "10.05 kg", "-14.2°C", "15/12/2026", "Caixas íntegras", "APROVADO"],
        ["Polpa de Açaí Especial", "30 kg", "30.00 kg", "-15.0°C", "30/03/2027", "Embalagens seladas", "APROVADO"],
        ["Carne de Sol de Filé", "15 kg", "14.80 kg", "2.5°C", "20/09/2026", "A vácuo em dia", "APROVADO"],
        ["Goma de Tapioca", "10 kg", "10.00 kg", "Ambiente", "05/11/2026", "Sacos secos", "APROVADO"]
      ]
    },
    signatureBlock: {
      executorTitle: "Recebedor (Estoque)",
      checkerTitle: "Conferente / Gestão"
    }
  },
  {
    id: "f-04",
    code: "F-04",
    title: "Inventário Diário / Contagem de Estoque Crítico",
    sector: "Estoque",
    purpose: "Controlar diariamente os saldos físicos dos insumos de alto valor e maior giro para alimentar o Termômetro de Ruptura.",
    frequency: "Diário por Turno",
    fields: [
      { id: "date", label: "Data da Contagem", type: "text", placeholder: "DD/MM/AAAA", width: "half" },
      { id: "counter", label: "Responsável pela Contagem", type: "text", placeholder: "Nome do Estoquista", width: "half" }
    ],
    tableTemplate: {
      columns: ["Código / Item", "Unid", "Saldo Físico", "Estoque Mínimo", "Estoque Ideal", "Status Nível (Ideal/Mín/Crít)", "Ação Necessária"],
      defaultRowsCount: 10,
      sampleRows: [
        ["IN-01 Polpa de Açaí", "kg", "18", "10", "30", "Ideal (Verde)", "Manter"],
        ["IN-02 Camarão Rosa", "kg", "4", "5", "15", "Mínimo (Amarelo)", "Disparar compra hoje"],
        ["IN-03 Tucupi Puro", "L", "8", "6", "20", "Ideal (Verde)", "Manter"],
        ["IN-04 Folha de Jambu", "maço", "3", "5", "12", "Crítico (Laranja)", "Comprar emergencial"],
        ["IN-05 Carne de Sol", "kg", "12", "8", "25", "Ideal (Verde)", "Manter"],
        ["IN-06 Copos Descartáveis", "pct", "6", "4", "10", "Ideal (Verde)", "Manter"]
      ]
    },
    signatureBlock: {
      executorTitle: "Estoquista / Responsável",
      checkerTitle: "Gestor Operacional"
    }
  },
  {
    id: "f-05",
    code: "F-05",
    title: "Folha de Abertura, Sangrias e Fechamento de Caixa",
    sector: "Caixa",
    purpose: "Blindar financeiramente as transações do turno, registrando fundo de troco, saídas autorizadas e divergências de fechamento.",
    frequency: "Diário por Turno",
    fields: [
      { id: "date", label: "Data", type: "text", placeholder: "DD/MM/AAAA", width: "third" },
      { id: "shift", label: "Turno", type: "select", options: ["Almoço", "Jantar", "Integral"], width: "third" },
      { id: "cashier", label: "Operador de Caixa", type: "text", placeholder: "Nome do Operador", width: "third" }
    ],
    tableTemplate: {
      columns: ["Meio de Pagamento", "Fundo Inicial", "Vendas Sistema (A)", "Sangrias (B)", "Esperado em Gaveta (A - B)", "Apurado Físico (C)", "Divergência (C - Esp.)"],
      defaultRowsCount: 6,
      sampleRows: [
        ["Dinheiro em Espécie", "R$ 200,00", "R$ 1.450,00", "R$ 1.000,00", "R$ 650,00", "R$ 650,00", "R$ 0,00 (Exato)"],
        ["Cartão de Crédito", "-", "R$ 2.380,00", "-", "R$ 2.380,00", "R$ 2.380,00", "R$ 0,00"],
        ["Cartão de Débito", "-", "R$ 1.120,00", "-", "R$ 1.120,00", "R$ 1.120,00", "R$ 0,00"],
        ["PIX Direto", "-", "R$ 1.840,00", "-", "R$ 1.840,00", "R$ 1.840,00", "R$ 0,00"],
        ["Vouchers / Refeição", "-", "R$ 310,00", "-", "R$ 310,00", "R$ 310,00", "R$ 0,00"]
      ]
    },
    signatureBlock: {
      executorTitle: "Operador de Caixa",
      checkerTitle: "Proprietário / Gestão"
    }
  },
  {
    id: "f-06",
    code: "F-06",
    title: "Checklist de Abertura, Atendimento e Fechamento do Salão",
    sector: "Salão",
    purpose: "Garantir a limpeza, ambientação, montagem de mesas, acolhimento e organização do salão em cada turno.",
    frequency: "Diário por Turno",
    fields: [
      { id: "date", label: "Data", type: "text", placeholder: "DD/MM/AAAA", width: "third" },
      { id: "shift", label: "Turno", type: "select", options: ["Almoço", "Jantar"], width: "third" },
      { id: "waiter", label: "Líder de Salão", type: "text", placeholder: "Nome do Garçom Líder", width: "third" }
    ],
    tableTemplate: {
      columns: ["Etapa / Ponto de Verificação", "Padrão de Qualidade", "Status (OK / NC)", "Hora", "Anotações / Responsável"],
      defaultRowsCount: 8,
      sampleRows: [
        ["1. Limpeza de Mesas e Cadeiras", "Sem marcas, migalhas ou gordura, alinhadas", "OK", "10:30", "Todas as 12 mesas limpas"],
        ["2. Cardápios & Acessórios", "Cardápios higienizados, galheteiros cheios", "OK", "10:40", "Guardanapos repostos"],
        ["3. Ambientação (Música e Luz)", "Playlist regional suave, iluminação acolhedora", "OK", "10:50", "Conforme"],
        ["4. Reunião Pré-Turno (Briefing)", "Alinhamento de pratos do dia e itens em falta", "OK", "11:00", "Equipe alinhada"],
        ["5. Fechamento de Salão (Fim)", "Mesas desobstruídas, cadeiras organizadas", "OK", "23:45", "Salão varrido"],
        ["6. Devolução de Galheteiros", "Galheteiros e cardápios guardados no armário", "OK", "23:55", "Guardado e trancado"]
      ]
    },
    signatureBlock: {
      executorTitle: "Garçom / Líder de Salão",
      checkerTitle: "Gestão Operacional"
    }
  }
];
