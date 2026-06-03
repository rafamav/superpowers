// Sons gerados na hora com a Web Audio API — nenhum arquivo de áudio necessário,
// então tudo funciona offline. O contexto só é criado depois de um toque/clique
// (exigência dos navegadores), por isso chamamos sounds.unlock() no primeiro botão.

let ctx: AudioContext | null = null
let muted = false

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

function tone(
  freq: number,
  startAt: number,
  duration: number,
  type: OscillatorType = 'sine',
  gain = 0.18,
) {
  const ac = getCtx()
  if (!ac) return
  const osc = ac.createOscillator()
  const g = ac.createGain()
  osc.type = type
  osc.frequency.value = freq
  const t0 = ac.currentTime + startAt
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.linearRampToValueAtTime(gain, t0 + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)
  osc.connect(g).connect(ac.destination)
  osc.start(t0)
  osc.stop(t0 + duration + 0.03)
}

export const sounds = {
  setMuted(value: boolean) {
    muted = value
  },
  isMuted() {
    return muted
  },
  /** Cria/retoma o contexto de áudio dentro de um gesto do usuário. */
  unlock() {
    getCtx()
  },
  click() {
    if (muted) return
    tone(440, 0, 0.05, 'square', 0.06)
  },
  charge() {
    if (muted) return
    tone(523.25, 0, 0.12, 'triangle') // dó
    tone(659.25, 0.1, 0.12, 'triangle') // mi
    tone(783.99, 0.2, 0.2, 'triangle') // sol
  },
  discharge() {
    if (muted) return
    tone(392.0, 0, 0.16, 'sawtooth', 0.12) // sol grave
    tone(311.13, 0.14, 0.24, 'sawtooth', 0.12) // mi bemol grave
  },
  win() {
    if (muted) return
    tone(523.25, 0, 0.14, 'triangle')
    tone(659.25, 0.12, 0.14, 'triangle')
    tone(783.99, 0.24, 0.14, 'triangle')
    tone(1046.5, 0.36, 0.32, 'triangle')
    tone(1318.5, 0.42, 0.3, 'sine', 0.1) // brilho
  },
}
