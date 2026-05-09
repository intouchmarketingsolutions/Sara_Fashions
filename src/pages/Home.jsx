import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import HeroSection from '../components/HeroSection'
import TailoringSection from '../components/TailoringSection'
import ConsultationSection from '../components/ConsultationSection'
import ProductCard from '../components/ProductCard'
import { allProducts } from '../data/products'

export default function Home() {
  const featured = allProducts.slice(0, 4)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <div className="bg-[#f8f3eb] overflow-hidden">

      <HeroSection />

      {/* FEATURED COLLECTION */}
      <section className="pt-5 pb-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10"
          >
            <h2 className="text-[26px] sm:text-[32px] md:text-[40px] font-semibold text-[#1a1a1a] leading-tight">
              Shop Your{' '}
              <span className="text-[#b68b45]">Style</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="flex justify-center mt-8 sm:mt-10">
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#111] hover:bg-[#c8a96b] text-white px-8 py-3 rounded-full text-[14px] font-semibold transition-all duration-300"
              >
                Explore Collection
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      <TailoringSection />
      <ConsultationSection />

      {/* WHY CHOOSE US */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-[26px] sm:text-[32px] md:text-[38px] font-semibold text-[#1a1a1a]">
              The Sara Central <span className="text-[#b68b45]">Experience</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {[
              { title: 'Premium Quality', desc: 'Boutique fabrics with luxury finishing.', icon: '✨' },
              { title: 'Custom Tailoring', desc: 'Perfect fit tailored for every woman.', icon: '✂️' },
              { title: 'Style Consultation', desc: 'Personalised fashion guidance.', icon: '👗' },
              { title: 'Secure Payment', desc: 'Safe online payment experience.', icon: '🔒' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-[#f8f3eb] p-5 sm:p-6 rounded-2xl text-center border border-[#eee]"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-[14px] sm:text-[16px] font-semibold text-[#1a1a1a] mb-2">{item.title}</h3>
                <p className="text-[#666] text-[12px] sm:text-[13px] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-10 md:py-14 bg-[#111] text-white">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#c8a96b] uppercase tracking-widest text-[11px] font-semibold mb-3">
            Join Sara Central
          </p>
          <h2 className="text-[22px] sm:text-[28px] font-semibold mb-6">
            Stay Updated with New Arrivals
          </h2>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 bg-white/10 border border-white/15 text-white placeholder-white/40 px-5 py-3 rounded-full outline-none text-[14px]"
            />
            <button type="submit" className="bg-[#c8a96b] hover:bg-[#b68b45] text-black px-6 py-3 rounded-full font-semibold text-[14px] transition-all duration-300 flex-shrink-0">
              {subscribed ? '✓ Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
