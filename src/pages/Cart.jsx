import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMinus, FiPlus, FiTrash2, FiCheck, FiShoppingBag, FiCreditCard, FiSmartphone, FiPackage, FiPhone } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Cart() {
  const { items, removeItem, updateQty, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [step,          setStep]          = useState('cart')
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: '', postal: '' })
  const [orderData,     setOrderData]     = useState(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])
  useEffect(() => { window.scrollTo(0, 0) }, [step])

  const handleForm = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const shipping   = totalPrice > 3000 ? 0 : 199
  const tax        = Math.round(totalPrice * 0.05)
  const finalTotal = totalPrice + shipping + tax

  const handleOrder = (e) => {
    e.preventDefault()
    const orderId = 'SC' + Date.now().toString().slice(-8)
    const receipt = {
      orderId,
      date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      items: [...items],
      form: { ...form },
      paymentMethod,
      shipping,
      tax,
      finalTotal,
      user,
    }
    setOrderData(receipt)
    setStep('success')
    clearCart()
  }

  if (step === 'success' && orderData) {
    return (
      <div className="min-h-screen bg-[#f8f3eb] px-4 pt-[80px] pb-12">
        <div className="max-w-lg mx-auto">

          {/* SUCCESS HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <FiCheck className="text-green-600" size={28} />
            </div>
            <h1 className="text-[22px] sm:text-[26px] font-semibold text-[#1a1a1a]">Order Confirmed!</h1>
            <p className="text-[#888] text-[13px] mt-1">Thank you for shopping with Sara Central</p>
          </motion.div>

          {/* RECEIPT CARD */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl border border-[#eee] overflow-hidden"
          >
            {/* Receipt Header */}
            <div className="bg-[#111] px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-white/60 text-[10px] uppercase tracking-widest">Payment Receipt</p>
                <p className="text-white font-semibold text-[15px] mt-0.5">Sara Central Boutique</p>
              </div>
              <div className="text-right">
                <p className="text-[#c8a96b] text-[10px] uppercase tracking-widest">Order ID</p>
                <p className="text-white font-bold text-[14px] tracking-widest">#{orderData.orderId}</p>
              </div>
            </div>

            <div className="px-5 py-4 space-y-4">

              {/* Date & Payment */}
              <div className="flex justify-between text-[13px] border-b border-[#f0ebe3] pb-3">
                <div>
                  <p className="text-[#888] text-[11px] uppercase tracking-wider">Date & Time</p>
                  <p className="text-[#1a1a1a] font-medium mt-0.5">{orderData.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#888] text-[11px] uppercase tracking-wider">Payment</p>
                  <p className="text-[#1a1a1a] font-medium mt-0.5 capitalize">
                    {orderData.paymentMethod === 'upi' ? 'UPI / GPay' : orderData.paymentMethod === 'card' ? 'Card Payment' : 'Cash on Delivery'}
                  </p>
                </div>
              </div>

              {/* Products */}
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#888] mb-3">Products Ordered</p>
                <div className="space-y-3">
                  {orderData.items.map((item, i) => (
                    <div key={i} className="flex gap-3 bg-[#f8f3eb] rounded-xl p-3">
                      <img src={item.image} alt={item.name} className="w-14 h-16 rounded-lg object-cover object-top flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[#b68b45] text-[10px] uppercase tracking-wider">{item.subcategory}</p>
                        <p className="text-[#1a1a1a] text-[13px] font-semibold leading-snug">{item.name}</p>
                        <p className="text-[#666] text-[11px] mt-0.5">Product ID: <span className="font-mono text-[#b68b45]">{item.id.toUpperCase()}</span> · Size: {item.size || 'M'} · Qty: {item.quantity}</p>
                        <p className="text-[#1a1a1a] text-[13px] font-semibold mt-1">₹{(item.price * (item.quantity || 1)).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-[#f0ebe3] pt-3 space-y-1.5">
                <div className="flex justify-between text-[13px] text-[#666]">
                  <span>Subtotal</span>
                  <span>₹{(orderData.finalTotal - orderData.shipping - orderData.tax).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[13px] text-[#666]">
                  <span>Shipping</span>
                  <span>{orderData.shipping === 0 ? <span className="text-green-600">Free</span> : `₹${orderData.shipping}`}</span>
                </div>
                <div className="flex justify-between text-[13px] text-[#666]">
                  <span>Tax (5%)</span>
                  <span>₹{orderData.tax}</span>
                </div>
                <div className="flex justify-between text-[15px] font-bold text-[#1a1a1a] border-t border-[#eee] pt-2 mt-2">
                  <span>Total Paid</span>
                  <span className="text-[#b68b45]">₹{orderData.finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Customer Info */}
              {orderData.user && (
                <div className="border-t border-[#f0ebe3] pt-3">
                  <p className="text-[11px] uppercase tracking-wider text-[#888] mb-2">Customer</p>
                  <p className="text-[13px] font-semibold text-[#1a1a1a]">{orderData.user.name}</p>
                  <p className="text-[13px] text-[#666]">+91 {orderData.user.phone}</p>
                </div>
              )}

              {/* Contact */}
              <div className="bg-[#f8f3eb] rounded-xl p-4 border border-[#e8dfc9]">
                <p className="text-[11px] uppercase tracking-wider text-[#888] mb-2">Need Help? Contact Us</p>
                <a href="tel:+919663098124" className="flex items-center gap-2 text-[#b68b45] font-semibold text-[14px]">
                  <FiPhone size={14} /> +91 9663098124
                </a>
                <p className="text-[#888] text-[12px] mt-1">Sara Central Boutique · Udyavara, Udupi</p>
                <p className="text-[#888] text-[12px]">Mon–Sat · 10:00 AM – 8:00 PM</p>
              </div>

            </div>
          </motion.div>

          <div className="mt-6 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[#111] hover:bg-[#c8a96b] text-white px-7 py-3 rounded-full text-[14px] font-semibold transition-all duration-300"
            >
              <FiShoppingBag size={15} /> Continue Shopping
            </Link>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#f8f3eb] min-h-screen pt-[70px] sm:pt-[76px] lg:pt-[82px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-[24px] sm:text-[32px] font-semibold text-[#1a1a1a]">
            {step === 'cart' ? 'Your Cart' : 'Checkout'}
          </h1>
        </div>

        {/* EMPTY */}
        {items.length === 0 && step === 'cart' ? (
          <div className="bg-white rounded-3xl border border-[#eee] p-10 sm:p-14 text-center max-w-md mx-auto">
            <FiShoppingBag size={40} className="text-[#ddd] mx-auto mb-4" />
            <h2 className="text-[20px] font-semibold text-[#1a1a1a] mb-3">Your Cart Is Empty</h2>
            <p className="text-[#666] text-[14px] mb-6">Explore our collection and add your favourite styles.</p>
            <Link to="/products" className="bg-[#111] hover:bg-[#c8a96b] text-white px-7 py-3 rounded-full text-[14px] font-semibold transition-all duration-300">
              Explore Collection
            </Link>
          </div>

        ) : step === 'cart' ? (
          <div className="flex flex-col lg:flex-row gap-6">

            {/* ITEMS */}
            <div className="flex-1 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.size}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-2xl border border-[#eee] p-4 sm:p-5 flex gap-4"
                  >
                    <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[#b68b45] text-[10px] uppercase tracking-widest font-semibold mb-1">{item.subcategory}</p>
                      <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#1a1a1a] leading-snug mb-1 truncate">{item.name}</h3>
                      <p className="text-[#888] text-[12px] mb-2">Size: {item.size}</p>
                      <p className="text-[#b68b45] text-[15px] font-semibold mb-3">₹{item.price.toLocaleString()}</p>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-[#f8f3eb] rounded-full border border-[#eee] overflow-hidden">
                          <button onClick={() => item.quantity > 1 && updateQty(item.id, item.size, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-[#eee]">
                            <FiMinus size={12} />
                          </button>
                          <span className="w-8 text-center text-[13px] font-medium">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, item.size, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-[#eee]">
                            <FiPlus size={12} />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id, item.size)} className="text-red-400 hover:text-red-500 transition">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-[15px] font-semibold text-[#1a1a1a]">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* SUMMARY */}
            <div className="lg:w-80 xl:w-96 bg-white rounded-2xl border border-[#eee] p-5 sm:p-6 h-fit lg:sticky lg:top-[80px]">
              <h3 className="text-[17px] font-semibold text-[#1a1a1a] mb-5">Order Summary</h3>

              <div className="space-y-3 border-b border-[#eee] pb-4 mb-4 text-[14px]">
                <div className="flex justify-between text-[#666]"><span>Subtotal</span><span>₹{totalPrice.toLocaleString()}</span></div>
                <div className="flex justify-between text-[#666]"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
                <div className="flex justify-between text-[#666]"><span>Tax (5%)</span><span>₹{tax.toLocaleString()}</span></div>
              </div>

              <div className="flex justify-between items-center mb-5">
                <span className="text-[16px] font-semibold text-[#1a1a1a]">Total</span>
                <span className="text-[20px] font-semibold text-[#c8a96b]">₹{finalTotal.toLocaleString()}</span>
              </div>

              {shipping > 0 && (
                <p className="text-[11px] text-[#888] mb-4 text-center">Free shipping on orders above ₹3,000</p>
              )}

              <button
                onClick={() => { if (!user) { navigate('/login?redirect=/cart') } else { setStep('checkout') } }}
                className="w-full bg-[#111] hover:bg-[#c8a96b] text-white py-3.5 rounded-full text-[14px] font-semibold transition-all duration-300"
              >
                Buy
              </button>
              <Link to="/products" className="block text-center mt-4 text-[13px] text-[#666] hover:text-[#c8a96b] transition">
                ← Continue Shopping
              </Link>
            </div>
          </div>

        ) : (
          /* CHECKOUT */
          <form onSubmit={handleOrder} className="flex flex-col lg:flex-row gap-6">

            {/* FORM */}
            <div className="flex-1 bg-white rounded-2xl border border-[#eee] p-5 sm:p-7">

              <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#1a1a1a] mb-5">Delivery Details</h2>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  { name: 'name',  label: 'Full Name',    type: 'text'  },
                  { name: 'phone', label: 'Phone Number', type: 'tel'   },
                  { name: 'email', label: 'Email Address',type: 'email' },
                  { name: 'city',  label: 'City',         type: 'text'  },
                ].map((f) => (
                  <input
                    key={f.name}
                    type={f.type}
                    name={f.name}
                    required
                    value={form[f.name]}
                    onChange={handleForm}
                    placeholder={f.label}
                    className="border border-[#ddd] px-4 py-3 rounded-xl outline-none focus:border-[#c8a96b] text-[14px] transition-colors"
                  />
                ))}
                <textarea
                  name="address"
                  rows="3"
                  required
                  value={form.address}
                  onChange={handleForm}
                  placeholder="Delivery Address"
                  className="sm:col-span-2 border border-[#ddd] px-4 py-3 rounded-xl outline-none focus:border-[#c8a96b] text-[14px] transition-colors resize-none"
                />
                <input
                  type="text"
                  name="postal"
                  required
                  value={form.postal}
                  onChange={handleForm}
                  placeholder="Postal Code"
                  className="border border-[#ddd] px-4 py-3 rounded-xl outline-none focus:border-[#c8a96b] text-[14px] transition-colors"
                />
              </div>

              {/* PAYMENT */}
              <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#1a1a1a] mb-4">Payment Method</h3>

              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { value: 'upi',    label: 'UPI / GPay',     icon: <FiSmartphone size={20} />,  sub: 'PhonePe, GPay, Paytm' },
                  { value: 'card',   label: 'Card Payment',   icon: <FiCreditCard size={20} />,  sub: 'Debit / Credit card'  },
                  { value: 'cod',    label: 'Cash on Delivery',icon: <FiPackage size={20} />,    sub: 'Pay on delivery'      },
                ].map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => setPaymentMethod(m.value)}
                    className={`border rounded-xl p-4 text-left transition-all duration-200 ${
                      paymentMethod === m.value
                        ? 'border-[#c8a96b] bg-[#c8a96b]/8'
                        : 'border-[#eee] hover:border-[#c8a96b]/50'
                    }`}
                  >
                    <div className={`mb-2 ${paymentMethod === m.value ? 'text-[#c8a96b]' : 'text-[#555]'}`}>{m.icon}</div>
                    <p className="text-[13px] font-semibold text-[#1a1a1a]">{m.label}</p>
                    <p className="text-[11px] text-[#888] mt-0.5">{m.sub}</p>
                  </button>
                ))}
              </div>

              {paymentMethod !== 'cod' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 bg-[#f8f3eb] border border-[#eee] rounded-xl p-4 overflow-hidden"
                >
                  {paymentMethod === 'upi' ? (
                    <div className="space-y-3">
                      <p className="text-[12px] text-[#888] uppercase tracking-wider font-semibold">Enter UPI ID</p>
                      <input
                        type="text"
                        placeholder="yourname@upi"
                        required
                        className="w-full border border-[#ddd] px-4 py-2.5 rounded-xl outline-none focus:border-[#c8a96b] text-[14px]"
                      />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-[12px] text-[#888] uppercase tracking-wider font-semibold">Card Details</p>
                      <input type="text" placeholder="Card Number" maxLength="19" required
                        className="w-full border border-[#ddd] px-4 py-2.5 rounded-xl outline-none focus:border-[#c8a96b] text-[14px]" />
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="MM / YY" required
                          className="border border-[#ddd] px-4 py-2.5 rounded-xl outline-none focus:border-[#c8a96b] text-[14px]" />
                        <input type="text" placeholder="CVV" maxLength="3" required
                          className="border border-[#ddd] px-4 py-2.5 rounded-xl outline-none focus:border-[#c8a96b] text-[14px]" />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* SUMMARY */}
            <div className="lg:w-80 xl:w-96 bg-white rounded-2xl border border-[#eee] p-5 sm:p-6 h-fit lg:sticky lg:top-[80px]">
              <h3 className="text-[17px] font-semibold text-[#1a1a1a] mb-4">Order Summary</h3>

              <div className="space-y-3 border-b border-[#eee] pb-4 mb-4 text-[13px]">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between gap-3">
                    <div>
                      <p className="text-[#1a1a1a] font-medium text-[13px] leading-snug">{item.name}</p>
                      <p className="text-[#888] text-[11px]">Qty: {item.quantity} · {item.size}</p>
                    </div>
                    <span className="text-[#c8a96b] font-semibold flex-shrink-0">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-b border-[#eee] pb-4 mb-4 text-[13px] text-[#666]">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{totalPrice.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
                <div className="flex justify-between"><span>Tax (5%)</span><span>₹{tax.toLocaleString()}</span></div>
              </div>

              <div className="flex justify-between items-center mb-5">
                <span className="text-[15px] font-semibold text-[#1a1a1a]">Total</span>
                <span className="text-[20px] font-semibold text-[#c8a96b]">₹{finalTotal.toLocaleString()}</span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#111] hover:bg-[#c8a96b] text-white py-3.5 rounded-full text-[14px] font-semibold transition-all duration-300"
              >
                Place Order
              </button>
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="w-full mt-3 text-[13px] text-[#666] hover:text-[#c8a96b] transition py-2"
              >
                ← Back To Cart
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
