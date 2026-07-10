import React, { createContext, useContext, useState, useCallback } from 'react'
import type { DevoteeRecord, GeneratedCard, TempleSettings } from '../types'
import { loadSettings, saveSettings } from '../lib/storage'

interface AppContextValue {
  records: DevoteeRecord[]
  setRecords: (records: DevoteeRecord[]) => void
  sessionId: string
  setSessionId: (id: string) => void
  selectedTemplateId: string
  setSelectedTemplateId: (id: string) => void
  generatedCards: GeneratedCard[]
  setGeneratedCards: (cards: GeneratedCard[]) => void
  settings: TempleSettings
  updateSettings: (settings: TempleSettings) => void
  clearSession: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<DevoteeRecord[]>([])
  const [sessionId, setSessionId] = useState<string>('')
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('classic')
  const [generatedCards, setGeneratedCards] = useState<GeneratedCard[]>([])
  const [settings, setSettingsState] = useState<TempleSettings>(loadSettings)

  const updateSettings = useCallback((s: TempleSettings) => {
    setSettingsState(s)
    saveSettings(s)
  }, [])

  const clearSession = useCallback(() => {
    setRecords([])
    setSessionId('')
    setGeneratedCards([])
  }, [])

  return (
    <AppContext.Provider value={{
      records, setRecords,
      sessionId, setSessionId,
      selectedTemplateId, setSelectedTemplateId,
      generatedCards, setGeneratedCards,
      settings, updateSettings,
      clearSession,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
