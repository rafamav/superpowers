export type Screen = 'start' | 'story' | 'game' | 'end' | 'mission'

export type Answer = 'carrega' | 'descarrega'

export interface Situation {
  id: string
  emoji: string
  /** Frase lida em voz alta para a turma. */
  text: string
  /** A resposta certa (a natureza real do hábito). */
  correct: Answer
  /** Mudança na bateria quando a carta é resolvida (positiva = carrega). */
  delta: number
  /** Explicação curtinha mostrada no feedback. */
  explanation: string
}

export interface Mission {
  id: string
  emoji: string
  title: string
  subtitle: string
}
