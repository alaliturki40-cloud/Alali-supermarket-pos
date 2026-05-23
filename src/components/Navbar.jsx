import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export default function Navbar() {
  const { cartItems } = useStore()
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0)

  const links = [
    { to: '/',        icon: 'ti-home',        label: 'الرئيسية' },
    { to: '/pos',     icon: 'ti-cash-register',label: 'الكاشير'  },
    { to: '/offers',  icon: 'ti-tag',          label: 'العروض'   },
    { to: '/manager', icon: 'ti-adjustments',  label: 'إدارة الأصناف' },
    { to: '/about',   icon: 'ti-info-circle',  label: 'من نحن'   },
    { to: '/contact', icon: 'ti-mail',         label: 'تواصل'    },
  ]

  return (
    <nav style={{ background: '#5D1220', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, background: '#A32844', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <i className="ti ti-shopping-cart" style={{ fontSize: 18, color: '#F7E0E8' }} />
        </div>
        <div>
          <div style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>سوبرماركت العلي</div>
          <div style={{ color: '#F4C3D7', fontSize: 10, letterSpacing: '0.04em' }}>Al-Ali Supermarket · POS</div>
        </div>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: 4 }}>
        {links.map(l => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '7px 12px', borderRadius: 7, fontSize: 12,
              textDecoration: 'none', transition: 'background 0.13s',
              background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
              color: isActive ? '#fff' : '#F4C3D7',
              fontWeight: isActive ? 500 : 400,
            })}>
            <i className={`ti ${l.icon}`} />
            {l.label}
            {l.to === '/pos' && cartCount > 0 && (
              <span style={{ background: '#A12B42', color: '#fff', fontSize: 10, padding: '1px 6px', borderRadius: 10, marginRight: 2 }}>
                {cartCount}
              </span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Clock */}
      <Clock />
    </nav>
  )
}

function Clock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString('ar-LB'))
  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString('ar-LB')), 1000)
    return () => clearInterval(t)
  }, [])
  return (
    <div style={{ color: '#F4C3D7', fontSize: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
      <i className="ti ti-clock" />
      {time}
    </div>
  )
}
