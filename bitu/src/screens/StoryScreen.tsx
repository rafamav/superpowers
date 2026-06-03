import { motion } from 'motion/react'
import { Bitu } from '../components/Bitu'
import { Battery } from '../components/Battery'

export function StoryScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.section
      className="screen story"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
    >
      <div className="story-stage">
        <Bitu mood="tired" size={220} />
        <Battery value={20} compact />
      </div>

      <div className="story-card">
        <p>
          Hoje o <strong>Bitu</strong> acordou com a bateria quase no fim… 🪫
        </p>
        <p>
          Será que a turma consegue ajudar ele a <strong>carregar a bateria do corpo</strong>?
        </p>
      </div>

      <motion.button
        className="btn btn-primary btn-big"
        onClick={onContinue}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.04 }}
      >
        Vamos ajudar o Bitu! 💪
      </motion.button>
    </motion.section>
  )
}
