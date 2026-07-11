import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 pt-6 pb-28 animate-fade-in">
        <Outlet />
      </main>
    </div>
  )
}
