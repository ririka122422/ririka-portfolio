import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import JuicyButton from './JuicyButton'
import { SpringIcon, SummerIcon, AutumnIcon, WinterIcon } from './SeasonIcons'

const SEASONS = [
  { id: 'spring', label: '春', color: '#D15878' },
  { id: 'summer', label: '夏', color: '#3DAA76' },
  { id: 'autumn', label: '秋', color: '#C96418' },
  { id: 'winter', label: '冬', color: '#2E7CB8' },
]

const SEASON_ICONS = { spring: SpringIcon, summer: SummerIcon, autumn: AutumnIcon, winter: WinterIcon }

function LockIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 12 14" fill="currentColor">
      <rect x="1.5" y="6" width="9" height="7" rx="1.5" />
      <path d="M3.5 6V4a2.5 2.5 0 0 1 5 0v2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

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

export default function Nav({ dark, toggleDark, season, setSeason, unlockedSeasons }) {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredSeason, setHoveredSeason] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const unlockedCount = unlockedSeasons?.length ?? 1

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
          {[{ label: 'Works', href: '#works' }, { label: 'About', href: '#top' }].map(({ label, href }) => (
            <JuicyButton key={label} as="a" href={href}>
              <span className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: 'var(--c-text-2)' }}>
                {label}
              </span>
            </JuicyButton>
          ))}

          {/* Season + dark mode controls */}
          <div className="flex items-center gap-2.5">

            {/* Season icon buttons */}
            <div className="flex items-center gap-1.5" role="group" aria-label="主題色系">
              {SEASONS.map(s => {
                const Icon = SEASON_ICONS[s.id]
                const isUnlocked = unlockedSeasons?.includes(s.id) ?? s.id === 'summer'
                const isActive   = season === s.id
                const isHovered  = hoveredSeason === s.id
                const showColor  = isActive || isHovered

                if (!isUnlocked) {
                  return (
                    <div key={s.id} className="group relative">
                      {/* Tooltip */}
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-10
                                   opacity-0 group-hover:opacity-100 transition-opacity duration-150
                                   whitespace-nowrap text-xs font-semibold px-2.5 py-1 rounded-lg
                                   text-white pointer-events-none"
                        style={{ backgroundColor: 'var(--c-text-2)' }}
                      >
                        尋找{s.label}日碎片解鎖
                      </div>
                      <div
                        className="relative w-8 h-8 flex items-center justify-center rounded-md"
                        style={{ color: 'var(--c-text-3)', opacity: 0.45, transform: 'scale(0.82)', cursor: 'not-allowed' }}
                      >
                        <Icon />
                        <span
                          className="absolute -top-0.5 -right-0.5 flex items-center justify-center
                                     w-3.5 h-3.5 rounded-full"
                          style={{ backgroundColor: 'var(--c-surface-2)', color: 'var(--c-text-3)' }}
                        >
                          <LockIcon />
                        </span>
                      </div>
                    </div>
                  )
                }

                return (
                  <motion.button
                    key={s.id}
                    onClick={() => setSeason(s.id)}
                    onHoverStart={() => setHoveredSeason(s.id)}
                    onHoverEnd={() => setHoveredSeason(null)}
                    aria-label={`${s.label}主題`}
                    title={`${s.label}主題`}
                    animate={{ scale: isActive ? 0.88 : 0.82, opacity: isActive ? 0.7 : 0.45 }}
                    whileHover={{ scale: 1.05, opacity: 1 }}
                    whileTap={{ scale: 0.92, opacity: 1 }}
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

              {/* Unlock progress counter */}
              {unlockedCount < 4 && (
                <span
                  className="ml-1 text-[0.6rem] font-semibold tabular-nums"
                  style={{ color: 'var(--c-text-3)' }}
                  title={`已解鎖 ${unlockedCount}/4 主題`}
                >
                  {unlockedCount}/4
                </span>
              )}
            </div>

            {/* Divider */}
            <div style={{ width: 1, height: 14, backgroundColor: 'var(--c-border)', flexShrink: 0 }} />

            {/* Dark mode toggle */}
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
