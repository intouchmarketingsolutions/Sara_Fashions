// src/components/Footer.jsx

import { Link } from 'react-router-dom'
import {
  FiInstagram,
  FiFacebook,
  FiMapPin,
  FiPhone,
  FiMail,
} from 'react-icons/fi'

import logo from '../assets/images/logo/Sara-logo.png'

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white">

      {/* TOP */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <img
              src={logo}
              alt="Sara Central"
              className="h-14 object-contain"
            />

            
          </div>

          <p className="text-gray-400 leading-relaxed text-sm">
            Exclusive women’s fashion boutique offering bridal wear,
            designer sarees, tailoring services, and personal style
            consultation.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-6">
            {[
              { Icon: FiInstagram, href: 'https://www.instagram.com/sara_central_udyavara' },
              { Icon: FiFacebook,  href: 'https://www.facebook.com/TheSaraCentral' },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#d4af7a]/30 flex items-center justify-center hover:bg-[#d4af7a] hover:text-black transition-all duration-300"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-6 text-[#d4af7a]">
            Quick Links
          </h3>

          <ul className="space-y-4 text-gray-400">
            <li>
              <Link to="/" className="hover:text-[#d4af7a]">
                Home
              </Link>
            </li>

            <li>
              <Link to="/products" className="hover:text-[#d4af7a]">
                Collections
              </Link>
            </li>

            <li>
              <Link to="/tailoring" className="hover:text-[#d4af7a]">
                Tailoring
              </Link>
            </li>

            <li>
              <Link to="/consultation" className="hover:text-[#d4af7a]">
                Consultation
              </Link>
            </li>
          </ul>
        </div>

        {/* COLLECTIONS */}
        <div>
          <h3 className="text-lg font-semibold mb-6 text-[#d4af7a]">
            Collections
          </h3>

          <ul className="space-y-4 text-gray-400">
            <li>Sarees</li>
            <li>Bridal Wear</li>
            <li>Lehengas</li>
            <li>Kurtis</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold mb-6 text-[#d4af7a]">
            Contact
          </h3>

          <div className="space-y-5 text-gray-400 text-sm">

            <div className="flex gap-3">
              <FiMapPin className="mt-1 text-[#d4af7a]" />
              <p>
                Opp. KIA Showroom,
                Near SBI Bank,
                Udyavara, Udupi
              </p>
            </div>

            <div className="flex gap-3">
              <FiPhone className="text-[#d4af7a]" />
              <p>+91 9663098124</p>
            </div>

            <div className="flex gap-3">
              <FiMail className="text-[#d4af7a]" />
              <p>hello@saracentral.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 py-5 text-center text-sm text-gray-500">
        © 2026 Sara Central. All rights reserved.
      </div>
    </footer>
  )
}