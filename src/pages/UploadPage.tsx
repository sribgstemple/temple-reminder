import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileSpreadsheet, AlertTriangle, CheckCircle2, ArrowRight, X, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { v4 as uuid } from 'uuid'
import { parseExcel, downloadXlsxTemplate } from '../lib/excel'
import { saveSession } from '../lib/storage'
import { useApp } from '../context/AppContext'
import type { DevoteeRecord, ExcelRowError } from '../types'

export default function UploadPage() {
  const navigate = useNavigate()
  const { setRecords, setSessionId } = useApp()
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [parsing, setParsing] = useState(false)
  const [records, setLocalRecords] = useState<DevoteeRecord[]>([])
  const [errors, setErrors] = useState<ExcelRowError[]>([])
  const [totalRows, setTotalRows] = useState(0)
  const [parsed, setParsed] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback(async (f: File) => {
    if (!f.name.match(/\.(xlsx|xls|ods|csv)$/i)) {
      setErrors([{ row: 0, field: 'file', message: 'Please upload an Excel (.xlsx, .xls) or CSV file.' }])
      return
    }
    setFile(f)
    setParsing(true)
    setErrors([])
    setLocalRecords([])
    setParsed(false)
    try {
      const sid = uuid()
      const result = await parseExcel(f, sid)
      setLocalRecords(result.records)
      setErrors(result.errors)
      setTotalRows(result.totalRows)
      setParsed(true)
    } catch (err) {
      setErrors([{ row: 0, field: 'file', message: err instanceof Error ? err.message : 'Parse failed' }])
    } finally {
      setParsing(false)
    }
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) processFile(f)
  }, [processFile])

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) processFile(f)
  }

  const handleProceed = async () => {
    if (records.length === 0) return
    const sid = records[0].sessionId
    await saveSession({
      id: sid,
      type: 'excel-upload' as const,
      filename: file?.name,
      devoteeCount: records.length,
      createdAt: new Date().toISOString(),
      templateId: 'classic',
      records,
    })
    setRecords(records)
    setSessionId(sid)
    navigate('/generate')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="section-title text-2xl">Upload Excel</h1>
          <p className="text-sm mt-1" style={{ color: '#7A5C3A' }}>
            Required columns: <strong>Name, Service, Expiry Date, Amount</strong>
          </p>
        </div>
        <button
          onClick={downloadXlsxTemplate}
          className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border shrink-0 mt-1"
          style={{ borderColor: '#D4AF37', color: '#B8860B', background: 'rgba(212,175,55,0.08)' }}
        >
          <Download className="w-3.5 h-3.5" />
          Download Template
        </button>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className="rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-200"
        style={{
          borderColor: dragging ? '#D4AF37' : 'rgba(212,175,55,0.35)',
          background: dragging ? 'rgba(212,175,55,0.07)' : 'rgba(255,252,248,0.7)',
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.ods,.csv"
          className="hidden"
          onChange={onFileChange}
        />
        <motion.div animate={{ scale: dragging ? 1.08 : 1 }} transition={{ type: 'spring', stiffness: 300 }}>
          <FileSpreadsheet className="w-12 h-12 mx-auto mb-4" style={{ color: '#D4AF37' }} />
          <div className="font-semibold text-base mb-1" style={{ color: '#6B1C1C' }}>
            {file ? file.name : 'Drop Excel file here'}
          </div>
          <div className="text-sm" style={{ color: '#7A5C3A' }}>
            {file ? `${(file.size / 1024).toFixed(1)} KB` : 'or click to browse · .xlsx / .xls / .csv'}
          </div>
        </motion.div>
      </div>

      {parsing && (
        <div className="flex items-center gap-3 text-sm" style={{ color: '#7A5C3A' }}>
          <div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#D4AF37', borderTopColor: 'transparent' }} />
          Parsing file…
        </div>
      )}

      <AnimatePresence>
        {parsed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 text-sm font-medium" style={{ color: records.length > 0 ? '#16A34A' : '#DC2626' }}>
              {records.length > 0 ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
              {records.length} valid record{records.length !== 1 ? 's' : ''} from {totalRows} rows
              {errors.length > 0 && ` · ${errors.length} issue${errors.length !== 1 ? 's' : ''}`}
            </div>

            {errors.length > 0 && (
              <div className="rounded-xl border p-4 space-y-2" style={{ background: 'rgba(220,38,38,0.04)', borderColor: 'rgba(220,38,38,0.2)' }}>
                <div className="text-xs font-semibold uppercase tracking-wider text-red-600 flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5" /> Issues (skipped rows)
                </div>
                {errors.slice(0, 10).map((e, i) => (
                  <div key={i} className="text-xs" style={{ color: '#7A5C3A' }}>
                    {e.row > 0 ? `Row ${e.row} · ` : ''}{e.field}: {e.message}
                  </div>
                ))}
                {errors.length > 10 && <div className="text-xs text-red-400">…and {errors.length - 10} more</div>}
              </div>
            )}

            {records.length > 0 && (
              <div className="card overflow-hidden p-0">
                <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: 'rgba(212,175,55,0.2)' }}>
                  <span className="text-sm font-semibold" style={{ color: '#6B1C1C' }}>Preview (first 10 rows)</span>
                  <button
                    onClick={() => { setFile(null); setParsed(false); setLocalRecords([]); setErrors([]) }}
                    className="p-1 rounded hover:bg-red-50 transition-colors"
                  >
                    <X className="w-4 h-4 text-red-400" />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ background: 'rgba(212,175,55,0.08)' }}>
                        {['Name', 'Service', 'Expiry', 'Days', 'Amount'].map(h => (
                          <th key={h} className="px-4 py-2 text-left font-semibold uppercase tracking-wider" style={{ color: '#7A5C3A' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {records.slice(0, 10).map((r, i) => (
                        <tr key={r.id} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(212,175,55,0.03)' }}>
                          <td className="px-4 py-2.5 font-medium" style={{ color: '#3D2B1A' }}>{r.name}</td>
                          <td className="px-4 py-2.5" style={{ color: '#7A5C3A' }}>{r.service}</td>
                          <td className="px-4 py-2.5" style={{ color: '#7A5C3A' }}>{r.expiryDate}</td>
                          <td className="px-4 py-2.5">
                            <span className="font-semibold" style={{ color: r.daysRemaining <= 7 ? '#D97706' : r.daysRemaining < 0 ? '#DC2626' : '#16A34A' }}>
                              {r.daysRemaining}d
                            </span>
                          </td>
                          <td className="px-4 py-2.5 font-semibold" style={{ color: '#6B1C1C' }}>₹{r.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {records.length > 10 && (
                    <div className="px-4 py-2 text-xs" style={{ color: '#7A5C3A' }}>…and {records.length - 10} more</div>
                  )}
                </div>
              </div>
            )}

            {records.length > 0 && (
              <button onClick={handleProceed} className="btn-gold w-full flex items-center justify-center gap-2">
                Continue with {records.length} devotees
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <details className="card">
        <summary className="text-sm font-semibold cursor-pointer" style={{ color: '#6B1C1C' }}>
          Expected column names (click to expand)
        </summary>
        <div className="mt-3 grid grid-cols-2 gap-1 text-xs" style={{ color: '#7A5C3A' }}>
          {[
            ['Name *', 'Devotee name'],
            ['Service *', 'Service / Service Name'],
            ['Expiry Date *', 'Date (DD/MM/YYYY or YYYY-MM-DD)'],
            ['Amount *', 'Renewal amount'],
            ['Days Remaining', 'Auto-calculated from Expiry Date if omitted'],
          ].map(([col, desc]) => (
            <div key={col} className="flex gap-2">
              <span className="font-mono font-semibold" style={{ color: '#B8860B' }}>{col}</span>
              <span className="opacity-70">{desc}</span>
            </div>
          ))}
        </div>
      </details>
    </div>
  )
}
