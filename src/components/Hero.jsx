import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import JuicyButton from './JuicyButton'

const CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}
const ITEM = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
}

const SOCIAL_LINKS = [
  { copy: 'natsunohajimari0621@gmail.com', label: 'Email' },
  { href: 'https://www.youtube.com/@natsuririka', label: 'YouTube',     external: true },
  { href: 'https://twitter.com/Ririka_122422',    label: 'Twitter / X', external: true },
  { copy: 'natsunoririka',                        label: 'Discord' },
]

export default function Hero({ collectible, onAvatarClick }) {
  const [toast, setToast] = useState(null)
  const avatarRef = useRef(null)

  function handleAvatarClick() {
    const rect = avatarRef.current?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width  / 2 : window.innerWidth  / 2
    const y = rect ? rect.top  + rect.height / 2 : window.innerHeight / 2
    onAvatarClick?.({ x, y })
  }

  function handleCopy(text) {
    navigator.clipboard.writeText(text).then(() => {
      setToast(`已複製 ${text}`)
      setTimeout(() => setToast(null), 2200)
    })
  }

  return (
    <section
      id="top"
      className="hero-bg relative overflow-hidden border-b py-20 px-6"
      style={{
        backgroundColor: 'var(--c-bg)',
        borderColor: 'var(--c-border)',
      }}
    >
      {collectible}
      <div className="relative z-[1] max-w-[1160px] mx-auto">
        <div className="flex items-center justify-between gap-12 flex-wrap">

          {/* Text block */}
          <motion.div
            className="flex-1 min-w-[280px]"
            variants={CONTAINER}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={ITEM}
              className="text-[0.75rem] font-semibold tracking-[0.12em] uppercase mb-4"
              style={{ color: 'var(--c-accent)' }}>
              Interactive Designer &amp; Game Developer
            </motion.p>

            <motion.h1 variants={ITEM} className="mb-2 leading-[1.12] m-0">
              <span className="block text-[clamp(2.4rem,5vw,3.8rem)] font-bold tracking-[-0.02em]"
                    style={{ color: 'var(--c-text)' }}>
                Ririka
              </span>
              <span className="block text-[clamp(1.1rem,2vw,1.6rem)] font-normal tracking-[0.08em] mt-1"
                    style={{ color: 'var(--c-text-2)' }}>
                范姜昱任
              </span>
            </motion.h1>

            <motion.p variants={ITEM} className="text-[0.8rem] mt-3 mb-4" style={{ color: 'var(--c-text-3)' }}>
              國立臺北科技大學 互動設計系
            </motion.p>

            <motion.p variants={ITEM}
              className="max-w-[520px] text-[0.95rem] leading-[1.85] mb-7"
              style={{ color: 'var(--c-text-2)' }}>
              ririkaです！歡迎來到我的作品集網站。<br />
              我的專長是寫程式和遊戲設計，擅長引擎是 Unity，主要研究遊戲性設計及 UX 流程。<br />
              興趣是故事創作、唱日K、追 Vt，另外還有日文檢定 N2。
            </motion.p>

            <motion.div variants={ITEM} className="flex flex-wrap gap-2.5 mb-4">
              {SOCIAL_LINKS.map(({ href, label, external, copy }) =>
                copy ? (
                  <JuicyButton
                    key={label}
                    as="button"
                    onClick={() => handleCopy(copy)}
                    className="px-4 py-2 text-[0.85rem] font-medium rounded-lg border transition-opacity hover:opacity-80"
                    style={{
                      color:           'var(--c-text-2)',
                      borderColor:     'var(--c-border-2)',
                      backgroundColor: 'var(--c-surface)',
                    }}
                  >
                    {label}
                  </JuicyButton>
                ) : (
                  <JuicyButton
                    key={label}
                    as="a"
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="px-4 py-2 text-[0.85rem] font-medium rounded-lg border transition-opacity hover:opacity-80"
                    style={{
                      color:           'var(--c-text-2)',
                      borderColor:     'var(--c-border-2)',
                      backgroundColor: 'var(--c-surface)',
                    }}
                  >
                    {label}
                  </JuicyButton>
                )
              )}
            </motion.div>

            <motion.p variants={ITEM} className="text-[0.82rem]" style={{ color: 'var(--c-text-3)' }}>
              對了！這個網站藏有一些小巧思喔！不妨探索看看吧！
            </motion.p>
          </motion.div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.35 }}
            className="flex-shrink-0"
          >
            <motion.div
              ref={avatarRef}
              onClick={handleAvatarClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="cursor-pointer inline-block rounded-full"
            >
              <img
                src="./關於我/avatar.png"
                alt="夏語遙 Ririka"
                className="w-[188px] h-[188px] rounded-full object-cover border-[3px]"
                style={{
                  borderColor: 'var(--c-border-2)',
                  boxShadow: '0 4px 20px rgba(30,70,40,0.12)',
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextElementSibling.style.display = 'flex'
                }}
              />
              <div
                className="hidden w-[188px] h-[188px] rounded-full border-[3px] items-center justify-center text-5xl select-none"
                style={{ borderColor: 'var(--c-border-2)', backgroundColor: 'var(--c-accent-bg)' }}
              >
                🌿
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ type: 'spring', stiffness: 340, damping: 26 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg pointer-events-none"
            style={{ backgroundColor: 'var(--c-text)', color: 'var(--c-bg)', whiteSpace: 'nowrap' }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
