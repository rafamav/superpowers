import { motion } from 'motion/react'

const COLORS = ['#22C55E', '#FACC15', '#38BDF8', '#FB7185', '#A78BFA', '#FB923C']

const PIECES = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 1.2,
  duration: 2.4 + Math.random() * 2,
  color: COLORS[i % COLORS.length],
  size: 8 + Math.random() * 8,
  spin: (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360),
}))

export function Confetti() {
  return (
    <div className="confetti" aria-hidden>
      {PIECES.map((p) => (
        <motion.span
          key={p.id}
          className="confetti-piece"
          style={{ left: `${p.left}%`, width: p.size, height: p.size, background: p.color }}
          initial={{ y: '-12vh', rotate: 0, opacity: 1 }}
          animate={{ y: '112vh', rotate: p.spin, opacity: [1, 1, 0.9, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  )
}
