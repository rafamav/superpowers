import { AnimatePresence, motion } from 'motion/react'
import type { Game } from '../game/useGame'
import { Bitu, type Mood } from '../components/Bitu'
import { Battery } from '../components/Battery'

export function GameScreen({ game }: { game: Game }) {
  const { current, index, total, battery, result } = game
  const isLast = index + 1 >= total
  const mood: Mood = result ? (result.situation.delta > 0 ? 'excited' : 'tired') : 'idle'

  return (
    <motion.section
      className="screen game"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
    >
      <div className="progress">
        <span className="progress-label">
          Situação {index + 1} de {total}
        </span>
        <div className="progress-track">
          <motion.div
            className="progress-bar"
            animate={{ width: `${(index / total) * 100}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
      </div>

      <motion.div
        key={current.id}
        className="situation-card"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.4 }}
      >
        <span className="situation-emoji">{current.emoji}</span>
        <p className="situation-text">{current.text}</p>
      </motion.div>

      <div className="stage">
        <Bitu mood={mood} size={230} />
        <Battery value={battery} />
      </div>

      <div className="answers">
        <motion.button
          className="btn btn-charge"
          disabled={!!result}
          onClick={() => game.answer('carrega')}
          whileTap={{ scale: 0.94 }}
        >
          ⚡ CARREGA
        </motion.button>
        <motion.button
          className="btn btn-discharge"
          disabled={!!result}
          onClick={() => game.answer('descarrega')}
          whileTap={{ scale: 0.94 }}
        >
          🪫 DESCARREGA
        </motion.button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            className="feedback-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`feedback-card ${result.situation.delta > 0 ? 'good' : 'bad'}`}
              initial={{ scale: 0.7, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.45 }}
            >
              <div className="feedback-verdict">
                {result.situation.delta > 0 ? 'Isso CARREGA! ⚡' : 'Isso DESCARREGA 🪫'}
              </div>
              <div className="feedback-guess">
                {result.guessedRight ? 'Vocês acertaram! 🎉' : 'Quase! Olha só… 👀'}
              </div>
              <p className="feedback-explanation">{result.situation.explanation}</p>
              <div className="feedback-delta">
                {result.situation.delta > 0 ? `+${result.situation.delta}` : result.situation.delta}% de bateria
              </div>
              <motion.button className="btn btn-primary btn-big" onClick={game.next} whileTap={{ scale: 0.95 }}>
                {isLast ? 'Ver resultado 🏁' : 'Próxima ➜'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
