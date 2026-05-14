import { motion } from 'framer-motion'

const SPRING = { type: 'spring', stiffness: 350, damping: 20 }

export default function JuicyCard({ onClick, className = '', style = {}, children, ...props }) {
  return (
    <motion.article
      className={`rounded-xl overflow-hidden cursor-pointer border ${className}`}
      style={{
        backgroundColor: 'var(--c-surface)',
        borderColor: 'var(--c-border)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)',
        ...style,
      }}
      onClick={onClick}
      whileHover={{
        scale: 1.03,
        y: -4,
        boxShadow: '0 8px 28px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.07)',
      }}
      whileTap={{
        scale: 0.96,
        y: 0,
        boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
      }}
      transition={SPRING}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.() }
      }}
      {...props}
    >
      {children}
    </motion.article>
  )
}
