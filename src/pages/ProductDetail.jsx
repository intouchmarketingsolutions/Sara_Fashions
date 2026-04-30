import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiShoppingBag, FiHeart, FiShare2, FiMinus, FiPlus } from 'react-icons/fi';
import { allProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const reviews = [
  { name: 'Priya Sharma', rating: 5, date: 'Jan 2024', comment: 'Absolutely stunning quality! The fabric feels premium and the fit is perfect. Will definitely order again.' },
  { name: 'Rahul Mehta', rating: 4, date: 'Dec 2023', comment: 'Beautiful product, exactly as described. Packaging was elegant too.' },
  { name: 'Ananya Singh', rating: 5, date: 'Nov 2023', comment: 'Sara Fashion never disappoints. This piece is worth every rupee.' },
];

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const product = allProducts.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState('M');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="font-playfair text-3xl text-white mb-4">Product Not Found</h2>
          <Link to="/" className="btn-gold">Back to Home</Link>
        </div>
      </div>
    );
  }

  const related = allProducts.filter(p => p.subcategory === product.subcategory && p.id !== product.id).slice(0, 4);
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(product.rating));

  const handleAddToCart = () => {
    addItem({ ...product, size: selectedSize, quantity: qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-black min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-poppins text-gray-500 mb-8 tracking-wider uppercase">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>·</span>
          <Link to={`/${product.category}`} className="hover:text-gold transition-colors capitalize">{product.category}</Link>
          <span>·</span>
          <span className="text-gray-400">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80'; }}
              />
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 mt-3">
              {[product.image, product.image, product.image].map((img, i) => (
                <div key={i} className={`w-20 aspect-square overflow-hidden cursor-pointer border-2 ${i === 0 ? 'border-gold' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="mb-2">
              <span className="font-poppins text-gold text-xs tracking-[0.4em] uppercase">{product.subcategory}</span>
            </div>
            <h1 className="font-playfair text-3xl md:text-4xl text-white mb-4 leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              {stars.map((filled, i) => (
                <FiStar key={i} size={14} className={filled ? 'text-gold' : 'text-gray-600'} style={{ fill: filled ? '#D4AF37' : 'none' }} />
              ))}
              <span className="text-gray-400 text-sm font-poppins">{product.rating} · {reviews.length} reviews</span>
            </div>

            <div className="text-3xl font-playfair text-gold mb-6">₹{product.price.toLocaleString()}</div>

            <div className="h-px bg-gold/15 mb-6" />

            <p className="text-gray-400 font-poppins text-sm leading-relaxed mb-8">{product.description}</p>

            {/* Size */}
            <div className="mb-6">
              <p className="font-poppins text-xs tracking-widest uppercase text-gray-400 mb-3">Select Size</p>
              <div className="flex gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 text-xs font-poppins transition-all duration-300 ${
                      selectedSize === size
                        ? 'bg-gold text-black font-semibold'
                        : 'border border-white/20 text-gray-400 hover:border-gold hover:text-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p className="font-poppins text-xs tracking-widest uppercase text-gray-400 mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-white/20">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gold transition-colors">
                    <FiMinus size={14} />
                  </button>
                  <span className="w-10 text-center font-poppins text-white">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gold transition-colors">
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-4 font-poppins text-sm font-semibold tracking-widest uppercase transition-all duration-300 ${
                  added ? 'bg-green-700 text-white' : 'bg-gold text-black hover:bg-gold-light'
                }`}
              >
                <FiShoppingBag size={16} />
                {added ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>
              <button
                onClick={() => setWishlist(!wishlist)}
                className={`w-14 h-14 border flex items-center justify-center transition-all duration-300 ${
                  wishlist ? 'border-gold bg-gold/10 text-gold' : 'border-white/20 text-gray-400 hover:border-gold hover:text-gold'
                }`}
              >
                <FiHeart size={18} style={{ fill: wishlist ? '#D4AF37' : 'none' }} />
              </button>
              <button className="w-14 h-14 border border-white/20 flex items-center justify-center text-gray-400 hover:border-gold hover:text-gold transition-all duration-300">
                <FiShare2 size={18} />
              </button>
            </div>

            {/* Shipping Info */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { icon: '📦', label: 'Free Shipping', sub: 'On orders above ₹2000' },
                { icon: '↩️', label: 'Easy Returns', sub: '7-day return policy' },
                { icon: '✅', label: 'Authentic', sub: '100% genuine products' },
                { icon: '🔒', label: 'Secure Payment', sub: 'SSL encrypted checkout' },
              ].map((info, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border border-white/8 hover:border-gold/20 transition-colors">
                  <span className="text-lg">{info.icon}</span>
                  <div>
                    <p className="text-white text-xs font-poppins font-medium">{info.label}</p>
                    <p className="text-gray-500 text-[10px] font-poppins">{info.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <div className="mb-20">
          <h2 className="font-playfair text-2xl text-white mb-2">Customer Reviews</h2>
          <div className="gold-divider mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-white/10 p-6 hover:border-gold/25 transition-colors duration-300"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <FiStar key={j} size={12} className="text-gold" style={{ fill: '#D4AF37' }} />
                  ))}
                </div>
                <p className="text-gray-300 text-sm font-poppins italic leading-relaxed mb-4">"{review.comment}"</p>
                <div className="flex justify-between items-center">
                  <span className="font-poppins text-xs text-gold font-semibold">{review.name}</span>
                  <span className="font-poppins text-xs text-gray-600">{review.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="font-playfair text-2xl text-white mb-2">You May Also Like</h2>
            <div className="gold-divider mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
