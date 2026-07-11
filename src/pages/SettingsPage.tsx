import { useState } from 'react'
import { Settings, Save, Eye, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import type { TempleSettings } from '../types'

export default function SettingsPage() {
  const { settings, updateSettings } = useApp()
  const [form, setForm] = useState<TempleSettings>({ ...settings })
  const [saved, setSaved] = useState(false)
  const [showTemplate, setShowTemplate] = useState(false)

  const set = (key: keyof TempleSettings) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [key]: e.target.value }))
    setSaved(false)
  }

  const handleSave = () => {
    updateSettings(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const field = (label: string, key: keyof TempleSettings, opts: { placeholder?: string; hint?: string; type?: string } = {}) => (
    <div>
      <label className="label">{label}</label>
      <input
        type={opts.type ?? 'text'}
        value={(form[key] as string) ?? ''}
        onChange={set(key)}
        placeholder={opts.placeholder}
        className="input-field"
      />
      {opts.hint && <div className="text-xs mt-1 opacity-60" style={{ color: '#7A5C3A' }}>{opts.hint}</div>}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="w-6 h-6" style={{ color: '#D4AF37' }} />
        <h1 className="section-title text-2xl">Settings</h1>
      </div>

      <div className="space-y-6">
        {/* Temple Info */}
        <div className="card space-y-4">
          <div className="section-title text-base">Temple Information</div>
          <div className="gold-divider" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field('Temple Name', 'templeName', { placeholder: 'Sri Balagurunadheeswara Swamy Temple' })}
            {/* {field('Phone', 'templePhone', { placeholder: '+91 98765 43210', type: 'tel' })} */}
            {field('Website', 'templeWebsite', { placeholder: 'https://temple.org', type: 'url' })}
            {/* <div className="sm:col-span-2">
              <label className="label">Address</label>
              <input
                type="text"
                value={form.templeAddress}
                onChange={set('templeAddress')}
                placeholder="Full temple address"
                className="input-field"
              />
            </div> */}
          </div>
        </div>

        {/* Blessing message */}
        <div className="card space-y-4">
          <div className="section-title text-base">Card Content</div>
          <div className="gold-divider" />
          <div>
            <label className="label">Blessing Message (appears on card)</label>
            <textarea
              value={form.blessingMessage}
              onChange={set('blessingMessage')}
              rows={2}
              placeholder="May Lord Shiva bless you and your family…"
              className="input-field resize-none"
            />
          </div>
        </div>

        {/* WhatsApp template */}
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <div className="section-title text-base">WhatsApp Message Template</div>
            <button onClick={() => setShowTemplate(v => !v)} className="text-xs flex items-center gap-1" style={{ color: '#B8860B' }}>
              {showTemplate ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showTemplate ? 'Collapse' : 'Expand'}
            </button>
          </div>
          <div className="gold-divider" />

          {showTemplate ? (
            <div>
              <textarea
                value={form.whatsappTemplate}
                onChange={set('whatsappTemplate')}
                rows={12}
                className="input-field resize-y font-mono text-sm"
              />
              <div className="mt-2 text-xs space-y-0.5" style={{ color: '#7A5C3A' }}>
                <div className="font-semibold mb-1">Available placeholders:</div>
                {['{{name}}', '{{service}}', '{{expiryDate}}', '{{daysRemaining}}', '{{amount}}', '{{templeName}}', '{{templePhone}}', '{{blessingMessage}}'].map(p => (
                  <div key={p} className="font-mono" style={{ color: '#B8860B' }}>{p}</div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-sm opacity-70" style={{ color: '#7A5C3A' }}>
              {form.whatsappTemplate.slice(0, 120)}…
            </div>
          )}
        </div>

        {/* Save button */}
        <motion.button
          onClick={handleSave}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="btn-gold w-full justify-center text-base py-4"
          style={saved ? { background: 'linear-gradient(135deg, #16A34A, #15803D)' } : {}}
        >
          {saved ? '✓ Saved!' : <><Save className="w-5 h-5" /> Save Settings</>}
        </motion.button>
      </div>
    </div>
  )
}
