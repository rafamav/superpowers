import { AnimatePresence, motion } from 'motion/react'
import type { Mission } from '../types'
import { missions } from '../data/missions'
import { Bitu } from '../components/Bitu'

interface Props {
  mission: Mission | null
  onChoose: (m: Mission) => void
  onReplay: () => void
  onHome: () => void
}

export function MissionScreen({ mission, onChoose, onReplay, onHome }: Props) {
  return (
    <motion.section
      className="screen mission"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
    >
      <h2 className="title-sm">Escolham a missão da semana! 🎯</h2>
      <p className="subtitle-sm">Qual hábito a turma vai levar pra casa?</p>

      <div className="mission-grid">
        {missions.map((m) => (
          <motion.button
            key={m.id}
            className={`mission-card ${mission?.id === m.id ? 'chosen' : ''}`}
            onClick={() => onChoose(m)}
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.03 }}
          >
            <span className="mission-emoji">{m.emoji}</span>
            <span className="mission-title">{m.title}</span>
            <span className="mission-sub">{m.subtitle}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {mission && (
          <motion.div
            className="mission-confirm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Bitu mood="happy" size={120} />
            <p>
              Missão escolhida: <strong>{mission.title}</strong>! Bora arrasar essa semana! 💪
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="end-actions">
        <motion.button className="btn btn-primary" onClick={onReplay} whileTap={{ scale: 0.95 }}>
          🔁 Jogar de novo
        </motion.button>
        <motion.button className="btn btn-ghost" onClick={onHome} whileTap={{ scale: 0.95 }}>
          🏠 Início
        </motion.button>
      </div>
    </motion.section>
  )
}
