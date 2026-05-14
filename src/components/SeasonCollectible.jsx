import { useState, useRef } from 'react'
import { SpringIcon, AutumnIcon, WinterIcon } from './SeasonIcons'

const CONFIGS = {
  spring: { label: '春日', color: '#D15878', Icon: SpringIcon },
  autumn: { label: '秋日', color: '#C96418', Icon: AutumnIcon },
  winter: { label: '冬日', color: '#2E7CB8', Icon: WinterIcon },
}

const PARTICLE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315]
const DIST = 48

export default function SeasonCollectible({ season, onCollect, className = '' }) {
  const [bursting, setBursting] = useState(false)
  const [done, setDone]         = useState(false)
  const [hovered, setHovered]   = useState(false)
  const btnRef = useRef(null)
  const { color, Icon } = CONFIGS[season]

  const handleClick = () => {
    if (bursting || done) return
    setBursting(true)
    const rect = btnRef.current?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width  / 2 : window.innerWidth  / 2
    const y = rect ? rect.top  + rect.height / 2 : window.innerHeight / 2
    onCollect({ x, y })
    setTimeout(() => setDone(true), 680)
  }

  if (done) return null

  return (
    <div className={`absolute ${className}`} style={{ zIndex: 20 }}>
      <div
        className="relative inline-block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Hover ripple rings (outline only, semi-transparent, two layers) */}
        {hovered && [0, 1].map(i => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 48, height: 48,
              top: 0, left: 0,
              border: `2px solid ${color}99`,
              animation: `hover-ripple 1.2s ease-out ${i * 0.45}s infinite`,
            }}
          />
        ))}

        {/* Click particles */}
        {bursting && PARTICLE_ANGLES.map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full pointer-events-none"
              style={{
                backgroundColor: color,
                '--tx': `${Math.cos(rad) * DIST}px`,
                '--ty': `${Math.sin(rad) * DIST}px`,
                animation: 'particle-fly 0.68s ease-out forwards',
              }}
            />
          )
        })}

        {/* Icon button */}
        <button
          ref={btnRef}
          onClick={handleClick}
          className="relative flex items-center justify-center w-12 h-12 rounded-full"
          style={{
            backgroundColor: `${color}22`,
            border: `2px solid ${color}`,
            color,
            cursor: 'pointer',
            opacity: hovered || bursting ? 1 : 0.35,
            transition: 'opacity 0.25s ease',
            '--pulse-color': `${color}44`,
            animation: bursting
              ? 'collectible-fade-out 0.65s ease-out forwards'
              : hovered
                ? 'collectible-pulse-intense 0.85s ease-in-out infinite'
                : 'collectible-pulse 2.4s ease-in-out infinite',
          }}
          aria-label={`點擊解鎖${CONFIGS[season].label}主題`}
        >
          <Icon />
        </button>
      </div>
    </div>
  )
}
