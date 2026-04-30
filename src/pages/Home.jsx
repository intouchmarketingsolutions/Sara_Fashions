import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { menProducts, womenProducts, kidsProducts } from '../data/products';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80',
    title: 'The Art of Luxury',
    subtitle: 'New Collection 2024',
    link: '/women',
    linkText: 'Shop Women',
  },
  {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80',
    title: 'Crafted Excellence',
    subtitle: 'Men\'s Premium',
    link: '/men',
    linkText: 'Shop Men',
  },
];

const categories = [
  {
    title: 'Women',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    href: '/women',
    tag: 'New Arrivals',
  },
  {
    title: 'Men',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    href: '/men',
    tag: 'Classic Styles',
  },
  {
    title: 'Kids',
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&q=80',
    href: '/kids',
    tag: 'Adorable Picks',
  },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const featuredMen = menProducts.slice(0, 4);
  const featuredWomen = womenProducts.slice(0, 4);

  return (
    <div className="bg-black">
      {/* Hero */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src={heroSlides[0].image}
            alt="Sara Fashion Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, letterSpacing: '0.5em' }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="font-poppins text-gold text-xs tracking-[0.5em] uppercase mb-6"
          >
            Luxury Redefined
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-none mb-6"
          >
            SARA
            <em className="block italic text-gold">Fashion</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="font-poppins text-gray-300 text-sm tracking-widest uppercase mb-10"
          >
            Where Every Thread Tells a Story
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/women" className="btn-gold">Shop Women</Link>
            <Link to="/men" className="btn-outline-gold">Shop Men</Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
          <span className="text-[9px] text-gold/60 tracking-[0.3em] uppercase font-poppins">Scroll</span>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-poppins text-gold text-xs tracking-[0.4em] uppercase mb-3"
          >
            Explore
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Shop by Category
          </motion.h2>
          <div className="gold-divider mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Link to={cat.href} className="block relative overflow-hidden group aspect-[3/4]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 overlay-dark" />
                <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="font-poppins text-gold text-[10px] tracking-[0.4em] uppercase mb-2">{cat.tag}</p>
                  <h3 className="font-playfair text-3xl text-white mb-4">{cat.title}</h3>
                  <span className="inline-flex items-center gap-2 text-xs font-poppins text-gold tracking-widest uppercase border-b border-gold pb-0.5 group-hover:gap-4 transition-all duration-300">
                    Shop Now →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Women */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-poppins text-gold text-xs tracking-[0.4em] uppercase mb-2">New Arrivals</p>
            <h2 className="section-title">Women's Collection</h2>
            <div className="gold-divider" />
          </div>
          <Link to="/women" className="btn-outline-gold hidden sm:inline-flex">View All</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredWomen.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        <div className="text-center mt-8 sm:hidden">
          <Link to="/women" className="btn-outline-gold">View All</Link>
        </div>
      </section>

      {/* Marquee Banner */}
      <div className="bg-gold/10 border-y border-gold/20 py-5 overflow-hidden my-8">
        <div className="flex gap-16 whitespace-nowrap animate-[scroll_20s_linear_infinite]">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="font-playfair italic text-gold/60 text-lg tracking-wider">
              Sara Fashion &nbsp;·&nbsp; Luxury Crafted &nbsp;·&nbsp; Elegance Redefined &nbsp;·&nbsp; Premium Quality &nbsp;·
            </span>
          ))}
        </div>
      </div>

      {/* Featured Men */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-poppins text-gold text-xs tracking-[0.4em] uppercase mb-2">Curated For Him</p>
            <h2 className="section-title">Men's Collection</h2>
            <div className="gold-divider" />
          </div>
          <Link to="/men" className="btn-outline-gold hidden sm:inline-flex">View All</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredMen.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Full-Width Banner */}
      <section className="relative h-80 md:h-[500px] overflow-hidden mx-4 md:mx-8 mb-20">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80"
          alt="Wedding Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <p className="font-poppins text-gold text-xs tracking-[0.4em] uppercase mb-4">Exclusive</p>
          <h2 className="font-playfair text-4xl md:text-6xl text-white mb-6">Wedding Collection</h2>
          <p className="text-gray-300 text-sm font-poppins mb-8 max-w-md">
            From bridal lehengas to groom sherwanis — every piece crafted for your most precious moment.
          </p>
          <div className="flex gap-4">
            <Link to="/women" className="btn-gold">Bridal</Link>
            <Link to="/men" className="btn-outline-gold">Groom</Link>
          </div>
        </motion.div>
      </section>

      {/* Promise Section */}
      <section className="py-20 border-t border-gold/10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { icon: '✦', title: 'Premium Quality', desc: 'Finest fabrics sourced from across India and the world.' },
            { icon: '◈', title: 'Master Craftsmanship', desc: 'Each garment is a work of art, stitched by skilled artisans.' },
            { icon: '◇', title: 'Effortless Luxury', desc: 'Wear confidence. We bring luxury to every doorstep.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center"
            >
              <div className="text-gold text-3xl mb-4">{item.icon}</div>
              <h3 className="font-playfair text-xl text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm font-poppins leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
