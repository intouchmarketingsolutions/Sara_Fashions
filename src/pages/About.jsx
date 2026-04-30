import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="bg-black min-h-screen pt-20">
      {/* Hero */}
      <div className="relative h-80 md:h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80"
          alt="About Sara Fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-poppins text-gold text-xs tracking-[0.5em] uppercase mb-4">
            Our Story
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="section-title">
            About Sara Fashion
          </motion.h1>
          <div className="gold-divider mx-auto mt-4" />
        </div>
      </div>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="font-poppins text-gold text-xs tracking-[0.4em] uppercase mb-4">The Beginning</p>
          <h2 className="font-playfair text-4xl text-white mb-6">Born from a Passion for Beauty</h2>
          <div className="gold-divider mx-auto mb-8" />
          <p className="text-gray-400 font-poppins leading-relaxed text-base">
            Sara Fashion was founded with a singular vision — to make luxury fashion accessible without compromising on artistry.
            Every collection is a dialogue between tradition and modernity, between the timeless craft of Indian textile artisans
            and the forward-looking sensibilities of global fashion.
          </p>
          <p className="text-gray-400 font-poppins leading-relaxed text-base mt-4">
            We work directly with master weavers in Varanasi, Kanjipuram, and Surat — ensuring not just quality, but the
            preservation of centuries-old techniques that deserve to live on.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
              alt="Craftsmanship"
              className="w-full aspect-[4/5] object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-poppins text-gold text-xs tracking-[0.4em] uppercase mb-4">Our Vision</p>
            <h3 className="font-playfair text-3xl text-white mb-4">Redefining Indian Luxury</h3>
            <div className="gold-divider mb-6" />
            <p className="text-gray-400 font-poppins text-sm leading-relaxed mb-4">
              We believe luxury isn't just about price — it's about intention, craft, and the story woven into every thread.
              Sara Fashion is committed to offering pieces that outlast seasons and trends.
            </p>
            <p className="text-gray-400 font-poppins text-sm leading-relaxed">
              Our designers travel across India to discover rare textiles, embroidery styles, and silhouettes that become the
              foundation of each collection — rooted in heritage, styled for today.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            { num: '01', title: 'Artisan-Made', desc: 'Every piece is handcrafted by skilled artisans who have inherited generations of knowledge.' },
            { num: '02', title: 'Sustainable', desc: 'We source ethically, support fair wages, and reduce waste at every stage of production.' },
            { num: '03', title: 'Timeless', desc: 'Our designs transcend trends — they are wardrobe investments that grow more beautiful with time.' },
          ].map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="border border-gold/15 p-8 hover:border-gold/40 transition-colors duration-500"
            >
              <div className="font-playfair text-5xl text-gold/20 mb-4">{v.num}</div>
              <h4 className="font-playfair text-xl text-white mb-3">{v.title}</h4>
              <p className="text-gray-500 text-sm font-poppins leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Numbers */}
        <div className="grid grid-cols-3 gap-8 mt-20 py-12 border-t border-gold/15">
          {[
            { num: '15+', label: 'Years of Luxury' },
            { num: '50K+', label: 'Happy Customers' },
            { num: '200+', label: 'Artisan Partners' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-playfair text-4xl gold-text mb-2">{stat.num}</div>
              <p className="text-gray-500 text-xs font-poppins tracking-widest uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
