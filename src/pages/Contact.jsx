import { useState } from 'react'

export default function Contact({ notify }) {
  const [form, setForm] = useState({ name:'', email:'', subject:'استفسار عام', message:'' })

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) { notify('يرجى تعبئة جميع الحقول'); return }
    notify('تم إرسال رسالتك بنجاح')
    setForm({ name:'', email:'', subject:'استفسار عام', message:'' })
  }

  const info = [
    { ic:'ti-mail',    t:'البريد الإلكتروني', v:'info@ali-supermarket.com' },
    { ic:'ti-phone',   t:'الهاتف',             v:'+961 1 234 567' },
    { ic:'ti-map-pin', t:'العنوان',            v:'بيروت، لبنان — شارع الحمرا' },
    { ic:'ti-clock',   t:'أوقات العمل',        v:'الاثنين – السبت، 8 ص – 10 م' },
  ]

  return (
    <div>
      <div style={{ background: '#5D1220', padding: '28px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 22, fontWeight: 500, color: '#fff', marginBottom: 3 }}>تواصل معنا</h2>
        <p style={{ fontSize: 12, color: '#F4C3D7' }}>نحن هنا لمساعدتك — راسلنا وسنرد بأسرع وقت</p>
      </div>

      <div style={{ padding: '22px 24px', background: '#F4E2E8', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        {/* Form */}
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1208', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
            <i className="ti ti-send" style={{ color: '#A32844' }} /> أرسل رسالة
          </div>
          {[
            { label:'الاسم الكامل', key:'name',    type:'text',  ph:'أدخل اسمك' },
            { label:'البريد الإلكتروني', key:'email', type:'email', ph:'example@email.com' },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 11, color: '#888', marginBottom: 5 }}>{f.label}</label>
              <input value={form[f.key]} onChange={e => setForm({...form,[f.key]:e.target.value})}
                type={f.type} placeholder={f.ph} className="input-field" />
            </div>
          ))}
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 11, color: '#888', marginBottom: 5 }}>الموضوع</label>
            <select value={form.subject} onChange={e => setForm({...form, subject:e.target.value})} className="input-field">
              <option>استفسار عام</option>
              <option>دعم تقني</option>
              <option>اقتراح</option>
              <option>شكوى</option>
            </select>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 11, color: '#888', marginBottom: 5 }}>الرسالة</label>
            <textarea value={form.message} onChange={e => setForm({...form, message:e.target.value})}
              placeholder="اكتب رسالتك هنا..." className="input-field"
              style={{ minHeight: 90, resize: 'vertical' }} />
          </div>
          <button onClick={handleSend} className="btn-dark" style={{ width: '100%', justifyContent: 'center' }}>
            <i className="ti ti-send" /> إرسال الرسالة
          </button>
        </div>

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {info.map(i => (
            <div key={i.t} className="card" style={{ display: 'flex', gap: 12, padding: '14px 16px' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#F7E0E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 17, color: '#A32844' }}>
                <i className={`ti ${i.ic}`} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#1a1208', marginBottom: 2 }}>{i.t}</div>
                <div style={{ fontSize: 11, color: '#888' }}>{i.v}</div>
              </div>
            </div>
          ))}
          <div style={{ background: '#F7E0E8', borderRadius: 10, padding: 18, textAlign: 'center', border: '0.5px solid #C75A78' }}>
            <i className="ti ti-map" style={{ fontSize: 28, color: '#A32844', display: 'block', marginBottom: 6 }} />
            <div style={{ fontSize: 13, fontWeight: 500, color: '#5D1220' }}>سوبرماركت العلي</div>
            <div style={{ fontSize: 11, color: '#7A1D35', marginTop: 2 }}>Al-Ali Supermarket · Beirut, Lebanon</div>
          </div>
        </div>
      </div>
    </div>
  )
}
