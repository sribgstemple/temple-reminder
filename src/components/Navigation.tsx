import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Upload, UserPlus, Image, History, Settings, Sparkles } from 'lucide-react'
import { useApp } from '../context/AppContext'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/upload', label: 'Upload Excel', icon: Upload },
  { to: '/single', label: 'Add Devotee', icon: UserPlus },
  { to: '/generate', label: 'Generate', icon: Image },
  { to: '/history', label: 'History', icon: History },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Navigation() {
  const { records } = useApp()
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 z-50 border-b backdrop-blur-sm" style={{
      background: 'rgba(253,248,240,0.95)',
      borderColor: 'rgba(212,175,55,0.25)',
    }}>
      <div className="max-w-5xl mx-auto px-4 flex items-center gap-1 h-14">
        {/* Brand */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mr-4 shrink-0"
        >
          <Sparkles className="w-5 h-5" style={{ color: '#D4AF37' }} />
          <span className="font-semibold text-sm hidden sm:block" style={{
            fontFamily: "'Playfair Display', serif",
            color: '#6B1C1C',
          }}>
            Temple Studio
          </span>
        </button>

        {/* Nav items */}
        <div className="flex items-center gap-0.5 overflow-x-auto flex-1 scrollbar-hide">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                  isActive ? 'text-maroon-700' : 'text-stone-500 hover:text-stone-700'
                }`
              }
              style={({ isActive }) => isActive ? {
                background: 'rgba(212,175,55,0.12)',
                color: '#6B1C1C',
              } : {}}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden md:inline">{label}</span>
              {label === 'Generate' && records.length > 0 && (
                <span className="ml-1 rounded-full text-white text-xs w-4 h-4 flex items-center justify-center text-[10px] font-bold" style={{ background: '#D4AF37' }}>
                  {records.length}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
