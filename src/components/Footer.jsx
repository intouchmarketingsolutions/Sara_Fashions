import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi';
import { BsWhatsapp } from 'react-icons/bs';

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-gold/15">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <div className="mb-6">
            <span className="font-playfair text-3xl font-bold gold-text">SARA</span>
            <p className="font-poppins text-[9px] tracking-[0.4em] text-gold/60 uppercase mt-0.5">Fashion</p>
          </div>
          <p className="text-gray-400 text-sm font-poppins leading-relaxed mb-6">
            Luxury fashion for those who demand the finest. Every thread tells a story of craftsmanship and elegance.
          </p>
          <div className="flex gap-4">
            {[FiInstagram, FiFacebook, FiTwitter, FiYoutube].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 border border-gold/30 flex items-center justify-center text-gold/70 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-300">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-playfair text-lg text-white mb-6 tracking-wide">Categories</h4>
          <div className="h-px w-8 bg-gold mb-6" />
          <ul className="space-y-3">
            {['Women', 'Men', 'Kids', 'Wedding'].map(cat => (
              <li key={cat}>
                <Link to={`/${cat.toLowerCase()}`} className="text-gray-400 hover:text-gold transition-colors duration-300 text-sm font-poppins tracking-wide">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="font-playfair text-lg text-white mb-6 tracking-wide">Customer Care</h4>
          <div className="h-px w-8 bg-gold mb-6" />
          <ul className="space-y-3">
            {['Orders & Shipment', 'Returns & Exchange', 'Contact Us', 'FAQs', 'Check Gift Card Balance'].map(item => (
              <li key={item}>
                <a href="#" className="text-gray-400 hover:text-gold transition-colors duration-300 text-sm font-poppins tracking-wide">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Need Help */}
        <div>
          <h4 className="font-playfair text-lg text-white mb-6 tracking-wide">Need Help?</h4>
          <div className="h-px w-8 bg-gold mb-6" />
          <ul className="space-y-4">
            <li>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors duration-300 text-sm font-poppins tracking-wide block">
                Store Locator
              </a>
            </li>
            <li>
              <a href="mailto:hello@sarafashion.com" className="text-gray-400 hover:text-gold transition-colors duration-300 text-sm font-poppins tracking-wide block">
                hello@sarafashion.com
              </a>
            </li>
            <li>
              <a href="https://wa.me/919999313366" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors duration-300 text-sm font-poppins tracking-wide">
                <BsWhatsapp size={15} />
                +91 99993 13366
              </a>
            </li>
          </ul>

          <div className="mt-8">
            <p className="text-xs text-gray-500 font-poppins mb-3 tracking-wider uppercase">Newsletter</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-white/5 border border-gold/20 text-white placeholder-gray-600 px-3 py-2 text-xs font-poppins focus:outline-none focus:border-gold transition-colors"
              />
              <button className="bg-gold text-black px-3 py-2 text-xs font-poppins font-semibold hover:bg-gold-light transition-colors">
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold/10 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs font-poppins tracking-wide">
            © 2024 Sara Fashion. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            {['Corporate Information', 'Terms & Conditions', 'Privacy Policy', 'Cookie Policy', 'Shipping Policy'].map(item => (
              <a key={item} href="#" className="text-gray-600 hover:text-gold/70 transition-colors duration-300 text-xs font-poppins tracking-wide">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
