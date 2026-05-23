import { useState } from 'react'
import { useStore } from '../context/StoreContext'
import { useNavigate } from 'react-router-dom'

export default function Offers({ notify }) {
  const { products, addToCart } = useStore()
  const navigate = useNavigate()
  const [offerCat, setOfferCat] = useState('الكل')

  const saleProducts = products.filter(p => p.sale > 0)
  const offerCats = ['الكل', ...new Set(saleProducts.map(p => p.cat))]
  const filtered = saleProducts.filter(p => offerCat === 'الكل' || p.cat === offerCat)

  const handleAdd = (p) => {
    addToCart(p)
    notify(p.name + ' أُضيف للسلة')
  }

  return (
    <div>
      {/* Header */}
      <div style={{ background: '#5D1220', padding: '32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 500, color: '#fff', marginBottom: 4 }}>العروض والتخفيضات</h2>
        <p style={{ fontSize: 13, color: '#F4C3D7' }}>أحدث العروض الحصرية في سوبرماركت العلي</p>
      </div>

      <div style={{ padding: '22px 24px', background: '#F4E2E8' }}>
        {/* Banner */}
        <div style={{ background: '#4A0F1E', borderRadius: 12, padding: '20px 24px', marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 500, color: '#fff', marginBottom: 3 }}>عروض نهاية الأسبوع</h3>
            <p style={{ fontSize: 12, color: '#F4C3D7' }}>خصومات تصل إلى 40% على مئات المنتجات</p>
          </div>
          <button className="btn-amber" onClick={() => navigate('/pos')}>
            <i className="ti ti-arrow-left" /> تسوق الآن
          </button>
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: 7, marginBottom: 18, flexWrap: 'wrap' }}>
          {offerCats.map(c => (
            <button key={c} onClick={() => setOfferCat(c)}
              style={{ background: c === offerCat ? '#F7E0E8' : '#fff', border: `0.5px solid ${c === offerCat ? '#A32844' : '#E6D3DA'}`, borderRadius: 20, padding: '5px 14px', fontSize: 12, cursor: 'pointer', color: c === offerCat ? '#5D1220' : '#888', fontWeight: c === offerCat ? 500 : 400 }}>
              {c}
            </button>
          ))}
        </div>

        {/* Offers Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 48, color: '#888' }}>لا توجد عروض في هذه الفئة</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            {filtered.map(p => {
              const newPrice = p.price * (1 - p.sale / 100)
              const saved = p.price - newPrice
              return (
                <div key={p.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ background: '#F7E0E8', padding: '20px', textAlign: 'center', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: 10, right: 10, background: '#A12B42', color: '#fff', fontSize: 11, fontWeight: 500, padding: '3px 8px', borderRadius: 8 }}>
                      -{p.sale}%
                    </span>
                    <i className={`ti ${p.ic}`} style={{ fontSize: 32, color: '#7A1D35' }} />
                  </div>
                  <div style={{ padding: 14 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1208', marginBottom: 3 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: '#888', marginBottom: 10 }}>{p.cat}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
                      <span style={{ fontSize: 16, fontWeight: 500, color: '#7A1D35' }}>${newPrice.toFixed(2)}</span>
                      <span style={{ fontSize: 12, color: '#aaa', textDecoration: 'line-through' }}>${p.price.toFixed(2)}</span>
                      <span style={{ fontSize: 10, color: '#A12B42', fontWeight: 500 }}>وفّر ${saved.toFixed(2)}</span>
                    </div>
                    <button onClick={() => handleAdd(p)} className="btn-amber" style={{ width: '100%', justifyContent: 'center' }}>
                      <i className="ti ti-shopping-cart" /> أضف للسلة
                    </button>
                    <div style={{ fontSize: 10, color: '#aaa', marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <i className="ti ti-clock" style={{ fontSize: 11 }} /> ينتهي قريباً
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
