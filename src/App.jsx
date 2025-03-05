import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './pages/Dashboard'
import LandRegistry from './pages/LandRegistry'
import LandMap from './pages/LandMap'
import PropertyTransactions from './pages/PropertyTransactions'
import OwnershipVerification from './pages/OwnershipVerification'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="app">
      <Header toggleSidebar={toggleSidebar} />
      <div className="app-container">
        <Sidebar isOpen={sidebarOpen} />
        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/land-registry" element={<LandRegistry />} />
            <Route path="/land-map" element={<LandMap />} />
            <Route path="/property-transactions" element={<PropertyTransactions />} />
            <Route path="/ownership-verification" element={<OwnershipVerification />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App