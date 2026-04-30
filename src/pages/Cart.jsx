import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMinus, FiPlus, FiX, FiCheck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeItem, updateQty, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState('cart'); // cart | checkout | success
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', postal: '', city: '', state: '' });

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setStep('success');
    clearCart();
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-gold/10 border border-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck size={32} className="text-gold" />
          </div>
          <h2 className="font-playfair text-4xl text-white mb-4">Order Placed!</h2>
          <p className="text-gray-400 font-poppins text-sm mb-8">
            Thank you for your order. We'll confirm via email and ship within 3–5 business days.
          </p>
          <Link to="/" className="btn-gold">Continue Shopping</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <p className="font-poppins text-gold text-xs tracking-[0.4em] uppercase mb-2">Your Selection</p>
          <h1 className="section-title">{step === 'cart' ? 'Shopping Cart' : 'Checkout'}</h1>
          <div className="gold-divider" />
        </div>

        {items.length === 0 && step === 'cart' ? (
          <div className="text-center py-24">
            <p className="font-playfair text-3xl text-gray-500 mb-6">Your cart is empty</p>
            <Link to="/" className="btn-gold">Discover Collections</Link>
          </div>
        ) : step === 'cart' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.size}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="flex gap-4 border border-white/10 p-4 hover:border-gold/20 transition-colors duration-300"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-32 object-cover flex-shrink-0"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80'; }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-playfair text-white text-lg leading-tight mb-1">{item.name}</h3>
                      <p className="text-gray-500 text-xs font-poppins uppercase tracking-wider mb-1">Size: {item.size}</p>
                      <p className="text-gold font-playfair text-lg mb-3">₹{item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-white/20">
                          <button onClick={() => item.quantity > 1 && updateQty(item.id, item.size, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gold">
                            <FiMinus size={12} />
                          </button>
                          <span className="w-8 text-center text-white text-sm font-poppins">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, item.size, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gold">
                            <FiPlus size={12} />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id, item.size)} className="text-gray-600 hover:text-red-400 transition-colors">
                          <FiX size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-playfair text-gold">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="border border-gold/20 p-8 h-fit">
              <h3 className="font-playfair text-xl text-white mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                <div className="flex justify-between text-sm font-poppins text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-poppins text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-400">{totalPrice > 2000 ? 'Free' : '₹199'}</span>
                </div>
                <div className="flex justify-between text-sm font-poppins text-gray-400">
                  <span>Tax (5%)</span>
                  <span>₹{Math.round(totalPrice * 0.05).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex justify-between font-playfair text-lg text-white mb-8">
                <span>Total</span>
                <span className="text-gold">₹{(totalPrice + (totalPrice > 2000 ? 0 : 199) + Math.round(totalPrice * 0.05)).toLocaleString()}</span>
              </div>
              <button onClick={() => setStep('checkout')} className="btn-gold w-full">
                Proceed to Checkout
              </button>
              <Link to="/" className="block text-center text-gray-500 text-xs font-poppins mt-4 hover:text-gold transition-colors">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              {/* Delivery */}
              <div>
                <h3 className="font-playfair text-2xl text-white mb-6">Delivery Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'name', label: 'Full Name', type: 'text', full: false },
                    { name: 'phone', label: 'Phone Number', type: 'tel', full: false },
                    { name: 'email', label: 'Email Address', type: 'email', full: true },
                    { name: 'address', label: 'Delivery Address', type: 'text', full: true },
                    { name: 'city', label: 'City', type: 'text', full: false },
                    { name: 'state', label: 'State', type: 'text', full: false },
                    { name: 'postal', label: 'Postal Code', type: 'text', full: false },
                  ].map(field => (
                    <div key={field.name} className={field.full ? 'sm:col-span-2' : ''}>
                      <label className="block text-xs font-poppins text-gray-400 tracking-wider uppercase mb-2">{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-white/5 border border-white/15 text-white font-poppins text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div>
                <h3 className="font-playfair text-2xl text-white mb-6">Payment Method</h3>
                <div className="flex gap-4">
                  {[
                    { value: 'online', label: 'Online Payment', icon: '💳' },
                    { value: 'cod', label: 'Cash on Delivery', icon: '💵' },
                  ].map(method => (
                    <button
                      key={method.value}
                      type="button"
                      onClick={() => setPaymentMethod(method.value)}
                      className={`flex-1 flex items-center gap-3 p-4 border transition-all duration-300 ${
                        paymentMethod === method.value ? 'border-gold bg-gold/10' : 'border-white/15 hover:border-gold/40'
                      }`}
                    >
                      <span className="text-xl">{method.icon}</span>
                      <span className="font-poppins text-sm text-white">{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="border border-gold/20 p-8 h-fit">
              <h3 className="font-playfair text-xl text-white mb-4">Order ({items.length} items)</h3>
              <div className="space-y-3 mb-6">
                {items.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm font-poppins text-gray-400">
                    <span className="truncate flex-1 mr-2">{item.name} ×{item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="h-px bg-gold/15 mb-4" />
              <div className="flex justify-between font-playfair text-lg text-white mb-8">
                <span>Total</span>
                <span className="text-gold">₹{(totalPrice + (totalPrice > 2000 ? 0 : 199) + Math.round(totalPrice * 0.05)).toLocaleString()}</span>
              </div>
              <button type="submit" className="btn-gold w-full">Place Order</button>
              <button type="button" onClick={() => setStep('cart')} className="block text-center text-gray-500 text-xs font-poppins mt-4 hover:text-gold transition-colors w-full">
                ← Back to Cart
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
