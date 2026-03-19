import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminPanel from './admin/AdminPanel'
import HomePage from './pages/HomePage'
import { defaultSiteData, getSiteData, hasLocalData, saveSiteData } from './utils/storage'

function App() {
  const [siteData, setSiteData] = useState(() => getSiteData())

  // On first visit (no localStorage yet), seed content from the published site-config.json
  useEffect(() => {
    if (hasLocalData()) return
    fetch('/site-config.json')
      .then((r) => r.json())
      .then((remote) => {
        const merged = { ...defaultSiteData, ...remote }
        saveSiteData(merged)
        setSiteData(merged)
      })
      .catch(() => {
        // No remote config — fall back to hardcoded defaults and persist them
        saveSiteData(defaultSiteData)
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
