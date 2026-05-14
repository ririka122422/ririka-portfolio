import { useState } from 'react'
import { motion } from 'framer-motion'
import { WORKS, CATEGORY_LABEL, encodePath } from '../data/works'
import WorkModal from './WorkModal'

const FEATURED_IDS = ['moody-girl', 'hakukana', 'meridian', 'paradise', 'matsu']

const BADGE_STYLE = {
  game:       { bg: 'var(--c-badge-game-bg)', color: 'var(--c-badge-game-text)', border: 'var(--c-badge-game-border)' },
  exhibition: { bg: 'var(--c-badge-ex-bg)',   color: 'var(--c-badge-ex-text)',   border: 'var(--c-badge-ex-border)'   },
  music:      { bg: 'var(--c-badge-mu-bg)',    color: 'var(--c-badge-mu-text)',   border: 'var(--c-badge-mu-border)'   },
}

const THUMB_GRAD = {
  game:       ['var(--c-thumb-game-from)', 'var(--c-thumb-game-to)'],
  exhibition: ['var(--c-thumb-ex-from)',   'var(--c-thumb-ex-to)'  ],
  music:      ['var(--c-thumb-mu-from)',   'var(--c-thumb-mu-to)'  ],
}

function FeaturedThumb({ work }) {
  const [from, to] = THUMB_GRAD[work.category] ?? THUMB_GRAD.game
  if (work.thumbnail) {
    return <img src={encodePath(work.thumbnail)} alt={work.title} className="w-full h-full object-cover" />
  }
  if (work.thumbnailOverlay) {
    return (
      <div className="w-full h-full flex items-center justify-center p-6"
           style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
        <img src={encodePath(work.thumbnailOverlay)} alt={work.title} className="max-h-full max-w-full object-contain" />
      </div>
    )
  }
  return <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${from}, ${to})` }} />
}

const SPRING = { type: 'spring', stiffness: 320, damping: 24 }

function FeaturedCard({ work, onClick }) {
  const s = BADGE_STYLE[work.category] ?? BADGE_STYLE.game
  const summary = work.sections[0]?.text ?? ''

  return (
    <motion.article
      className="flex flex-col sm:flex-row rounded-2xl overflow-hidden border cursor-pointer"
      style={{
        backgroundColor: 'var(--c-surface)',
        borderColor: 'var(--c-border)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
      onClick={onClick}
      whileHover={{ y: -4, boxShadow: '0 10px 36px rgba(0,0,0,0.13)' }}
      whileTap={{ scale: 0.99, y: 0 }}
      transition={SPRING}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } }}
    >
      {/* Thumbnail */}
      <div className="shrink-0 w-full aspect-[16/9] sm:w-[280px] sm:aspect-auto overflow-hidden"
           style={{ backgroundColor: 'var(--c-surface-2)' }}>
        <FeaturedThumb work={work} />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center gap-2.5 px-6 py-5 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[0.7rem] font-semibold px-2 py-0.5 rounded-full border"
                style={{ backgroundColor: s.bg, color: s.color, borderColor: s.border }}>
            {CATEGORY_LABEL[work.category]}
          </span>
          {work.award && (
            <span className="text-[0.7rem] font-semibold px-2 py-0.5 rounded-full border"
                  style={{ backgroundColor: 'var(--c-award-bg)', color: 'var(--c-award-text)', borderColor: 'var(--c-award-border)' }}>
              ★ {work.award}
            </span>
          )}
          <span className="text-[0.72rem]" style={{ color: 'var(--c-text-3)' }}>{work.date}</span>
        </div>

        <h3 className="text-[1.1rem] font-bold leading-snug m-0" style={{ color: 'var(--c-text)' }}>
          {work.title}
        </h3>

        <p className="text-[0.87rem] leading-relaxed m-0 line-clamp-3" style={{ color: 'var(--c-text-2)' }}>
          {summary}
        </p>

        <div className="flex flex-wrap gap-1">
          {work.tags.slice(0, 5).map(tag => (
            <span key={tag} className="text-[0.68rem] px-2 py-0.5 rounded-full border"
                  style={{ backgroundColor: 'var(--c-tag-bg)', color: 'var(--c-tag-text)', borderColor: 'var(--c-tag-border)' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export default function FeaturedWorks() {
  const [selectedWork, setSelectedWork] = useState(null)
  const featured = FEATURED_IDS.map(id => WORKS.find(w => w.id === id)).filter(Boolean)

  return (
    <>
      <section className="px-6 pt-12 pb-16">
        <div className="max-w-[1160px] mx-auto">
          <div className="mb-6">
            <h2 className="text-[1.7rem] font-bold tracking-tight mb-1 m-0" style={{ color: 'var(--c-text)' }}>Featured</h2>
            <p className="text-sm m-0" style={{ color: 'var(--c-text-3)' }}>精選代表作品</p>
          </div>

          <div className="flex flex-col gap-4">
            {featured.map(work => (
              <FeaturedCard key={work.id} work={work} onClick={() => setSelectedWork(work)} />
            ))}
          </div>
        </div>
      </section>

      <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
    </>
  )
}
