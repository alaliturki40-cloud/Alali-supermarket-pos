import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export default function POS({ notify }) {
  const { products, categories, cartItems, cart, discount, setDiscount,
          subtotal, discountAmt, tax, total,
          addToCart, changeQty, removeFromCart, clearCart } = useStore()

  const location = useLocation()
  const [curCat, setCurCat] = useState('الكل')
  const [search, setSearch] = useState('')
  const [discInput, setDiscInput] = useState('')
  const [showReceipt, setShowReceipt] = useState(false)

  // Navigate from home with category
  useEffect(() => {
    if (location.state?.cat) setCurCat(location.state.cat)
  }, [location.state])

  const allCats = ['الكل', ...categories]

  const filtered = products.filter(p =>
    (curCat === 'الكل' || p.cat === curCat) &&
    (!search || p.name.includes(search))
  )

  const handleAddToCart = (p) => {
    addToCart(p)
    notify(p.name + ' أُضيف للسلة')
  }

  const handleCheckout = () => {
    if (!cartItems.length) { notify('السلة فارغة!'); return }
    setShowReceipt(true)
  }

  const closeReceipt = () => { setShowReceipt(false); clearCart(); setDiscInput('') }

  const actualPrice = (p) => p.sale > 0 ? p.price * (1 - p.sale / 100) : p.price

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 310px', height: 'calc(100vh - 56px)' }}>

      {/* LEFT — Products */}
      <div style={{ padding: 16, overflowY: 'auto', background: '#F4E2E8' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1208' }}>نقطة البيع</span>
          <span style={{ fontSize: 11, color: '#888' }}>الكاشير: أحمد العلي</span>
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>
          {allCats.map(c => (
            <button key={c} onClick={() => setCurCat(c)}
              style={{ background: c === curCat ? '#F7E0E8' : '#fff', border: `0.5px solid ${c === curCat ? '#A32844' : '#E6D3DA'}`, borderRadius: 20, padding: '4px 12px', fontSize: 11, cursor: 'pointer', color: c === curCat ? '#5D1220' : '#888', fontWeight: c === curCat ? 500 : 400 }}>
              {c}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '0.5px solid #E6D3DA', borderRadius: 8, padding: '7px 11px', marginBottom: 12 }}>
          <i className="ti ti-search" style={{ fontSize: 14, color: '#888' }} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="ابحث عن منتج..."
            style={{ border: 'none', outline: 'none', flex: 1, fontSize: 13, background: 'transparent', color: '#1a1208' }} />
        </div>

        {/* Products grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 9 }}>
          {filtered.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 32, color: '#888', fontSize: 13 }}>لا توجد منتجات</div>
          )}
          {filtered.map(p => (
            <div key={p.id} onClick={() => handleAddToCart(p)}
              style={{ background: '#fff', border: '0.5px solid #E6D3DA', borderRadius: 10, padding: 12, cursor: 'pointer', position: 'relative', transition: 'border-color 0.12s' }}
              onMouseOver={e => e.currentTarget.style.borderColor='#A32844'}
              onMouseOut={e => e.currentTarget.style.borderColor='#E6D3DA'}>
              {p.sale > 0 && (
                <span style={{ position: 'absolute', top: 7, right: 7, background: '#A12B42', color: '#fff', fontSize: 9, padding: '2px 6px', borderRadius: 10, fontWeight: 500 }}>
                  -{p.sale}%
                </span>
              )}
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#F7E0E8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 7, fontSize: 18, color: '#7A1D35' }}>
                <i className={`ti ${p.ic}`} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#1a1208', marginBottom: 2 }}>{p.name}</div>
              <div style={{ fontSize: 10, color: '#888', marginBottom: 6 }}>{p.cat}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 500, color: '#7A1D35' }}>${actualPrice(p).toFixed(2)}</span>
                  {p.sale > 0 && <span style={{ fontSize: 10, color: '#aaa', textDecoration: 'line-through', marginRight: 4 }}>${p.price.toFixed(2)}</span>}
                </div>
                <div style={{ width: 20, height: 20, background: '#A32844', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14 }}>+</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — Cart */}
      <div style={{ background: '#fff', borderRight: '0.5px solid #E6D3DA', display: 'flex', flexDirection: 'column' }}>
        {/* Cart header */}
        <div style={{ padding: '12px 15px 9px', borderBottom: '0.5px solid #E6D3DA' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1208' }}><i className="ti ti-shopping-cart" /> السلة</span>
            <span style={{ background: '#F7E0E8', color: '#5D1220', fontSize: 10, padding: '2px 8px', borderRadius: 10 }}>
              {cartItems.reduce((s,i) => s+i.qty, 0)} منتج
            </span>
          </div>
          <div style={{ fontSize: 11, color: '#888' }}>{new Date().toLocaleDateString('ar-LB', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</div>
        </div>

        {/* Cart items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '9px 14px' }}>
          {cartItems.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 7, color: '#aaa' }}>
              <i className="ti ti-shopping-cart-off" style={{ fontSize: 32, opacity: 0.25 }} />
              <p style={{ fontSize: 12 }}>السلة فارغة</p>
            </div>
          ) : cartItems.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 0', borderBottom: '0.5px solid #f0ebe2' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#1a1208' }}>{item.name}</div>
                <div style={{ fontSize: 10, color: '#888' }}>${item.actualPrice.toFixed(2)} / قطعة</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <button onClick={() => changeQty(item.id, -1)} style={{ width: 19, height: 19, border: '0.5px solid #E6D3DA', borderRadius: 5, background: 'transparent', cursor: 'pointer', fontSize: 13, display:'flex',alignItems:'center',justifyContent:'center' }}>−</button>
                <span style={{ fontSize: 12, fontWeight: 500, minWidth: 14, textAlign: 'center' }}>{item.qty}</span>
                <button onClick={() => changeQty(item.id, 1)} style={{ width: 19, height: 19, border: '0.5px solid #E6D3DA', borderRadius: 5, background: 'transparent', cursor: 'pointer', fontSize: 13, display:'flex',alignItems:'center',justifyContent:'center' }}>+</button>
              </div>
              <span style={{ fontSize: 12, fontWeight: 500, color: '#7A1D35', minWidth: 42, textAlign: 'left' }}>${(item.actualPrice * item.qty).toFixed(2)}</span>
              <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: 13, opacity: 0.4 }}
                onMouseOver={e => { e.currentTarget.style.opacity=1; e.currentTarget.style.color='#A12B42' }}
                onMouseOut={e => { e.currentTarget.style.opacity=0.4; e.currentTarget.style.color='#aaa' }}>
                <i className="ti ti-x" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: '11px 14px', borderTop: '0.5px solid #E6D3DA' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 9 }}>
            <input value={discInput} onChange={e => setDiscInput(e.target.value)} type="number" placeholder="خصم %"
              style={{ flex: 1, padding: '7px 10px', border: '0.5px solid #E6D3DA', borderRadius: 7, fontSize: 12, background: '#F8E5EC', color: '#1a1208', outline:'none' }} />
            <button onClick={() => setDiscount(Math.min(Math.max(parseFloat(discInput)||0,0),100))}
              style={{ padding: '7px 10px', background: '#F7E0E8', border: 'none', borderRadius: 7, fontSize: 12, color: '#5D1220', cursor: 'pointer' }}>
              <i className="ti ti-tag" /> تطبيق
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#888', marginBottom: 4 }}><span>المجموع الفرعي</span><span>${subtotal.toFixed(2)}</span></div>
          {discount > 0 && subtotal > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#7A1D35', marginBottom: 4 }}><span>خصم {discount}%</span><span>-${discountAmt.toFixed(2)}</span></div>}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#888', marginBottom: 8 }}><span>ضريبة (10%)</span><span>${tax.toFixed(2)}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 500, color: '#1a1208', marginBottom: 10 }}><span>الإجمالي</span><span>${total.toFixed(2)}</span></div>
          <button onClick={clearCart} style={{ width: '100%', background: 'transparent', border: '0.5px solid #E6D3DA', color: '#888', padding: 7, borderRadius: 7, fontSize: 11, cursor: 'pointer', marginBottom: 6, display:'flex',alignItems:'center',justifyContent:'center',gap:5 }}>
            <i className="ti ti-trash" /> إفراغ السلة
          </button>
          <button onClick={handleCheckout} className="btn-dark" style={{ width: '100%', justifyContent: 'center', padding: 11 }}>
            <i className="ti ti-cash" /> إتمام الدفع
          </button>
        </div>
      </div>

      {/* Receipt Modal */}
      {showReceipt && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
          <div style={{ background: '#fff', borderRadius: 13, padding: 24, width: 280, border: '0.5px solid #E6D3DA' }}>
            <div style={{ textAlign: 'center', marginBottom: 14 }}>
              <div style={{ width: 40, height: 40, background: '#4A0F1E', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 7px', fontSize: 18, color: '#F4C3D7' }}>
                <i className="ti ti-shopping-cart" />
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#1a1208' }}>سوبرماركت العلي</div>
              <div style={{ fontSize: 10, color: '#888', letterSpacing: '0.04em' }}>Al-Ali Supermarket</div>
              <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>{new Date().toLocaleString('ar-LB')}</div>
            </div>
            <hr style={{ border: 'none', borderTop: '1px dashed #E6D3DA', margin: '9px 0' }} />
            {cartItems.map(i => (
              <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, padding: '3px 0', color: '#1a1208' }}>
                <span>{i.name} x{i.qty}</span>
                <span style={{ color: '#888' }}>${(i.actualPrice*i.qty).toFixed(2)}</span>
              </div>
            ))}
            <hr style={{ border: 'none', borderTop: '1px dashed #E6D3DA', margin: '9px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#888', marginBottom: 3 }}><span>المجموع الفرعي</span><span>${subtotal.toFixed(2)}</span></div>
            {discount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#888', marginBottom: 3 }}><span>خصم</span><span>-${discountAmt.toFixed(2)}</span></div>}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#888', marginBottom: 3 }}><span>ضريبة (10%)</span><span>${tax.toFixed(2)}</span></div>
            <hr style={{ border: 'none', borderTop: '1px dashed #E6D3DA', margin: '9px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 500, color: '#1a1208' }}><span>الإجمالي</span><span>${total.toFixed(2)}</span></div>
            <div style={{ background: '#F7E0E8', borderRadius: 7, padding: 8, textAlign: 'center', marginTop: 9, fontSize: 11, color: '#5D1220', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              <i className="ti ti-check" /> تمت عملية الدفع بنجاح
            </div>
            <button onClick={closeReceipt} className="btn-dark" style={{ width: '100%', justifyContent: 'center', padding: 10, marginTop: 12 }}>
              إغلاق وطباعة
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
