import { motion } from 'motion/react'

export type Mood = 'idle' | 'happy' | 'excited' | 'tired' | 'sleeping'

const BODY = '#2DD4BF'
const OUTLINE = '#0F766E'
const PANEL = '#ECFEFF'
const DARK = '#0F172A'
const CHEEK = '#FB7185'

// Movimento do corpo inteiro conforme o humor.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bob: Record<Mood, { animate: any; transition: any }> = {
  idle: { animate: { y: [0, -6, 0] }, transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } },
  happy: {
    animate: { y: [0, -10, 0], rotate: [0, -2, 2, 0] },
    transition: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' },
  },
  excited: {
    animate: { y: [0, -18, 0], rotate: [0, -4, 4, 0] },
    transition: { duration: 0.7, repeat: Infinity, ease: 'easeInOut' },
  },
  tired: { animate: { y: [0, 3, 0] }, transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } },
  sleeping: { animate: { scale: [1, 1.03, 1] }, transition: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' } },
}

function Eyes({ mood }: { mood: Mood }) {
  const xs = [88, 132]
  const y = 126
  if (mood === 'sleeping') {
    return (
      <>
        {xs.map((x) => (
          <path
            key={x}
            d={`M ${x - 13} ${y - 2} Q ${x} ${y + 10} ${x + 13} ${y - 2}`}
            fill="none"
            stroke={OUTLINE}
            strokeWidth={4}
            strokeLinecap="round"
          />
        ))}
      </>
    )
  }
  if (mood === 'tired') {
    return (
      <>
        {xs.map((x) => (
          <g key={x}>
            <path d={`M ${x - 14} ${y} A 14 12 0 0 0 ${x + 14} ${y}`} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
            <circle cx={x} cy={y - 1} r={5} fill={DARK} />
          </g>
        ))}
      </>
    )
  }
  const pupil = mood === 'excited' ? 8.5 : 7.5
  return (
    <>
      {xs.map((x) => (
        <g key={x}>
          <ellipse cx={x} cy={y} rx={15} ry={17} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
          <circle cx={x} cy={y + 2} r={pupil} fill={DARK} />
          <circle cx={x - 3} cy={y - 2} r={2.8} fill="#fff" />
          <circle cx={x + 3} cy={y + 4} r={1.6} fill="#fff" />
        </g>
      ))}
    </>
  )
}

function Mouth({ mood }: { mood: Mood }) {
  switch (mood) {
    case 'excited':
      return (
        <>
          <path d="M92 152 Q110 150 128 152 Q124 178 110 178 Q96 178 92 152 Z" fill="#9F1239" />
          <ellipse cx={110} cy={174} rx={9} ry={6} fill={CHEEK} />
        </>
      )
    case 'happy':
      return <path d="M90 154 Q110 178 130 154" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
    case 'tired':
      return (
        <path d="M96 163 Q103 157 110 163 Q117 169 124 163" fill="none" stroke={OUTLINE} strokeWidth={3.5} strokeLinecap="round" />
      )
    case 'sleeping':
      return <ellipse cx={110} cy={160} rx={6} ry={7} fill="#9F1239" />
    default:
      return <path d="M96 156 Q110 168 124 156" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
  }
}

export function Bitu({ mood = 'idle', size = 260 }: { mood?: Mood; size?: number }) {
  const bulb =
    mood === 'tired' ? '#94A3B8' : mood === 'sleeping' ? '#64748B' : mood === 'idle' ? '#FBBF24' : '#4ADE80'
  const cheeks = mood === 'happy' || mood === 'excited'
  const armY = mood === 'excited' ? 116 : 150

  return (
    <motion.div className="bitu" style={{ width: size }} animate={bob[mood].animate} transition={bob[mood].transition}>
      <svg viewBox="0 0 220 250" width="100%" role="img" aria-label="Bitu">
        {/* pés */}
        <ellipse cx={84} cy={228} rx={20} ry={12} fill={BODY} stroke={OUTLINE} strokeWidth={5} />
        <ellipse cx={136} cy={228} rx={20} ry={12} fill={BODY} stroke={OUTLINE} strokeWidth={5} />

        {/* braços (sobem quando animado) */}
        <ellipse cx={32} cy={armY} rx={15} ry={24} fill={BODY} stroke={OUTLINE} strokeWidth={5} />
        <ellipse cx={188} cy={armY} rx={15} ry={24} fill={BODY} stroke={OUTLINE} strokeWidth={5} />

        {/* antena */}
        <line x1={110} y1={60} x2={110} y2={38} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        <circle cx={110} cy={28} r={16} fill={bulb} opacity={0.3} />
        <circle cx={110} cy={28} r={10} fill={bulb} stroke={OUTLINE} strokeWidth={4} style={{ filter: `drop-shadow(0 0 6px ${bulb})` }} />

        {/* corpo */}
        <rect x={34} y={58} width={152} height={168} rx={58} fill={BODY} stroke={OUTLINE} strokeWidth={6} />

        {/* painel do rosto */}
        <rect x={52} y={82} width={116} height={104} rx={44} fill={PANEL} stroke={OUTLINE} strokeWidth={5} />

        {cheeks && (
          <>
            <ellipse cx={70} cy={150} rx={10} ry={7} fill={CHEEK} opacity={0.65} />
            <ellipse cx={150} cy={150} rx={10} ry={7} fill={CHEEK} opacity={0.65} />
          </>
        )}

        <Eyes mood={mood} />
        <Mouth mood={mood} />

        {/* gota de cansaço */}
        {mood === 'tired' && <path d="M150 104 q -6 8 0 13 q 6 -5 0 -13 z" fill="#38BDF8" stroke="#0EA5E9" strokeWidth={1} />}

        {/* Zzz dormindo */}
        {mood === 'sleeping' && (
          <text x={150} y={74} fill={OUTLINE} fontSize={20} fontWeight={700} fontFamily="inherit">
            z
            <tspan fontSize={26} dx={2} dy={-8}>
              z
            </tspan>
          </text>
        )}

        {/* faíscas animado */}
        {mood === 'excited' && (
          <>
            <path d="M44 76 l4 -12 l4 12 l12 4 l-12 4 l-4 12 l-4 -12 l-12 -4 z" fill="#FACC15" />
            <path d="M170 70 l3 -9 l3 9 l9 3 l-9 3 l-3 9 l-3 -9 l-9 -3 z" fill="#FDE68A" />
          </>
        )}

        {/* raio de energia no peito */}
        <path
          d="M120 192 L96 222 L112 222 L104 244 L132 210 L116 210 Z"
          fill="#FACC15"
          stroke="#EAB308"
          strokeWidth={3}
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  )
}
