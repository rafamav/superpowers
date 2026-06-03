# Bitu — Bateria do Corpo 🔋⚡

Joguinho interativo para apresentação na escola (crianças de **8 a 12 anos**).
A turma ajuda o mascote **Bitu** a carregar a "bateria do corpo" decidindo, a cada
hábito, se ele **CARREGA** ou **DESCARREGA** a energia.

Feito para ser exibido no projetor/iPad enquanto **quem joga é a turma** (respondendo
em voz alta ou levantando placas). O apresentador toca no botão que a turma escolheu.

## Como funciona

1. **Início** – capa com o Bitu e o botão "Começar missão".
2. **História** – "Hoje o Bitu acordou com a bateria quase no fim…" (bateria em 20%).
3. **Jogo** – 10 situações. A turma decide CARREGA ⚡ ou DESCARREGA 🪫.
   - Acertou um hábito que carrega → Bitu fica animado, bateria sobe, som alegre.
   - Hábito que descarrega → Bitu fica cansado, bateria desce.
   - Cada resposta mostra uma explicação curtinha.
4. **Final** – a bateria chega a 100%, confete e "Vocês carregaram a bateria do Bitu!".
5. **Missão da semana** – a turma escolhe 1 hábito para levar pra casa.

A bateria começa em 20% e, jogando as 10 cartas, termina exatamente em 100%
(7 hábitos que carregam, 3 que descarregam).

## Rodando

```bash
npm install
npm run dev      # abre em http://localhost:5173
```

Build de produção (PWA, funciona offline depois de aberto uma vez):

```bash
npm run icons    # gera os ícones PNG a partir de public/bitu.svg
npm run build
npm run preview  # serve a versão de produção
```

## Dicas para a apresentação

- **Tela cheia:** botão ⛶ no canto (ou Acesso Guiado no iPad para travar na atividade).
- **Som:** botão 🔊/🔇 no canto.
- **Teclado (controle do apresentador):** `←`/`C` = carrega, `→`/`D` = descarrega,
  `Espaço`/`Enter` = próxima carta.
- **Sem projetor?** Funciona como "livro interativo" na roda, com placas físicas.

## Stack

React 19 + Vite + TypeScript + [Motion](https://motion.dev) + PWA (vite-plugin-pwa).
Mascote, bateria e confete são **SVG/CSS animados** e os sons são gerados na hora
com a Web Audio API — então não há nenhum arquivo de imagem/áudio para baixar e
tudo roda offline.

## Trocar o mascote pelas suas imagens do Bitu

O Bitu é desenhado em código em `src/components/Bitu.tsx` (5 humores: `idle`,
`happy`, `excited`, `tired`, `sleeping`). Para usar PNGs próprios, basta trocar o
conteúdo do `<svg>` por um `<img>` por humor, mantendo a mesma prop `mood`.

## Estrutura

```
src/
  data/situations.ts   # as 10 situações (texto, certo/errado, explicação)
  data/missions.ts     # as 4 missões da semana
  game/useGame.ts      # estado e regras do jogo
  audio/sounds.ts      # sons via Web Audio API
  components/           # Bitu, Battery, Confetti, TopBar
  screens/              # Start, Story, Game, End, Mission
```
