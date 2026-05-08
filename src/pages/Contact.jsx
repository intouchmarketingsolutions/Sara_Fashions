import { motion } from 'framer-motion'
import { FiMapPin, FiPhone, FiClock, FiMail, FiInstagram, FiFacebook } from 'react-icons/fi'

export default function Contact() {
  return (
    <div className="bg-[#f8f3eb] overflow-hidden min-h-screen">

      <section className="pt-[70px] sm:pt-[76px] lg:pt-[82px] pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-[1px] bg-[#c8a96b]" />
              <span className="text-[#b68b45] uppercase tracking-widest text-[11px] font-semibold">Contact Us</span>
              <div className="w-10 h-[1px] bg-[#c8a96b]" />
            </div>
            <h1 className="text-[28px] sm:text-[36px] md:text-[46px] font-semibold leading-tight text-[#1a1a1a]">
              Visit Our <span className="text-[#b68b45]">Boutique Studio</span>
            </h1>
          </motion.div>

          {/* GRID */}
          <div className="grid lg:grid-cols-2 gap-6 items-start">

            {/* CONTACT CARDS */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-3 sm:gap-4"
            >
              {[
                { icon: <FiMapPin size={20} />, title: 'Location', lines: ['Opp. KIA Showroom,', 'Near SBI Bank,', 'Udyavara, Udupi'] },
                { icon: <FiPhone size={20} />,  title: 'Phone',    lines: ['+91 9663098124', 'Sara Central Boutique'] },
                { icon: <FiMail size={20} />,   title: 'Email',    lines: ['hello@saracentral.com', 'support@saracentral.com'] },
                { icon: <FiClock size={20} />,  title: 'Hours',    lines: ['Mon – Sat', '10:00 AM – 8:00 PM'] },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="bg-white p-4 sm:p-6 rounded-2xl border border-[#eee] shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-[#c8a96b] text-white flex items-center justify-center mb-3">
                    {card.icon}
                  </div>
                  <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#1a1a1a] mb-2">{card.title}</h3>
                  <div className="text-[#666] text-[12px] sm:text-[13px] leading-relaxed">
                    {card.lines.map((line, j) => <p key={j}>{line}</p>)}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-5 sm:p-8 shadow-xl border border-[#eee]"
            >
              <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#1a1a1a] mb-5">Send a Message</h2>

              <form className="space-y-4">
                <input type="text"  placeholder="Full Name"    className="w-full border border-[#ddd] px-4 py-3 rounded-xl outline-none focus:border-[#c8a96b] text-[14px] transition-colors" />
                <input type="email" placeholder="Email Address" className="w-full border border-[#ddd] px-4 py-3 rounded-xl outline-none focus:border-[#c8a96b] text-[14px] transition-colors" />
                <input type="tel"   placeholder="Phone Number"  className="w-full border border-[#ddd] px-4 py-3 rounded-xl outline-none focus:border-[#c8a96b] text-[14px] transition-colors" />
                <textarea rows="4"  placeholder="Your message…" className="w-full border border-[#ddd] px-4 py-3 rounded-xl outline-none focus:border-[#c8a96b] text-[14px] transition-colors resize-none" />
                <button type="submit" className="w-full bg-[#111] hover:bg-[#c8a96b] text-white py-3.5 rounded-full text-[14px] font-semibold transition-all duration-300">
                  Send Message
                </button>
              </form>

              <div className="flex items-center gap-4 mt-6 pt-5 border-t border-[#eee]">
                <p className="text-[#666] text-[13px]">Follow Us:</p>
                {[FiInstagram, FiFacebook].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 rounded-full border border-[#ddd] flex items-center justify-center hover:bg-[#c8a96b] hover:text-white hover:border-[#c8a96b] transition-all duration-300">
                    <Icon size={17} />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="pb-10 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl shadow-xl border border-[#eee]"
          >
            <iframe
              title="Sara Central Location"
              src="https://www.google.com/maps?q=Udupi&output=embed"
              width="100%"
              height="320"
              allowFullScreen=""
              loading="lazy"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
