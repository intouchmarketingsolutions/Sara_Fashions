import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiStar, FiShoppingBag, FiHeart, FiMinus, FiPlus, FiCheck } from 'react-icons/fi'

import { allProducts } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

const reviews = [
  { name: 'Priya Sharma', rating: 5, date: 'March 2026', comment: 'Beautiful boutique quality and perfect stitching. Highly recommended.' },
  { name: 'Ananya Rao',   rating: 5, date: 'February 2026', comment: 'Elegant fabric and premium finishing. Loved the tailoring service.' },
  { name: 'Sneha Patel',  rating: 4, date: 'January 2026', comment: 'Very classy collection with excellent fitting and comfort.' },
]

export default function ProductDetail() {
  const { id } = useParams()
  const { addItem } = useCart()

  const product = allProducts.find((p) => p.id === id)

  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity,     setQuantity]     = useState(1)
  const [added,        setAdded]        = useState(false)
  const [wishlist,     setWishlist]     = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f8f3eb] flex items-center justify-center px-4 pt-[70px]">
        <div className="text-center">
          <h2 className="text-[24px] font-semibold text-[#1a1a1a] mb-4">Product Not Found</h2>
          <Link to="/products" className="bg-[#111] hover:bg-[#c8a96b] text-white px-7 py-3 rounded-full text-[14px] transition-all duration-300">
            Back To Collection
          </Link>
        </div>
      </div>
    )
  }

  const related = allProducts.filter((p) => p.subcategory === product.subcategory && p.id !== product.id).slice(0, 4)
  const stars   = Array.from({ length: 5 }, (_, i) => i < Math.floor(product.rating || 5))

  const handleAddToCart = () => {
    addItem({ ...product, size: selectedSize, quantity })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="bg-[#f8f3eb] min-h-screen">

      <section className="pt-[70px] sm:pt-[76px] lg:pt-[82px] pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

          {/* PRODUCT GRID */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="overflow-hidden rounded-2xl shadow-xl bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[320px] sm:h-[420px] md:h-[560px] object-cover object-top hover:scale-105 transition-transform duration-600"
                />
              </div>

              {/* THUMBNAILS */}
              <div className="flex gap-3 mt-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden border border-[#eee] bg-white">
                    <img src={product.image} alt="" className="w-full h-full object-cover object-top" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* DETAILS */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#b68b45] uppercase tracking-widest text-[11px] font-semibold mb-2">{product.subcategory}</p>

              <h1 className="text-[22px] sm:text-[28px] md:text-[34px] font-semibold text-[#1a1a1a] leading-tight mb-3">
                {product.name}
              </h1>

              <div className="flex items-center gap-1.5 mb-3">
                {stars.map((filled, i) => (
                  <FiStar key={i} size={14} className={filled ? 'text-[#d4af7a] fill-[#d4af7a]' : 'text-gray-300'} />
                ))}
                <span className="text-[#888] text-[12px] ml-1">{product.rating}</span>
              </div>

              <div className="text-[26px] sm:text-[30px] font-semibold text-[#b68b45] mb-4">
                ₹{product.price.toLocaleString()}
              </div>

              <p className="text-[#666] text-[14px] leading-relaxed mb-5">{product.description}</p>

              {/* SIZE */}
              <div className="mb-5">
                <h3 className="text-[11px] uppercase tracking-widest text-[#888] mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-11 rounded-full border text-[13px] font-medium transition-all duration-300 ${
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

              {/* QUANTITY */}
              <div className="mb-5">
                <h3 className="text-[11px] uppercase tracking-widest text-[#888] mb-3">Quantity</h3>
                <div className="flex items-center bg-white border border-[#ddd] rounded-full overflow-hidden w-fit">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-11 h-11 flex items-center justify-center hover:bg-[#f3f3f3]">
                    <FiMinus size={14} />
                  </button>
                  <span className="w-10 text-center text-[15px] font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-11 h-11 flex items-center justify-center hover:bg-[#f3f3f3]">
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 rounded-full flex items-center justify-center gap-2 text-[14px] font-semibold transition-all duration-300 ${
                    added ? 'bg-green-600 text-white' : 'bg-[#111] hover:bg-[#c8a96b] text-white'
                  }`}
                >
                  {added ? <><FiCheck size={16} /> Added</> : <><FiShoppingBag size={16} /> Add To Cart</>}
                </button>
                <button
                  onClick={() => setWishlist(!wishlist)}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    wishlist ? 'bg-[#c8a96b] text-white border-[#c8a96b]' : 'bg-white border-[#ddd] hover:border-[#c8a96b]'
                  }`}
                >
                  <FiHeart size={16} className={wishlist ? 'fill-white' : ''} />
                </button>
              </div>

              {/* INFO PILLS */}
              <div className="grid grid-cols-2 gap-2">
                {['Premium Boutique Quality', 'Elegant Bridal Collections', 'Custom Tailoring Available', 'Secure Online Payment'].map((item, i) => (
                  <div key={i} className="bg-white border border-[#eee] rounded-xl px-3 py-2.5 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#c8a96b] flex-shrink-0" />
                    <span className="text-[#555] text-[11px] sm:text-[12px]">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#1a1a1a]">What Our Clients Say</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                viewport={{ once: true }}
                className="bg-[#f8f3eb] p-5 rounded-2xl border border-[#eee]"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <FiStar key={j} size={13} className="text-[#d4af7a] fill-[#d4af7a]" />
                  ))}
                </div>
                <p className="text-[#555] text-[13px] leading-relaxed mb-4 italic">"{r.comment}"</p>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#1a1a1a] text-[13px]">{r.name}</span>
                  <span className="text-[11px] text-[#888]">{r.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="py-10 md:py-12 bg-[#f8f3eb]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="text-center mb-8">
              <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#1a1a1a]">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {related.map((item, i) => (
                <ProductCard key={item.id} product={item} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
