import { motion } from 'motion/react'
import { Bitu } from '../components/Bitu'
import { Battery } from '../components/Battery'
import { Confetti } from '../components/Confetti'

export function EndScreen({ onMission, onReplay }: { onMission: () => void; onReplay: () => void }) {
  return (
    <motion.section className="screen end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Confetti />

      <motion.h2
        className="title"
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
      >
        Parabéns! 🎉
      </motion.h2>

      <div className="stage">
        <Bitu mood="excited" size={280} />
        <Battery value={100} />
      </div>

      <p className="end-text">
        Vocês <strong>carregaram a bateria do Bitu</strong>! Mandaram muito bem! 🔋⚡
      </p>

      <div className="end-actions">
        <motion.button className="btn btn-primary btn-big" onClick={onMission} whileTap={{ scale: 0.95 }}>
          🎯 Missão da semana
        </motion.button>
        <motion.button className="btn btn-ghost" onClick={onReplay} whileTap={{ scale: 0.95 }}>
          🔁 Jogar de novo
        </motion.button>
      </div>
    </motion.section>
  )
}
