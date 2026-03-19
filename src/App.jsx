import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminPanel from './admin/AdminPanel'
import HomePage from './pages/HomePage'
import { defaultSiteData, getSiteData, saveSiteData } from './utils/storage'

function App() {
  const [siteData, setSiteData] = useState(() => getSiteData())

  // Always fetch site-config.json on load.
  // If the remote _version is newer than what's stored locally, update everyone automatically.
  // This ensures all visitors get the latest published content after a redeploy.
  useEffect(() => {
    fetch('/site-config.json?t=' + Date.now())
      .then((r) => r.json())
      .then((remote) => {
        const local = getSiteData()
        const remoteVersion = remote._version ?? 0
        const localVersion = local._version ?? 0
        if (remoteVersion > localVersion) {
          const merged = { ...defaultSiteData, ...remote }
          saveSiteData(merged)
          setSiteData(merged)
        } else if (localVersion === 0) {
          // First ever visit with no version — seed from remote
          const merged = { ...defaultSiteData, ...remote }
          saveSiteData(merged)
          setSiteData(merged)
        }
      })
      .catch(() => {
        // No remote config available — local/default data already loaded
      })
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--background-color',
      siteData.theme.backgroundColor,
    )
    document.documentElement.style.setProperty(
      '--primary-color',
      siteData.theme.primaryColor,
    )
  }, [siteData.theme.backgroundColor, siteData.theme.primaryColor])

  useEffect(() => {
    if (!siteData.logo) return
    let link = document.querySelector("link[rel~='icon']")
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.href = siteData.logo
  }, [siteData.logo])

  useEffect(() => {
    document.title = siteData.companyName || 'RUD Enterprises'
  }, [siteData.companyName])

  const handleSaveSiteData = (nextData) => {
    saveSiteData(nextData)
    setSiteData(nextData)
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage siteData={siteData} onSaveSiteData={handleSaveSiteData} />
        }
      />
      <Route
        path="/admin"
        element={
          <AdminPanel siteData={siteData} onSaveSiteData={handleSaveSiteData} />
        }
      />
    </Routes>
  )
}

export default App
