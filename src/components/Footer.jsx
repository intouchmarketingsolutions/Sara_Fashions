import { Link } from 'react-router-dom'
import { FiInstagram, FiFacebook, FiMapPin, FiPhone, FiMail } from 'react-icons/fi'
import logo from '../assets/images/logo/Sara-logo.png'

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white">

      {/* TOP */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 grid lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-6 lg:gap-8 items-start">

        {/* BRAND */}
        <div>
          <img src={logo} alt="Sara Central" className="h-12 object-contain mb-3" />
          <p className="text-gray-400 leading-relaxed text-sm">
            Exclusive women's fashion boutique offering bridal wear,
            designer sarees, tailoring services, and personal style consultation.
          </p>
          <div className="flex gap-3 mt-4">
            {[
              { Icon: FiInstagram, href: 'https://www.instagram.com/sara_central_udyavara' },
              { Icon: FiFacebook,  href: 'https://www.facebook.com/TheSaraCentral' },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#d4af7a]/30 flex items-center justify-center hover:bg-[#d4af7a] hover:text-black transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-[14px] font-semibold mb-3 text-[#d4af7a] uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-2.5 text-gray-400 text-sm">
            <li><Link to="/" onClick={() => window.scrollTo(0,0)} className="hover:text-[#d4af7a] transition-colors">Home</Link></li>
            <li><Link to="/products" onClick={() => window.scrollTo(0,0)} className="hover:text-[#d4af7a] transition-colors">Collections</Link></li>
            <li><Link to="/tailoring" onClick={() => window.scrollTo(0,0)} className="hover:text-[#d4af7a] transition-colors">Tailoring</Link></li>
            <li><Link to="/consultation" onClick={() => window.scrollTo(0,0)} className="hover:text-[#d4af7a] transition-colors">Consultation</Link></li>
          </ul>
        </div>

        {/* COLLECTIONS */}
        <div>
          <h3 className="text-[14px] font-semibold mb-3 text-[#d4af7a] uppercase tracking-wider">Collections</h3>
          <ul className="space-y-2.5 text-gray-400 text-sm">
            <li><Link to="/products?category=Sarees"   onClick={() => window.scrollTo(0,0)} className="hover:text-[#d4af7a] transition-colors">Sarees</Link></li>
            <li><Link to="/products?category=Bridal"   onClick={() => window.scrollTo(0,0)} className="hover:text-[#d4af7a] transition-colors">Bridal Wear</Link></li>
            <li><Link to="/products?category=Lehengas" onClick={() => window.scrollTo(0,0)} className="hover:text-[#d4af7a] transition-colors">Lehengas</Link></li>
            <li><Link to="/products?category=Kurtis"   onClick={() => window.scrollTo(0,0)} className="hover:text-[#d4af7a] transition-colors">Kurtis</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-[14px] font-semibold mb-3 text-[#d4af7a] uppercase tracking-wider">Contact</h3>
          <div className="space-y-3 text-gray-400 text-sm">
            <a
              href="https://maps.google.com/?q=Opp+KIA+Showroom+Near+SBI+Bank+Udyavara+Udupi"
              target="_blank" rel="noopener noreferrer"
              className="flex gap-2.5 hover:text-[#d4af7a] transition-colors"
            >
              <FiMapPin className="mt-0.5 text-[#d4af7a] flex-shrink-0" size={14} />
              <span>Opp. KIA Showroom, Near SBI Bank, Udyavara, Udupi</span>
            </a>
            <a href="tel:+919663098124" className="flex gap-2.5 hover:text-[#d4af7a] transition-colors">
              <FiPhone className="text-[#d4af7a] flex-shrink-0" size={14} />
              <span>+91 9663098124</span>
            </a>
            <a href="mailto:hello@saracentral.com" className="flex gap-2.5 hover:text-[#d4af7a] transition-colors">
              <FiMail className="text-[#d4af7a] flex-shrink-0" size={14} />
              <span>info@saracentral.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 py-4 text-center text-sm text-gray-500">
        © 2026 Sara Central. All rights reserved.
      </div>
    </footer>
  )
}
