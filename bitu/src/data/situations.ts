import type { Situation } from '../types'

// A bateria começa em 20%. Jogando as 10 cartas na ordem, o total chega
// exatamente a 100% (7 cartas que carregam +14 e 3 que descarregam -6).
// 20 +14 -6 +14 -6 +14 +14 -6 +14 +14 +14 = 100
export const situations: Situation[] = [
  {
    id: 'agua-acordar',
    emoji: '💧',
    text: 'Beber água assim que acordar',
    correct: 'carrega',
    delta: 14,
    explanation: 'Água logo cedo ajuda o corpo a ligar os motores do dia.',
  },
  {
    id: 'celular-cama',
    emoji: '📱',
    text: 'Ficar no celular na cama até tarde',
    correct: 'descarrega',
    delta: -6,
    explanation: 'A luz da tela engana o cérebro e atrapalha o sono.',
  },
  {
    id: 'dormir-horario',
    emoji: '😴',
    text: 'Dormir e acordar em horários parecidos',
    correct: 'carrega',
    delta: 14,
    explanation: 'O corpo adora rotina para descansar de verdade.',
  },
  {
    id: 'maratona-video',
    emoji: '📺',
    text: 'Maratonar vídeos sem parar',
    correct: 'descarrega',
    delta: -6,
    explanation: 'Tempo demais de tela cansa os olhos e a cabeça.',
  },
  {
    id: 'cafe-manha',
    emoji: '🥣',
    text: 'Tomar um café da manhã de verdade',
    correct: 'carrega',
    delta: 14,
    explanation: 'Comida boa de manhã é combustível para o dia inteiro.',
  },
  {
    id: 'brincar-mover',
    emoji: '🤸',
    text: 'Brincar e se movimentar bastante',
    correct: 'carrega',
    delta: 14,
    explanation: 'Mexer o corpo carrega energia e deixa a gente feliz.',
  },
  {
    id: 'energetico',
    emoji: '🥤',
    text: 'Tomar muito refrigerante ou energético',
    correct: 'descarrega',
    delta: -6,
    explanation: 'Açúcar e cafeína demais deixam o corpo agitado e depois caído.',
  },
  {
    id: 'sol-arlivre',
    emoji: '☀️',
    text: 'Tomar sol e brincar ao ar livre',
    correct: 'carrega',
    delta: 14,
    explanation: 'A luz do dia ajuda o corpo a saber a hora de ter energia.',
  },
  {
    id: 'guardar-tela',
    emoji: '🌙',
    text: 'Guardar a tela um tempo antes de dormir',
    correct: 'carrega',
    delta: 14,
    explanation: 'Sem tela antes de deitar, o sono chega muito mais fácil.',
  },
  {
    id: 'boa-noite-sono',
    emoji: '🛌',
    text: 'Ter uma boa noite de sono',
    correct: 'carrega',
    delta: 14,
    explanation: 'Dormir bem é o supercarregador do corpo!',
  },
]
