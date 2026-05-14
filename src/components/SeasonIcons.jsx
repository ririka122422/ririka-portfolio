export function SpringIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      {[0, 72, 144, 216, 288].map(a => (
        <ellipse key={a} cx="11" cy="6.4" rx="1.8" ry="2.8" transform={`rotate(${a} 11 11)`} />
      ))}
      <circle cx="11" cy="11" r="1.5" />
    </svg>
  )
}

export function SummerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 19.5 C7.5 17.5 4 14.5 4 9.5 C4 5.9 7.1 3 11 3 C14.9 3 18 5.9 18 9.5 C18 14.5 14.5 17.5 11 19.5Z" />
      <line x1="11" y1="3.5" x2="11" y2="19.5" />
    </svg>
  )
}

export function AutumnIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 2 L12.5 5.5 L16.5 4 L14.5 8 L18.5 9 L15 11.5 L17 15 L13 13.5 L11 17.5 L9 13.5 L5 15 L7 11.5 L3.5 9 L7.5 8 L5.5 4 L9.5 5.5 Z" />
      <line x1="11" y1="17.5" x2="11" y2="21" />
    </svg>
  )
}

export function WinterIcon() {
  const cx = 11, cy = 11, R = 8, brR = 4.2, brLen = 2.6
  const spokes = Array.from({ length: 6 }, (_, i) => {
    const a = (i * 60 * Math.PI) / 180
    const tx = cx + Math.cos(a) * R
    const ty = cy + Math.sin(a) * R
    const bx = cx + Math.cos(a) * brR
    const by = cy + Math.sin(a) * brR
    const pa = a + Math.PI / 2
    return {
      arm: [cx, cy, tx, ty],
      b1:  [bx, by, bx + Math.cos(pa) * brLen, by + Math.sin(pa) * brLen],
      b2:  [bx, by, bx - Math.cos(pa) * brLen, by - Math.sin(pa) * brLen],
    }
  })
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      {spokes.map(({ arm, b1, b2 }, i) => (
        <g key={i}>
          <line x1={arm[0].toFixed(1)} y1={arm[1].toFixed(1)} x2={arm[2].toFixed(1)} y2={arm[3].toFixed(1)} />
          <line x1={b1[0].toFixed(1)} y1={b1[1].toFixed(1)} x2={b1[2].toFixed(1)} y2={b1[3].toFixed(1)} />
          <line x1={b2[0].toFixed(1)} y1={b2[1].toFixed(1)} x2={b2[2].toFixed(1)} y2={b2[3].toFixed(1)} />
        </g>
      ))}
    </svg>
  )
}
