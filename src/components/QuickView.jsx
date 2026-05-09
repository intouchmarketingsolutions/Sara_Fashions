import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiShoppingBag, FiCheck } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function QuickView({ product, onClose }) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState('M')
  const [added, setAdded] = useState(false)

  if (!product) return null

  const handleAdd = () => {
    addItem({ ...product, size: selectedSize, quantity: 1 })
    setAdded(true)
    setTimeout(() => { setAdded(false); onClose() }, 1200)
  }

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50"
      />

      <motion.div
        key="sheet"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto"
      >
        {/* drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-[#ddd] rounded-full" />
        </div>

        {/* close */}
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#666] hover:bg-[#eee]">
          <FiX size={16} />
        </button>

        <div className="px-4 pb-6 pt-2">
          <div className="flex gap-4 mb-4">
            {/* Image */}
            <div className="w-28 h-36 rounded-2xl overflow-hidden flex-shrink-0 bg-[#f8f3eb]">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover object-top" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 pt-1">
              <p className="text-[#b68b45] text-[10px] uppercase tracking-widest font-semibold mb-1">{product.subcategory}</p>
              <h3 className="text-[15px] font-semibold text-[#1a1a1a] leading-snug mb-2">{product.name}</h3>
              <p className="text-[#b68b45] text-[18px] font-bold">₹{product.price.toLocaleString()}</p>
            </div>
          </div>

          {/* Size */}
          <div className="mb-4">
            <p className="text-[11px] uppercase tracking-wider text-[#888] mb-2">Select Size</p>
            <div className="flex flex-wrap gap-2">
              {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 rounded-full border text-[13px] font-medium transition-all duration-200 ${
                    selectedSize === size
                      ? 'bg-[#111] text-white border-[#111]'
                      : 'bg-white border-[#ddd] hover:border-[#c8a96b]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              className={`flex-1 py-3.5 rounded-full flex items-center justify-center gap-2 text-[14px] font-semibold transition-all duration-300 ${
                added ? 'bg-green-600 text-white' : 'bg-[#111] hover:bg-[#c8a96b] text-white'
              }`}
            >
              {added ? <><FiCheck size={15} /> Added!</> : <><FiShoppingBag size={15} /> Add To Cart</>}
            </button>
            <Link
              to={`/product/${product.id}`}
              onClick={() => { window.scrollTo(0, 0); onClose() }}
              className="px-5 py-3.5 rounded-full border border-[#ddd] text-[13px] font-medium text-[#555] hover:border-[#c8a96b] hover:text-[#c8a96b] transition-all duration-200 whitespace-nowrap"
            >
              View Details
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
