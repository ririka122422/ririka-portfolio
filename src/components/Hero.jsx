import { motion } from 'framer-motion'
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
  { href: 'mailto:natsunohajimari0621@gmail.com', label: 'Email' },
  { href: 'https://www.youtube.com/@natsuririka',  label: 'YouTube',    external: true },
  { href: 'https://twitter.com/Ririka_122422',     label: 'Twitter / X', external: true },
]

export default function Hero() {
  return (
    <section
      id="top"
      className="hero-bg relative border-b py-20 px-6"
      style={{
        backgroundColor: 'var(--c-bg)',
        borderColor: 'var(--c-border)',
      }}
    >
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
              專長程式設計與遊戲設計，擅長使用 Unity 引擎開發互動體驗。主要研究遊戲性設計及 UX 流程，
              多次擔任專題組長，善於團隊溝通協作。日文檢定 N2，
              興趣為故事創作、唱歌及參與日本 ACG 文化活動。
            </motion.p>

            <motion.div variants={ITEM} className="flex flex-wrap gap-2.5">
              {SOCIAL_LINKS.map(({ href, label, external }) => (
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
              ))}
            </motion.div>
          </motion.div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.35 }}
            className="flex-shrink-0"
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

        </div>
      </div>
    </section>
  )
}
