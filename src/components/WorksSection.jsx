import { useState } from 'react'
import { motion } from 'framer-motion'
import { WORKS } from '../data/works'
import WorkCard from './WorkCard'
import WorkModal from './WorkModal'

const TABS = [
  { key: 'all',        label: '全部' },
  { key: 'game',       label: '遊戲製作' },
  { key: 'exhibition', label: '互動展覽' },
  { key: 'music',      label: '音樂媒體' },
]

const SORT_OPTS = [
  { key: 'default', label: '預設' },
  { key: 'newest',  label: '最新' },
  { key: 'oldest',  label: '最舊' },
]

const GRID_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}
const CARD_VARIANTS = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 24 } },
}

function parseDate(dateStr) {
  return parseInt(dateStr.replace('.', ''), 10)
}

export default function WorksSection() {
  const [filter, setFilter]         = useState('all')
  const [sortOrder, setSortOrder]   = useState('newest')
  const [selectedWork, setSelectedWork] = useState(null)

  const base = filter === 'all' ? WORKS : WORKS.filter(w => w.category === filter)
  const displayed = sortOrder === 'default' ? base : [...base].sort((a, b) => {
    const diff = parseDate(a.date) - parseDate(b.date)
    return sortOrder === 'newest' ? -diff : diff
  })

  return (
    <section id="works" className="py-20 px-6">
      <div className="max-w-[1160px] mx-auto">

        <div className="mb-8">
          <h2 className="text-[1.7rem] font-bold tracking-tight mb-1 m-0" style={{ color: 'var(--c-text)' }}>Works</h2>
          <p className="text-sm" style={{ color: 'var(--c-text-3)' }}>遊戲製作・互動展覽・音樂媒體</p>
        </div>

        {/* Filter tabs + sort controls */}
        <div className="flex items-end justify-between gap-4 mb-8 border-b" style={{ borderColor: 'var(--c-border)' }}>
          <div className="flex gap-1">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className="relative px-4 py-2 text-sm font-medium transition-opacity rounded-t-lg"
                style={{ color: filter === tab.key ? 'var(--c-accent-dark)' : 'var(--c-text-3)' }}
              >
                {tab.label}
                {filter === tab.key && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                    style={{ backgroundColor: 'var(--c-accent)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Sort pills */}
          <div className="flex items-center gap-1.5 pb-2">
            <span className="text-xs mr-0.5" style={{ color: 'var(--c-text-3)' }}>時間：</span>
            {SORT_OPTS.map(opt => (
              <button
                key={opt.key}
                onClick={() => setSortOrder(opt.key)}
                className="text-xs px-2.5 py-1 rounded-full border transition-colors"
                style={{
                  backgroundColor: sortOrder === opt.key ? 'var(--c-accent)' : 'transparent',
                  color:           sortOrder === opt.key ? '#fff' : 'var(--c-text-3)',
                  borderColor:     sortOrder === opt.key ? 'var(--c-accent)' : 'var(--c-border)',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Card grid */}
        <motion.div
          key={filter + sortOrder}
          variants={GRID_VARIANTS}
          initial="hidden"
          animate="visible"
          className="grid gap-5"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}
        >
          {displayed.map(work => (
            <motion.div key={work.id} variants={CARD_VARIANTS}>
              <WorkCard work={work} onClick={() => setSelectedWork(work)} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
    </section>
  )
}
