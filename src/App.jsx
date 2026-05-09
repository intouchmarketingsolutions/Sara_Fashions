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
import Tailoring from './pages/Tailoring'
import Consultation from './pages/Consultation'
import Contact from './pages/Contact'

/* -------------------------------- */
/* ROUTES */
/* -------------------------------- */

function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">

      <Routes
        location={location}
        key={location.pathname}
      >

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* PRODUCTS */}
        <Route
          path="/products"
          element={<Products />}
        />

        {/* WOMEN COLLECTION */}
        <Route
          path="/women"
          element={<Women />}
        />

        {/* PRODUCT DETAIL */}
        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />

        {/* CART */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* TAILORING */}
        <Route
          path="/tailoring"
          element={<Tailoring />}
        />

        {/* CONSULTATION */}
        <Route
          path="/consultation"
          element={<Consultation />}
        />

        {/* ABOUT */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* CONTACT */}
        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* FALLBACK ROUTE */}
        <Route path="*" element={<Home />} />

      </Routes>

    </AnimatePresence>
  )
}

/* -------------------------------- */
/* APP */
/* -------------------------------- */

export default function App() {
  return (
    <AuthProvider>
    <CartProvider>

      <Router>
        <ScrollToTop />

        <div className="min-h-screen bg-[#f8f3eb] text-[#111111] flex flex-col overflow-x-hidden">

          {/* NAVBAR */}
          <Navbar />

          {/* MAIN CONTENT */}
          <main className="flex-1">

            <AppRoutes />

          </main>

          {/* FOOTER */}
          <Footer />

          {/* WHATSAPP BUTTON */}
          <WhatsAppButton />

        </div>

      </Router>

    </CartProvider>
    </AuthProvider>
  )
}