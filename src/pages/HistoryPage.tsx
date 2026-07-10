import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { History, Trash2, RefreshCw, FileSpreadsheet, UserPlus, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAllSessions, deleteSession } from '../lib/storage'
import { useApp } from '../context/AppContext'
import type { HistorySession } from '../types'

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function HistoryPage() {
  const navigate = useNavigate()
  const { setRecords, setSessionId } = useApp()
  const [sessions, setSessions] = useState<HistorySession[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    getAllSessions().then(s => { setSessions(s); setLoading(false) })
  }, [])

  const handleReload = (session: HistorySession) => {
    setRecords(session.records)
    setSessionId(session.id)
    navigate('/generate')
  }

  const handleDelete = async (id: string) => {
    setDeleting(id)
    await deleteSession(id)
    setSessions(s => s.filter(x => x.id !== id))
    setDeleting(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <History className="w-6 h-6" style={{ color: '#D4AF37' }} />
        <h1 className="section-title text-2xl">History</h1>
      </div>

      <div className="rounded-xl p-4 text-sm flex items-start gap-2" style={{ background: 'rgba(212,175,55,0.06)', border: '1px dashed rgba(212,175,55,0.3)' }}>
        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#D4AF37' }} />
        <span style={{ color: '#7A5C3A' }}>
          History is stored only in this browser. Clearing browser data or site data will erase it permanently.
        </span>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 text-sm py-8" style={{ color: '#7A5C3A' }}>
          <div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#D4AF37', borderTopColor: 'transparent' }} />
          Loading history…
        </div>
      ) : sessions.length === 0 ? (
        <div className="card text-center py-12">
          <History className="w-10 h-10 mx-auto mb-3 opacity-30" style={{ color: '#D4AF37' }} />
          <div className="font-semibold mb-1" style={{ color: '#6B1C1C' }}>No history yet</div>
          <div className="text-sm opacity-60" style={{ color: '#7A5C3A' }}>
            Past uploads and entries will appear here.
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {sessions.map(session => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="card flex items-center gap-4 flex-wrap"
              >
                {/* Icon */}
                <div className="p-2.5 rounded-xl shrink-0" style={{ background: 'rgba(212,175,55,0.12)' }}>
                  {session.type === 'excel-upload'
                    ? <FileSpreadsheet className="w-5 h-5" style={{ color: '#D4AF37' }} />
                    : <UserPlus className="w-5 h-5" style={{ color: '#D4AF37' }} />}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate" style={{ color: '#3D2B1A' }}>
                    {session.filename ?? (session.type === 'single-entry' ? 'Single Entry' : 'Excel Upload')}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: '#7A5C3A' }}>
                    {session.devoteeCount} devotee{session.devoteeCount !== 1 ? 's' : ''} · {formatDate(session.createdAt)}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleReload(session)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:shadow-sm"
                    style={{ background: 'rgba(212,175,55,0.15)', color: '#6B1C1C' }}
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Reload
                  </button>
                  <button
                    onClick={() => handleDelete(session.id)}
                    disabled={deleting === session.id}
                    className="p-2 rounded-lg transition-all hover:bg-red-50 disabled:opacity-40"
                  >
                    {deleting === session.id
                      ? <div className="w-3.5 h-3.5 border-t-transparent border-2 rounded-full animate-spin" style={{ borderColor: '#DC2626' }} />
                      : <Trash2 className="w-3.5 h-3.5 text-red-400" />}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
