import { motion } from 'motion/react'

function colorFor(v: number): string {
  if (v < 30) return '#EF4444'
  if (v < 70) return '#FBBF24'
  return '#22C55E'
}

export function Battery({ value, compact = false }: { value: number; compact?: boolean }) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <div className={`battery ${compact ? 'compact' : ''}`}>
      <div className="battery-cap" />
      <div className="battery-shell">
        <motion.div
          className="battery-fill"
          style={{ backgroundColor: colorFor(v) }}
          animate={{ height: `${v}%`, backgroundColor: colorFor(v) }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        />
        <div className="battery-pct">{Math.round(v)}%</div>
      </div>
      <span className="battery-label">⚡ energia</span>
    </div>
  )
}
