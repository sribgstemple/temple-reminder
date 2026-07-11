import { useNavigate } from 'react-router-dom'
import { Upload, UserPlus, Image, History, Settings, Flame, AlertCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { motion } from 'framer-motion'

const actions = [
  {
    to: '/upload',
    icon: Upload,
    label: 'Upload Excel',
    sub: 'Batch import from spreadsheet',
    primary: true,
    color: '#6B1C1C',
    bg: 'linear-gradient(135deg, rgba(107,28,28,0.08) 0%, rgba(212,175,55,0.06) 100%)',
    border: 'rgba(107,28,28,0.2)',
  },
  {
    to: '/single',
    icon: UserPlus,
    label: 'Add Single Devotee',
    sub: 'Quick manual entry',
    primary: true,
    color: '#B8860B',
    bg: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.04) 100%)',
    border: 'rgba(212,175,55,0.3)',
  },
  {
    to: '/generate',
    icon: Image,
    label: 'Generate Cards',
    sub: 'Generate & export reminder PNGs',
    primary: false,
    color: '#4A3728',
    bg: 'rgba(255,252,248,0.7)',
    border: 'rgba(212,175,55,0.2)',
  },
  {
    to: '/history',
    icon: History,
    label: 'History',
    sub: 'Past uploads & regenerate',
    primary: false,
    color: '#4A3728',
    bg: 'rgba(255,252,248,0.7)',
    border: 'rgba(212,175,55,0.2)',
  },
  {
    to: '/settings',
    icon: Settings,
    label: 'Settings',
    sub: 'Temple info, logo, message',
    primary: false,
    color: '#4A3728',
    bg: 'rgba(255,252,248,0.7)',
    border: 'rgba(212,175,55,0.2)',
  },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const { records, settings } = useApp()

  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center py-6"
      >
        <div className="text-4xl mb-3" style={{ fontFamily: "'Playfair Display', serif", color: '#6B1C1C' }}>
          ॐ नमः शिवाय
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#6B1C1C' }}>
          Temple Reminder Studio
        </h1>
        <p className="text-sm opacity-70 max-w-md mx-auto" style={{ color: '#7A5C3A' }}>
          {settings.templeName} · Generate personalized renewal reminder cards for devotees
        </p>
      </motion.div>

      {/* Active session banner */}
      {records.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl p-4 flex items-center gap-3 cursor-pointer"
          style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(107,28,28,0.08) 100%)', border: '1px solid rgba(212,175,55,0.4)' }}
          onClick={() => navigate('/generate')}
        >
          <Flame className="w-5 h-5" style={{ color: '#D4AF37' }} />
          <div className="flex-1">
            <div className="font-semibold text-sm" style={{ color: '#6B1C1C' }}>
              {records.length} devotee{records.length !== 1 ? 's' : ''} ready
            </div>
            <div className="text-xs opacity-70" style={{ color: '#7A5C3A' }}>
              Continue to Generate Cards →
            </div>
          </div>
        </motion.div>
      )}

      {/* Settings warning */}
      {!settings.templePhone && !settings.templeWebsite && (
        <div
          className="rounded-xl p-4 flex items-center gap-3 cursor-pointer"
          style={{ background: 'rgba(212,175,55,0.06)', border: '1px dashed rgba(212,175,55,0.4)' }}
          onClick={() => navigate('/settings')}
        >
          <AlertCircle className="w-4 h-4" style={{ color: '#D4AF37' }} />
          <div className="text-sm" style={{ color: '#7A5C3A' }}>
            Complete your temple settings for better cards →
          </div>
        </div>
      )}

      {/* Action grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map(({ to, icon: Icon, label, sub, primary, color, bg, border }, i) => (
          <motion.button
            key={to}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            onClick={() => navigate(to)}
            className="text-left rounded-2xl p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            style={{ background: bg, border: `1px solid ${border}` }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl" style={{
                background: primary ? `${color}18` : 'rgba(212,175,55,0.1)',
                border: `1px solid ${primary ? color + '30' : 'rgba(212,175,55,0.2)'}`,
              }}>
                <Icon className="w-6 h-6" style={{ color: primary ? color : '#D4AF37' }} />
              </div>
              <div>
                <div className="font-semibold text-base mb-0.5" style={{ color, fontFamily: primary ? "'Playfair Display', serif" : 'inherit' }}>
                  {label}
                </div>
                <div className="text-sm opacity-65" style={{ color: '#7A5C3A' }}>{sub}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Quick guide */}
      <div className="card space-y-3">
        <div className="section-title text-base">Quick Flow</div>
        <div className="gold-divider" />
        <ol className="space-y-2 text-sm" style={{ color: '#7A5C3A' }}>
          {[
            'Upload Excel or add devotees manually',
            'Go to Generate Cards and click Generate',
            'Cards render as 1080×1350 PNGs with UPI QR code',
            'Preview cards, copy WhatsApp messages, download ZIP',
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: 'rgba(212,175,55,0.2)', color: '#B8860B' }}>
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
