import { motion } from 'framer-motion'
import { FiAward, FiHeart, FiScissors, FiUsers, FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import heroImage    from '../assets/images/categories/saree.jpg'
import boutiqueImage from '../assets/images/categories/lehenga.jpg'

const values = [
  { icon: <FiScissors size={22} />, title: 'Boutique Tailoring', desc: 'Personalised tailoring crafted for comfort, elegance, and confidence.' },
  { icon: <FiHeart size={22} />,    title: 'Women Exclusive',    desc: 'Collections thoughtfully curated for women across every occasion.' },
  { icon: <FiAward size={22} />,    title: 'Premium Quality',    desc: 'Refined stitching and quality craftsmanship for lasting style.' },
  { icon: <FiUsers size={22} />,    title: 'Modern Styling',     desc: 'Blending tradition with modern trends for today\'s women.' },
]


export default function About() {
  const navigate = useNavigate()
  return (
    <div className="bg-[#f8f3eb] overflow-hidden min-h-screen">

      {/* BACK BUTTON */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-[78px] sm:pt-[84px] lg:pt-[90px]">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#666] hover:text-[#c8a96b] transition-colors text-[14px] font-medium"
        >
          <FiArrowLeft size={16} /> Back To Home
        </button>
      </div>

      {/* HERO */}
      <section className="relative pt-4 pb-10 sm:pb-14">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8f3eb] via-[#fdfaf6] to-[#efe5d6]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10 sm:mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-[1px] bg-[#c8a96b]" />
              <span className="text-[#b68b45] uppercase tracking-widest text-[11px] font-semibold">About Sara Central</span>
              <div className="w-10 h-[1px] bg-[#c8a96b]" />
            </div>

            <h1 className="text-[28px] sm:text-[38px] md:text-[48px] font-semibold leading-tight text-[#1a1a1a] mb-4">
              Udupi's Destination For{' '}
              <span className="text-[#b68b45]">Exclusive Women's Fashion</span>
            </h1>

            <p className="max-w-2xl mx-auto text-[#666] text-[14px] sm:text-[15px] leading-relaxed">
              Where tradition meets modern touch, and every woman finds her perfect fashion piece designed with elegance, comfort, and confidence.
            </p>
          </motion.div>

          {/* IMAGE + STORY */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={heroImage}
                alt="Sara Central Boutique"
                className="w-full h-[280px] sm:h-[380px] md:h-[500px] object-cover object-top rounded-2xl shadow-xl"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg border border-[#eee]">
                <p className="text-[#b68b45] text-[10px] tracking-widest uppercase mb-1">Women Exclusive</p>
                <h3 className="text-[15px] font-semibold text-[#1a1a1a]">Elegant Boutique Studio</h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[24px] sm:text-[32px] md:text-[38px] font-semibold leading-tight text-[#1a1a1a] mb-4">
                Styled For Every Occasion
              </h2>

              <p className="text-[#666] text-[14px] sm:text-[15px] leading-relaxed mb-4">
                Sara Central is a premium women's fashion boutique offering a curated collection of ethnic and contemporary wear designed for elegance, comfort, and quality.
              </p>

              <p className="text-[#666] text-[14px] sm:text-[15px] leading-relaxed mb-5">
                Our collection includes sarees, lehengas, kurtis, gowns, western wear, and festive outfits — along with personalised tailoring and fitting services.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {['Designer Sarees', 'Bridal Collections', 'Custom Tailoring', 'Modern Fashion'].map((item, i) => (
                  <div key={i} className="bg-white border border-[#eee] rounded-xl px-4 py-3 text-[13px] font-medium text-[#1a1a1a]">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-[24px] sm:text-[32px] font-semibold text-[#1a1a1a]">Boutique Fashion Experience</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {values.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-[#f8f3eb] rounded-2xl p-5 sm:p-6 border border-[#eee]"
              >
                <div className="w-11 h-11 rounded-full bg-[#c8a96b] text-white flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-[14px] sm:text-[16px] font-semibold text-[#1a1a1a] mb-2">{item.title}</h3>
                <p className="text-[#666] text-[12px] sm:text-[13px] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY + IMAGE */}
      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[24px] sm:text-[32px] md:text-[38px] font-semibold leading-tight text-[#1a1a1a] mb-4">
                Fashion Crafted With Care
              </h2>
              <p className="text-[#666] text-[14px] sm:text-[15px] leading-relaxed mb-4">
                We deliver high-standard fashion using premium fabrics, refined craftsmanship, quality stitching, and comfortable fits.
              </p>
              <p className="text-[#666] text-[14px] sm:text-[15px] leading-relaxed">
                With a commitment to quality and timely service, Sara Central strives to provide fashionable clothing that reflects confidence, tradition, and modern elegance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <img
                src={boutiqueImage}
                alt="Boutique Fashion"
                className="w-full h-[260px] sm:h-[360px] md:h-[440px] object-cover object-top rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
