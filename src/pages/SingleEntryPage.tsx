import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserPlus, ArrowRight, Calculator } from 'lucide-react'
import { v4 as uuid } from 'uuid'
import { saveSession } from '../lib/storage'
import { calcDaysRemainingFromDate } from '../lib/excel'
import { useApp } from '../context/AppContext'
import type { DevoteeRecord } from '../types'

interface FormData {
  name: string
  service: string
  expiryDate: string
  daysRemainingOverride: string
  amount: string
}

const EMPTY: FormData = {
  name: '', service: '', expiryDate: '', daysRemainingOverride: '', amount: '',
}

function futureDate(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

const TEST_DEVOTEE: FormData = {
  name: 'Ramesh Kumar',
  service: 'Monthly Archana',
  expiryDate: futureDate(28),
  daysRemainingOverride: '',
  amount: '1500',
}

function validate(f: FormData): Record<string, string> {
  const errs: Record<string, string> = {}
  if (!f.name.trim()) errs.name = 'Name is required'
  if (!f.service.trim()) errs.service = 'Service is required'
  if (!f.expiryDate) errs.expiryDate = 'Expiry date is required'
  if (!f.amount.trim()) errs.amount = 'Amount is required'
  return errs
}

export default function SingleEntryPage() {
  const navigate = useNavigate()
  const { setRecords, setSessionId } = useApp()
  const [form, setForm] = useState<FormData>(EMPTY)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const calcedDays = form.expiryDate ? calcDaysRemainingFromDate(form.expiryDate) : null

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    setTouched(t => ({ ...t, [field]: true }))
    setErrors(prev => { const n = { ...prev }; delete n[field]; return n })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const allTouched = Object.fromEntries(Object.keys(EMPTY).map(k => [k, true]))
    setTouched(allTouched)
    const errs = validate(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    const daysRemaining = form.daysRemainingOverride
      ? parseInt(form.daysRemainingOverride, 10)
      : calcedDays ?? 0

    const sid = uuid()
    const record: DevoteeRecord = {
      id: uuid(),
      name: form.name.trim(),
      service: form.service.trim(),
      expiryDate: form.expiryDate,
      daysRemaining,
      amount: form.amount.trim(),
      createdAt: new Date().toISOString(),
      sessionId: sid,
    }

    await saveSession({
      id: sid,
      type: 'single-entry',
      devoteeCount: 1,
      createdAt: new Date().toISOString(),
      templateId: 'classic',
      records: [record],
    })

    setRecords([record])
    setSessionId(sid)
    navigate('/generate')
  }

  const field = (label: string, key: keyof FormData, opts: {
    type?: string; placeholder?: string; required?: boolean; hint?: string
  } = {}) => {
    const { type = 'text', placeholder = '', required = false, hint } = opts
    const err = touched[key] && errors[key]
    return (
      <div>
        <label className="label">
          {label}{required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
        <input
          type={type}
          value={form[key]}
          onChange={set(key)}
          onBlur={() => setTouched(t => ({ ...t, [key]: true }))}
          placeholder={placeholder}
          className="input-field"
          style={err ? { borderColor: '#DC2626' } : {}}
        />
        {hint && !err && <div className="text-xs mt-1 opacity-60" style={{ color: '#7A5C3A' }}>{hint}</div>}
        {err && <div className="text-xs mt-1 text-red-500">{err}</div>}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="section-title text-2xl flex items-center gap-2">
            <UserPlus className="w-6 h-6" style={{ color: '#D4AF37' }} />
            Add Single Devotee
          </h1>
          <p className="text-sm mt-1" style={{ color: '#7A5C3A' }}>Manual entry for one devotee</p>
        </div>
        <button
          type="button"
          onClick={() => { setForm(TEST_DEVOTEE); setErrors({}); setTouched({}) }}
          className="text-xs px-3 py-1.5 rounded-lg border shrink-0 mt-1"
          style={{ borderColor: '#D4AF37', color: '#B8860B', background: 'rgba(212,175,55,0.08)' }}
        >
          Load test data
        </button>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {field('Devotee Name', 'name', { required: true, placeholder: 'Full name' })}
          {field('Service', 'service', { required: true, placeholder: 'e.g. Archana, Monthly Pooja' })}
          {field('Expiry Date', 'expiryDate', { required: true, type: 'date' })}
          {field('Amount (₹)', 'amount', { required: true, placeholder: '500' })}

          {/* Days remaining with auto-calc */}
          <div className="sm:col-span-2">
            <label className="label">Days Remaining</label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={form.daysRemainingOverride}
                onChange={set('daysRemainingOverride')}
                placeholder={calcedDays !== null ? String(calcedDays) : 'auto'}
                className="input-field flex-1"
              />
              {calcedDays !== null && !form.daysRemainingOverride && (
                <div className="flex items-center gap-1 text-xs whitespace-nowrap" style={{ color: '#B8860B' }}>
                  <Calculator className="w-3.5 h-3.5" />
                  {calcedDays}d auto
                </div>
              )}
            </div>
            <div className="text-xs mt-1 opacity-60" style={{ color: '#7A5C3A' }}>Auto-calculated from expiry date; override if needed</div>
          </div>
        </div>

        <div className="pt-6">
          <button type="submit" className="btn-gold w-full justify-center">
            Proceed to Generate
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  )
}
