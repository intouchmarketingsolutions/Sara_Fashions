import { useMemo, useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiCheck } from 'react-icons/fi'

import ProductCard from '../components/ProductCard'
import { useProducts } from '../context/ProductsContext'

const SORT_OPTIONS = [
  { value: 'default',   label: 'New Arrivals'       },
  { value: 'price_asc', label: 'Price: Low to High'  },
  { value: 'price_desc',label: 'Price: High to Low'  },
  { value: 'rating',    label: 'Top Rated'            },
]

export default function Products({ embedded = false }) {
  const location = useLocation()
  const params   = new URLSearchParams(location.search)
  const query    = params.get('search') || ''
  const urlCat   = params.get('category') || ''
  const { allProducts } = useProducts()

  const [sort, setSort]           = useState('default')
  const [dropOpen, setDropOpen]   = useState(false)
  const dropRef                   = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filtered = useMemo(() => {
    let list = [...allProducts]

    if (urlCat.trim()) {
      const cat = urlCat.toLowerCase()
      list = list.filter(p =>
        p.subcategory.toLowerCase() === cat ||
        (p.tags || []).some(t => t.toLowerCase().includes(cat))
      )
    }

    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
      )
    }

    if (sort === 'price_asc')  list.sort((a, b) => a.price - b.price)
    if (sort === 'price_desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'rating')     list.sort((a, b) => (b.rating || 0) - (a.rating || 0))

    return list
  }, [allProducts, query, urlCat, sort])

  const activeLabel = SORT_OPTIONS.find(o => o.value === sort)?.label

  const topPadding = !embedded ? 'pt-[64px] sm:pt-[70px] lg:pt-[76px]' : ''

  return (
    <div className={`bg-[#f8f3eb] min-h-screen ${topPadding}`}>
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">

        {/* ── FILTER BAR ── */}
        <div className="flex items-center justify-between mb-6">

          {/* Left: active category / search label */}
          <div className="flex flex-col gap-1">
            {(urlCat || query) ? (
              <>
                <h1 className="text-[18px] sm:text-[22px] font-semibold text-[#1a1a1a] leading-tight">
                  {urlCat || `"${query}"`}
                  <span className="ml-2 text-[13px] font-normal text-[#888]">
                    ({filtered.length} {filtered.length === 1 ? 'product' : 'products'})
                  </span>
                </h1>
                <Link
                  to="/products"
                  className="text-[12px] text-[#b68b45] hover:underline underline-offset-2 w-fit"
                >
                  ← View All
                </Link>
              </>
            ) : (
              <h1 className="text-[18px] sm:text-[22px] font-semibold text-[#1a1a1a]">
                All Products
                <span className="ml-2 text-[13px] font-normal text-[#888]">
                  ({filtered.length})
                </span>
              </h1>
            )}
          </div>

          {/* Right: Filter dropdown */}
          <div className="relative" ref={dropRef}>
            <button
              onClick={() => setDropOpen(o => !o)}
              className="flex items-center gap-2 bg-white border border-[#e0d8cc] hover:border-[#c8a96b] px-5 py-2.5 rounded-full text-[13px] font-semibold text-[#333] shadow-sm transition-all duration-200"
            >
              <span className="text-[#c8a96b] font-bold text-[12px] uppercase tracking-wider">Filter</span>
              <span className="text-[#aaa] text-[11px]">|</span>
              <span>{activeLabel}</span>
              <motion.span animate={{ rotate: dropOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <FiChevronDown size={14} className="text-[#888]" />
              </motion.span>
            </button>

            <AnimatePresence>
              {dropOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-[210px] bg-white rounded-2xl shadow-2xl border border-[#ede8e0] py-2 z-50 overflow-hidden"
                >
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setSort(opt.value); setDropOpen(false) }}
                      className={`w-full flex items-center justify-between px-5 py-3 text-[13px] transition-colors ${
                        sort === opt.value
                          ? 'bg-[#f8f3eb] text-[#c8a96b] font-semibold'
                          : 'text-[#444] hover:bg-[#f8f3eb] hover:text-[#c8a96b]'
                      }`}
                    >
                      {opt.label}
                      {sort === opt.value && <FiCheck size={13} className="text-[#c8a96b]" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── PRODUCT GRID ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-4xl mb-4">👗</p>
            <h2 className="text-[20px] font-semibold text-[#1a1a1a] mb-3">No Products Found</h2>
            <p className="text-[#666] text-[14px] mb-6">
              Try browsing <span className="text-[#b68b45]">Sarees, Lehengas, Kurtis, Gowns</span> or Bridal
            </p>
            <Link
              to="/products"
              className="inline-block bg-[#111] hover:bg-[#c8a96b] text-white px-6 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-300"
            >
              View All Products
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}
