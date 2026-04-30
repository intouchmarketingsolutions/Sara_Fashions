import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiPackage, FiPhone, FiSettings } from 'react-icons/fi';

const tabs = [
  { id: 'profile', label: 'Profile', icon: FiUser },
  { id: 'orders', label: 'My Orders', icon: FiPackage },
  { id: 'account', label: 'Account Details', icon: FiSettings },
  { id: 'contact', label: 'Contact Us', icon: FiPhone },
];

const mockOrders = [
  { id: 'SF-001234', date: 'Apr 15, 2024', status: 'Delivered', items: 2, total: 8499 },
  { id: 'SF-001198', date: 'Mar 28, 2024', status: 'Processing', items: 1, total: 12999 },
  { id: 'SF-001045', date: 'Feb 10, 2024', status: 'Delivered', items: 3, total: 6780 },
];

export default function Account() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <p className="font-poppins text-gold text-xs tracking-[0.4em] uppercase mb-2">My Account</p>
          <h1 className="section-title">Welcome, Sara</h1>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="border border-gold/15 p-6 mb-6 text-center">
              <div className="w-20 h-20 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUser size={32} className="text-gold" />
              </div>
              <h3 className="font-playfair text-lg text-white">Sara Kulkarni</h3>
              <p className="text-gray-500 text-xs font-poppins mt-1">sara@example.com</p>
              <div className="mt-3 inline-block px-3 py-1 bg-gold/10 border border-gold/20">
                <span className="text-gold text-[10px] font-poppins tracking-widest uppercase">Premium Member</span>
              </div>
            </div>

            <nav className="space-y-1">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-poppins transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gold/10 border-l-2 border-gold text-gold'
                        : 'text-gray-400 hover:text-gold border-l-2 border-transparent hover:border-gold/40'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border border-gold/15 p-8"
            >
              {activeTab === 'profile' && (
                <div>
                  <h2 className="font-playfair text-2xl text-white mb-6">My Profile</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'First Name', value: 'Sara' },
                      { label: 'Last Name', value: 'Kulkarni' },
                      { label: 'Email', value: 'sara@example.com' },
                      { label: 'Phone', value: '+91 98765 43210' },
                      { label: 'Date of Birth', value: 'May 12, 1992' },
                      { label: 'Gender', value: 'Female' },
                    ].map(field => (
                      <div key={field.label}>
                        <label className="block text-xs font-poppins text-gray-500 tracking-wider uppercase mb-2">{field.label}</label>
                        <input
                          type="text"
                          defaultValue={field.value}
                          className="w-full bg-white/5 border border-white/15 text-white font-poppins text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                  <button className="btn-gold mt-6">Save Changes</button>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="font-playfair text-2xl text-white mb-6">My Orders</h2>
                  <div className="space-y-4">
                    {mockOrders.map(order => (
                      <div key={order.id} className="border border-white/10 p-5 hover:border-gold/25 transition-colors">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-poppins text-white font-semibold text-sm">#{order.id}</span>
                              <span className={`text-[10px] font-poppins px-2 py-0.5 ${
                                order.status === 'Delivered' ? 'bg-green-900/40 text-green-400' : 'bg-gold/10 text-gold'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-gray-500 text-xs font-poppins">{order.date} · {order.items} items</p>
                          </div>
                          <div className="text-right">
                            <p className="font-playfair text-gold text-lg">₹{order.total.toLocaleString()}</p>
                            <button className="text-xs font-poppins text-gray-500 hover:text-gold transition-colors mt-1">View Details</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'account' && (
                <div>
                  <h2 className="font-playfair text-2xl text-white mb-6">Account Details</h2>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-poppins text-sm text-gold tracking-wider uppercase mb-4">Change Password</h4>
                      <div className="space-y-3">
                        {['Current Password', 'New Password', 'Confirm New Password'].map(label => (
                          <div key={label}>
                            <label className="block text-xs font-poppins text-gray-500 tracking-wider uppercase mb-2">{label}</label>
                            <input type="password" className="w-full bg-white/5 border border-white/15 text-white font-poppins text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors" placeholder="••••••••" />
                          </div>
                        ))}
                      </div>
                      <button className="btn-gold mt-4">Update Password</button>
                    </div>
                    <div className="h-px bg-gold/10" />
                    <div>
                      <h4 className="font-poppins text-sm text-red-400 tracking-wider uppercase mb-2">Danger Zone</h4>
                      <button className="border border-red-800 text-red-500 px-6 py-2 text-xs font-poppins tracking-widest uppercase hover:bg-red-900/20 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div>
                  <h2 className="font-playfair text-2xl text-white mb-6">Contact Us</h2>
                  <div className="space-y-4 mb-8">
                    {[
                      { icon: '📧', label: 'Email Us', value: 'hello@sarafashion.com' },
                      { icon: '📱', label: 'WhatsApp / Call', value: '+91 99993 13366' },
                      { icon: '🕐', label: 'Business Hours', value: 'Mon–Sat, 9AM–6PM IST' },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-4 p-4 border border-white/10">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <p className="text-xs font-poppins text-gray-500 tracking-wider uppercase">{item.label}</p>
                          <p className="text-white font-poppins text-sm">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <h4 className="font-playfair text-xl text-white mb-4">Send a Message</h4>
                  <div className="space-y-3">
                    <input type="text" placeholder="Subject" className="w-full bg-white/5 border border-white/15 text-white font-poppins text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                    <textarea rows={4} placeholder="Your message..." className="w-full bg-white/5 border border-white/15 text-white font-poppins text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none" />
                    <button className="btn-gold">Send Message</button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
