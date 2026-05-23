import { useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export default function Home() {
  const navigate = useNavigate()
  const { categories, getIcon } = useStore()

  const allCats = ['الكل', ...categories]

  return (
    <div>
      {/* Hero */}
      <div style={{ background: '#5D1220', padding: '52px 36px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: '#4A0F1E', borderRadius: '50%', opacity: 0.5 }} />
        <div style={{ position: 'absolute', bottom: -60, left: -30, width: 160, height: 160, background: '#7A1D35', borderRadius: '50%', opacity: 0.3 }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(163,40,68,0.25)', border: '0.5px solid #A32844', color: '#F4C3D7', padding: '4px 14px', borderRadius: 20, fontSize: 11, marginBottom: 18 }}>
            <i className="ti ti-star" /> نظام نقاط البيع الأحدث
          </span>
          <h1 style={{ fontSize: 34, fontWeight: 500, color: '#fff', marginBottom: 4 }}>
            أهلاً بك في <span style={{ color: '#F4C3D7' }}>سوبرماركت العلي</span>
          </h1>
          <p style={{ fontSize: 13, color: '#C75A78', letterSpacing: '0.06em', marginBottom: 10 }}>Welcome to Al-Ali Supermarket</p>
          <p style={{ fontSize: 13, color: '#F4C3D7', marginBottom: 28, lineHeight: 1.7 }}>
            نظام كاشير متكامل وسريع — يجعل تجربة الدفع أسهل وأذكى
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button className="btn-amber" onClick={() => navigate('/pos')}>
              <i className="ti ti-player-play" /> ابدأ الآن
            </button>
            <button onClick={() => navigate('/offers')} style={{ background: 'transparent', color: '#F4C3D7', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 22px', borderRadius: 9, fontSize: 13, cursor: 'pointer' }}>
              <i className="ti ti-tag" /> العروض
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', background: '#fff', borderBottom: '0.5px solid #E6D3DA' }}>
        {[['500+','منتج'],['99.9%','وقت تشغيل'],['2 ث','متوسط الدفع'],['24/7','دعم فني']].map(([n,l]) => (
          <div key={l} style={{ padding: '18px', textAlign: 'center', borderLeft: '0.5px solid #E6D3DA' }}>
            <div style={{ fontSize: 22, fontWeight: 500, color: '#7A1D35' }}>{n}</div>
            <div style={{ fontSize: 11, color: '#888', marginTop: 3 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Body */}
      <div style={{ padding: 24 }}>
        {/* Features */}
        <div style={{ fontSize: 11, fontWeight: 500, color: '#888', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>مميزات النظام</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 24 }}>
          {[
            { ic:'ti-bolt',        bg:'#F7E0E8', c:'#7A1D35', t:'دفع سريع',        d:'أتمم عملية الدفع في ثوانٍ بواجهة مبسطة' },
            { ic:'ti-tag',         bg:'#F8D7E0', c:'#A32D2D', t:'عروض وخصومات',   d:'تابع أحدث العروض والتخفيضات الحصرية' },
            { ic:'ti-adjustments', bg:'#E6F1FB', c:'#185FA5', t:'إدارة الأصناف',  d:'أضف وعدّل الأصناف والمنتجات بسهولة' },
          ].map(f => (
            <div key={f.t} className="card">
              <div style={{ width: 36, height: 36, borderRadius: 8, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 9 }}>
                <i className={`ti ${f.ic}`} style={{ fontSize: 17, color: f.c }} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1208', marginBottom: 3 }}>{f.t}</div>
              <div style={{ fontSize: 11, color: '#888', lineHeight: 1.6 }}>{f.d}</div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div style={{ fontSize: 11, fontWeight: 500, color: '#888', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>تصفح حسب الفئة</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px,1fr))', gap: 8 }}>
          {allCats.map(cat => (
            <div key={cat} onClick={() => navigate('/pos', { state: { cat } })}
              style={{ background: '#fff', border: '0.5px solid #E6D3DA', borderRadius: 9, padding: '12px 6px', textAlign: 'center', cursor: 'pointer' }}
              onMouseOver={e => e.currentTarget.style.borderColor='#A32844'}
              onMouseOut={e => e.currentTarget.style.borderColor='#E6D3DA'}>
              <i className={`ti ${getIcon(cat)}`} style={{ fontSize: 20, color: '#A32844', display: 'block', marginBottom: 5 }} />
              <div style={{ fontSize: 10, color: '#888' }}>{cat}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
