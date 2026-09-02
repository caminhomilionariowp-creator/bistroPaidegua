# Bistrô Pai d'Égua — Contexto Operacional Compartilhado

> Fonte de contexto para qualquer pessoa ou LLM que continue este projeto.
> Atualizar quando uma decisão, implementação ou estado mudar.

## 1. Identidade

- Produto: **Bistrô Pai d'Égua — Documentos Oficiais & Gestão Visual**.
- Cliente real: Bistrô Pai d'Égua, Belém/PA (cozinha e cultura paraense).
- Diretório: `C:\Users\Nitro 5\Desktop\Projeto Pai'Dégua`.
- Repositório: `Willianrvc/Projeto-Bistr-` (privado), branch `main`.
- Origem: app gerado no Google AI Studio (`4b96287`), depois evoluído aqui.
- **Projeto independente.** Não compartilha código, banco, repo ou deploy com o ELEVO
  nem com a Atrium.

## 2. Visão

Levar a operação do **Degrau 1** (pessoas, memória e improviso) ao **Degrau 2**
(padrão, responsabilidade e registro), preparando o **Degrau 3** (crescimento e
delivery). A tecnologia é o espelho da rotina aprovada — não a substitui.

Regra central: **"Primeiro identificar, depois armazenar. Sem etiqueta = Sem uso."**

## 3. Fonte da verdade

`src/data/masterDossierData.ts` — Dossiê Mestre de Implantação v1.1 (14 seções +
auditoria fotográfica de 10 pontos). Todo módulo do app deriva desse conteúdo.
Os 6 Princípios Inegociáveis e o Fluxo-Mestre de 6 elos regem as decisões de produto.

## 4. Stack e execução

- React 19 + Vite 6 + TypeScript + Tailwind 4 + lucide-react.
- IA: `@google/genai` (Gemini 2.5 Flash) no `AiAssistantModal`.
- Persistência: `localStorage` por enquanto (chaves `bistro_pai_degua_*`).
- `npm run dev` (porta 3000) · `npm run build` · `npm run lint` (tsc --noEmit).

## 5. Estado implementado

### Base (do AI Studio)
9 módulos: Dossiê, Cartazes A3, Checklists por setor + rotinas por cargo, Equipe/PINs,
POPs (POP-01..05), Formulários (F-01..06), Etiquetas Universais, Fichas Técnicas
(FT-01..06), Estúdio de Ilustração. Impressão A3/A4 com escala real.

### Adicionado nesta fase (2026-09-01)
- **Painel do "Dia 1" / Cockpit Operacional** (`src/components/CockpitPanel.tsx`):
  - Cronograma de implantação com 5 fases (§12), dia calculado a partir de data de
    início configurável (`localStorage: bistro_pai_degua_implantacao_inicio_v1`).
  - KPIs vivos: aderência a checklists (geral + por setor), rupturas do dia, perdas
    do dia (qtd + R$), não-conformidades. Anel de medição SVG animado (`Gauge.tsx`).
  - Indicadores **CMV Real x Teórico** e **Margem** travados até o 30º dia (§13).
  - **Registro de ocorrências** (`bistro_pai_degua_ocorrencias_v1`): ruptura, perda,
    não-conformidade, elogio — com motivo, autoria, ação, escada de correção e
    resolução. Relatório copiável para WhatsApp.
  - **Placar dos 6 Princípios** (`bistro_pai_degua_principios_<data>`): 3 auto
    (derivados dos dados), 3 aferição manual da liderança com nota de campo.
  - **Escada de Correção** (Ajuste → Reforço → Plano → Decisão) como referência.
  - Dados e lógica em `src/data/cockpitData.ts`.
- `src/index.css`: animações compartilhadas (`fade-in`, `slide-up`, `scale-in`,
  `stagger`, `bar-grow`, `gauge-sweep`) + respeito a `prefers-reduced-motion`.
- Painel é a categoria inicial do app; nav em Header e Sidebar.
- `README.md` e este `CONTEXT.md` criados.

### Adicionado — Posto de Trabalho (2026-09-01, mesma sessão)
- **`src/components/RoleStation.tsx`** + **`src/data/roleStationData.ts`**: cockpit
  visual de posto de trabalho para os 5 cargos (§5, §5.1, §6, §7). Abre no posto do
  colaborador logado (`roleId`); fallback Cozinheiro Líder. Sem selo de "pilar" —
  cada posto mostra sua área de responsabilidade e a quem reporta.
  - Hero com missão, CBO, jornada e anel de progresso do turno.
  - **Paramentação/EPI** como portão de entrada (checklist persistido:
    `bistro_posto_epi_<roleId>_<data>`), "posto liberado" ao completar.
  - Linha do tempo das 3 fases do turno com todas as tarefas do descritivo,
    badges de horário, campo de observação, "concluir fase" e progresso.
  - Só para a Auxiliar: rechaud 70°C (6 cubas), tábuas por cor, os 4 campos da
    Etiqueta Universal.
  - Regras de Ouro, "O que NUNCA fazer", como o posto é avaliado, ferramentas.
  - Relatório do turno para WhatsApp; impressão como prancheta.
  - **Sincronia:** usa a mesma chave/formato de id que o `SectorChecklist`
    (`bistro_role_tasks_tracker_<data>` / `rt_<roleId>_p<f>_t<t>`) — marcar tarefa
    num lugar reflete no outro e alimenta o Painel do Dia 1.
- **`EmployeeAccount.roleId`** (novo campo) liga o colaborador ao descritivo em
  `JOB_ROLES_DATA`. `teamData` preenchido; `loadEmployees()` faz backfill de
  `roleId` em dados salvos antes da mudança.
- Corrigido bug do `SectorChecklist`: o mapeamento de colaborador→cargo usava ids
  inexistentes (`emp-chef-manel` etc.); agora usa `currentEmployee.roleId`.

## 6. Deploy

- **Projeto já vinculado à Vercel** (o usuário rodou `vercel link`):
  `.vercel/project.json` → projeto `projeto-pai-degua`, org
  `team_oHoR6XODnGINMPhCSKTmgUeW` (conta `williancavalcantemam-6319s-projects`).
  `.vercel/` e `.env.local` (traz `VERCEL_OIDC_TOKEN`) estão no `.gitignore`.
- `vercel.json` no repo fixa framework Vite, `npm run build`, output `dist`.
- A CLI local está logada em `atriumparfum-4462` (conta da Atrium) — **não tem
  acesso** ao escopo `williancavalcantemam`; o deploy tem que sair do usuário
  (`vercel login` + `vercel --prod`, ou importar o repo pelo dashboard).
- Antes de a IA funcionar em produção: mover a chamada Gemini para função
  serverless (`/api/generate`) — hoje `GEMINI_API_KEY` é lida no browser e o
  Vite não injeta a variável no bundle, então o Assistente cai no modo offline.
  Todo o resto funciona (client-side + localStorage).

### Adicionado — Estoque & Termômetro de Ruptura (2026-09-01, mesma sessão)
- **`src/components/StockControl.tsx`** + **`src/data/stockData.ts`** (§8):
  - 34 itens de seed reais do Bistrô (tucupi, jambu, maniva, açaí, camarão seco…),
    cada um com `current / min / critical / ideal`, fornecedor, prazo, endereço PEPS.
  - Nível calculado (`stockLevel`): Ruptura (≤0) → Crítico (≤critical) →
    Mínimo (≤min) → Ideal. `LEVEL_META` traz cor/ação de cada faixa.
  - 4 cards de contagem por nível + barra de distribuição + **lista de compras**
    (itens no gatilho, ordenados por gravidade) com quantidade sugerida
    (`suggestedPurchase` = ideal − current), "disparar compra" por item e em lote,
    e **cópia do pedido para WhatsApp agrupada por fornecedor**.
  - Grade de itens com mini-termômetro horizontal (marcadores de crítico/mínimo/
    ideal), ajuste rápido −/+ e edição direta, badge de perecível.
  - Modo **Contagem rápida (F-04)**: lista enxuta pra bater o estoque; grava
    `lastCountAt` / `lastCountBy`.
  - Persistência: `bistro_pai_degua_estoque_v1`.
- **Painel do Dia 1** agora lê o estoque: o card "Ocorrências de ruptura" mostra
  também itens zerados / no gatilho e leva ao módulo Estoque.
- Nav em Header e Sidebar; categoria `'estoque'`.

### Adicionado — Rastreabilidade Universal (2026-09-01, mesma sessão)
- **`src/components/TraceabilityRegistry.tsx`** + **`src/data/traceabilityData.ts`** (§7):
  - Cada etiqueta gerada vira um **lote** (`TraceLot`) com produto, porção,
    quantidade, preparo, validade, executor, conferente, endereço PEPS e status
    (`ativo | consumido | descartado`).
  - `SHELF_LIFE`: vida útil padrão (horas) de ~16 preparos do Bistrô — ao escolher
    o produto, a validade é calculada sozinha (editável).
  - **Painel de validade**: 4 cards (Vencido / ≤24h / Vence hoje / No prazo),
    contagem regressiva viva por lote (`humanizeExpiry`, atualiza a cada 60 s),
    barra de "vida consumida" do lote.
  - Ações por lote: **Consumido**, **Descartar** (modal com motivo padronizado +
    checkbox "registrar como perda") e **Etiqueta** (imprime a Etiqueta Universal).
  - **Descarte com "registrar perda" cria uma `OperationalOccurrence` tipo `perda`**
    no `cockpitData` → aparece direto no Painel do Dia 1. Loop fechado.
  - Histórico de consumidos/descartados com motivo.
  - Alerta de validade copiável para WhatsApp. Persistência:
    `bistro_pai_degua_rastreabilidade_v1`.
- **Painel do Dia 1**: nova faixa de alerta quando há lotes vencidos / vencendo,
  com link para o módulo (`traceSummary()`).
- RoleStation da Auxiliar: link "Abrir etiquetas" agora vai para a Rastreabilidade.
- O módulo antigo **Etiquetas Universais** (`labels`) continua como gerador de
  folha A4 para pré-impressão em branco.

### Ajuste — experiência mobile (2026-09-02)
- **Sidebar vira drawer no mobile:** `<lg` é `hidden` quando fechada e `fixed`
  (86vw / max-w-xs) quando aberta, com backdrop; `lg+` continua rail fixo
  (`lg:sticky lg:top-16`). Props novas `isOpen`/`onClose`; trava o scroll do body.
  Sem animação de slide de propósito — transição de `translate` congela quando a
  aba está oculta (visto no harness); `hidden`/`flex` é à prova de tudo.
- **Header:** botão hambúrguer `lg:hidden` abre o drawer; título do documento
  passa a truncar (`flex-1 min-w-0`); paddings menores no mobile.
- **App:** `overflow-x-hidden` na raiz; `main` com `min-w-0`; `goToCategory()`
  fecha o drawer ao navegar; banner de aviso enxuto no mobile (só ícone + título).
- Verificado a 375 / 760 / 1280px: zero overflow horizontal em todos os módulos.

## 7. Próximos passos sugeridos (mapa de aderência ao dossiê)

1. Módulo de **Estoque / Termômetro de Ruptura** (§8) — níveis ideal/mínimo/crítico
   por item com gatilho de compra, alimentando o Painel.
2. **Rastreabilidade viva** (§7) — etiqueta deixa de só imprimir; grava lote/validade/
   autoria com lista "vence hoje / vencido".
3. Navegação reorganizada pelos **6 elos do Fluxo-Mestre** (§4).
4. Barra dos **6 Princípios** visível em todos os módulos.
5. Upload das **10 fotos reais** da auditoria fotográfica.
6. Fase A técnica: função serverless para a IA, deploy próprio, camada de persistência
   única pronta para backend (Neon).

## 8. Regras de continuação

1. Trabalhar em `C:\Users\Nitro 5\Desktop\Projeto Pai'Dégua`.
2. Ler este arquivo e `src/data/masterDossierData.ts` antes de mudar arquitetura.
3. Preservar o vínculo de cada módulo com o Dossiê Mestre.
4. Nunca expor segredos/variáveis de ambiente.
5. Não publicar em produção sem pedido explícito.
6. `npm run lint` e `npm run build` limpos antes de commitar.
7. Commits pequenos; atualizar este arquivo após decisões relevantes.
8. Manter isolamento total do ELEVO e da Atrium.
