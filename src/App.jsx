import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MdEmail } from 'react-icons/md'
import { FaYoutube, FaDiscord, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
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
  const [toast, setToast]       = useState(null)
  const [footerToast, setFooterToast] = useState(null)
  const [rings, setRings]       = useState(null) // { x, y, color, id }

  function handleFooterCopy(text) {
    navigator.clipboard.writeText(text).then(() => {
      setFooterToast(`已複製 ${text}`)
      setTimeout(() => setFooterToast(null), 2200)
    })
  }

  const handleCollect = (id, { x, y }) => {
    const color = SEASON_COLORS[id]
    setRings({ x, y, color, id })
    window.gtag?.('event', 'unlock_season', { season: id })
    // ring 2 ends at 1800ms + 300ms stagger = 2100ms → switch theme after
    setTimeout(() => {
      unlockSeason(id, true)
      setToast({ label: SEASON_LABELS[id], color })
      setRings(null)
    }, 2150)
    setTimeout(() => setToast(null), 2150 + 3200)
  }

  const handleReset = () => {
    localStorage.removeItem('theme-unlocked-seasons')
    localStorage.setItem('theme-season', 'summer')
    location.reload()
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
        <div className="relative h-0">
          {makeCollectible('winter', 'bottom-2 right-5')}
        </div>
      </main>
      <footer className="relative z-10 border-t" style={{ backgroundColor: 'var(--c-surface)', borderColor: 'var(--c-border)' }}>
        <div className="relative">
          <div className="max-w-[1160px] mx-auto px-6 py-7 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm m-0" style={{ color: 'var(--c-text-3)' }}>© 2026 范姜昱任 Ririka</p>
            <div className="relative flex flex-wrap gap-2">
              {[
                { copy: 'natsunohajimari0621@gmail.com', label: 'Email',       Icon: MdEmail },
                { href: 'https://www.youtube.com/@natsuririka',  label: 'YouTube',    Icon: FaYoutube,  target: '_blank' },
                { href: 'https://twitter.com/Ririka_122422',     label: 'Twitter / X',Icon: FaXTwitter, target: '_blank' },
                { copy: 'natsunoririka',                         label: 'Discord',    Icon: FaDiscord },
                { href: 'https://github.com/ririka122422',        label: 'GitHub',     Icon: FaGithub,   target: '_blank' },
              ].map(({ href, label, target, Icon, copy }) => (
                <div key={label} className="relative group">
                  {copy ? (
                    <button onClick={() => handleFooterCopy(copy)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg border transition-opacity hover:opacity-80"
                      style={{ color: 'var(--c-text-2)', borderColor: 'var(--c-border-2)', backgroundColor: 'var(--c-surface-2)' }}>
                      <Icon size={18} />
                    </button>
                  ) : (
                    <a href={href} target={target} rel={target ? 'noopener noreferrer' : undefined}
                       className="w-9 h-9 flex items-center justify-center rounded-lg border transition-opacity hover:opacity-80"
                       style={{ color: 'var(--c-text-2)', borderColor: 'var(--c-border-2)', backgroundColor: 'var(--c-surface-2)' }}>
                      <Icon size={18} />
                    </a>
                  )}
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-2 py-0.5 text-[0.72rem] opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: 'var(--c-surface-2)', color: 'var(--c-text-2)', border: '1px solid var(--c-border)' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {unlockedSeasons.length > 1 && (
          <div className="pb-5 flex justify-center">
            <button
              onClick={handleReset}
              className="text-xs hover:opacity-80 transition-opacity"
              style={{ color: 'var(--c-text-3)' }}
            >
              ↺ 重置探索記錄
            </button>
          </div>
        )}
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

      {/* Footer copy toast */}
      <AnimatePresence>
        {footerToast && (
          <motion.div
            key="footer-toast"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ type: 'spring', stiffness: 340, damping: 26 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg pointer-events-none"
            style={{ backgroundColor: 'var(--c-text)', color: 'var(--c-bg)', whiteSpace: 'nowrap' }}
          >
            {footerToast}
          </motion.div>
        )}
      </AnimatePresence>

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

    </div>
  )
}
