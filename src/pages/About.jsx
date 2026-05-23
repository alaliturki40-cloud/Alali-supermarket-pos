export default function About() {
  const features = [
    { ic:'ti-scan',        bg:'#F7E0E8', c:'#7A1D35', t:'بحث سريع',        d:'ابحث بالاسم أو الفئة بسرعة' },
    { ic:'ti-calculator',  bg:'#F7E0E8', c:'#7A1D35', t:'حساب تلقائي',     d:'الضريبة والخصومات فوراً' },
    { ic:'ti-file-invoice',bg:'#F7E0E8', c:'#7A1D35', t:'فاتورة مفصّلة',   d:'فاتورة بعد كل عملية دفع' },
    { ic:'ti-tag',         bg:'#F7E0E8', c:'#7A1D35', t:'عروض وخصومات',    d:'صفحة عروض مخصصة' },
    { ic:'ti-adjustments', bg:'#F7E0E8', c:'#7A1D35', t:'إدارة الأصناف',   d:'إضافة وحذف الأصناف' },
    { ic:'ti-device-mobile',bg:'#F7E0E8',c:'#7A1D35', t:'تصميم متجاوب',   d:'يعمل على كل الأجهزة' },
  ]

  const techs = [
    { ic:'ti-brand-react',      label:'ReactJS' },
    { ic:'ti-wind',             label:'Tailwind CSS' },
    { ic:'ti-brand-javascript', label:'JavaScript' },
    { ic:'ti-brand-git',        label:'Git & GitHub' },
    { ic:'ti-layout-navbar',    label:'React Router' },
    { ic:'ti-brand-vercel',     label:'Vercel' },
  ]

  return (
    <div>
      {/* Header */}
      <div style={{ background: '#5D1220', padding: '32px', display: 'flex', alignItems: 'center', gap: 22 }}>
        <div style={{ width: 64, height: 64, background: '#A32844', borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <i className="ti ti-building-store" style={{ fontSize: 30, color: '#F7E0E8' }} />
        </div>
        <div>
          <span style={{ background: 'rgba(186,117,23,0.3)', color: '#F4C3D7', fontSize: 10, padding: '3px 11px', borderRadius: 20, display: 'inline-block', marginBottom: 7 }}>
            CSCI390 — Web Programming
          </span>
          <div style={{ fontSize: 22, fontWeight: 500, color: '#fff', marginBottom: 2 }}>سوبرماركت العلي</div>
          <div style={{ fontSize: 12, color: '#F4C3D7', letterSpacing: '0.05em', marginBottom: 7 }}>Al-Ali Supermarket · POS System</div>
          <p style={{ fontSize: 12, color: '#F4C3D7', lineHeight: 1.7, maxWidth: 500 }}>
            نظام نقاط بيع متكامل مبني بـ ReactJS وTailwind CSS، يهدف إلى تسريع عمليات الدفع وتوفير تجربة سلسة للكاشير والزبائن.
          </p>
        </div>
      </div>

      <div style={{ padding: '24px', background: '#F4E2E8' }}>
        {/* Features */}
        <div style={{ fontSize: 11, fontWeight: 500, color: '#888', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>مميزات النظام</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 24 }}>
          {features.map(f => (
            <div key={f.t} className="card">
              <div style={{ width: 34, height: 34, borderRadius: 8, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <i className={`ti ${f.ic}`} style={{ fontSize: 16, color: f.c }} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#1a1208', marginBottom: 3 }}>{f.t}</div>
              <div style={{ fontSize: 11, color: '#888', lineHeight: 1.6 }}>{f.d}</div>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div style={{ fontSize: 11, fontWeight: 500, color: '#888', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>التقنيات المستخدمة</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {techs.map(t => (
            <div key={t.label} style={{ background: '#fff', border: '0.5px solid #E6D3DA', borderRadius: 20, padding: '5px 14px', fontSize: 12, color: '#888', display: 'flex', alignItems: 'center', gap: 6 }}>
              <i className={`ti ${t.ic}`} /> {t.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
