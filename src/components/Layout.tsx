import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 animate-fade-in">
        <Outlet />
      </main>
      <footer className="text-center text-xs py-4 opacity-50" style={{ color: '#7A5C3A' }}>
        Temple Reminder Studio · Local data only · Clearing browser data removes history
      </footer>
    </div>
  )
}
