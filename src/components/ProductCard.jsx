import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShoppingBag, FiStar } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addItem({ ...product, quantity: 1 })
  }

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(product.rating || 5))

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      viewport={{ once: true }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 border border-[#f1ebe3]">

          {/* IMAGE */}
          <div className="relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[260px] sm:h-[300px] md:h-[340px] object-cover object-top group-hover:scale-105 transition-transform duration-600"
            />

            {/* category badge */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
              <span className="text-[10px] uppercase tracking-widest text-[#b68b45] font-semibold">
                {product.subcategory}
              </span>
            </div>

            {/* Add to Cart — always visible on mobile, hover on desktop */}
            <button
              onClick={handleAddToCart}
              className="absolute bottom-3 left-3 right-3 bg-[#111] hover:bg-[#c8a96b] text-white py-2.5 rounded-full flex items-center justify-center gap-2 text-[13px] font-medium transition-all duration-300
                sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0"
            >
              <FiShoppingBag size={14} />
              Add to Cart
            </button>
          </div>

          {/* CONTENT */}
          <div className="px-4 py-3">
            <div className="flex items-center gap-0.5 mb-1.5">
              {stars.map((filled, i) => (
                <FiStar
                  key={i}
                  size={12}
                  className={filled ? 'text-[#d4af7a] fill-[#d4af7a]' : 'text-gray-300'}
                />
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
      </Link>
    </motion.div>
  )
}
