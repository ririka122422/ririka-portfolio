import { motion } from 'framer-motion'

const SPRING = { type: 'spring', stiffness: 400, damping: 17 }

/**
 * Wraps any interactive element with spring-based hover/tap feedback.
 * Props:
 *   as         — element to render ('button' | 'a' | 'div', default: 'button')
 *   scaleHover — scale on hover (default: 1.04)
 *   scaleTap   — scale on active/tap (default: 0.95)
 *   className  — extra classes on the wrapper
 *   All other props forwarded to the element (href, onClick, etc.)
 */
export default function JuicyButton({
  as: Tag = 'button',
  scaleHover = 1.04,
  scaleTap = 0.95,
  className = '',
  children,
  ...props
}) {
  const MotionTag = motion[Tag] ?? motion.div

  return (
    <MotionTag
      className={`cursor-pointer inline-flex items-center ${className}`}
      whileHover={{ scale: scaleHover }}
      whileTap={{ scale: scaleTap }}
      transition={SPRING}
      {...props}
    >
      {children}
    </MotionTag>
  )
}
