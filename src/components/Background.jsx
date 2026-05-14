import { AnimatePresence, motion } from 'framer-motion'

/* ── Snowflake path generator (stroke-based, 24×24 viewBox) ── */
function f(n) { return parseFloat(n.toFixed(1)) }

function snowflakePath(R, brR, brLen, cx = 12, cy = 12) {
  const seg = []
  for (let i = 0; i < 6; i++) {
    const a = ((i * 60) - 90) * Math.PI / 180
    const tx = cx + Math.cos(a) * R
    const ty = cy + Math.sin(a) * R
    seg.push(`M${cx} ${cy}L${f(tx)} ${f(ty)}`)
    const bx = cx + Math.cos(a) * brR
    const by = cy + Math.sin(a) * brR
    for (const s of [1, -1]) {
      const pa = a + s * (Math.PI / 3)
      seg.push(`M${f(bx)} ${f(by)}L${f(bx + Math.cos(pa) * brLen)} ${f(by + Math.sin(pa) * brLen)}`)
    }
  }
  return seg.join('')
}

/* ── Season shape definitions ── */

// Spring: sakura petals — rounded with V-notch at the wide end
const SPRING_PATHS = [
  // Standard petal: wide (notched) at top, tapers to tip at bottom
  'M12 22C8 20 4 16 4 11C4 6 8 2 11 2C11.5 2 12 5 12 5C12 5 12.5 2 13 2C16 2 20 6 20 11C20 16 16 20 12 22Z',
  // Slightly rounder petal
  'M12 21C8 19 4 15 4 10C4 6 8 3 11 3C11.5 3 12 6 12 6C12 6 12.5 3 13 3C16 3 20 6 20 10C20 15 16 19 12 21Z',
  // Wider petal with deeper notch
  'M12 22C7 20 3 16 3 10C3 5 7 2 10.5 2C11 2 11.5 5 12 5C12.5 5 13 2 13.5 2C17 2 21 5 21 10C21 16 17 20 12 22Z',
]

// Summer: organic leaf shapes (unchanged)
const SUMMER_PATHS = [
  'M12 2C16 2 22 8 22 14C22 20 17 24 12 24C7 24 2 20 2 14C2 8 8 2 12 2Z',
  'M12 1C18 6 20 12 12 23C4 12 6 6 12 1Z',
  'M12 2C15 2 21 6 20 13C19 19 15 22 12 22C9 22 5 18 4 13C3 7 8 2 12 2Z',
]

// Autumn: 5-lobe maple leaves with deep sinuses between lobes
const AUTUMN_PATHS = [
  'M12 2C12.5 4 14.5 6 15 8C15.5 9 17.5 7.5 19 6C19.5 8 18.5 10.5 17 12C18 12.5 20.5 13.5 20 14C19 15.5 15.5 16 14 17C13.5 18 13 19.5 12 21C11 19.5 10.5 18 10 17C8.5 16 5 15.5 4 14C3.5 12.5 5.5 12 7 12C5.5 10.5 4.5 8 5 6C6.5 7.5 8.5 9 9 8C9.5 6 11.5 4 12 2Z',
  'M12 2C12.5 4 14 6.5 14.5 8C15 9 17 8 18.5 7C19 8.5 18 11 16.5 12C17.5 13 20 13.5 19.5 15C18.5 16 15 16.5 13.5 17.5C13 18.5 12.5 20 12 21C11.5 20 11 18.5 10.5 17.5C9 16.5 5.5 16 4.5 15C4 13.5 6.5 13 7.5 12C6 11 5 8.5 5.5 7C7 8 9 9 9.5 8C10 6.5 11.5 4 12 2Z',
  'M12 2C13 4 15 7 15.5 8.5C16 9.5 18.5 8 20 7C20.5 9 19 11.5 17.5 12.5C18.5 13 21 14 20.5 15C19 16.5 15 17 14 18C13.5 18.5 13 20 12 21.5C11 20 10.5 18.5 10 18C9 17 5 16.5 3.5 15C3 14 5.5 13 6.5 12.5C5 11.5 3.5 9 4 7C5.5 8 8 9.5 8.5 8.5C9 7 11 4 12 2Z',
]

// Winter: stroke snowflakes (computed) + null = filled circle snow dot
const WINTER_PATHS = [
  snowflakePath(8.5, 5.5, 3.5),  // large snowflake
  snowflakePath(7.5, 4, 3),       // smaller snowflake
  null,                            // snow dot (rendered as <circle>)
]

const SEASON_CONFIG = {
  spring: { fill: true,  paths: SPRING_PATHS },
  summer: { fill: true,  paths: SUMMER_PATHS },
  autumn: { fill: true,  paths: AUTUMN_PATHS },
  winter: { fill: false, paths: WINTER_PATHS, snowR: 4 },
}

const ELEMENTS = [
  { path: 0, anim: 'animate-leaf-1', left: '8%',  size: 28, delay: '0s',  color: 'var(--c-accent)'      },
  { path: 1, anim: 'animate-leaf-2', left: '78%', size: 22, delay: '6s',  color: 'var(--c-accent-dark)' },
  { path: 2, anim: 'animate-leaf-3', left: '42%', size: 32, delay: '11s', color: 'var(--c-accent)'      },
  { path: 0, anim: 'animate-leaf-4', left: '62%', size: 20, delay: '2s',  color: 'var(--c-accent-dark)' },
  { path: 1, anim: 'animate-leaf-5', left: '25%', size: 26, delay: '16s', color: 'var(--c-accent)'      },
]

export default function Background({ season = 'summer' }) {
  const cfg = SEASON_CONFIG[season] ?? SEASON_CONFIG.summer

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none overflow-hidden">

      {/* Breathing blobs — colors follow CSS vars automatically */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full animate-breathe"
        style={{ background: 'radial-gradient(circle, var(--c-blob-a) 0%, var(--c-bg) 55%, transparent 75%)' }}
      />
      <div
        className="absolute top-[10%] right-[5%] w-[450px] h-[450px] rounded-full animate-breathe-slow"
        style={{ background: 'radial-gradient(circle, var(--c-blob-b) 0%, transparent 70%)', animationDelay: '4s' }}
      />
      <div
        className="absolute bottom-[5%] left-[0%] w-[360px] h-[360px] rounded-full animate-breathe-slow"
        style={{ background: 'radial-gradient(circle, var(--c-blob-c) 0%, transparent 70%)', animationDelay: '9s' }}
      />

      {/* Floating season shapes — cross-fade when season changes */}
      <AnimatePresence mode="wait">
        <motion.div
          key={season}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          {ELEMENTS.map((el, i) => {
            const d = cfg.paths[el.path]
            const isSnowDot = !cfg.fill && d === null
            return (
              <svg
                key={i}
                className={`absolute bottom-[-40px] ${el.anim}`}
                style={{ left: el.left, width: el.size, height: el.size, animationDelay: el.delay, color: el.color }}
                viewBox="0 0 24 24"
                fill={cfg.fill ? 'currentColor' : 'none'}
                stroke={!cfg.fill ? 'currentColor' : undefined}
                strokeWidth={!cfg.fill ? '2' : undefined}
                strokeLinecap={!cfg.fill ? 'round' : undefined}
                xmlns="http://www.w3.org/2000/svg"
              >
                {isSnowDot
                  ? <circle cx="12" cy="12" r={cfg.snowR} fill="currentColor" />
                  : <path d={d} />
                }
              </svg>
            )
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
