import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminPanel from './admin/AdminPanel'
import HomePage from './pages/HomePage'
import { getSiteData, saveSiteData } from './utils/storage'

function App() {
  const [siteData, setSiteData] = useState(() => getSiteData())

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
