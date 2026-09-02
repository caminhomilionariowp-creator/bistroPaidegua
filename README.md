# Bistrô Pai d'Égua — Documentos Oficiais & Gestão Visual

Sistema web para **criar, ilustrar, acompanhar e imprimir** toda a operação padronizada
do Bistrô Pai d'Égua (Belém/PA): dossiê mestre, cartazes A3, checklists por setor, POPs,
formulários de prancheta, etiquetas universais de alimentos, fichas técnicas e o
**Painel do "Dia 1"** (cockpit operacional).

A ferramenta é o **espelho da rotina aprovada** — nunca um substituto dela. Tudo o que
aparece aqui vem do Dossiê Mestre de Implantação v1.1.

## Stack

| Camada | Tecnologia |
|---|---|
| UI | React 19 + Vite 6 + TypeScript |
| Estilo | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Ícones | lucide-react |
| IA | `@google/genai` (Gemini) — geração de POPs / fichas / checklists |
| Persistência | `localStorage` (camada única, pronta para migrar a um backend) |

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # bundle de produção em dist/
npm run lint     # tsc --noEmit
```

### Variáveis de ambiente

Copie `.env.example` para `.env.local`:

- `GEMINI_API_KEY` — chave do Google AI Studio para o Assistente de IA.
  No AI Studio é injetada automaticamente. **Fora do AI Studio**, a chave hoje é lida
  no browser (`process.env.GEMINI_API_KEY`); ao publicar em um host próprio, mover a
  chamada para uma função serverless (`/api/generate`) antes de expor a chave.

## Módulos

| # | Módulo | O que faz |
|---|---|---|
| ★ | **Painel do Dia 1** | Cockpit: aderência a checklists, rupturas, perdas, não-conformidades, placar dos 6 Princípios, cronograma de implantação (5 fases) e escada de correção. Indicadores de CMV/Margem ficam travados até o 30º dia. |
| 1 | Dossiê Mestre v1.1 | Diagnóstico, Raio-X operacional, auditoria fotográfica de 10 pontos, matriz de autoridade e princípios. |
| 2 | Cartazes A3 | 6 cartazes ilustrados em tamanho real por posto de trabalho. |
| 3 | Checklists por Setor | Feitos / faltando / status em tempo real + rotinas por cargo. |
| 4 | Equipe & Acessos | Líderes, PINs, setores permitidos. |
| 5 | POPs | Procedimentos operacionais padrão oficiais. |
| 6 | Formulários | F-01 a F-06 (prancheta). |
| 7 | Etiquetas Universais | Gerador e folhas adesivas A4. |
| 8 | Fichas Técnicas | Receitas ilustradas com rendimento e custo. |
| 9 | Estúdio de Ilustração | Anotação de fotos reais dos equipamentos e pratos. |

## Fonte da verdade

`src/data/masterDossierData.ts` — o Dossiê Mestre. Todo módulo deriva desse conteúdo.
Ver `CONTEXT.md` para o estado de implantação e as regras de continuidade.

---

Projeto privado. Não misturar com outros projetos do mesmo autor.
