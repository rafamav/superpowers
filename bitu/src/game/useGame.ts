import { useCallback, useState } from 'react'
import type { Answer, Mission, Screen, Situation } from '../types'
import { situations } from '../data/situations'
import { sounds } from '../audio/sounds'

const START_BATTERY = 20

export interface Result {
  situation: Situation
  guess: Answer
  /** A turma acertou se o palpite bate com a natureza real da carta. */
  guessedRight: boolean
}

const clamp = (n: number) => Math.max(0, Math.min(100, n))

export function useGame() {
  const [screen, setScreen] = useState<Screen>('start')
  const [battery, setBattery] = useState(START_BATTERY)
  const [index, setIndex] = useState(0)
  const [result, setResult] = useState<Result | null>(null)
  const [mission, setMission] = useState<Mission | null>(null)

  const total = situations.length
  const current = situations[index]

  const goStory = useCallback(() => {
    sounds.unlock()
    sounds.click()
    setScreen('story')
  }, [])

  const startGame = useCallback(() => {
    sounds.unlock()
    sounds.click()
    setBattery(START_BATTERY)
    setIndex(0)
    setResult(null)
    setMission(null)
    setScreen('game')
  }, [])

  const answer = useCallback(
    (guess: Answer) => {
      setResult((prev) => {
        if (prev) return prev // a carta atual já foi respondida
        const sit = situations[index]
        const charging = sit.delta > 0
        setBattery((b) => clamp(b + sit.delta))
        if (charging) sounds.charge()
        else sounds.discharge()
        return { situation: sit, guess, guessedRight: guess === sit.correct }
      })
    },
    [index],
  )

  const next = useCallback(() => {
    if (!result) return
    sounds.click()
    setResult(null)
    if (index + 1 >= total) {
      setScreen('end')
      sounds.win()
    } else {
      setIndex((i) => i + 1)
    }
  }, [index, total, result])

  const goMission = useCallback(() => {
    sounds.click()
    setScreen('mission')
  }, [])

  const chooseMission = useCallback((m: Mission) => {
    sounds.charge()
    setMission(m)
  }, [])

  const restart = useCallback(() => {
    sounds.click()
    setBattery(START_BATTERY)
    setIndex(0)
    setResult(null)
    setMission(null)
    setScreen('start')
  }, [])

  return {
    screen,
    battery,
    index,
    total,
    current,
    result,
    mission,
    goStory,
    startGame,
    answer,
    next,
    goMission,
    chooseMission,
    restart,
  }
}

export type Game = ReturnType<typeof useGame>
