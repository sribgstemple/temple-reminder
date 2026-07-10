import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import { useEffect, useState } from 'react'

export default function Layout() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return (
    <div className="min-h-screen flex flex-col dark:bg-stone-950">
      <Navigation dark={dark} onToggleDark={() => setDark(d => !d)} />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 animate-fade-in">
        <Outlet />
      </main>
      <footer className="text-center text-xs py-4 opacity-50" style={{ color: '#7A5C3A' }}>
        Temple Reminder Studio · Local data only · Clearing browser data removes history
      </footer>
    </div>
  )
}
