import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiGrid, FiPackage, FiShoppingBag, FiLogOut, FiPlus, FiEdit2,
  FiTrash2, FiCheck, FiX, FiTrendingUp, FiDollarSign, FiEye, FiAlertCircle
} from 'react-icons/fi'
import { useProducts } from '../context/ProductsContext'

const TABS = ['Dashboard', 'Products', 'Orders']

const subcategories = ['Sarees', 'Lehengas', 'Kurtis', 'Gowns', 'Western', 'Sharara', 'Bridal', 'Ethnic', 'Party Wear', 'Office Wear']

const emptyForm = { name: '', price: '', originalPrice: '', subcategory: 'Sarees', image: '', description: '', tags: '' }

function getAllOrders() {
  const central = JSON.parse(localStorage.getItem('sara_all_orders') || '[]')
  return central
}

export default function Admin() {
  const navigate = useNavigate()
  const { allProducts, addProduct, updateProduct, deleteProduct, setProductStatus } = useProducts()

  const [tab, setTab] = useState('Dashboard')
  const [orders, setOrders] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('sara_admin_session')) { navigate('/admin/login'); return }
    setOrders(getAllOrders())
  }, [])

  const logout = () => {
    localStorage.removeItem('sara_admin_session')
    navigate('/admin/login')
  }

  // ── Stats ──
  const totalRevenue = orders.reduce((s, o) => s + (o.finalTotal || 0), 0)
  const totalOrders  = orders.length
  const soldProducts = Object.values(JSON.parse(localStorage.getItem('sara_product_status') || '{}')).filter(s => s === 'sold').length
  const totalProducts = allProducts.length

  // ── Form handlers ──
  const openAdd = () => { setForm(emptyForm); setEditId(null); setShowForm(true) }
  const openEdit = (p) => {
    setForm({ name: p.name, price: p.price, originalPrice: p.originalPrice || '', subcategory: p.subcategory, image: p.image, description: p.description || '', tags: (p.tags || []).join(', ') })
    setEditId(p.id)
    setShowForm(true)
  }
  const closeForm = () => { setShowForm(false); setEditId(null); setForm(emptyForm) }

  const handleSave = (e) => {
    e.preventDefault()
    const data = {
      name: form.name.trim(),
      price: Number(form.price),
      originalPrice: Number(form.originalPrice) || Number(form.price),
      subcategory: form.subcategory,
      image: form.image.trim(),
      description: form.description.trim(),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    }
    if (editId) updateProduct(editId, data)
    else addProduct(data)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    closeForm()
  }

  const handleDelete = (id) => {
    deleteProduct(id)
    setDeleteConfirm(null)
  }

  const statusColors = {
    available: 'bg-green-100 text-green-700 border-green-200',
    sold:      'bg-red-100 text-red-600 border-red-200',
  }

  return (
    <div className="min-h-screen bg-[#f8f3eb] flex flex-col">

      {/* ── TOP BAR ── */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[#111] border-b border-[#c8a96b]/20 px-4 sm:px-8 h-[58px] flex items-center justify-between">
        <h1 className="text-[#c8a96b] font-bold tracking-widest text-[15px] uppercase">Sara Admin</h1>
        <button onClick={logout} className="flex items-center gap-1.5 text-[#888] hover:text-[#c8a96b] text-[13px] transition-colors">
          <FiLogOut size={15} /> Logout
        </button>
      </div>

      <div className="pt-[58px] flex flex-1">

        {/* ── SIDEBAR (desktop) ── */}
        <aside className="hidden md:flex flex-col w-[200px] bg-white border-r border-[#eee] fixed top-[58px] left-0 bottom-0">
          <nav className="flex-1 py-6 px-3 space-y-1">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`w-full text-left flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                  tab === t ? 'bg-[#c8a96b] text-white' : 'text-[#555] hover:bg-[#f8f3eb] hover:text-[#c8a96b]'
                }`}
              >
                {t === 'Dashboard' && <FiGrid size={15} />}
                {t === 'Products'  && <FiPackage size={15} />}
                {t === 'Orders'    && <FiShoppingBag size={15} />}
                {t}
              </button>
            ))}
          </nav>
          <div className="px-4 py-4 border-t border-[#eee]">
            <p className="text-[11px] text-[#aaa]">Sara Central © 2024</p>
          </div>
        </aside>

        {/* ── MOBILE TAB BAR ── */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#eee] flex">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-[11px] font-semibold flex flex-col items-center gap-1 transition-colors ${
                tab === t ? 'text-[#c8a96b]' : 'text-[#888]'
              }`}
            >
              {t === 'Dashboard' && <FiGrid size={16} />}
              {t === 'Products'  && <FiPackage size={16} />}
              {t === 'Orders'    && <FiShoppingBag size={16} />}
              {t}
            </button>
          ))}
        </div>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 md:ml-[200px] px-4 sm:px-6 py-6 pb-24 md:pb-8">

          {/* ═══ DASHBOARD ═══ */}
          {tab === 'Dashboard' && (
            <div>
              <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-6">Dashboard</h2>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Revenue',  value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: <FiDollarSign size={20} />, color: 'bg-green-50 text-green-600' },
                  { label: 'Total Orders',   value: totalOrders,  icon: <FiShoppingBag size={20} />, color: 'bg-blue-50 text-blue-600' },
                  { label: 'Total Products', value: totalProducts, icon: <FiPackage size={20} />,    color: 'bg-purple-50 text-purple-600' },
                  { label: 'Sold Out',       value: soldProducts,  icon: <FiAlertCircle size={20} />, color: 'bg-red-50 text-red-500' },
                ].map((card, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eee] shadow-sm">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${card.color}`}>
                      {card.icon}
                    </div>
                    <p className="text-[22px] sm:text-[26px] font-bold text-[#1a1a1a]">{card.value}</p>
                    <p className="text-[12px] text-[#888] mt-0.5">{card.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl border border-[#eee] shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-[#f0ebe3]">
                  <h3 className="text-[15px] font-bold text-[#1a1a1a]">Recent Orders</h3>
                </div>
                {orders.length === 0 ? (
                  <div className="py-12 text-center text-[#aaa] text-[13px]">No orders yet</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-[13px]">
                      <thead className="bg-[#faf7f2]">
                        <tr>
                          {['Order ID', 'Customer', 'Items', 'Total', 'Status'].map(h => (
                            <th key={h} className="text-left px-4 py-3 text-[#888] font-semibold text-[11px] uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 10).map((o, i) => (
                          <tr key={i} className="border-t border-[#f5f5f5] hover:bg-[#faf7f2] transition-colors">
                            <td className="px-4 py-3 font-bold text-[#c8a96b]">#{o.orderId}</td>
                            <td className="px-4 py-3 text-[#444]">{o.user?.name || o.form?.name || '—'}</td>
                            <td className="px-4 py-3 text-[#666]">{o.items?.length} item{o.items?.length !== 1 ? 's' : ''}</td>
                            <td className="px-4 py-3 font-semibold text-[#1a1a1a]">₹{o.finalTotal?.toLocaleString('en-IN')}</td>
                            <td className="px-4 py-3">
                              <span className="bg-green-100 text-green-700 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-green-200">{o.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═══ PRODUCTS ═══ */}
          {tab === 'Products' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[20px] font-bold text-[#1a1a1a]">Products</h2>
                <button
                  onClick={openAdd}
                  className="flex items-center gap-2 bg-[#c8a96b] hover:bg-[#b8944f] text-white px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all"
                >
                  <FiPlus size={14} /> Add Product
                </button>
              </div>

              {saved && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-[13px] px-4 py-3 rounded-xl flex items-center gap-2">
                  <FiCheck size={14} /> Product saved successfully
                </div>
              )}

              <div className="bg-white rounded-2xl border border-[#eee] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-[13px]">
                    <thead className="bg-[#faf7f2]">
                      <tr>
                        {['Product', 'Category', 'Price', 'Status', 'Actions'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-[#888] font-semibold text-[11px] uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {allProducts.map((p, i) => (
                        <tr key={p.id} className="border-t border-[#f5f5f5] hover:bg-[#faf7f2] transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-[#eee] flex-shrink-0" onError={e => e.target.style.display='none'} />
                              <span className="font-medium text-[#1a1a1a] max-w-[140px] truncate">{p.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-[#666]">{p.subcategory}</td>
                          <td className="px-4 py-3 font-semibold text-[#1a1a1a]">₹{p.price?.toLocaleString('en-IN')}</td>
                          <td className="px-4 py-3">
                            <select
                              value={p.status}
                              onChange={e => setProductStatus(p.id, e.target.value)}
                              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${statusColors[p.status] || statusColors.available}`}
                            >
                              <option value="available">Available</option>
                              <option value="sold">Sold Out</option>
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {!p.isStatic && (
                                <>
                                  <button onClick={() => openEdit(p)} className="p-1.5 text-[#888] hover:text-[#c8a96b] hover:bg-[#f8f3eb] rounded-lg transition-all">
                                    <FiEdit2 size={14} />
                                  </button>
                                  <button onClick={() => setDeleteConfirm(p.id)} className="p-1.5 text-[#888] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                    <FiTrash2 size={14} />
                                  </button>
                                </>
                              )}
                              {p.isStatic && <span className="text-[11px] text-[#bbb]">Static</span>}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ═══ ORDERS ═══ */}
          {tab === 'Orders' && (
            <div>
              <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-6">All Orders</h2>

              {orders.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#eee] py-20 text-center">
                  <FiShoppingBag size={36} className="mx-auto text-[#ddd] mb-4" />
                  <p className="text-[#888] text-[14px]">No orders placed yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((o, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-[#eee] shadow-sm overflow-hidden">
                      <div className="px-5 py-4 flex flex-wrap gap-4 items-start justify-between">
                        <div>
                          <p className="text-[13px] font-bold text-[#c8a96b]">#{o.orderId}</p>
                          <p className="text-[12px] text-[#888] mt-0.5">{o.date}</p>
                          <p className="text-[13px] font-semibold text-[#1a1a1a] mt-1">{o.user?.name || o.form?.name}</p>
                          <p className="text-[12px] text-[#888]">+91 {o.user?.phone || o.form?.phone}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[16px] font-bold text-[#1a1a1a]">₹{o.finalTotal?.toLocaleString('en-IN')}</p>
                          <p className="text-[12px] text-[#888]">{o.items?.length} item{o.items?.length !== 1 ? 's' : ''}</p>
                          <p className="text-[12px] text-[#888]">{o.paymentMethod}</p>
                          <span className="inline-block mt-1 bg-green-100 text-green-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-green-200">{o.status}</span>
                        </div>
                      </div>

                      <div className="border-t border-[#f0ebe3] px-5 py-3">
                        <p className="text-[11px] text-[#aaa] uppercase tracking-widest font-bold mb-2">Items</p>
                        <div className="flex flex-wrap gap-3">
                          {o.items?.map((item, j) => (
                            <div key={j} className="flex items-center gap-2">
                              <img src={item.image} alt={item.name} className="w-9 h-9 rounded-lg object-cover border border-[#eee]" onError={e => e.target.style.display='none'} />
                              <div>
                                <p className="text-[12px] font-medium text-[#333] max-w-[120px] truncate">{item.name}</p>
                                <p className="text-[11px] text-[#888]">Qty: {item.qty} · ₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {o.form?.address && (
                        <div className="border-t border-[#f0ebe3] px-5 py-3 text-[12px] text-[#666]">
                          <span className="font-semibold text-[#444]">Ship to: </span>
                          {o.form.address}, {o.form.city}, {o.form.state} — {o.form.pincode}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>
      </div>

      {/* ── ADD / EDIT FORM MODAL ── */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-60"
              onClick={closeForm}
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
              className="fixed inset-x-4 top-[10vh] bottom-[10vh] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[520px] bg-white rounded-2xl shadow-2xl z-[61] flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#eee]">
                <h3 className="text-[16px] font-bold text-[#1a1a1a]">{editId ? 'Edit Product' : 'Add New Product'}</h3>
                <button onClick={closeForm} className="text-[#aaa] hover:text-[#333]"><FiX size={20} /></button>
              </div>

              <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                <div>
                  <label className="text-[12px] font-semibold text-[#666] uppercase tracking-wide">Product Name *</label>
                  <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full mt-1 border border-[#ddd] rounded-xl px-3 py-2.5 text-[14px] outline-none focus:border-[#c8a96b]" placeholder="e.g. Banarasi Silk Saree" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[12px] font-semibold text-[#666] uppercase tracking-wide">Price (₹) *</label>
                    <input required type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})}
                      className="w-full mt-1 border border-[#ddd] rounded-xl px-3 py-2.5 text-[14px] outline-none focus:border-[#c8a96b]" placeholder="12999" />
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold text-[#666] uppercase tracking-wide">Original Price (₹)</label>
                    <input type="number" value={form.originalPrice} onChange={e => setForm({...form, originalPrice: e.target.value})}
                      className="w-full mt-1 border border-[#ddd] rounded-xl px-3 py-2.5 text-[14px] outline-none focus:border-[#c8a96b]" placeholder="15999" />
                  </div>
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-[#666] uppercase tracking-wide">Category *</label>
                  <select value={form.subcategory} onChange={e => setForm({...form, subcategory: e.target.value})}
                    className="w-full mt-1 border border-[#ddd] rounded-xl px-3 py-2.5 text-[14px] outline-none focus:border-[#c8a96b] bg-white">
                    {subcategories.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-[#666] uppercase tracking-wide">Image URL *</label>
                  <input required value={form.image} onChange={e => setForm({...form, image: e.target.value})}
                    className="w-full mt-1 border border-[#ddd] rounded-xl px-3 py-2.5 text-[14px] outline-none focus:border-[#c8a96b]" placeholder="https://..." />
                  {form.image && <img src={form.image} alt="preview" className="mt-2 h-24 w-24 object-cover rounded-xl border border-[#eee]" onError={e => e.target.style.display='none'} />}
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-[#666] uppercase tracking-wide">Description</label>
                  <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                    className="w-full mt-1 border border-[#ddd] rounded-xl px-3 py-2.5 text-[14px] outline-none focus:border-[#c8a96b] resize-none" placeholder="Product description..." />
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-[#666] uppercase tracking-wide">Tags (comma separated)</label>
                  <input value={form.tags} onChange={e => setForm({...form, tags: e.target.value})}
                    className="w-full mt-1 border border-[#ddd] rounded-xl px-3 py-2.5 text-[14px] outline-none focus:border-[#c8a96b]" placeholder="silk, wedding, bridal" />
                </div>

                <button type="submit" className="w-full bg-[#c8a96b] hover:bg-[#b8944f] text-white py-3 rounded-full text-[14px] font-semibold transition-all">
                  {editId ? 'Save Changes' : 'Add Product'}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── DELETE CONFIRM ── */}
      <AnimatePresence>
        {deleteConfirm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-60" onClick={() => setDeleteConfirm(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[61] bg-white rounded-2xl shadow-2xl p-6 w-[300px] text-center"
            >
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 size={20} className="text-red-500" />
              </div>
              <h3 className="font-bold text-[16px] text-[#1a1a1a] mb-2">Delete Product?</h3>
              <p className="text-[13px] text-[#888] mb-5">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 border border-[#ddd] text-[#666] py-2.5 rounded-full text-[13px] font-semibold hover:bg-[#f5f5f5] transition-all">Cancel</button>
                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-full text-[13px] font-semibold transition-all">Delete</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  )
}
