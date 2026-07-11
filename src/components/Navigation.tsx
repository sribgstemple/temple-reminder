import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Upload, UserPlus, Image, History, Settings, Sparkles } from 'lucide-react'
import { useApp } from '../context/AppContext'

const navItems = [
  { to: '/', label: 'Home', icon: LayoutDashboard, end: true },
  { to: '/upload', label: 'Upload', icon: Upload },
  { to: '/single', label: 'Add', icon: UserPlus },
  { to: '/generate', label: 'Generate', icon: Image },
  { to: '/history', label: 'History', icon: History },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Navigation() {
  const { records } = useApp()
  const navigate = useNavigate()

  return (
    <>
      {/* Top header — brand only */}
      <header className="sticky top-0 z-50 border-b backdrop-blur-sm" style={{
        background: 'rgba(253,248,240,0.95)',
        borderColor: 'rgba(212,175,55,0.25)',
      }}>
        <div className="max-w-5xl mx-auto px-4 h-12 flex items-center">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" style={{ color: '#D4AF37' }} />
            <span className="font-semibold text-sm" style={{
              fontFamily: "'Playfair Display', serif",
              color: '#6B1C1C',
            }}>
              SBG Temple Reminder
            </span>
          </button>
        </div>
      </header>

      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t" style={{
        background: 'rgba(253,248,240,0.97)',
        borderColor: 'rgba(212,175,55,0.3)',
        backdropFilter: 'blur(12px)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}>
        <div className="max-w-5xl mx-auto flex items-stretch">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className="flex-1"
              style={{ textDecoration: 'none' }}
            >
              {({ isActive }) => (
                <div
                  className="flex flex-col items-center justify-center gap-1 py-2 transition-all duration-150 relative"
                  style={{ color: isActive ? '#6B1C1C' : '#9A8070' }}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full" style={{ background: '#D4AF37' }} />
                  )}

                  <div className="relative">
                    <Icon
                      className="w-6 h-6"
                      strokeWidth={isActive ? 2.2 : 1.7}
                    />
                    {/* Badge for Generate */}
                    {label === 'Generate' && records.length > 0 && (
                      <span className="absolute -top-1.5 -right-2 rounded-full text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center" style={{ background: '#D4AF37', color: '#4D2000' }}>
                        {records.length > 9 ? '9+' : records.length}
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-medium leading-none" style={{
                    fontWeight: isActive ? 600 : 400,
                  }}>
                    {label}
                  </span>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  )
}
