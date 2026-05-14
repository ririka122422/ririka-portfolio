/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grass: {
          50:  '#F3FAF4',
          100: '#EDFAF0',
          200: '#CEE8D1',
          300: '#B8DDB9',
          400: '#4ade80',
          500: '#22c55e',
          600: '#3DAA76',
          700: '#2C8A5D',
          800: '#89A88D',
          900: '#4E6B52',
          950: '#1A2C1C',
        },
      },
      fontFamily: {
        sans: ['Noto Sans TC', 'Noto Sans JP', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'breathe':      'breathe 8s ease-in-out infinite',
        'breathe-slow': 'breathe 12s ease-in-out infinite',
        'leaf-1': 'leafDrift1 18s linear infinite',
        'leaf-2': 'leafDrift2 24s linear infinite',
        'leaf-3': 'leafDrift3 20s linear infinite',
        'leaf-4': 'leafDrift4 28s linear infinite',
        'leaf-5': 'leafDrift5 22s linear infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { opacity: '0.25', transform: 'scale(1)' },
          '50%':      { opacity: '0.45', transform: 'scale(1.06)' },
        },
        leafDrift1: {
          '0%':   { transform: 'translate(0, 0) rotate(0deg)',             opacity: '0' },
          '5%':   { opacity: '0.35' },
          '90%':  { opacity: '0.35' },
          '100%': { transform: 'translate(120px, -110vh) rotate(200deg)',  opacity: '0' },
        },
        leafDrift2: {
          '0%':   { transform: 'translate(0, 0) rotate(45deg)',            opacity: '0' },
          '5%':   { opacity: '0.28' },
          '90%':  { opacity: '0.28' },
          '100%': { transform: 'translate(-80px, -110vh) rotate(260deg)',  opacity: '0' },
        },
        leafDrift3: {
          '0%':   { transform: 'translate(0, 0) rotate(-20deg)',           opacity: '0' },
          '5%':   { opacity: '0.32' },
          '90%':  { opacity: '0.32' },
          '100%': { transform: 'translate(60px, -110vh) rotate(180deg)',   opacity: '0' },
        },
        leafDrift4: {
          '0%':   { transform: 'translate(0, 0) rotate(60deg)',            opacity: '0' },
          '5%':   { opacity: '0.22' },
          '90%':  { opacity: '0.22' },
          '100%': { transform: 'translate(-50px, -110vh) rotate(320deg)',  opacity: '0' },
        },
        leafDrift5: {
          '0%':   { transform: 'translate(0, 0) rotate(10deg)',            opacity: '0' },
          '5%':   { opacity: '0.30' },
          '90%':  { opacity: '0.30' },
          '100%': { transform: 'translate(90px, -110vh) rotate(210deg)',   opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
