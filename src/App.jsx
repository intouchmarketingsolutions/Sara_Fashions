// src/App.jsx

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'

import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

/* CONTEXT */
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { ProductsProvider } from './context/ProductsContext'

/* COMPONENTS */
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

/* PAGES */
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Women from './pages/Women'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Login from './pages/Login'
import MyOrders from './pages/MyOrders'
import Tailoring from './pages/Tailoring'
import Consultation from './pages/Consultation'
import Contact from './pages/Contact'
import AdminLogin from './pages/AdminLogin'
import Admin from './pages/Admin'

/* -------------------------------- */
/* LAYOUT WRAPPER */
/* -------------------------------- */

function AppLayout() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen bg-[#f8f3eb] text-[#111111] flex flex-col overflow-x-hidden">
      <ScrollToTop />

      {!isAdmin && <Navbar />}

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>

            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/women" element={<Women />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/tailoring" element={<Tailoring />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Home />} />

          </Routes>
        </AnimatePresence>
      </main>

      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
    </div>
  )
}

/* -------------------------------- */
/* APP */
/* -------------------------------- */

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductsProvider>
          <Router>
            <AppLayout />
          </Router>
        </ProductsProvider>
      </CartProvider>
    </AuthProvider>
  )
}
