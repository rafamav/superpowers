import { useEffect } from 'react'
import { AnimatePresence } from 'motion/react'
import { useGame } from './game/useGame'
import { TopBar } from './components/TopBar'
import { StartScreen } from './screens/StartScreen'
import { StoryScreen } from './screens/StoryScreen'
import { GameScreen } from './screens/GameScreen'
import { EndScreen } from './screens/EndScreen'
import { MissionScreen } from './screens/MissionScreen'

export function App() {
  const game = useGame()

  // Atalhos para quem apresenta: ← / C = carrega, → / D = descarrega,
  // Espaço/Enter = próxima carta. Deixa o iPad/notebook virar um "controle".
  useEffect(() => {
    if (game.screen !== 'game') return
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if (game.result) {
        if (k === ' ' || k === 'enter') {
          e.preventDefault()
          game.next()
        }
        return
      }
      if (k === 'arrowleft' || k === 'c') game.answer('carrega')
      else if (k === 'arrowright' || k === 'd') game.answer('descarrega')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [game.screen, game.result, game.answer, game.next])

  return (
    <div className="app">
      <TopBar />
      <AnimatePresence mode="wait">
        {game.screen === 'start' && <StartScreen key="start" onStart={game.goStory} />}
        {game.screen === 'story' && <StoryScreen key="story" onContinue={game.startGame} />}
        {game.screen === 'game' && <GameScreen key="game" game={game} />}
        {game.screen === 'end' && (
          <EndScreen key="end" onMission={game.goMission} onReplay={game.startGame} />
        )}
        {game.screen === 'mission' && (
          <MissionScreen
            key="mission"
            mission={game.mission}
            onChoose={game.chooseMission}
            onReplay={game.startGame}
            onHome={game.restart}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
