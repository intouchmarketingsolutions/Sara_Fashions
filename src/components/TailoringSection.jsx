import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import tailoringImage from '../assets/images/categories/kurti.jpg'

const features = [
  'Custom Measurements',
  'Bridal Alterations',
  'Boutique Finishing',
  'Timely Delivery',
]

export default function TailoringSection() {
  return (
    <section className="bg-[#f8f3eb] py-10 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <img
              src={tailoringImage}
              alt="Tailoring Service"
              className="w-full h-[280px] sm:h-[360px] md:h-[440px] object-cover object-top rounded-2xl shadow-xl"
            />
          </motion.div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-[#b68b45] tracking-widest text-[11px] font-semibold uppercase mb-3">
              Boutique Tailoring
            </p>

            <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-semibold leading-tight text-[#1a1a1a] mb-4">
              Custom Tailoring<br />With Perfect Fit
            </h2>

            <p className="text-[#666] text-[15px] leading-relaxed mb-7">
              From bridal elegance to everyday sophistication, our tailoring ensures every outfit is crafted to complement your style and comfort.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-7">
              {features.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-white px-4 py-3 rounded-xl border border-[#eee]">
                  <div className="w-2 h-2 rounded-full bg-[#c8a96b] flex-shrink-0" />
                  <span className="text-[#222] text-[13px] font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Link to="/tailoring">
              <button className="bg-[#111] hover:bg-[#c8a96b] text-white px-7 py-3 rounded-full text-[14px] font-semibold transition-all duration-300">
                Book Tailoring Service
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
