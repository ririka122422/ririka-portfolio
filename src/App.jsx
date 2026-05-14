import { useTheme } from './hooks/useTheme'
import Background from './components/Background'
import Nav from './components/Nav'
import Hero from './components/Hero'
import FeaturedWorks from './components/FeaturedWorks'
import WorksSection from './components/WorksSection'

export default function App() {
  const { dark, toggleDark, season, setSeason } = useTheme()

  return (
    <div className="relative min-h-screen font-sans" style={{ backgroundColor: 'var(--c-bg)', color: 'var(--c-text)' }}>
      <Background season={season} />
      <Nav dark={dark} toggleDark={toggleDark} season={season} setSeason={setSeason} />
      <main className="relative z-10">
        <Hero />
        <FeaturedWorks />
        <WorksSection />
      </main>
      <footer className="relative z-10 border-t" style={{ backgroundColor: 'var(--c-surface)', borderColor: 'var(--c-border)' }}>
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
      </footer>
    </div>
  )
}
