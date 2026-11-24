# Aprendendo React + TypeScript

Projeto de estudo, separado do sistema. Cada **aula é um arquivo** em `src/aulas/`, com
um conceito só, explicado nos comentários, funcionando na tela e com **exercícios no fim**.
Os exemplos imitam o nosso sistema (horários, vagas, modal, código 2FA), para a ponte com
o projeto de verdade ser direta.

## Como rodar

```bash
cd C:\dev\Learn
npm install      # só na primeira vez
npm run dev      # abre o navegador sozinho (http://localhost:5173)
```

Deixe o `npm run dev` rodando, abra a pasta no VS Code e mexa nos arquivos:
**ao salvar, a tela atualiza sozinha**. Mantenha o F12 (Console) aberto: os avisos do
React aparecem lá.

`npm run build` confere os tipos de TUDO (TypeScript). Rode quando quiser ter certeza de
que não há erro escondido.

## Como estudar (sugestão)

Para cada aula, nesta ordem:
1. **Leia o comentário do topo** do arquivo (a "ideia principal").
2. **Veja funcionando** na tela e clique em tudo.
3. **Leia o código** de cima para baixo, com os comentários.
4. **Faça os exercícios** do fim do arquivo (no próprio arquivo).
5. Se quiser reforço, **leia o link** indicado (documentação oficial, em português).
6. Anote dúvidas e me pergunte.

Não pule a aula 4 (estado) nem a 7 (pai e filho): são o coração do React.

| Aula | Conceito | Para que serve no sistema | Leitura oficial (pt-br) |
|---|---|---|---|
| 1 | Componente e JSX | Toda tela é um componente | [Seu primeiro componente](https://pt-br.react.dev/learn/your-first-component) · [JSX](https://pt-br.react.dev/learn/writing-markup-with-jsx) · [Chaves no JSX](https://pt-br.react.dev/learn/javascript-in-jsx-with-curly-braces) |
| 2 | Props | `<Cabecalho titulo="..." />` | [Passando props](https://pt-br.react.dev/learn/passing-props-to-a-component) |
| 3 | children | A moldura do `<Modal>` | [JSX como children](https://pt-br.react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) |
| 4 | Estado (useState) | Campos, erros, janela aberta/fechada | [Estado: a memória do componente](https://pt-br.react.dev/learn/state-a-components-memory) |
| 5 | Eventos e formulários | Login, marcar horário | [Respondendo a eventos](https://pt-br.react.dev/learn/responding-to-events) · [Reagindo à entrada com estado](https://pt-br.react.dev/learn/reacting-to-input-with-state) |
| 6 | Condicional e listas | Grade de horários, busca do painel | [Renderização condicional](https://pt-br.react.dev/learn/conditional-rendering) · [Renderizando listas](https://pt-br.react.dev/learn/rendering-lists) |
| 7 | Pai e filho (Modal) | **Tarefa 1** (janelas do 2FA) | [Compartilhando estado](https://pt-br.react.dev/learn/sharing-state-between-components) |
| 8 | useEffect | Buscar dados na API, sessão | [Sincronizando com efeitos](https://pt-br.react.dev/learn/synchronizing-with-effects) · [Talvez você não precise de um efeito](https://pt-br.react.dev/learn/you-might-not-need-an-effect) |
| 9 | useRef | QR Code no `<canvas>`, foco | [Referenciando valores com refs](https://pt-br.react.dev/learn/referencing-values-with-refs) · [Manipulando o DOM com refs](https://pt-br.react.dev/learn/manipulating-the-dom-with-refs) |
| 10 | **Exercício**: login com 2FA | Ensaio da **tarefa 1** | (junta as aulas 4 a 7) |

Depois da aula 10 você está pronto para a **tarefa 1 do projeto** (`frontend/README.md`
do Agenda-Almoço). É o mesmo exercício, só que com a API de verdade.

## JS puro (o `public/` antigo) x React

| No JS puro você fazia... | No React você faz... |
|---|---|
| `document.getElementById('x')` | Não precisa. Quando precisar mesmo: `useRef` (aula 9) |
| `el.innerHTML = '<p>' + escaparHtml(nome) + '</p>'` | `return <p>{nome}</p>` (o JSX já escapa sozinho) |
| `el.hidden = true` / `classList.add('active')` | `{aberto && <Modal />}` (aula 6) |
| `botao.addEventListener('click', salvar)` | `<button onClick={salvar}>` (aula 5) |
| Variável global guardando o que está na tela | `useState` (aula 4): mudou, a tela redesenha sozinha |
| `fetch` no `DOMContentLoaded` | `fetch` dentro de `useEffect` (aula 8) |
| Uma função que monta um pedaço de HTML | Um componente (aula 1) |
| Copiar o mesmo HTML em vários lugares | Componente com props e children (aulas 2 e 3) |

A grande mudança de pensamento: **você não altera a tela; você altera os DADOS (estado), e a
tela é sempre calculada a partir deles.**

## Mais reforço

- **Início rápido** (o tour oficial, curto): https://pt-br.react.dev/learn
- **Tutorial do Jogo da Velha** (projeto guiado, muito bom depois da aula 7): https://pt-br.react.dev/learn/tutorial-tic-tac-toe
- **Pensando em React** (como dividir uma tela em componentes; ótimo antes do painel novo): https://pt-br.react.dev/learn/thinking-in-react
- **React com TypeScript** (oficial): https://pt-br.react.dev/learn/typescript
- **TypeScript em 5 minutos** (oficial, inglês): https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
- **Aprenda TypeScript em cinco minutos** (freeCodeCamp, português): https://www.freecodecamp.org/portuguese/news/aprenda-typescript-em-cinco-minutos-um-tutorial-para-iniciantes/
- **Colinha de React + TypeScript** (inglês; tipos de props, eventos, hooks): https://react-typescript-cheatsheet.netlify.app/
- **React Developer Tools** (extensão do Chrome: mostra os componentes, props e estado da tela): https://pt-br.react.dev/learn/react-developer-tools
- **Guia do Vite** (a ferramenta que roda o projeto): https://vite.dev/guide/

## Estrutura deste projeto

```
C:\dev\Learn
├── index.html            só tem a <div id="root">
├── package.json          dependências e comandos (npm run dev / build)
├── tsconfig.json         configuração do TypeScript
├── vite.config.ts        configuração do Vite
└── src/
    ├── main.tsx          liga o React na <div id="root">
    ├── App.tsx           o menu das aulas (já é um exemplo de useState!)
    ├── estilo.css        estilo simples (não é o foco)
    └── aulas/
        ├── Aula01_Componente.tsx ... Aula09_Ref.tsx
        ├── Aula10_Exercicio.tsx   ← você faz
        ├── Aula10_Solucao.tsx     ← só depois de tentar
        └── apiFalsa.ts            imita o /login e o /validar-2fa
```
