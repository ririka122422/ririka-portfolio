import { useState, useEffect } from 'react'

const SEASONS = ['spring', 'summer', 'autumn', 'winter']

export function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const v = localStorage.getItem('theme-dark')
    if (v !== null) return v === 'true'
    return localStorage.getItem('theme') === 'dark'
  })

  const [season, setSeason] = useState(() => {
    if (typeof window === 'undefined') return 'summer'
    const saved = localStorage.getItem('theme-season')
    return SEASONS.includes(saved) ? saved : 'summer'
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

  return {
    dark,
    toggleDark: () => setDark(d => !d),
    season,
    setSeason,
  }
}
