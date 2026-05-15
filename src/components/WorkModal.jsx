import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORY_LABEL, embedUrl, encodePath } from '../data/works'

const BADGE_STYLE = {
  game:       { bg: 'var(--c-badge-game-bg)', color: 'var(--c-badge-game-text)', border: 'var(--c-badge-game-border)' },
  exhibition: { bg: 'var(--c-badge-ex-bg)',   color: 'var(--c-badge-ex-text)',   border: 'var(--c-badge-ex-border)'   },
  music:      { bg: 'var(--c-badge-mu-bg)',    color: 'var(--c-badge-mu-text)',   border: 'var(--c-badge-mu-border)'   },
}

/* ── Lightbox ──────────────────────────────── */
function Lightbox({ src, onClose }) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center cursor-zoom-out p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.88)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          aria-label="關閉圖片預覽"
        >
          <motion.img
            src={src}
            alt=""
            className="max-w-[90vw] max-h-[90vh] rounded-xl object-contain shadow-2xl"
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1,    opacity: 1 }}
            exit={{    scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            onClick={onClose}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Video Player ──────────────────────────── */
function thumbSrc(v) {
  if (v.type === 'yt') return `https://img.youtube.com/vi/${v.id}/mqdefault.jpg`
  return null
}

function VideoPlayer({ videos }) {
  const [idx, setIdx] = useState(0)
  const v = videos[idx]

  return (
    <div className="mb-6">
      {/* Main video */}
      <div className="relative w-full rounded-xl overflow-hidden bg-black"
           style={{ paddingBottom: '56.25%' }}>
        <iframe
          key={v.id}
          src={embedUrl(v)}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={v.label}
        />
      </div>

      {/* Label row */}
      <div className="flex items-center gap-2 mt-2 mb-2.5">
        <span className="text-[0.8rem] font-medium flex-1" style={{ color: 'var(--c-text-2)' }}>{v.label}</span>
        {v.type === 'yt' && (
          <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer"
             className="text-[0.75rem] hover:opacity-70 transition-opacity"
             style={{ color: 'var(--c-accent)' }}>
            ↗ YouTube
          </a>
        )}
      </div>

      {/* Thumbnail strip */}
      {videos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'thin' }}>
          {videos.map((vi, i) => {
            const thumb = thumbSrc(vi)
            const active = i === idx
            return (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className="shrink-0 relative rounded-lg overflow-hidden border-2 transition-all"
                style={{
                  width: '116px',
                  aspectRatio: '16/9',
                  borderColor: active ? 'var(--c-accent)' : 'var(--c-border)',
                  backgroundColor: '#111',
                  opacity: active ? 1 : 0.65,
                }}
                aria-label={vi.label}
              >
                {thumb
                  ? <img src={thumb} alt={vi.label} className="w-full h-full object-cover" />
                  : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M10 9l5 3-5 3V9z" fill="rgba(255,255,255,0.5)" stroke="none"/></svg>
                    </div>
                  )
                }
                <div className="absolute bottom-0 left-0 right-0 px-1.5 py-0.5 text-[0.58rem] text-white truncate"
                     style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.75))' }}>
                  {vi.label}
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ── PeoPo Player ──────────────────────────── */
function PeopoPlayer({ videos }) {
  return (
    <div className="mt-2 pt-5 border-t" style={{ borderColor: 'var(--c-border)' }}>
      {videos.map(v => (
        <div key={v.id} className="mb-4 last:mb-0">
          <h3 className="text-[0.95rem] font-semibold mb-2 mt-0" style={{ color: 'var(--c-accent-dark)' }}>
            {v.label}
          </h3>
          <div className="relative w-full rounded-xl overflow-hidden bg-black"
               style={{ paddingBottom: '67.74%' }}>
            <iframe
              src={`https://www.peopo.org/video/${v.id}/embed`}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              title={v.label}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Section ───────────────────────────────── */
function Section({ section, onImageClick }) {
  return (
    <div id={section.anchor || undefined} className="mb-6 last:mb-0">
      {section.heading && (
        <h3 className="text-[0.95rem] font-semibold mb-2 mt-0" style={{ color: 'var(--c-accent-dark)' }}>
          {section.heading}
        </h3>
      )}
      {section.text && (
        <p className="text-[0.9rem] leading-[1.85] mb-3 m-0" style={{ color: 'var(--c-text-2)' }}>
          {section.text}
        </p>
      )}
      {section.html && (
        <div className="modal-html-content mb-3 text-[0.88rem]"
             dangerouslySetInnerHTML={{ __html: section.html }} />
      )}
      {section.images && section.images.length > 0 && (() => {
        const hasLabels = section.images.some(img => typeof img === 'object')
        const single = section.images.length === 1
        const cols = single ? '1fr' : hasLabels ? 'repeat(auto-fill, minmax(260px, 1fr))' : 'repeat(auto-fill, minmax(180px, 1fr))'
        const maxH = single ? '420px' : hasLabels ? '320px' : '200px'
        return (
          <div className="grid" style={{ gridTemplateColumns: cols, gap: hasLabels ? '1rem' : '0.5rem' }}>
            {section.images.map((img, i) => {
              const src = typeof img === 'object' ? img.src : img
              const label = typeof img === 'object' ? img.label : null
              const encoded = encodePath(src)
              return (
                <figure key={i} className="m-0">
                  <motion.img
                    src={encoded}
                    alt={label || ''}
                    loading="lazy"
                    className="w-full rounded-lg object-cover border cursor-zoom-in"
                    style={{ maxHeight: maxH, objectFit: 'cover', borderColor: 'var(--c-border)' }}
                    whileHover={{ scale: 1.02, boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                    onClick={() => onImageClick(encoded)}
                  />
                  {label && (
                    <figcaption className="text-center text-[0.72rem] mt-1.5" style={{ color: 'var(--c-text-3)' }}>
                      {label}
                    </figcaption>
                  )}
                </figure>
              )
            })}
          </div>
        )
      })()}
    </div>
  )
}

/* ── Modal ─────────────────────────────────── */
export default function WorkModal({ work, onClose }) {
  const [lightboxSrc, setLightboxSrc] = useState(null)

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      if (lightboxSrc) setLightboxSrc(null)
      else onClose()
    }
  }, [onClose, lightboxSrc])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (!work) return
    document.body.style.overflow = 'hidden'
    window.gtag?.('event', 'view_work', { work_id: work.id, work_title: work.title, category: work.category })
    return () => { document.body.style.overflow = '' }
  }, [work])

  useEffect(() => { setLightboxSrc(null) }, [work])

  const allVideos   = work ? [work.primaryVideo, ...work.extraVideos].filter(Boolean) : []
  const mainVideos  = allVideos.filter(v => v.type !== 'peopo')
  const peopoVideos = allVideos.filter(v => v.type === 'peopo')

  return (
    <>
      <AnimatePresence>
        {work && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[100] backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={work.title}
              className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center p-0 sm:p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <motion.div
                className="relative w-full sm:max-w-[680px] max-h-[92dvh] sm:max-h-[88vh]
                  rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col"
                style={{
                  backgroundColor: 'var(--c-surface)',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.28)',
                }}
                initial={{ y: 48, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 24, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                onClick={e => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 px-6 pt-6 pb-4 border-b shrink-0"
                     style={{ borderColor: 'var(--c-border)' }}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      {(() => {
                        const s = BADGE_STYLE[work.category] ?? BADGE_STYLE.game
                        return (
                          <span className="text-[0.7rem] font-semibold px-2 py-0.5 rounded-full border"
                                style={{ backgroundColor: s.bg, color: s.color, borderColor: s.border }}>
                            {CATEGORY_LABEL[work.category]}
                          </span>
                        )
                      })()}
                      {work.award && (
                        <span className="text-[0.7rem] font-semibold px-2 py-0.5 rounded-full border"
                              style={{ backgroundColor: 'var(--c-award-bg)', color: 'var(--c-award-text)', borderColor: 'var(--c-award-border)' }}>
                          ★ {work.award}
                        </span>
                      )}
                      <span className="text-[0.72rem]" style={{ color: 'var(--c-text-3)' }}>{work.date}</span>
                    </div>
                    <h2 className="text-[1.2rem] font-bold leading-tight m-0" style={{ color: 'var(--c-text)' }}>
                      {work.title}
                    </h2>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {work.tags.map(tag => (
                        <span key={tag} className="text-[0.68rem] px-2 py-0.5 rounded-full border"
                              style={{ backgroundColor: 'var(--c-tag-bg)', color: 'var(--c-tag-text)', borderColor: 'var(--c-tag-border)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-colors hover:opacity-70 mt-0.5"
                    style={{ color: 'var(--c-text-3)', borderColor: 'var(--c-border)' }}
                    aria-label="關閉"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto px-6 pt-5 pb-10">
                  {mainVideos.length > 0 && <VideoPlayer videos={mainVideos} />}
                  {(() => {
                    const hasPdf = work.sections?.some(s => s.anchor === 'pdf')
                    const links = work.links ?? []
                    if (!hasPdf && links.length === 0) return null
                    const btnCls = 'text-[0.78rem] font-medium px-3.5 py-1.5 rounded-full border transition-opacity hover:opacity-70'
                    const scrollStyle = { backgroundColor: 'var(--c-accent-bg)', color: 'var(--c-accent-dark)', borderColor: 'var(--c-border-2)' }
                    const linkStyle  = { backgroundColor: 'var(--c-award-bg)',  color: 'var(--c-award-text)',  borderColor: 'var(--c-award-border)' }
                    return (
                      <div className="flex gap-2 mb-5 flex-wrap">
                        {hasPdf && (
                          <button className={btnCls} style={scrollStyle}
                            onClick={() => document.getElementById('pdf')?.scrollIntoView({ behavior: 'smooth' })}>
                            ↓ 查看企劃書
                          </button>
                        )}
                        {links.map(link => (
                          <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                             className={btnCls} style={linkStyle} onClick={e => e.stopPropagation()}>
                            ↓ {link.label}
                          </a>
                        ))}
                      </div>
                    )
                  })()}
                  {work.sections.map((section, i) => (
                    <Section key={i} section={section} onImageClick={setLightboxSrc} />
                  ))}
                  {peopoVideos.length > 0 && <PeopoPlayer videos={peopoVideos} />}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </>
  )
}
