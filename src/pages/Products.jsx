import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

import ProductCard from '../components/ProductCard'
import { allProducts } from '../data/products'

export default function Products({ embedded = false }) {
  const location = useLocation()
  const params   = new URLSearchParams(location.search)
  const query    = params.get('search') || ''

  const filtered = useMemo(() => {
    if (!query.trim()) return allProducts
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(query.toLowerCase())
    )
  }, [query])

  return (
    <div className={`bg-[#f8f3eb] min-h-screen ${!embedded ? 'pt-[64px] sm:pt-[70px] lg:pt-[76px]' : ''}`}>
      <section className="px-4 sm:px-6 lg:px-10 py-8 md:py-12 max-w-7xl mx-auto">

        {query && (
          <p className="text-[#666] text-[14px] mb-6 text-center">
            Results for <span className="text-[#b68b45] font-semibold">"{query}"</span>
          </p>
        )}

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
            <h2 className="text-[22px] font-semibold text-[#1a1a1a] mb-3">No Products Found</h2>
            <p className="text-[#666] text-[14px]">Try a different keyword.</p>
          </motion.div>
        )}
      </section>
    </div>
  )
}
