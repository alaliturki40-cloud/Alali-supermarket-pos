import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { StoreProvider } from './context/StoreContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import POS from './pages/POS'
import Offers from './pages/Offers'
import Manager from './pages/Manager'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  const [toast, setToast] = useState(null)

  const notify = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <StoreProvider>
      <div style={{ minHeight: '100vh', background: '#F4E2E8' }}>
        <Navbar />
        {toast && (
          <div className="notif-toast">
            <i className="ti ti-check" />
            {toast}
          </div>
        )}
        <div className="page-enter">
          <Routes>
            <Route path="/"        element={<Home    notify={notify} />} />
            <Route path="/pos"     element={<POS     notify={notify} />} />
            <Route path="/offers"  element={<Offers  notify={notify} />} />
            <Route path="/manager" element={<Manager notify={notify} />} />
            <Route path="/about"   element={<About />} />
            <Route path="/contact" element={<Contact notify={notify} />} />
          </Routes>
        </div>
      </div>
    </StoreProvider>
  )
}
