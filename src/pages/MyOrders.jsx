import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowLeft, FiPackage, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

export default function MyOrders() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    const key = `sara_orders_${user.phone}`
    const stored = JSON.parse(localStorage.getItem(key) || '[]')
    setOrders(stored)
  }, [user, navigate])

  const toggle = (id) => setExpanded(prev => prev === id ? null : id)

  return (
    <div className="bg-[#f8f3eb] min-h-screen pt-[64px] sm:pt-[70px] lg:pt-[76px]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[13px] text-[#666] hover:text-[#c8a96b] transition-colors"
          >
            <FiArrowLeft size={16} /> Back
          </button>
        </div>

        <h1 className="text-[22px] sm:text-[26px] font-bold text-[#1a1a1a] mb-1">My Orders</h1>
        <p className="text-[13px] text-[#888] mb-8">
          Logged in as <span className="text-[#c8a96b] font-semibold">{user?.name}</span>
        </p>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white rounded-2xl shadow-sm border border-[#eee]"
          >
            <FiPackage size={40} className="mx-auto text-[#ccc] mb-4" />
            <h2 className="text-[18px] font-semibold text-[#333] mb-2">No Orders Yet</h2>
            <p className="text-[13px] text-[#888] mb-6">Your order history will appear here after you place an order.</p>
            <Link
              to="/products"
              className="inline-block bg-[#111] hover:bg-[#c8a96b] text-white px-6 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-300"
            >
              Shop Now
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <motion.div
                key={order.orderId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl shadow-sm border border-[#eee] overflow-hidden"
              >
                {/* Order summary row */}
                <button
                  onClick={() => toggle(order.orderId)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#faf7f2] transition-colors text-left"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                    <div>
                      <p className="text-[13px] font-bold text-[#c8a96b] tracking-wide">#{order.orderId}</p>
                      <p className="text-[12px] text-[#888] mt-0.5">{order.date}</p>
                    </div>
                    <div className="hidden sm:block h-8 w-px bg-[#eee]" />
                    <div>
                      <p className="text-[13px] font-semibold text-[#1a1a1a]">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </p>
                      <p className="text-[12px] text-[#888]">
                        ₹{order.finalTotal?.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-green-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {order.status}
                    </span>
                    {expanded === order.orderId
                      ? <FiChevronUp size={16} className="text-[#aaa]" />
                      : <FiChevronDown size={16} className="text-[#aaa]" />
                    }
                  </div>
                </button>

                {/* Expanded details */}
                <AnimatePresence initial={false}>
                  {expanded === order.orderId && (
                    <motion.div
                      key="details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden border-t border-[#f0ebe3]"
                    >
                      <div className="px-5 py-4 space-y-5">

                        {/* Items list */}
                        <div>
                          <p className="text-[11px] uppercase tracking-widest text-[#aaa] font-bold mb-3">Items Ordered</p>
                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-3">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 rounded-lg object-cover border border-[#eee] flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-[13px] font-semibold text-[#1a1a1a] truncate">{item.name}</p>
                                  <p className="text-[12px] text-[#888]">Qty: {item.qty}</p>
                                </div>
                                <p className="text-[13px] font-semibold text-[#1a1a1a] flex-shrink-0">
                                  ₹{(item.price * item.qty).toLocaleString('en-IN')}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Delivery info */}
                        <div className="border-t border-[#f0ebe3] pt-4">
                          <p className="text-[11px] uppercase tracking-widest text-[#aaa] font-bold mb-3">Delivery Address</p>
                          <p className="text-[13px] text-[#444]">
                            {order.form?.name}<br />
                            {order.form?.address}, {order.form?.city}<br />
                            {order.form?.state} — {order.form?.pincode}
                          </p>
                        </div>

                        {/* Totals */}
                        <div className="border-t border-[#f0ebe3] pt-4 space-y-1.5">
                          <div className="flex justify-between text-[13px] text-[#666]">
                            <span>Subtotal</span>
                            <span>₹{(order.finalTotal - order.shipping - order.tax)?.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between text-[13px] text-[#666]">
                            <span>Shipping</span>
                            <span>{order.shipping === 0 ? 'Free' : `₹${order.shipping}`}</span>
                          </div>
                          <div className="flex justify-between text-[13px] text-[#666]">
                            <span>GST (5%)</span>
                            <span>₹{order.tax?.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between text-[14px] font-bold text-[#1a1a1a] pt-1 border-t border-[#f0ebe3]">
                            <span>Total Paid</span>
                            <span>₹{order.finalTotal?.toLocaleString('en-IN')}</span>
                          </div>
                        </div>

                        {/* Payment method */}
                        <div className="border-t border-[#f0ebe3] pt-3">
                          <p className="text-[12px] text-[#888]">
                            Payment: <span className="font-semibold text-[#444]">{order.paymentMethod}</span>
                          </p>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
