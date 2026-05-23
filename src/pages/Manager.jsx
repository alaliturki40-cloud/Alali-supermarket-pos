import { useState } from 'react'
import { useStore } from '../context/StoreContext'

export default function Manager({ notify }) {
  const { products, categories, addProduct, deleteProduct, addCategory, getIcon } = useStore()
  const [mgrCat, setMgrCat] = useState('الكل')
  const [newCat, setNewCat] = useState('')
  const [form, setForm] = useState({ name: '', price: '', cat: categories[0] || '', sale: '' })

  const filtered = mgrCat === 'الكل' ? products : products.filter(p => p.cat === mgrCat)

  const handleAddCat = () => {
    if (addCategory(newCat.trim())) {
      notify('تمت إضافة الفئة: ' + newCat.trim())
      setNewCat('')
    } else {
      notify('اسم الفئة غير صحيح أو موجود مسبقاً')
    }
  }

  const handleAddProd = () => {
    const { name, price, cat, sale } = form
    if (!name || !price || !cat) { notify('يرجى تعبئة جميع الحقول'); return }
    addProduct({ name, price: parseFloat(price), cat, sale: Math.min(parseInt(sale) || 0, 80) })
    setForm({ name: '', price: '', cat: categories[0] || '', sale: '' })
    notify('تمت إضافة: ' + name)
  }

  const handleDelete = (id, name) => {
    deleteProduct(id)
    notify('تم حذف: ' + name)
  }

  return (
    <div>
      {/* Header */}
      <div style={{ background: '#5D1220', padding: '22px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 500, color: '#fff', marginBottom: 2 }}>إدارة الأصناف والمنتجات</div>
          <div style={{ fontSize: 12, color: '#F4C3D7' }}>أضف وعدّل الفئات والمنتجات</div>
        </div>
        <div style={{ background: '#A32844', color: '#fff', padding: '7px 16px', borderRadius: 8, fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <i className="ti ti-shield-check" /> وضع المدير
        </div>
      </div>

      <div style={{ padding: '22px 24px', background: '#F4E2E8' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '270px 1fr', gap: 18 }}>

          {/* Left — Categories panel */}
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1208', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
              <i className="ti ti-category" style={{ color: '#A32844' }} /> الفئات
            </div>

            {/* All */}
            <div onClick={() => setMgrCat('الكل')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px', border: `0.5px solid ${'الكل' === mgrCat ? '#A32844' : '#E6D3DA'}`, background: 'الكل' === mgrCat ? '#F7E0E8' : 'transparent', borderRadius: 8, cursor: 'pointer', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#1a1208' }}>
                <i className="ti ti-apps" style={{ fontSize: 16, color: '#A32844' }} /> الكل
              </div>
              <span style={{ fontSize: 10, color: '#888', background: '#F4E2E8', padding: '2px 7px', borderRadius: 10 }}>{products.length}</span>
            </div>

            {/* Category list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
              {categories.map(c => (
                <div key={c} onClick={() => setMgrCat(c)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px', border: `0.5px solid ${c === mgrCat ? '#A32844' : '#E6D3DA'}`, background: c === mgrCat ? '#F7E0E8' : 'transparent', borderRadius: 8, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#1a1208' }}>
                    <i className={`ti ${getIcon(c)}`} style={{ fontSize: 16, color: '#A32844' }} /> {c}
                  </div>
                  <span style={{ fontSize: 10, color: '#888', background: '#F4E2E8', padding: '2px 7px', borderRadius: 10 }}>
                    {products.filter(p => p.cat === c).length}
                  </span>
                </div>
              ))}
            </div>

            {/* Add category */}
            <div style={{ fontSize: 11, color: '#888', marginBottom: 7 }}>إضافة فئة جديدة</div>
            <div style={{ display: 'flex', gap: 7 }}>
              <input value={newCat} onChange={e => setNewCat(e.target.value)}
                placeholder="اسم الفئة..."
                style={{ flex: 1, padding: '8px 10px', border: '0.5px solid #E6D3DA', borderRadius: 7, fontSize: 12, background: '#F8E5EC', color: '#1a1208', outline: 'none' }} />
              <button onClick={handleAddCat} className="btn-amber" style={{ padding: '8px 12px' }}>
                <i className="ti ti-plus" />
              </button>
            </div>
          </div>

          {/* Right — Products panel */}
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1208', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
              <i className="ti ti-package" style={{ color: '#A32844' }} /> المنتجات —
              <span style={{ color: '#A32844' }}>{mgrCat}</span>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto', marginBottom: 16 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['المنتج','الفئة','السعر','عرض',''].map(h => (
                      <th key={h} style={{ fontSize: 11, color: '#888', textAlign: 'right', padding: '7px 10px', borderBottom: '0.5px solid #E6D3DA', fontWeight: 500 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => (
                    <tr key={p.id}>
                      <td style={{ fontSize: 12, color: '#1a1208', padding: '8px 10px', borderBottom: '0.5px solid #f0ebe2' }}>
                        <span style={{ width: 26, height: 26, borderRadius: 6, background: '#F7E0E8', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#7A1D35', marginLeft: 7 }}>
                          <i className={`ti ${p.ic}`} />
                        </span>
                        {p.name}
                      </td>
                      <td style={{ fontSize: 12, padding: '8px 10px', borderBottom: '0.5px solid #f0ebe2' }}>
                        <span className="tag-amber">{p.cat}</span>
                      </td>
                      <td style={{ fontSize: 12, color: '#1a1208', padding: '8px 10px', borderBottom: '0.5px solid #f0ebe2' }}>${p.price.toFixed(2)}</td>
                      <td style={{ fontSize: 12, padding: '8px 10px', borderBottom: '0.5px solid #f0ebe2' }}>
                        {p.sale > 0
                          ? <span style={{ color: '#A12B42', fontSize: 11, fontWeight: 500 }}>-{p.sale}%</span>
                          : '—'}
                      </td>
                      <td style={{ padding: '8px 10px', borderBottom: '0.5px solid #f0ebe2' }}>
                        <button onClick={() => handleDelete(p.id, p.name)}
                          style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: 13, opacity: 0.4 }}
                          onMouseOver={e => { e.currentTarget.style.opacity=1; e.currentTarget.style.color='#A12B42' }}
                          onMouseOut={e => { e.currentTarget.style.opacity=0.4; e.currentTarget.style.color='#aaa' }}>
                          <i className="ti ti-trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add product form */}
            <div style={{ background: '#F8E5EC', borderRadius: 9, padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: '#888', marginBottom: 9 }}>
                <i className="ti ti-plus" /> إضافة منتج جديد
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  placeholder="اسم المنتج" className="input-field" />
                <input value={form.price} onChange={e => setForm({...form, price: e.target.value})}
                  type="number" placeholder="السعر $" step="0.01" className="input-field" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                <select value={form.cat} onChange={e => setForm({...form, cat: e.target.value})} className="input-field">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input value={form.sale} onChange={e => setForm({...form, sale: e.target.value})}
                  type="number" placeholder="خصم % (اختياري)" min="0" max="80" className="input-field" />
              </div>
              <button onClick={handleAddProd} className="btn-amber" style={{ width: '100%', justifyContent: 'center', padding: 9 }}>
                <i className="ti ti-plus" /> إضافة المنتج
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
