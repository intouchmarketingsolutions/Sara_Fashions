import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'
import QuickView from './QuickView'

export default function ProductCard({ product, index = 0 }) {
  const [showQuick, setShowQuick] = useState(false)

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(product.rating || 5))

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: index * 0.07 }}
        viewport={{ once: true }}
        onClick={() => setShowQuick(true)}
        className="cursor-pointer group"
      >
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#f1ebe3]">

          {/* IMAGE */}
          <div className="relative overflow-hidden bg-[#f5efe8]">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-[260px] sm:h-[300px] md:h-[340px] lg:h-[420px] object-cover object-top group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div
              style={{ display: 'none' }}
              className="w-full h-[260px] sm:h-[300px] md:h-[340px] lg:h-[420px] flex flex-col items-center justify-center bg-[#f5efe8] gap-2"
            >
              <span className="text-5xl">👗</span>
              <span className="text-[12px] text-[#c8a96b] font-medium uppercase tracking-widest">{product.subcategory}</span>
            </div>

            {/* Sold Out overlay */}
            {product.status === 'sold' && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="bg-white text-[#333] text-[12px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#ccc]">Sold Out</span>
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div className="px-4 py-3">
            <div className="flex items-center gap-0.5 mb-1.5">
              {stars.map((filled, i) => (
                <FiStar key={i} size={12} className={filled ? 'text-[#d4af7a] fill-[#d4af7a]' : 'text-gray-300'} />
              ))}
            </div>
            <h3 className="text-[14px] sm:text-[15px] font-medium text-[#1a1a1a] group-hover:text-[#b68b45] transition-colors leading-snug">
              {product.name}
            </h3>
            <p className="mt-1 text-[#b68b45] text-[15px] font-semibold">
              ₹{product.price.toLocaleString()}
            </p>
          </div>
        </div>
      </motion.div>

      {showQuick && (
        <QuickView product={product} onClose={() => setShowQuick(false)} />
      )}
    </>
  )
}
