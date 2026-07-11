import { useState, useCallback } from 'react'
import { createRoot } from 'react-dom/client'
import { ChevronLeft, ChevronRight, Download, Archive, MessageSquare, Check, Copy, Loader2, Image as ImageIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { getTemplate } from '../templates/templateConfigs'
import TemplateRenderer from '../templates/TemplateRenderer'
import { captureCardElement, createOffscreenContainer } from '../lib/capture'
import { generateQRDataUrl } from '../lib/qr'
import { exportZip } from '../lib/zip'
import { saveAs } from 'file-saver'
import type { DevoteeRecord, GeneratedCard, TempleSettings } from '../types'

const UPI_BASE =
  'upi://pay?pa=SRIBALAGURUNADHEESWARA@rbl&pn=SRI%20BALAGURUNADHEESWARA%20TRUST&mc=8398&cu=INR'

function upiUrl(amount: string): string {
  const amt = parseFloat(amount)
  return isNaN(amt) || amt <= 0
    ? `${UPI_BASE}&am=null&mam=null`
    : `${UPI_BASE}&am=${amt}&mam=${amt}`
}

function buildWhatsAppMessage(template: string, devotee: DevoteeRecord, settings: TempleSettings): string {
  return template
    .replace(/\{\{name\}\}/g, devotee.name)
    .replace(/\{\{service\}\}/g, devotee.service)
    .replace(/\{\{expiryDate\}\}/g, devotee.expiryDate)
    .replace(/\{\{daysRemaining\}\}/g, String(devotee.daysRemaining))
    .replace(/\{\{amount\}\}/g, devotee.amount)
    .replace(/\{\{templeName\}\}/g, settings.templeName)
    .replace(/\{\{templePhone\}\}/g, settings.templePhone)
    .replace(/\{\{blessingMessage\}\}/g, settings.blessingMessage)
}

export default function GeneratePage() {
  const { records, generatedCards, setGeneratedCards, settings } = useApp()
  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [progressLabel, setProgressLabel] = useState('')
  const [previewIdx, setPreviewIdx] = useState(0)
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
  const [editedMessages, setEditedMessages] = useState<Record<number, string>>({})

  const handleGenerate = useCallback(async () => {
    if (records.length === 0) return
    setGenerating(true)
    setProgress(0)
    setGeneratedCards([])

    const template = getTemplate('classic')
    const cards: GeneratedCard[] = []

    for (let i = 0; i < records.length; i++) {
      const devotee = records[i]
      setProgressLabel(`Generating ${i + 1} / ${records.length}: ${devotee.name}`)
      setProgress(Math.round((i / records.length) * 100))

      try {
        const qrDataUrl = await generateQRDataUrl(upiUrl(devotee.amount), { dark: '#1a1a1a', light: '#ffffff' })

        const { container, cleanup } = createOffscreenContainer()

        await new Promise<void>(resolve => {
          const root = createRoot(container)
          root.render(
            <TemplateRenderer
              devotee={devotee}
              template={template}
              settings={settings}
              qrDataUrl={qrDataUrl}
            />
          )
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
        })

        const pngDataUrl = await captureCardElement(container.firstElementChild as HTMLElement ?? container)
        cleanup()

        const whatsappMessage = buildWhatsAppMessage(settings.whatsappTemplate, devotee, settings)
        cards.push({ devotee, pngDataUrl, whatsappMessage })
      } catch (err) {
        console.error(`Failed for ${devotee.name}:`, err)
        cards.push({
          devotee,
          pngDataUrl: '',
          whatsappMessage: buildWhatsAppMessage(settings.whatsappTemplate, devotee, settings),
        })
      }
    }

    setProgress(100)
    setProgressLabel(`Done! ${cards.filter(c => c.pngDataUrl).length} card${records.length !== 1 ? 's' : ''} generated`)
    setGeneratedCards(cards)
    setPreviewIdx(0)
    setEditedMessages({})
    setGenerating(false)
  }, [records, settings, setGeneratedCards])

  const currentCard = generatedCards[previewIdx]
  const currentMessage = editedMessages[previewIdx] ?? currentCard?.whatsappMessage ?? ''

  const copyMessage = async (idx: number) => {
    const msg = editedMessages[idx] ?? generatedCards[idx]?.whatsappMessage ?? ''
    await navigator.clipboard.writeText(msg)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  const downloadCurrent = () => {
    if (!currentCard?.pngDataUrl) return
    const name = currentCard.devotee.name.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/\s+/g, '_')
    saveAs(currentCard.pngDataUrl, `${name}.png`)
  }

  if (records.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="section-title text-2xl">Generate Cards</h1>
        <div className="card text-center py-12">
          <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-30" style={{ color: '#D4AF37' }} />
          <div className="text-base font-semibold mb-2" style={{ color: '#6B1C1C' }}>No devotees loaded</div>
          <p className="text-sm opacity-70" style={{ color: '#7A5C3A' }}>
            Upload an Excel file or add a devotee manually to get started.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="section-title text-2xl">Generate Cards</h1>
          <p className="text-sm mt-0.5" style={{ color: '#7A5C3A' }}>{records.length} devotee{records.length !== 1 ? 's' : ''} loaded</p>
        </div>
        {generatedCards.length > 0 && (
          <button onClick={() => exportZip(generatedCards.map((c, i) => ({ ...c, whatsappMessage: editedMessages[i] ?? c.whatsappMessage })))} className="btn-gold text-xs px-4 py-2">
            <Archive className="w-3.5 h-3.5" /> Export ZIP
          </button>
        )}
      </div>

      {/* Generate button + progress */}
      <div className="space-y-3">
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="btn-gold w-full justify-center text-base py-4"
        >
          {generating ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5" />}
          {generating ? progressLabel : `Generate ${records.length} Card${records.length !== 1 ? 's' : ''}`}
        </button>

        {generating && (
          <div className="rounded-full overflow-hidden h-2" style={{ background: 'rgba(212,175,55,0.2)' }}>
            <motion.div
              className="h-full"
              style={{ background: 'linear-gradient(to right, #D4AF37, #F0C040)' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </div>

      {/* Preview */}
      <AnimatePresence>
        {generatedCards.length > 0 && !generating && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Nav + current card name */}
            <div className="flex items-center justify-between">
              <button
                disabled={previewIdx === 0}
                onClick={() => setPreviewIdx(i => i - 1)}
                className="p-2 rounded-xl transition-all disabled:opacity-30"
                style={{ background: 'rgba(212,175,55,0.15)' }}
              >
                <ChevronLeft className="w-5 h-5" style={{ color: '#6B1C1C' }} />
              </button>
              <div className="text-center">
                <div className="font-semibold text-sm" style={{ color: '#6B1C1C', fontFamily: "'Playfair Display', serif" }}>
                  {currentCard?.devotee.name}
                </div>
                <div className="text-xs opacity-60" style={{ color: '#7A5C3A' }}>
                  {previewIdx + 1} / {generatedCards.length}
                </div>
              </div>
              <button
                disabled={previewIdx === generatedCards.length - 1}
                onClick={() => setPreviewIdx(i => i + 1)}
                className="p-2 rounded-xl transition-all disabled:opacity-30"
                style={{ background: 'rgba(212,175,55,0.15)' }}
              >
                <ChevronRight className="w-5 h-5" style={{ color: '#6B1C1C' }} />
              </button>
            </div>

            {/* Card preview + actions */}
            {currentCard && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* PNG preview */}
                <div className="space-y-3">
                  <div className="rounded-2xl overflow-hidden shadow-lg border" style={{ borderColor: 'rgba(212,175,55,0.25)' }}>
                    {currentCard.pngDataUrl ? (
                      <img
                        src={currentCard.pngDataUrl}
                        alt={`Card for ${currentCard.devotee.name}`}
                        className="w-full"
                        style={{ aspectRatio: '1080/1350' }}
                      />
                    ) : (
                      <div className="aspect-[1080/1350] flex items-center justify-center" style={{ background: 'rgba(220,38,38,0.05)' }}>
                        <div className="text-sm text-red-400 text-center px-4">
                          Card generation failed.<br />
                          <button onClick={handleGenerate} className="underline mt-1">Retry all</button>
                        </div>
                      </div>
                    )}
                  </div>
                  <button onClick={downloadCurrent} disabled={!currentCard.pngDataUrl} className="btn-gold w-full justify-center text-sm">
                    <Download className="w-4 h-4" /> Download PNG
                  </button>
                </div>

                {/* WhatsApp message + UPI link */}
                <div className="space-y-3">
                  <div className="label flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Message
                  </div>
                  <textarea
                    value={currentMessage}
                    onChange={e => setEditedMessages(m => ({ ...m, [previewIdx]: e.target.value }))}
                    rows={10}
                    className="input-field w-full resize-none text-sm leading-relaxed"
                    style={{ fontFamily: 'inherit' }}
                  />
                  <button
                    onClick={() => copyMessage(previewIdx)}
                    className="btn-outline w-full justify-center text-sm"
                  >
                    {copiedIdx === previewIdx ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    {copiedIdx === previewIdx ? 'Copied!' : 'Copy Message'}
                  </button>

                  {/* UPI pay link */}
                  <a
                    href={upiUrl(currentCard.devotee.amount)}
                    className="flex items-center justify-center gap-2 w-full rounded-xl py-3 text-sm font-semibold transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #8C1F2E, #6E1422)',
                      color: '#F5EDD8',
                      textDecoration: 'none',
                    }}
                  >
                    🔱 Pay Seva Amount via UPI
                  </a>

                  {/* Devotee summary */}
                  <div className="card p-4 text-xs space-y-1" style={{ color: '#7A5C3A' }}>
                    {[
                      ['Service', currentCard.devotee.service],
                      ['Expiry', currentCard.devotee.expiryDate],
                      ['Days', `${currentCard.devotee.daysRemaining}d`],
                      ['Amount', `₹${currentCard.devotee.amount}`],
                    ].map(([k, v]) => (
                      <div key={k} className="flex gap-2">
                        <span className="font-semibold w-16 shrink-0" style={{ color: '#B8860B' }}>{k}</span>
                        <span>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bulk export row */}
            <div className="gold-divider" />
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-sm font-semibold" style={{ color: '#6B1C1C' }}>Bulk Export:</span>
              <button onClick={() => exportZip(generatedCards.map((c, i) => ({ ...c, whatsappMessage: editedMessages[i] ?? c.whatsappMessage })))} className="btn-gold text-sm px-4 py-2">
                <Archive className="w-4 h-4" /> ZIP (all PNGs + messages)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
