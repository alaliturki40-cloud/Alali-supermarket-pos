# سوبرماركت العلي — نظام نقاط البيع
## Al-Ali Supermarket POS System

A modern point-of-sale web application built with **ReactJS** and **Tailwind CSS** as part of CSCI390 — Web Programming (Phase 2).

---

## 📋 Project Description

A full-featured supermarket cashier/POS system that allows staff to:
- Browse and search products by category
- Add items to cart with quantity control
- Apply discounts and view tax calculations
- Generate receipts on checkout
- View current sale offers
- Manage categories and products dynamically

---

## 🛠 Technologies Used

| Technology | Purpose |
|---|---|
| ReactJS 18 | Frontend framework |
| React Router v6 | Multi-page navigation |
| Tailwind CSS 3 | Styling & responsive design |
| Vite | Build tool |
| Context API | Global state management |
| Git & GitHub | Version control |
| Vercel | Deployment |

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/ali-supermarket-pos.git

# Navigate into the project
cd ali-supermarket-pos

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages (alternative)

```bash
npm run build
# Upload the dist/ folder to GitHub Pages
```

---

## 📁 Project Structure

```
src/
├── components/
│   └── Navbar.jsx          # Navigation bar with clock
├── context/
│   └── StoreContext.jsx     # Global state (products, cart, categories)
├── pages/
│   ├── Home.jsx            # Welcome / landing page
│   ├── POS.jsx             # Cashier / point-of-sale
│   ├── Offers.jsx          # Sale offers page
│   ├── Manager.jsx         # Category & product management
│   ├── About.jsx           # About the system
│   └── Contact.jsx         # Contact form
├── App.jsx                 # Routes setup
├── main.jsx                # Entry point
└── index.css               # Global styles
```

---

## 📄 Pages

| Page | Route | Description |
|---|---|---|
| الرئيسية (Home) | `/` | Welcome page with stats and category shortcuts |
| الكاشير (POS) | `/pos` | Full cashier with cart, discount, receipt |
| العروض (Offers) | `/offers` | Products on sale with filters |
| إدارة الأصناف (Manager) | `/manager` | Add/delete categories and products |
| من نحن (About) | `/about` | System info and tech stack |
| تواصل (Contact) | `/contact` | Contact form and store info |

---

## ✨ Key Features

- **Real-time cart** with quantity controls
- **Category filtering** on POS and Offers pages
- **Discount system** (percentage-based)
- **Auto tax calculation** (10%)
- **Receipt modal** on checkout
- **Dynamic category/product management** (add/delete at runtime)
- **Sale badges** on discounted products
- **Responsive design** (desktop & mobile)
- **Live clock** in navbar
- **Toast notifications** for all actions

---

## 👥 Group Contribution Statement

| Name | Contribution |
|---|---|
| [Student 1] | Frontend development, React components |
| [Student 2] | UI/UX design, Tailwind CSS styling |
| [Student 3] | State management, routing, deployment |

---

## 📸 Screenshots

> Add screenshots of each page here after running the app.

---

*CSCI390 — Web Programming | Department of Computer Science and Information Technology*
