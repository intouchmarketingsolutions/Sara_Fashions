import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiSearch, FiX, FiShoppingCart, FiMenu,
  FiChevronDown, FiChevronRight, FiUser, FiLogOut, FiPackage,
} from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

import logo       from '../assets/images/logo/Sara-logo.png'
import sareeImg   from '../assets/images/categories/saree.jpg'
import lehengaImg from '../assets/images/categories/lehenga.jpg'
import kurtiImg   from '../assets/images/categories/kurti.jpg'
import gownImg    from '../assets/images/categories/gown.jpg'
import westernImg from '../assets/images/categories/western.jpg'
import shararaImg from '../assets/images/categories/Sharara.jpg'
import p1Img        from '../assets/images/products/p1.jpg'
import p2Img        from '../assets/images/products/p2.jpg'
import partyWearImg from '../assets/images/categories/party wear.jpg'
import officeWearImg from '../assets/images/categories/Office wear.jpg'

const categories = [
  { name: 'Sarees',     image: sareeImg,   pos: 'object-top' },
  { name: 'Lehengas',   image: lehengaImg, pos: 'object-top' },
  { name: 'Kurtis',     image: kurtiImg,   pos: 'object-top' },
  { name: 'Gowns',      image: gownImg,    pos: 'object-top' },
  { name: 'Western',    image: westernImg, pos: 'object-top' },
  { name: 'Sharara',    image: shararaImg, pos: 'object-top' },
  { name: 'Bridal',      image: p1Img,        pos: 'object-top' },
  { name: 'Ethnic',      image: p2Img,        pos: 'object-top' },
  { name: 'Party Wear',  image: partyWearImg, pos: 'object-top' },
  { name: 'Office Wear', image: officeWearImg,pos: 'object-top' },
]

const navLinks = [
  { label: 'Home',         to: '/' },
  { label: 'Collection',   to: '/products' },
  { label: 'Tailoring',    to: '/tailoring' },
  { label: 'Consultation', to: '/consultation' },
  { label: 'About',        to: '/about' },
  { label: 'Contact',      to: '/contact' },
]

export default function Navbar() {
  const [scrolled,         setScrolled]         = useState(false)
  const [atTop,            setAtTop]             = useState(true)
  const [mobileOpen,       setMobileOpen]        = useState(false)
  const [searchOpen,       setSearchOpen]        = useState(false)
  const [searchQuery,      setSearchQuery]       = useState('')
  const [serviceOpen,      setServiceOpen]       = useState(false)
  const [aboutOpen,        setAboutOpen]         = useState(false)
  const [mobileService,    setMobileService]     = useState(false)
  const [mobileAbout,      setMobileAbout]       = useState(false)

  const navigate     = useNavigate()
  const location     = useLocation()
  const { totalItems } = useCart()
  const { user, logout } = useAuth()

  /* close mobile menu on route change */
  useEffect(() => { setMobileOpen(false); setSearchOpen(false) }, [location.pathname])

  /* scroll — shadow + category bar visibility */
  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 20)
      setAtTop(window.scrollY < 80)
    }
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const linkCls = 'text-[14px] xl:text-[15px] uppercase tracking-widest font-semibold text-[#222] hover:text-[#c8a96b] transition-colors duration-300'

  return (
    <>
      {/* ═══════════════════════════════════════
          MAIN NAV
      ═══════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? 'bg-white shadow-md border-b border-[#eee]'
            : 'bg-[#f8f3eb]'
        }`}
      >
        {/* ── TOP BAR ── */}
        <div className="w-full px-0">
          <div className="flex items-center justify-between h-[58px] sm:h-[64px] lg:h-[70px] pl-0 pr-4 sm:pr-6 lg:pr-12">

            {/* LEFT — Logo */}
            <Link to="/" className="flex items-center flex-shrink-0 -ml-1 sm:ml-0">
              <img
                src={logo}
                alt="Sara Central"
                className="h-10 sm:h-11 lg:h-13 w-auto object-contain"
              />
            </Link>

            {/* CENTER — Desktop nav links */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-12">

              <Link to="/" className={linkCls}>Home</Link>
              <Link to="/products" className={linkCls}>Collection</Link>

              {/* Services hover dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServiceOpen(true)}
                onMouseLeave={() => setServiceOpen(false)}
              >
                <button className={`${linkCls} flex items-center gap-1`}>
                  Services <FiChevronDown size={13} />
                </button>
                <AnimatePresence>
                  {serviceOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[230px] bg-white rounded-2xl shadow-2xl border border-[#f1ede7] p-3 z-[999]"
                    >
                      <Link to="/tailoring" className="block px-4 py-3 rounded-xl hover:bg-[#f8f3eb] transition-colors">
                        <p className="font-semibold text-[14px] text-[#111]">Tailoring</p>
                        <p className="text-[12px] text-[#777] mt-0.5">Boutique custom tailoring</p>
                      </Link>
                      <Link to="/consultation" className="block px-4 py-3 rounded-xl hover:bg-[#f8f3eb] transition-colors">
                        <p className="font-semibold text-[14px] text-[#111]">Style Consultation</p>
                        <p className="text-[12px] text-[#777] mt-0.5">Personal fashion guidance</p>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* About hover dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setAboutOpen(true)}
                onMouseLeave={() => setAboutOpen(false)}
              >
                <button className={`${linkCls} flex items-center gap-1`}>
                  About <FiChevronDown size={13} />
                </button>
                <AnimatePresence>
                  {aboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[230px] bg-white rounded-2xl shadow-2xl border border-[#f1ede7] p-3 z-[999]"
                    >
                      <Link to="/about" className="block px-4 py-3 rounded-xl hover:bg-[#f8f3eb] transition-colors">
                        <p className="font-semibold text-[14px] text-[#111]">Our Story</p>
                        <p className="text-[12px] text-[#777] mt-0.5">Learn about Sara Central</p>
                      </Link>
                      <Link to="/contact" className="block px-4 py-3 rounded-xl hover:bg-[#f8f3eb] transition-colors">
                        <p className="font-semibold text-[14px] text-[#111]">Contact</p>
                        <p className="text-[12px] text-[#777] mt-0.5">Reach our boutique</p>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT — Icons */}
            <div className="flex items-center gap-1 sm:gap-2">

              {/* Search icon */}
              <button
                onClick={() => { setSearchOpen(!searchOpen); setMobileOpen(false) }}
                className="p-2 text-[#333] hover:text-[#c8a96b] transition-colors"
                aria-label="Search"
              >
                <FiSearch size={20} />
              </button>

              {/* Cart icon */}
              <Link
                to="/cart"
                onClick={() => window.scrollTo(0, 0)}
                className="relative p-2 text-[#333] hover:text-[#c8a96b] transition-colors"
                aria-label="Cart"
              >
                <FiShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 bg-[#c8a96b] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Hamburger — visible on all sizes */}
              <button
                onClick={() => { setMobileOpen(!mobileOpen); setSearchOpen(false) }}
                className="p-2 text-[#333] hover:text-[#c8a96b] transition-colors"
                aria-label="Menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen
                    ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><FiX size={22} /></motion.span>
                    : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><FiMenu size={22} /></motion.span>
                  }
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* ── SEARCH BAR (full-width, below top bar) ── */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-[#eee] bg-white"
            >
              <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-3">
                <form onSubmit={handleSearch} className="flex items-center gap-3">
                  <FiSearch size={18} className="text-[#aaa] flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search sarees, lehengas, kurtis…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="flex-1 text-[14px] sm:text-[15px] bg-transparent outline-none text-[#222] placeholder-[#aaa]"
                  />
                  {searchQuery && (
                    <button type="button" onClick={() => setSearchQuery('')} className="text-[#aaa] hover:text-[#c8a96b]">
                      <FiX size={16} />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-[#c8a96b] text-white text-[13px] font-semibold px-4 py-1.5 rounded-full hover:bg-[#b8944f] transition-colors flex-shrink-0"
                  >
                    Search
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CATEGORY BAR (homepage only, hides on scroll) ── */}
        <AnimatePresence>
        {location.pathname === '/' && atTop && !mobileOpen && (
          <motion.div
            key="catbar"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-[#e8e0d4] bg-white"
          >
          <div className="px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="flex items-start gap-4 sm:gap-5 md:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide py-2.5 sm:py-3">
                {categories.map((item, i) => (
                  <Link
                    key={i}
                    to={`/products?category=${encodeURIComponent(item.name)}`}
                    className="flex flex-col items-center gap-1.5 sm:gap-2 min-w-[56px] sm:min-w-[64px] md:min-w-[72px] group flex-shrink-0"
                  >
                    <motion.div
                      whileHover={{ y: -3, scale: 1.07 }}
                      transition={{ duration: 0.2 }}
                      className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] md:w-[72px] md:h-[72px] lg:w-[76px] lg:h-[76px] rounded-full overflow-hidden border-[3px] border-[#c8a96b] shadow-md group-hover:shadow-xl group-hover:border-[#D4AF37] transition-all duration-300 bg-[#f0e8d8]"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`w-full h-full object-cover ${item.pos} group-hover:scale-110 transition-transform duration-500`}
                      />
                    </motion.div>
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wide text-[#444] group-hover:text-[#c8a96b] transition-colors font-bold whitespace-nowrap">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </motion.nav>

      {/* ═══════════════════════════════════════
          MOBILE FULL-SCREEN DRAWER
      ═══════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setMobileOpen(false)}
            />

            {/* drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[80vw] max-w-[340px] bg-white z-50 flex flex-col shadow-2xl overflow-y-auto"
            >
              {/* drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0ebe3]">
                <Link to="/" onClick={() => setMobileOpen(false)}>
                  <img src={logo} alt="Sara Central" className="h-9 w-auto object-contain" />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-[#555] hover:text-[#c8a96b] transition-colors"
                >
                  <FiX size={22} />
                </button>
              </div>

              {/* Account section */}
              {user ? (
                <div className="px-4 py-4 border-b border-[#f0ebe3] bg-[#faf7f2]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#c8a96b] text-white flex items-center justify-center text-[15px] font-bold flex-shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-[#1a1a1a]">{user.name}</p>
                      <p className="text-[12px] text-[#888]">+91 {user.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to="/my-orders"
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-[#e8dcc9] rounded-xl py-2 text-[12px] font-semibold text-[#444] hover:text-[#c8a96b] hover:border-[#c8a96b] transition-all"
                    >
                      <FiPackage size={13} /> My Orders
                    </Link>
                    <button
                      onClick={() => { logout(); setMobileOpen(false) }}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-[#eee] rounded-xl py-2 text-[12px] font-semibold text-red-500 hover:bg-red-50 hover:border-red-200 transition-all"
                    >
                      <FiLogOut size={13} /> Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-4 py-4 border-b border-[#f0ebe3]">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="w-full flex items-center justify-center gap-2 bg-[#c8a96b] hover:bg-[#b8944f] text-white rounded-xl py-2.5 text-[13px] font-semibold transition-all"
                  >
                    <FiUser size={14} /> Sign In to Your Account
                  </Link>
                </div>
              )}

              {/* drawer links */}
              <nav className="flex-1 px-4 py-4 space-y-1">

                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-semibold text-[#222] hover:bg-[#f8f3eb] hover:text-[#c8a96b] transition-all"
                >
                  Home <FiChevronRight size={16} className="text-[#ccc]" />
                </Link>

                <Link
                  to="/products"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-semibold text-[#222] hover:bg-[#f8f3eb] hover:text-[#c8a96b] transition-all"
                >
                  Collection <FiChevronRight size={16} className="text-[#ccc]" />
                </Link>

                {/* Services accordion */}
                <div>
                  <button
                    onClick={() => setMobileService(!mobileService)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-semibold text-[#222] hover:bg-[#f8f3eb] hover:text-[#c8a96b] transition-all"
                  >
                    Services
                    <motion.span animate={{ rotate: mobileService ? 90 : 0 }} transition={{ duration: 0.2 }}>
                      <FiChevronRight size={16} className="text-[#ccc]" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {mobileService && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-4"
                      >
                        <Link to="/tailoring" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[14px] text-[#555] hover:text-[#c8a96b] hover:bg-[#f8f3eb] transition-all">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c8a96b]" /> Tailoring
                        </Link>
                        <Link to="/consultation" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[14px] text-[#555] hover:text-[#c8a96b] hover:bg-[#f8f3eb] transition-all">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c8a96b]" /> Style Consultation
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* About accordion */}
                <div>
                  <button
                    onClick={() => setMobileAbout(!mobileAbout)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-semibold text-[#222] hover:bg-[#f8f3eb] hover:text-[#c8a96b] transition-all"
                  >
                    About
                    <motion.span animate={{ rotate: mobileAbout ? 90 : 0 }} transition={{ duration: 0.2 }}>
                      <FiChevronRight size={16} className="text-[#ccc]" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {mobileAbout && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-4"
                      >
                        <Link to="/about" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[14px] text-[#555] hover:text-[#c8a96b] hover:bg-[#f8f3eb] transition-all">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c8a96b]" /> Our Story
                        </Link>
                        <Link to="/contact" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[14px] text-[#555] hover:text-[#c8a96b] hover:bg-[#f8f3eb] transition-all">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c8a96b]" /> Contact
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  to="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-semibold text-[#222] hover:bg-[#f8f3eb] hover:text-[#c8a96b] transition-all"
                >
                  <span className="flex items-center gap-2">
                    <FiShoppingCart size={16} /> Cart
                    {totalItems > 0 && (
                      <span className="ml-1 bg-[#c8a96b] text-white text-[11px] font-bold rounded-full px-2 py-0.5">
                        {totalItems}
                      </span>
                    )}
                  </span>
                  <FiChevronRight size={16} className="text-[#ccc]" />
                </Link>

              </nav>

              {/* drawer categories */}
              <div className="border-t border-[#f0ebe3] px-4 py-4">
                <p className="text-[11px] uppercase tracking-widest text-[#aaa] font-bold mb-3 px-1">Shop by Category</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat, i) => (
                    <Link
                      key={i}
                      to={`/products?category=${encodeURIComponent(cat.name)}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-1.5 bg-[#f8f3eb] hover:bg-[#f0e8d8] border border-[#e8dcc9] rounded-full px-3 py-1.5 transition-colors group"
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className={`w-5 h-5 rounded-full object-cover ${cat.pos}`}
                      />
                      <span className="text-[12px] font-semibold text-[#444] group-hover:text-[#c8a96b] whitespace-nowrap">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* drawer footer */}
              <div className="px-5 py-4 border-t border-[#f0ebe3]">
                <p className="text-[12px] text-[#aaa] text-center">Sara Central Boutique • Udupi</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
