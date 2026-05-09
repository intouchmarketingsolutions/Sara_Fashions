import { motion } from 'framer-motion'
import { FiCheck, FiUser, FiCalendar, FiAward, FiArrowLeft } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import consultationImage from '../assets/images/categories/consultation.jpg'

const services = [
  'Occasion Styling', 'Colour Coordination',
  'Outfit Recommendations', 'Bridal Fashion Guidance',
  'Modern Trend Consultation', 'Personalised Styling',
]

const process = [
  { icon: <FiUser size={20} />,    title: 'Personal Discussion',  desc: 'Understand your fashion preferences, event type, and styling goals.' },
  { icon: <FiAward size={20} />,   title: 'Expert Styling',       desc: 'Receive curated fashion suggestions and elegant outfit recommendations.' },
  { icon: <FiCalendar size={20} />, title: 'Perfect Look Planning', desc: 'Complete guidance for weddings, parties, and festive occasions.' },
]

export default function Consultation() {
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
      <section className="pt-4 pb-10 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">

            {/* CONTENT */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-[28px] sm:text-[38px] md:text-[48px] font-semibold leading-tight text-[#1a1a1a] mb-4">
                Expert Fashion<br />
                <span className="text-[#b68b45]">Consultation</span>
              </h1>

              <p className="text-[#666] text-[14px] sm:text-[15px] leading-relaxed max-w-xl mb-6">
                Personalised styling guidance for weddings, festive occasions, parties, and everyday fashion tailored for your style.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-7">
                {services.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-white px-4 py-3 rounded-xl border border-[#eee]">
                    <FiCheck size={13} className="text-[#c8a96b] flex-shrink-0" />
                    <span className="text-[#222] text-[13px] font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#booking-form" className="bg-[#111] hover:bg-[#c8a96b] text-white px-7 py-3 rounded-full text-[14px] font-semibold transition-all duration-300">
                  Book Consultation
                </a>
                <Link to="/contact" className="border border-[#c8a96b] hover:bg-[#c8a96b] hover:text-white text-[#c8a96b] px-7 py-3 rounded-full text-[14px] font-semibold transition-all duration-300">
                  Contact Boutique
                </Link>
              </div>
            </motion.div>

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <motion.img
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                src={consultationImage}
                alt="Fashion Consultation"
                className="w-full h-[280px] sm:h-[380px] md:h-[500px] object-cover object-top rounded-2xl shadow-xl"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg border border-[#eee]">
                <p className="text-[#b68b45] text-[10px] tracking-widest uppercase mb-1">Boutique Styling</p>
                <h3 className="text-[14px] font-semibold text-[#1a1a1a]">Elegant Fashion Guidance</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#1a1a1a]">Consultation Process</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {process.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-[#f8f3eb] p-5 sm:p-6 rounded-2xl border border-[#eee]"
              >
                <div className="w-11 h-11 rounded-full bg-[#c8a96b] text-white flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-[15px] sm:text-[16px] font-semibold mb-2 text-[#1a1a1a]">{item.title}</h3>
                <p className="text-[#666] text-[13px] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section id="booking-form" className="py-10 md:py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-[#eee]"
          >
            <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#1a1a1a] mb-5 text-center">Book a Styling Session</h2>

            <form className="grid sm:grid-cols-2 gap-4">
              <input type="text"  placeholder="Full Name"     className="border border-[#ddd] px-4 py-3 rounded-xl outline-none focus:border-[#c8a96b] text-[14px]" />
              <input type="tel"   placeholder="Phone Number"  className="border border-[#ddd] px-4 py-3 rounded-xl outline-none focus:border-[#c8a96b] text-[14px]" />
              <input type="email" placeholder="Email Address" className="border border-[#ddd] px-4 py-3 rounded-xl outline-none focus:border-[#c8a96b] text-[14px]" />
              <select className="border border-[#ddd] px-4 py-3 rounded-xl outline-none focus:border-[#c8a96b] text-[14px] text-[#555]">
                <option>Consultation Type</option>
                <option>Bridal Styling</option>
                <option>Festive Occasion</option>
                <option>Everyday Fashion</option>
                <option>Party Look</option>
              </select>
              <textarea rows="3" placeholder="Describe your requirement…"
                className="sm:col-span-2 border border-[#ddd] px-4 py-3 rounded-xl outline-none focus:border-[#c8a96b] text-[14px] resize-none" />
              <button type="submit" className="sm:col-span-2 bg-[#111] hover:bg-[#c8a96b] text-white py-3.5 rounded-full text-[14px] font-semibold transition-all duration-300">
                Submit Booking
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
