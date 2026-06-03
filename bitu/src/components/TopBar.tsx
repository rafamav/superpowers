import { useEffect, useState } from 'react'
import { sounds } from '../audio/sounds'

export function TopBar() {
  const [muted, setMuted] = useState(() => localStorage.getItem('bitu-muted') === '1')
  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    sounds.setMuted(muted)
    localStorage.setItem('bitu-muted', muted ? '1' : '0')
  }, [muted])

  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen()
    else void document.documentElement.requestFullscreen?.()
  }

  return (
    <header className="topbar">
      <span className="brand">⚡ Bitu</span>
      <div className="topbar-actions">
        <button
          className="icon-btn"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? 'Ativar som' : 'Silenciar'}
          title={muted ? 'Ativar som' : 'Silenciar'}
        >
          {muted ? '🔇' : '🔊'}
        </button>
        <button className="icon-btn" onClick={toggleFullscreen} aria-label="Tela cheia" title="Tela cheia">
          {fullscreen ? '🗗' : '⛶'}
        </button>
      </div>
    </header>
  )
}
