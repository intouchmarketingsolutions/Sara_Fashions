import { motion } from 'framer-motion'
import Products from './Products'

export default function Women() {
  return (
    <div className="bg-[#f8f3eb] min-h-screen overflow-hidden">

      {/* HERO */}
      <section className="relative pt-[70px] sm:pt-[76px] lg:pt-[82px] pb-8 sm:pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8f3eb] via-[#fdfaf6] to-[#efe5d6]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-10 h-[1px] bg-[#c8a96b]" />
            <span className="text-[#b68b45] uppercase tracking-widest text-[11px] font-semibold">Women Exclusive</span>
            <div className="w-10 h-[1px] bg-[#c8a96b]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-[28px] sm:text-[38px] md:text-[50px] font-semibold leading-tight text-[#1a1a1a]"
          >
            Elegant Fashion{' '}
            <span className="text-[#b68b45]">For Every Occasion</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-3 text-[#666] text-[14px] sm:text-[15px] max-w-xl mx-auto"
          >
            Sarees, bridal collections, lehengas, gowns, kurtis crafted with elegance and timeless style.
          </motion.p>
        </div>
      </section>

      <Products embedded={true} />
    </div>
  )
}
