import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import JuicyButton from './JuicyButton'

const SEASONS = [
  { id: 'spring', label: '春', color: '#D15878' },
  { id: 'summer', label: '夏', color: '#3DAA76' },
  { id: 'autumn', label: '秋', color: '#C96418' },
  { id: 'winter', label: '冬', color: '#2E7CB8' },
]

/* ── Season icons (stroke-based, inherit currentColor) ── */

function SpringIcon() {
  // 5-petal sakura flower
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      {[0, 72, 144, 216, 288].map(a => (
        <ellipse key={a} cx="11" cy="6.4" rx="1.8" ry="2.8" transform={`rotate(${a} 11 11)`} />
      ))}
      <circle cx="11" cy="11" r="1.5" />
    </svg>
  )
}

function SummerIcon() {
  // Rounded leaf with center vein
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 19.5 C7.5 17.5 4 14.5 4 9.5 C4 5.9 7.1 3 11 3 C14.9 3 18 5.9 18 9.5 C18 14.5 14.5 17.5 11 19.5Z" />
      <line x1="11" y1="3.5" x2="11" y2="19.5" />
    </svg>
  )
}

function AutumnIcon() {
  // Simplified maple leaf
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 2 L12.5 5.5 L16.5 4 L14.5 8 L18.5 9 L15 11.5 L17 15 L13 13.5 L11 17.5 L9 13.5 L5 15 L7 11.5 L3.5 9 L7.5 8 L5.5 4 L9.5 5.5 Z" />
      <line x1="11" y1="17.5" x2="11" y2="21" />
    </svg>
  )
}

function WinterIcon() {
  // Snowflake: 6 spokes with Y-branches
  const cx = 11, cy = 11, R = 8, brR = 4.2, brLen = 2.6
  const spokes = Array.from({ length: 6 }, (_, i) => {
    const a = (i * 60 * Math.PI) / 180
    const tx = cx + Math.cos(a) * R
    const ty = cy + Math.sin(a) * R
    const bx = cx + Math.cos(a) * brR
    const by = cy + Math.sin(a) * brR
    const pa = a + Math.PI / 2
    return {
      arm: [cx, cy, tx, ty],
      b1:  [bx, by, bx + Math.cos(pa) * brLen, by + Math.sin(pa) * brLen],
      b2:  [bx, by, bx - Math.cos(pa) * brLen, by - Math.sin(pa) * brLen],
    }
  })
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      {spokes.map(({ arm, b1, b2 }, i) => (
        <g key={i}>
          <line x1={arm[0].toFixed(1)} y1={arm[1].toFixed(1)} x2={arm[2].toFixed(1)} y2={arm[3].toFixed(1)} />
          <line x1={b1[0].toFixed(1)} y1={b1[1].toFixed(1)} x2={b1[2].toFixed(1)} y2={b1[3].toFixed(1)} />
          <line x1={b2[0].toFixed(1)} y1={b2[1].toFixed(1)} x2={b2[2].toFixed(1)} y2={b2[3].toFixed(1)} />
        </g>
      ))}
    </svg>
  )
}

const SEASON_ICONS = { spring: SpringIcon, summer: SummerIcon, autumn: AutumnIcon, winter: WinterIcon }

/* ── Dark mode icons ── */

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export default function Nav({ dark, toggleDark, season, setSeason }) {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredSeason, setHoveredSeason] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 w-full backdrop-blur-md border-b"
      style={{
        backgroundColor: scrolled ? 'var(--c-nav-bg)' : 'transparent',
        borderColor:     scrolled ? 'var(--c-border)' : 'transparent',
        boxShadow:       scrolled ? '0 1px 8px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      <div className="max-w-[1160px] mx-auto px-6 h-[58px] flex items-center justify-between">

        <JuicyButton as="a" href="#top">
          <span className="text-[1.05rem] font-bold tracking-[-0.01em]" style={{ color: 'var(--c-accent-dark)' }}>
            Ririka
          </span>
        </JuicyButton>

        <nav className="flex items-center gap-5" aria-label="主選單">
          {['Works', 'About'].map(label => (
            <JuicyButton key={label} as="a" href={`#${label.toLowerCase()}`}>
              <span className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: 'var(--c-text-2)' }}>
                {label}
              </span>
            </JuicyButton>
          ))}

          <JuicyButton as="a" href="mailto:natsunohajimari0621@gmail.com">
            <span className="text-sm font-medium px-4 py-1.5 rounded-lg text-white transition-colors"
                  style={{ backgroundColor: 'var(--c-accent)' }}>
              Contact
            </span>
          </JuicyButton>

          {/* Season + dark mode controls */}
          <div className="flex items-center gap-2.5">

            {/* Season icon buttons */}
            <div className="flex items-center gap-0.5" role="group" aria-label="主題色系">
              {SEASONS.map(s => {
                const Icon = SEASON_ICONS[s.id]
                const isActive  = season === s.id
                const isHovered = hoveredSeason === s.id
                const showColor = isActive || isHovered
                return (
                  <motion.button
                    key={s.id}
                    onClick={() => setSeason(s.id)}
                    onHoverStart={() => setHoveredSeason(s.id)}
                    onHoverEnd={() => setHoveredSeason(null)}
                    aria-label={`${s.label}主題`}
                    title={`${s.label}主題`}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className="w-8 h-8 flex items-center justify-center rounded-md"
                    style={{
                      color: showColor ? s.color : 'var(--c-text-3)',
                      backgroundColor: isActive && !isHovered ? `${s.color}16` : 'transparent',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'color 0.18s ease, background-color 0.18s ease',
                    }}
                  >
                    <Icon />
                  </motion.button>
                )
              })}
            </div>

            {/* Divider */}
            <div style={{ width: 1, height: 14, backgroundColor: 'var(--c-border)', flexShrink: 0 }} />

            {/* Dark mode toggle — icon only, no border */}
            <JuicyButton
              as="button"
              onClick={toggleDark}
              aria-label={dark ? '切換亮色模式' : '切換暗色模式'}
              className="flex items-center justify-center"
              style={{ color: 'var(--c-text-2)' }}
            >
              <motion.span
                key={dark ? 'sun' : 'moon'}
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                transition={{ duration: 0.22 }}
                className="flex items-center justify-center"
              >
                {dark ? <SunIcon /> : <MoonIcon />}
              </motion.span>
            </JuicyButton>
          </div>
        </nav>
      </div>
    </header>
  )
}
