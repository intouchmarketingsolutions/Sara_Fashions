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

export default function Products({ embedded = false }) {
  const location = useLocation()
  const params   = new URLSearchParams(location.search)
  const query    = params.get('search') || ''

  const { exact, related } = useMemo(() => {
    if (!query.trim()) return { exact: allProducts, related: [] }

    const scored = allProducts
      .map(p => ({ ...p, _score: matchScore(p, query) }))
      .filter(p => p._score > 0)
      .sort((a, b) => b._score - a._score)

    const exactMatches = scored.filter(p => p._score >= 5)
    const exactIds     = new Set(exactMatches.map(p => p.id))

    // related = same subcategory as exact matches but not already shown
    const relatedSubcats = new Set(exactMatches.map(p => p.subcategory))
    const relatedItems = allProducts.filter(
      p => !exactIds.has(p.id) && relatedSubcats.has(p.subcategory)
    )

    return { exact: exactMatches, related: relatedItems }
  }, [query])

  if (!query.trim()) {
    return (
      <div className={`bg-[#f8f3eb] min-h-screen ${!embedded ? 'pt-[64px] sm:pt-[70px] lg:pt-[76px]' : ''}`}>
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
    <div className={`bg-[#f8f3eb] min-h-screen ${!embedded ? 'pt-[64px] sm:pt-[70px] lg:pt-[76px]' : ''}`}>
      <section className="px-4 sm:px-6 lg:px-10 py-8 md:py-12 max-w-7xl mx-auto">

        {/* Search result label */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
          <p className="text-[#666] text-[14px]">
            Showing results for{' '}
            <span className="text-[#b68b45] font-semibold">"{query}"</span>
            {exact.length > 0 && (
              <span className="ml-2 text-[#999]">({exact.length} found)</span>
            )}
          </p>
          <Link to="/products" className="text-[13px] text-[#b68b45] underline underline-offset-2">
            Clear search
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
                  You may also like
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
            <p className="text-4xl mb-4">🔍</p>
            <h2 className="text-[20px] font-semibold text-[#1a1a1a] mb-3">No results found</h2>
            <p className="text-[#666] text-[14px] mb-6">
              Try searching for <span className="text-[#b68b45]">saree, lehenga, kurti, gown</span> or bridal
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
