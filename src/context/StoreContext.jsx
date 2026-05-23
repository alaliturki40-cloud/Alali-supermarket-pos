import { createContext, useContext, useState } from 'react'

const StoreContext = createContext(null)

const CAT_ICONS = {
  'الكل': 'ti-apps', 'مشروبات': 'ti-bottle', 'ألبان': 'ti-droplet',
  'بقوليات': 'ti-leaf', 'لحوم': 'ti-meat', 'خبز': 'ti-bread',
  'تنظيف': 'ti-sparkles', 'وجبات خفيفة': 'ti-cookie', 'فواكه': 'ti-apple',
}

const INITIAL_PRODUCTS = [
  { id:1,  name:'حليب طازج 1L',     price:1.50, cat:'ألبان',       ic:'ti-droplet',    sale:0  },
  { id:2,  name:'خبز عربي',          price:0.75, cat:'خبز',         ic:'ti-bread',      sale:20 },
  { id:3,  name:'بيض (12 حبة)',      price:2.20, cat:'ألبان',       ic:'ti-egg',        sale:0  },
  { id:4,  name:'عصير برتقال',       price:1.80, cat:'مشروبات',     ic:'ti-glass-full', sale:15 },
  { id:5,  name:'أرز 1 كيلو',       price:1.10, cat:'بقوليات',     ic:'ti-grain',      sale:0  },
  { id:6,  name:'دجاج 1 كيلو',      price:4.50, cat:'لحوم',        ic:'ti-drumstick',  sale:10 },
  { id:7,  name:'صلصة طماطم',        price:1.25, cat:'بقوليات',     ic:'ti-bottle',     sale:0  },
  { id:8,  name:'جبن بلدي 200g',    price:2.75, cat:'ألبان',       ic:'ti-cheese',     sale:25 },
  { id:9,  name:'ماء معدني 1.5L',   price:0.60, cat:'مشروبات',     ic:'ti-droplets',   sale:0  },
  { id:10, name:'شامبو',             price:3.20, cat:'تنظيف',       ic:'ti-wash',       sale:30 },
  { id:11, name:'زيت زيتون 1L',     price:5.50, cat:'بقوليات',     ic:'ti-flask',      sale:0  },
  { id:12, name:'لحم بقري 500g',    price:6.00, cat:'لحوم',        ic:'ti-meat',       sale:0  },
  { id:13, name:'كولا 1.5L',        price:1.00, cat:'مشروبات',     ic:'ti-bottle',     sale:20 },
  { id:14, name:'صابون يدين',        price:1.50, cat:'تنظيف',       ic:'ti-sparkles',   sale:0  },
  { id:15, name:'بسكويت شوكولاتة',  price:0.90, cat:'وجبات خفيفة', ic:'ti-cookie',     sale:40 },
  { id:16, name:'موز 1 كيلو',       price:1.30, cat:'فواكه',        ic:'ti-apple',      sale:0  },
]

const INITIAL_CATS = ['مشروبات','ألبان','بقوليات','لحوم','خبز','تنظيف','وجبات خفيفة','فواكه']

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(INITIAL_PRODUCTS)
  const [categories, setCategories] = useState(INITIAL_CATS)
  const [cart, setCart] = useState({})
  const [discount, setDiscount] = useState(0)
  const [nextId, setNextId] = useState(17)

  const getIcon = (cat) => CAT_ICONS[cat] || 'ti-package'

  const addToCart = (product) => {
    const actualPrice = product.sale > 0
      ? product.price * (1 - product.sale / 100)
      : product.price
    setCart(prev => ({
      ...prev,
      [product.id]: prev[product.id]
        ? { ...prev[product.id], qty: prev[product.id].qty + 1 }
        : { ...product, actualPrice, qty: 1 }
    }))
  }

  const changeQty = (id, delta) => {
    setCart(prev => {
      const item = prev[id]
      if (!item) return prev
      if (item.qty + delta <= 0) {
        const next = { ...prev }; delete next[id]; return next
      }
      return { ...prev, [id]: { ...item, qty: item.qty + delta } }
    })
  }

  const removeFromCart = (id) => {
    setCart(prev => { const next = { ...prev }; delete next[id]; return next })
  }

  const clearCart = () => { setCart({}); setDiscount(0) }

  const cartItems = Object.values(cart)
  const subtotal = cartItems.reduce((s, i) => s + i.actualPrice * i.qty, 0)
  const discountAmt = subtotal * (discount / 100)
  const tax = (subtotal - discountAmt) * 0.10
  const total = subtotal - discountAmt + tax

  const addProduct = (prod) => {
    setProducts(prev => [...prev, { ...prod, id: nextId, ic: getIcon(prod.cat) }])
    setNextId(n => n + 1)
  }

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
    removeFromCart(id)
  }

  const addCategory = (name) => {
    if (!name || categories.includes(name)) return false
    setCategories(prev => [...prev, name])
    return true
  }

  return (
    <StoreContext.Provider value={{
      products, categories, cart, cartItems,
      discount, setDiscount,
      subtotal, discountAmt, tax, total,
      addToCart, changeQty, removeFromCart, clearCart,
      addProduct, deleteProduct, addCategory,
      getIcon, CAT_ICONS,
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
