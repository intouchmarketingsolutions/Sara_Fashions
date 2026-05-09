import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import consultationImage from '../assets/images/categories/consultation.jpg'

export default function ConsultationSection() {
  return (
    <section className="bg-white py-10 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-12 h-[1px] bg-[#c8a96b]" />
          <span className="text-[#b68b45] tracking-widest text-[11px] font-semibold uppercase">Style Consultation</span>
          <div className="w-12 h-[1px] bg-[#c8a96b]" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-semibold leading-tight text-[#1a1a1a] mb-4">
              Expert Fashion<br />Consultation
            </h2>

            <p className="text-[#666] text-[15px] leading-relaxed mb-4">
              Looking your best is not just about the outfit — it is about how it makes you feel. Our expert stylists offer one-on-one consultation to help you discover looks that truly reflect your personality, occasion, and confidence.
            </p>

            <p className="text-[#666] text-[15px] leading-relaxed mb-7">
              Whether you are dressing for a wedding, a festive celebration, a corporate event, or simply elevating your everyday wardrobe, we guide you through colour coordination, outfit pairings, and styling choices tailored entirely to you.
            </p>

            <Link to="/consultation">
              <button className="bg-[#111] hover:bg-[#c8a96b] text-white px-7 py-3 rounded-full text-[14px] font-semibold transition-all duration-300">
                Book Consultation
              </button>
            </Link>
          </motion.div>

          {/* IMAGE — floating animation separated from whileInView */}
          <div className="order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#c8a96b]/20 to-transparent rounded-2xl pointer-events-none z-10" />
                <img
                  src={consultationImage}
                  alt="Style Consultation"
                  className="w-full h-[280px] sm:h-[360px] md:h-[440px] object-cover object-top rounded-2xl shadow-xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
