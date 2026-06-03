import { motion } from 'motion/react'
import { Bitu } from '../components/Bitu'

export function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.section
      className="screen start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1
        className="title"
        initial={{ scale: 0.6, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', bounce: 0.5 }}
      >
        Bitu
      </motion.h1>
      <p className="subtitle">A Bateria do Corpo 🔋</p>

      <Bitu mood="happy" size={300} />

      <motion.button
        className="btn btn-primary btn-big"
        onClick={onStart}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.04 }}
      >
        ▶ Começar missão
      </motion.button>

      <p className="hint">Para a turma jogar junto • 8 a 12 anos</p>
    </motion.section>
  )
}
