import { useState } from 'react'
import { useTheme } from './hooks/useTheme'
import Background from './components/Background'
import Nav from './components/Nav'
import Hero from './components/Hero'
import FeaturedWorks from './components/FeaturedWorks'
import WorksSection from './components/WorksSection'
import SeasonCollectible from './components/SeasonCollectible'

const SEASON_LABELS  = { spring: '春日', autumn: '秋日', winter: '冬日' }
const SEASON_COLORS  = { spring: '#D15878', autumn: '#C96418', winter: '#2E7CB8' }
const ACCENT_COLORS  = { spring: '#D15878', summer: '#3DAA76', autumn: '#C96418', winter: '#2E7CB8' }

export default function App() {
  const { dark, toggleDark, season, setSeason, unlockedSeasons, unlockSeason } = useTheme()
  const [toast, setToast]   = useState(null)
  const [rings, setRings]   = useState(null) // { x, y, color, id }

  const handleCollect = (id, { x, y }) => {
    const color = SEASON_COLORS[id]
    setRings({ x, y, color, id })
    // ring 2 ends at 1800ms + 300ms stagger = 2100ms → switch theme after
    setTimeout(() => {
      unlockSeason(id, true)
      setToast({ label: SEASON_LABELS[id], color })
      setRings(null)
    }, 2150)
    setTimeout(() => setToast(null), 2150 + 3200)
  }

  const handleAvatarClick = ({ x, y }) => {
    setRings({ x, y, color: 'rgba(61, 170, 118, 0.38)', id: 'avatar' })
    setTimeout(() => {
      setSeason('summer')
      setRings(null)
    }, 2150)
  }

  const makeCollectible = (id, className) =>
    !unlockedSeasons.includes(id)
      ? <SeasonCollectible
          key={id}
          season={id}
          onCollect={(coords) => handleCollect(id, coords)}
          className={className}
        />
      : null

  return (
    <div className="relative min-h-screen font-sans" style={{ backgroundColor: 'var(--c-bg)', color: 'var(--c-text)' }}>
      <Background season={season} />
      <Nav dark={dark} toggleDark={toggleDark} season={season} setSeason={setSeason} unlockedSeasons={unlockedSeasons} />
      <main className="relative z-10">
        <Hero collectible={makeCollectible('spring', 'top-5 right-5')} onAvatarClick={handleAvatarClick} />
        <FeaturedWorks />
        <WorksSection collectible={makeCollectible('autumn', 'top-1/2 -translate-y-1/2 left-full ml-2')} />
      </main>
      <footer className="relative z-10 overflow-hidden border-t" style={{ backgroundColor: 'var(--c-surface)', borderColor: 'var(--c-border)' }}>
        <div className="max-w-[1160px] mx-auto px-6 py-7 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm m-0" style={{ color: 'var(--c-text-3)' }}>© 2025 范姜昱任 Ririka</p>
          <div className="flex flex-wrap gap-5">
            {[
              { href: 'mailto:natsunohajimari0621@gmail.com', label: 'Email' },
              { href: 'https://www.youtube.com/@natsuririka',  label: 'YouTube',     target: '_blank' },
              { href: 'https://twitter.com/Ririka_122422',     label: 'Twitter / X', target: '_blank' },
            ].map(({ href, label, target }) => (
              <a key={label} href={href} target={target} rel={target ? 'noopener noreferrer' : undefined}
                 className="text-sm transition-colors hover:opacity-80"
                 style={{ color: 'var(--c-text-2)' }}>
                {label}
              </a>
            ))}
          </div>
        </div>
        {makeCollectible('winter', 'top-1/2 -translate-y-1/2 right-5')}
      </footer>

      {/* Full-screen expanding ripple rings on collect */}
      {rings && [0, 1].map(i => (
        <div
          key={`ring-${rings.id}-${i}`}
          className="fixed rounded-full pointer-events-none"
          style={{
            left: rings.x,
            top:  rings.y,
            borderStyle: 'solid',
            borderColor: rings.color,
            zIndex: 9999,
            animation: `ring-expand-full 1.8s ease-out ${i * 0.3}s forwards`,
          }}
        />
      ))}

      {/* Toast notification */}
      {toast && (
        <div
          key={toast.label}
          className="fixed bottom-8 left-1/2 z-[500] px-5 py-3 rounded-xl
                     text-white text-sm font-semibold shadow-xl
                     pointer-events-none select-none toast-enter"
          style={{ backgroundColor: toast.color, transform: 'translateX(-50%)' }}
        >
          {toast.label}主題已解鎖！
        </div>
      )}

      {/* Dev-only test panel */}
      {import.meta.env.DEV && (
        <div className="fixed bottom-4 left-4 z-[600] flex flex-col gap-1.5 text-xs">
          <button
            onClick={() => { localStorage.removeItem('theme-unlocked-seasons'); location.reload() }}
            className="px-3 py-1.5 rounded-lg font-medium text-white shadow"
            style={{ backgroundColor: '#64748b' }}
          >
            🔒 重置解鎖
          </button>
          <button
            onClick={() => { localStorage.setItem('theme-unlocked-seasons', JSON.stringify(['summer','spring','autumn','winter'])); location.reload() }}
            className="px-3 py-1.5 rounded-lg font-medium text-white shadow"
            style={{ backgroundColor: '#64748b' }}
          >
            🔓 解鎖全部
          </button>
        </div>
      )}
    </div>
  )
}
