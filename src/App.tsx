import { HashRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import UploadPage from './pages/UploadPage'
import SingleEntryPage from './pages/SingleEntryPage'
import GeneratePage from './pages/GeneratePage'
import HistoryPage from './pages/HistoryPage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="single" element={<SingleEntryPage />} />
            <Route path="generate" element={<GeneratePage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  )
}
