import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem({ ...product, size: 'M', quantity: 1 });
  };

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(product.rating));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <Link to={`/product/${product.id}`} className="block group">
        <div className="relative overflow-hidden bg-dark">
          {/* Image */}
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => { e.target.src = `https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80`; }}
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />

          {/* Add to Cart on Hover */}
          <motion.button
            onClick={handleAddToCart}
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            className="absolute bottom-4 left-4 right-4 btn-gold flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <FiShoppingBag size={14} />
            Add to Cart
          </motion.button>

          {/* Category Badge */}
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1">
            <span className="text-[9px] font-poppins text-gold tracking-widest uppercase">{product.subcategory}</span>
          </div>
        </div>

        {/* Info */}
        <div className="pt-4 pb-2 bg-black">
          <div className="flex items-center gap-1 mb-1.5">
            {stars.map((filled, i) => (
              <FiStar
                key={i}
                size={11}
                className={filled ? 'text-gold fill-gold' : 'text-gray-600'}
                style={{ fill: filled ? '#D4AF37' : 'none' }}
              />
            ))}
            <span className="text-gray-500 text-[10px] font-poppins ml-1">({product.rating})</span>
          </div>
          <h3 className="font-poppins text-sm text-white group-hover:text-gold transition-colors duration-300 leading-tight line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="font-playfair text-gold text-base">₹{product.price.toLocaleString()}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
