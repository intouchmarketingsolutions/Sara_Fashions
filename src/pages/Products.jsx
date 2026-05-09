import { useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import ProductCard from '../components/ProductCard'
import { allProducts } from '../data/products'

function matchScore(product, q) {
  const lower = q.toLowerCase().trim()
  if (!lower) return 0
  let score = 0
  if (product.name.toLowerCase().includes(lower))        score += 10
  if (product.subcategory.toLowerCase().includes(lower)) score += 8
  if ((product.tags || []).some(t => t.toLowerCase().includes(lower))) score += 5
  if (product.description.toLowerCase().includes(lower)) score += 2
  return score
}

function filterByCategory(category) {
  const cat = category.toLowerCase().trim()
  return allProducts.filter(p =>
    p.subcategory.toLowerCase() === cat ||
    (p.tags || []).some(t => t.toLowerCase().includes(cat))
  )
}

export default function Products({ embedded = false }) {
  const location = useLocation()
  const params   = new URLSearchParams(location.search)
  const query    = params.get('search') || ''
  const category = params.get('category') || ''

  const { exact, related } = useMemo(() => {
    // Category filter
    if (category.trim() && !query.trim()) {
      const filtered = filterByCategory(category)
      return { exact: filtered, related: [] }
    }

    // Search filter
    if (query.trim()) {
      const scored = allProducts
        .map(p => ({ ...p, _score: matchScore(p, query) }))
        .filter(p => p._score > 0)
        .sort((a, b) => b._score - a._score)

      const exactMatches = scored.filter(p => p._score >= 5)
      const exactIds     = new Set(exactMatches.map(p => p.id))
      const relatedSubcats = new Set(exactMatches.map(p => p.subcategory))
      const relatedItems = allProducts.filter(
        p => !exactIds.has(p.id) && relatedSubcats.has(p.subcategory)
      )
      return { exact: exactMatches, related: relatedItems }
    }

    return { exact: allProducts, related: [] }
  }, [query, category])

  const topPadding = !embedded ? 'pt-[64px] sm:pt-[70px] lg:pt-[76px]' : ''

  // All products (no filter)
  if (!query.trim() && !category.trim()) {
    return (
      <div className={`bg-[#f8f3eb] min-h-screen ${topPadding}`}>
        <section className="px-4 sm:px-6 lg:px-10 py-8 md:py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {allProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className={`bg-[#f8f3eb] min-h-screen ${topPadding}`}>
      <section className="px-4 sm:px-6 lg:px-10 pt-3 pb-8 md:pb-12 max-w-7xl mx-auto">

        {/* Clear filter link */}
        <div className="mb-4 flex justify-end">
          <Link to="/products" className="text-[13px] text-[#b68b45] underline underline-offset-2">
            View All
          </Link>
        </div>

        {exact.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
              {exact.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>

            {related.length > 0 && (
              <div className="mt-10">
                <h2 className="text-[16px] sm:text-[18px] font-semibold text-[#1a1a1a] mb-5">
                  You May Also Like
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
                  {related.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              </div>
            )}
          </>
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
      </section>
    </div>
  )
}
