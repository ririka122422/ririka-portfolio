import { useState, useEffect } from 'react'

const SEASONS = ['spring', 'summer', 'autumn', 'winter']

function readUnlocked() {
  try {
    const s = localStorage.getItem('theme-unlocked-seasons')
    const parsed = s ? JSON.parse(s) : ['summer']
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : ['summer']
  } catch {
    return ['summer']
  }
}

export function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const v = localStorage.getItem('theme-dark')
    if (v !== null) return v === 'true'
    return localStorage.getItem('theme') === 'dark'
  })

  const [unlockedSeasons, setUnlockedSeasons] = useState(() => {
    if (typeof window === 'undefined') return ['summer']
    return readUnlocked()
  })

  const [season, setSeason] = useState(() => {
    if (typeof window === 'undefined') return 'summer'
    const unlocked = readUnlocked()
    const saved = localStorage.getItem('theme-season')
    return SEASONS.includes(saved) && unlocked.includes(saved) ? saved : 'summer'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme-dark', String(dark))
  }, [dark])

  useEffect(() => {
    const html = document.documentElement
    SEASONS.forEach(s => html.classList.remove(`season-${s}`))
    if (season !== 'summer') html.classList.add(`season-${season}`)
    localStorage.setItem('theme-season', season)
  }, [season])

  const unlockSeason = (id, andSwitch = false) => {
    if (!SEASONS.includes(id)) return
    setUnlockedSeasons(prev => {
      if (prev.includes(id)) return prev
      const next = [...prev, id]
      localStorage.setItem('theme-unlocked-seasons', JSON.stringify(next))
      return next
    })
    if (andSwitch) setSeason(id)
  }

  const setSeasonSafe = (id) => {
    if (unlockedSeasons.includes(id)) setSeason(id)
  }

  return {
    dark,
    toggleDark: () => setDark(d => !d),
    season,
    setSeason: setSeasonSafe,
    unlockedSeasons,
    unlockSeason,
  }
}
