import JuicyCard from './JuicyCard'
import { CATEGORY_LABEL, encodePath } from '../data/works'

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

function Badge({ category }) {
  const s = BADGE_STYLE[category] ?? BADGE_STYLE.game
  return (
    <span className="text-[0.7rem] font-semibold px-2 py-0.5 rounded-full border"
          style={{ backgroundColor: s.bg, color: s.color, borderColor: s.border }}>
      {CATEGORY_LABEL[category]}
    </span>
  )
}

function Thumbnail({ work }) {
  const [from, to] = THUMB_GRAD[work.category] ?? THUMB_GRAD.game

  if (work.thumbnail) {
    return (
      <img
        src={encodePath(work.thumbnail)}
        alt={work.title}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    )
  }
  if (work.thumbnailOverlay) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4"
           style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
        <img
          src={encodePath(work.thumbnailOverlay)}
          alt={work.title}
          loading="lazy"
          className="max-h-full max-w-full object-contain drop-shadow-sm"
        />
      </div>
    )
  }
  return (
    <div className="w-full h-full flex items-center justify-center"
         style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
      <span className="text-sm font-medium text-center px-3 leading-snug"
            style={{ color: 'var(--c-text-2)' }}>
        {work.title}
      </span>
    </div>
  )
}

export default function WorkCard({ work, onClick }) {
  return (
    <JuicyCard onClick={onClick} className="flex flex-col h-full"
               style={{ backgroundColor: 'var(--c-surface)', borderColor: 'var(--c-border)' }}>
      <div className="aspect-[16/9] overflow-hidden" style={{ backgroundColor: 'var(--c-surface-2)' }}>
        <Thumbnail work={work} />
      </div>

      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge category={work.category} />
          {work.award && (
            <span className="text-[0.7rem] font-semibold px-2 py-0.5 rounded-full border"
                  style={{ backgroundColor: 'var(--c-award-bg)', color: 'var(--c-award-text)', borderColor: 'var(--c-award-border)' }}>
              ★ {work.award}
            </span>
          )}
          <span className="text-[0.72rem]" style={{ color: 'var(--c-text-3)' }}>{work.date}</span>
        </div>

        <h3 className="text-[0.95rem] font-semibold leading-snug m-0" style={{ color: 'var(--c-text)' }}>
          {work.title}
        </h3>

        <div className="flex flex-wrap gap-1 mt-auto pt-1">
          {work.tags.slice(0, 4).map(tag => (
            <span key={tag}
              className="text-[0.68rem] px-2 py-0.5 rounded-full border"
              style={{ backgroundColor: 'var(--c-tag-bg)', color: 'var(--c-tag-text)', borderColor: 'var(--c-tag-border)' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </JuicyCard>
  )
}
