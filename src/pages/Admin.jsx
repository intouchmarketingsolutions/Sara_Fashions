import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiGrid, FiPackage, FiShoppingBag, FiLogOut, FiPlus, FiEdit2,
  FiTrash2, FiCheck, FiX, FiDollarSign, FiAlertCircle, FiImage,
  FiTag, FiInfo, FiLayers, FiChevronDown, FiChevronUp
} from 'react-icons/fi'
import { useProducts } from '../context/ProductsContext'

const TABS = ['Dashboard', 'Products', 'Orders']

const subcategories = [
  'Sarees', 'Lehengas', 'Kurtis', 'Gowns', 'Western',
  'Sharara', 'Bridal', 'Ethnic', 'Party Wear', 'Office Wear',
]

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size']

const emptyForm = {
  name: '', price: '', originalPrice: '', subcategory: 'Sarees',
  image: '', image2: '', image3: '', image4: '',
  description: '', tags: '', material: '', length: '', color: '',
  stock: '', sizes: ['S', 'M', 'L', 'XL'], care: '',
  fabricDetails: '', occasion: '', rating: '4',
}

function getAllOrders() {
  try { return JSON.parse(localStorage.getItem('sara_all_orders') || '[]') } catch { return [] }
}

function FormSection({ title, icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-[#eee] rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-[#faf7f2] hover:bg-[#f5efe8] transition-colors"
      >
        <div className="flex items-center gap-2 text-[12px] font-bold text-[#555] uppercase tracking-wider">
          {icon}{title}
        </div>
        {open
          ? <FiChevronUp size={14} className="text-[#aaa]" />
          : <FiChevronDown size={14} className="text-[#aaa]" />}
      </button>
      {open && <div className="px-4 py-4 space-y-3 bg-white">{children}</div>}
    </div>
  )
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="text-[11px] font-semibold text-[#888] uppercase tracking-wide mb-1 block">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

const inp = 'w-full border border-[#ddd] rounded-xl px-3 py-2.5 text-[14px] outline-none focus:border-[#c8a96b] bg-white transition-colors'

const statusColors = {
  available: 'bg-green-100 text-green-700 border-green-200',
  sold:      'bg-red-100 text-red-600 border-red-200',
}

export default function Admin() {
  const navigate = useNavigate()
  const { allProducts, addProduct, updateProduct, deleteProduct, setProductStatus } = useProducts()

  const [tab, setTab]                   = useState('Dashboard')
  const [orders, setOrders]             = useState([])
  const [showForm, setShowForm]         = useState(false)
  const [editId, setEditId]             = useState(null)
  const [form, setForm]                 = useState(emptyForm)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [saved, setSaved]               = useState(false)
  const [imgError, setImgError]         = useState({})
  const [expandedOrder, setExpandedOrder] = useState(null)

  useEffect(() => {
    if (!localStorage.getItem('sara_admin_session')) { navigate('/admin/login'); return }
    setOrders(getAllOrders())
  }, [])

  const logout = () => {
    localStorage.removeItem('sara_admin_session')
    navigate('/admin/login')
  }

  const totalRevenue  = orders.reduce((s, o) => s + (o.finalTotal || 0), 0)
  const totalOrders   = orders.length
  const soldProducts  = Object.values(JSON.parse(localStorage.getItem('sara_product_status') || '{}')).filter(s => s === 'sold').length
  const totalProducts = allProducts.length

  const f = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const toggleSize = (size) =>
    setForm(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size],
    }))

  const openAdd = () => { setForm(emptyForm); setEditId(null); setImgError({}); setShowForm(true) }

  const openEdit = (p) => {
    setForm({
      name: p.name || '', price: p.price || '', originalPrice: p.originalPrice || '',
      subcategory: p.subcategory || 'Sarees',
      image:  p.image || '',
      image2: (p.images || [])[1] || '',
      image3: (p.images || [])[2] || '',
      image4: (p.images || [])[3] || '',
      description: p.description || '',
      tags: (p.tags || []).join(', '),
      material:      p.details?.Material         || p.material      || '',
      length:        p.details?.Length           || p.length        || '',
      color:         p.details?.Color            || p.color         || '',
      stock:         p.stock || '',
      sizes:         p.sizes || ['S', 'M', 'L', 'XL'],
      care:          (p.care || []).join('\n'),
      fabricDetails: p.details?.['Fabric Details'] || p.fabricDetails || '',
      occasion:      p.details?.Occasion          || p.occasion      || '',
      rating:        p.rating || '4',
    })
    setEditId(p.id); setImgError({}); setShowForm(true)
  }

  const closeForm = () => { setShowForm(false); setEditId(null); setForm(emptyForm) }

  const handleSave = (e) => {
    e.preventDefault()
    const images = [form.image, form.image2, form.image3, form.image4].filter(Boolean)
    const data = {
      name:          form.name.trim(),
      price:         Number(form.price),
      originalPrice: Number(form.originalPrice) || Number(form.price),
      subcategory:   form.subcategory,
      image:         form.image.trim(),
      images:        images.length > 1 ? images : undefined,
      description:   form.description.trim(),
      tags:          form.tags.split(',').map(t => t.trim()).filter(Boolean),
      material:      form.material.trim(),
      length:        form.length.trim(),
      color:         form.color.trim(),
      stock:         form.stock ? Number(form.stock) : undefined,
      sizes:         form.sizes,
      care:          form.care.split('\n').map(c => c.trim()).filter(Boolean),
      fabricDetails: form.fabricDetails.trim(),
      occasion:      form.occasion.trim(),
      rating:        Number(form.rating) || 4,
      details: {
        ...(form.material      && { Material: form.material.trim() }),
        ...(form.length        && { Length: form.length.trim() }),
        ...(form.color         && { Color: form.color.trim() }),
        ...(form.fabricDetails && { 'Fabric Details': form.fabricDetails.trim() }),
        ...(form.occasion      && { Occasion: form.occasion.trim() }),
      },
    }
    if (editId) updateProduct(editId, data)
    else addProduct(data)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    closeForm()
  }

  const handleDelete = (id) => { deleteProduct(id); setDeleteConfirm(null) }

  const allImages = () => [form.image, form.image2, form.image3, form.image4].filter(Boolean)

  return (
    <div className="min-h-screen bg-[#f8f3eb] flex flex-col">

      {/* ── TOP BAR ── */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[#111] border-b border-[#c8a96b]/20 px-4 sm:px-8 h-[54px] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#c8a96b] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[12px] font-bold">S</span>
          </div>
          <h1 className="text-[#c8a96b] font-bold tracking-widest text-[14px] sm:text-[15px] uppercase">Sara Admin</h1>
        </div>
        <button onClick={logout} className="flex items-center gap-1.5 text-[#888] hover:text-[#c8a96b] text-[13px] transition-colors">
          <FiLogOut size={15} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      <div className="pt-[54px] flex flex-1">

        {/* ── SIDEBAR (desktop only) ── */}
        <aside className="hidden md:flex flex-col w-[200px] bg-white border-r border-[#eee] fixed top-[54px] left-0 bottom-0 z-40">
          <nav className="flex-1 py-5 px-3 space-y-1">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                  tab === t ? 'bg-[#c8a96b] text-white shadow-sm' : 'text-[#555] hover:bg-[#f8f3eb] hover:text-[#c8a96b]'
                }`}
              >
                {t === 'Dashboard' && <FiGrid size={15} />}
                {t === 'Products'  && <FiPackage size={15} />}
                {t === 'Orders'    && <FiShoppingBag size={15} />}
                {t}
              </button>
            ))}
          </nav>
          <div className="px-5 py-4 border-t border-[#eee]">
            <p className="text-[11px] text-[#aaa]">Sara Central © 2025</p>
          </div>
        </aside>

        {/* ── MOBILE BOTTOM TAB BAR ── */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#eee] flex safe-area-inset-bottom">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-[10px] font-bold flex flex-col items-center gap-1 transition-colors ${
                tab === t ? 'text-[#c8a96b]' : 'text-[#aaa]'
              }`}
            >
              <span className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${tab === t ? 'bg-[#c8a96b]/10' : ''}`}>
                {t === 'Dashboard' && <FiGrid size={17} />}
                {t === 'Products'  && <FiPackage size={17} />}
                {t === 'Orders'    && <FiShoppingBag size={17} />}
              </span>
              {t}
            </button>
          ))}
        </div>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 md:ml-[200px] px-3 sm:px-5 py-5 pb-28 md:pb-8 min-w-0">

          {/* ═══ DASHBOARD ═══ */}
          {tab === 'Dashboard' && (
            <div>
              <h2 className="text-[18px] sm:text-[20px] font-bold text-[#1a1a1a] mb-4">Dashboard</h2>

              {/* Stat cards — 2 cols on mobile, 4 on desktop */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                {[
                  { label: 'Total Revenue',  value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: <FiDollarSign size={18} />, color: 'bg-green-50 text-green-600' },
                  { label: 'Total Orders',   value: totalOrders,   icon: <FiShoppingBag size={18} />, color: 'bg-blue-50 text-blue-600' },
                  { label: 'Products',       value: totalProducts, icon: <FiPackage size={18} />,     color: 'bg-purple-50 text-purple-600' },
                  { label: 'Sold Out',       value: soldProducts,  icon: <FiAlertCircle size={18} />, color: 'bg-red-50 text-red-500' },
                ].map((card, i) => (
                  <div key={i} className="bg-white rounded-2xl p-3.5 sm:p-5 border border-[#eee] shadow-sm">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-2.5 ${card.color}`}>
                      {card.icon}
                    </div>
                    <p className="text-[18px] sm:text-[24px] font-bold text-[#1a1a1a] leading-none">{card.value}</p>
                    <p className="text-[11px] text-[#888] mt-1">{card.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl border border-[#eee] shadow-sm overflow-hidden">
                <div className="px-4 py-3.5 border-b border-[#f0ebe3]">
                  <h3 className="text-[14px] font-bold text-[#1a1a1a]">Recent Orders</h3>
                </div>
                {orders.length === 0 ? (
                  <div className="py-10 text-center text-[#aaa] text-[13px]">No orders yet</div>
                ) : (
                  <>
                    {/* Desktop table */}
                    <div className="hidden sm:block overflow-x-auto">
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
                            <tr key={i} className="border-t border-[#f5f5f5] hover:bg-[#faf7f2]">
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
                    {/* Mobile list */}
                    <div className="sm:hidden divide-y divide-[#f5f5f5]">
                      {orders.slice(0, 10).map((o, i) => (
                        <div key={i} className="px-4 py-3 flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-[11px] font-bold text-[#c8a96b]">#{o.orderId}</p>
                            <p className="text-[13px] font-medium text-[#1a1a1a] truncate">{o.user?.name || o.form?.name || '—'}</p>
                            <p className="text-[11px] text-[#888]">{o.items?.length} item{o.items?.length !== 1 ? 's' : ''}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-[14px] font-bold text-[#1a1a1a]">₹{o.finalTotal?.toLocaleString('en-IN')}</p>
                            <span className="inline-block mt-1 bg-green-100 text-green-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-green-200">{o.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ═══ PRODUCTS ═══ */}
          {tab === 'Products' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-[18px] sm:text-[20px] font-bold text-[#1a1a1a]">Products</h2>
                  <p className="text-[11px] text-[#888] mt-0.5">{allProducts.length} total · {allProducts.filter(p => !p.isStatic).length} admin-added</p>
                </div>
                <button
                  onClick={openAdd}
                  className="flex items-center gap-1.5 bg-[#c8a96b] hover:bg-[#b8944f] text-white px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all shadow-sm"
                >
                  <FiPlus size={14} />
                  <span className="hidden xs:inline">Add Product</span>
                  <span className="xs:hidden">Add</span>
                </button>
              </div>

              {saved && (
                <div className="mb-3 bg-green-50 border border-green-200 text-green-700 text-[13px] px-4 py-3 rounded-xl flex items-center gap-2">
                  <FiCheck size={14} /> Product saved successfully!
                </div>
              )}

              {/* Desktop table */}
              <div className="hidden sm:block bg-white rounded-2xl border border-[#eee] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-[13px]">
                    <thead className="bg-[#faf7f2]">
                      <tr>
                        {['Product', 'Category', 'Price', 'Material', 'Status', 'Actions'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-[#888] font-semibold text-[11px] uppercase tracking-wide whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {allProducts.map((p) => (
                        <tr key={p.id} className="border-t border-[#f5f5f5] hover:bg-[#faf7f2]">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="relative flex-shrink-0">
                                <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover border border-[#eee]" onError={e => e.target.style.display = 'none'} />
                                {(p.images || []).length > 1 && (
                                  <span className="absolute -bottom-1 -right-1 bg-[#c8a96b] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{(p.images || []).length}</span>
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-[#1a1a1a] max-w-[150px] truncate">{p.name}</p>
                                {p.color && <p className="text-[11px] text-[#aaa]">{p.color}</p>}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-[#666] whitespace-nowrap">{p.subcategory}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <p className="font-semibold text-[#1a1a1a]">₹{p.price?.toLocaleString('en-IN')}</p>
                            {p.originalPrice > p.price && <p className="text-[11px] text-[#aaa] line-through">₹{p.originalPrice?.toLocaleString('en-IN')}</p>}
                          </td>
                          <td className="px-4 py-3 text-[#666] max-w-[100px] truncate">{p.material || p.details?.Material || '—'}</td>
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
                            <div className="flex items-center gap-1.5">
                              {!p.isStatic ? (
                                <>
                                  <button onClick={() => openEdit(p)} className="p-1.5 text-[#888] hover:text-[#c8a96b] hover:bg-[#f8f3eb] rounded-lg transition-all"><FiEdit2 size={14} /></button>
                                  <button onClick={() => setDeleteConfirm(p.id)} className="p-1.5 text-[#888] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><FiTrash2 size={14} /></button>
                                </>
                              ) : (
                                <span className="text-[11px] text-[#ccc] bg-[#f8f8f8] px-2 py-0.5 rounded-full">Static</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile cards */}
              <div className="sm:hidden space-y-2.5">
                {allProducts.map((p) => (
                  <div key={p.id} className="bg-white rounded-2xl border border-[#eee] shadow-sm p-3.5">
                    <div className="flex items-start gap-3">
                      {/* Image */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={p.image} alt={p.name}
                          className="w-[60px] h-[70px] rounded-xl object-cover border border-[#eee]"
                          onError={e => e.target.style.display = 'none'}
                        />
                        {(p.images || []).length > 1 && (
                          <span className="absolute -bottom-1 -right-1 bg-[#c8a96b] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{(p.images || []).length}</span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#1a1a1a] text-[13px] leading-snug">{p.name}</p>
                        <p className="text-[11px] text-[#b68b45] font-medium mt-0.5">{p.subcategory}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-[13px] font-bold text-[#1a1a1a]">₹{p.price?.toLocaleString('en-IN')}</p>
                          {p.originalPrice > p.price && (
                            <p className="text-[11px] text-[#aaa] line-through">₹{p.originalPrice?.toLocaleString('en-IN')}</p>
                          )}
                        </div>
                        {(p.material || p.details?.Material) && (
                          <p className="text-[11px] text-[#888] mt-0.5">{p.material || p.details?.Material}</p>
                        )}
                      </div>
                    </div>

                    {/* Bottom row: status + actions */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#f5f5f5]">
                      <select
                        value={p.status}
                        onChange={e => setProductStatus(p.id, e.target.value)}
                        className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border outline-none cursor-pointer ${statusColors[p.status] || statusColors.available}`}
                      >
                        <option value="available">Available</option>
                        <option value="sold">Sold Out</option>
                      </select>

                      <div className="flex items-center gap-2">
                        {!p.isStatic ? (
                          <>
                            <button
                              onClick={() => openEdit(p)}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-[#c8a96b] border border-[#c8a96b]/30 rounded-full hover:bg-[#f8f3eb] transition-all"
                            >
                              <FiEdit2 size={12} /> Edit
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(p.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-red-500 border border-red-200 rounded-full hover:bg-red-50 transition-all"
                            >
                              <FiTrash2 size={12} /> Delete
                            </button>
                          </>
                        ) : (
                          <span className="text-[11px] text-[#ccc] bg-[#f8f8f8] px-3 py-1.5 rounded-full border border-[#eee]">Static</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ ORDERS ═══ */}
          {tab === 'Orders' && (
            <div>
              <div className="mb-4">
                <h2 className="text-[18px] sm:text-[20px] font-bold text-[#1a1a1a]">All Orders</h2>
                <p className="text-[11px] text-[#888] mt-0.5">{orders.length} order{orders.length !== 1 ? 's' : ''} · ₹{totalRevenue.toLocaleString('en-IN')} total</p>
              </div>

              {orders.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#eee] py-20 text-center">
                  <FiShoppingBag size={36} className="mx-auto text-[#ddd] mb-4" />
                  <p className="text-[#888] text-[14px]">No orders placed yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((o, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-[#eee] shadow-sm overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setExpandedOrder(expandedOrder === i ? null : i)}
                        className="w-full px-4 py-4 flex items-start justify-between gap-3 hover:bg-[#faf7f2] transition-colors text-left"
                      >
                        <div className="min-w-0">
                          <p className="text-[12px] font-bold text-[#c8a96b]">#{o.orderId}</p>
                          <p className="text-[13px] font-semibold text-[#1a1a1a] mt-0.5 truncate">{o.user?.name || o.form?.name}</p>
                          <p className="text-[11px] text-[#888]">+91 {o.user?.phone || o.form?.phone}</p>
                          <p className="text-[11px] text-[#aaa] mt-0.5">{o.date}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-[15px] font-bold text-[#1a1a1a]">₹{o.finalTotal?.toLocaleString('en-IN')}</p>
                          <p className="text-[11px] text-[#888]">{o.items?.length} item{o.items?.length !== 1 ? 's' : ''}</p>
                          <p className="text-[11px] text-[#888]">{o.paymentMethod}</p>
                          <span className="inline-block mt-1 bg-green-100 text-green-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-green-200">{o.status}</span>
                        </div>
                      </button>

                      {expandedOrder === i && (
                        <div>
                          <div className="border-t border-[#f0ebe3] px-4 py-3">
                            <p className="text-[10px] text-[#aaa] uppercase tracking-widest font-bold mb-2.5">Items Ordered</p>
                            <div className="space-y-2">
                              {o.items?.map((item, j) => (
                                <div key={j} className="flex items-center gap-3 bg-[#faf7f2] rounded-xl p-2.5">
                                  <img src={item.image} alt={item.name} className="w-11 h-11 rounded-xl object-cover border border-[#eee] flex-shrink-0" onError={e => e.target.style.display = 'none'} />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[12px] font-medium text-[#333] truncate">{item.name}</p>
                                    <p className="text-[11px] text-[#888]">Size: {item.size} · Qty: {item.qty}</p>
                                  </div>
                                  <p className="text-[12px] font-semibold text-[#1a1a1a] flex-shrink-0">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          {o.form?.address && (
                            <div className="border-t border-[#f0ebe3] px-4 py-3 bg-[#faf7f2]">
                              <p className="text-[10px] text-[#aaa] uppercase tracking-widest font-bold mb-1">Ship To</p>
                              <p className="text-[12px] text-[#555]">{o.form.address}, {o.form.city}, {o.form.state} — {o.form.pincode}</p>
                            </div>
                          )}
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

      {/* ═══ ADD / EDIT MODAL ═══ */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[60]"
              onClick={closeForm}
            />
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed inset-x-2 top-[3vh] bottom-[3vh] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-[600px] bg-[#f8f3eb] rounded-2xl shadow-2xl z-[61] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 bg-[#111] flex-shrink-0">
                <div>
                  <h3 className="text-[15px] font-bold text-white">{editId ? 'Edit Product' : 'Add New Product'}</h3>
                  <p className="text-[11px] text-[#c8a96b]/80 mt-0.5">Fill in the product details below</p>
                </div>
                <button onClick={closeForm} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                  <FiX size={16} />
                </button>
              </div>

              <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-3 py-4 space-y-3">

                {/* Basic Info */}
                <FormSection title="Basic Information" icon={<FiInfo size={13} />} defaultOpen>
                  <Field label="Product Name" required>
                    <input required value={form.name} onChange={e => f('name', e.target.value)} className={inp} placeholder="e.g. Banarasi Silk Saree" />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Selling Price ₹" required>
                      <input required type="number" value={form.price} onChange={e => f('price', e.target.value)} className={inp} placeholder="12999" />
                    </Field>
                    <Field label="Original Price ₹">
                      <input type="number" value={form.originalPrice} onChange={e => f('originalPrice', e.target.value)} className={inp} placeholder="15999" />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Category" required>
                      <select value={form.subcategory} onChange={e => f('subcategory', e.target.value)} className={inp}>
                        {subcategories.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </Field>
                    <Field label="Rating">
                      <select value={form.rating} onChange={e => f('rating', e.target.value)} className={inp}>
                        {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Star{n !== 1 ? 's' : ''}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field label="Description">
                    <textarea rows={3} value={form.description} onChange={e => f('description', e.target.value)} className={`${inp} resize-none`} placeholder="Describe the product..." />
                  </Field>
                </FormSection>

                {/* Images */}
                <FormSection title="Product Images" icon={<FiImage size={13} />} defaultOpen>
                  <p className="text-[11px] text-[#999] -mt-1">Up to 4 image URLs. First is the main image.</p>
                  {[
                    { key: 'image',  label: 'Main Image URL', req: true },
                    { key: 'image2', label: 'Image 2 URL' },
                    { key: 'image3', label: 'Image 3 URL' },
                    { key: 'image4', label: 'Image 4 URL' },
                  ].map(({ key, label, req }) => (
                    <div key={key}>
                      <Field label={label} required={req}>
                        <input
                          required={req} value={form[key]}
                          onChange={e => { f(key, e.target.value); setImgError(prev => ({ ...prev, [key]: false })) }}
                          className={inp} placeholder="https://example.com/image.jpg"
                        />
                      </Field>
                      {form[key] && !imgError[key] && (
                        <img src={form[key]} alt="preview" className="mt-1.5 h-16 w-16 object-cover rounded-xl border border-[#eee]" onError={() => setImgError(prev => ({ ...prev, [key]: true }))} />
                      )}
                      {form[key] && imgError[key] && (
                        <p className="text-[11px] text-red-400 mt-1">Could not load — check URL</p>
                      )}
                    </div>
                  ))}
                  {allImages().length > 1 && (
                    <div className="flex gap-2 mt-1 flex-wrap items-center">
                      {allImages().map((url, i) => (
                        <img key={i} src={url} alt="" className="h-12 w-12 object-cover rounded-lg border-2 border-[#c8a96b]" onError={e => e.target.style.display = 'none'} />
                      ))}
                      <span className="text-[11px] text-[#aaa]">{allImages().length} images</span>
                    </div>
                  )}
                </FormSection>

                {/* Fabric & Details */}
                <FormSection title="Fabric & Details" icon={<FiLayers size={13} />} defaultOpen>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Material / Fabric">
                      <input value={form.material} onChange={e => f('material', e.target.value)} className={inp} placeholder="Pure Silk, Cotton..." />
                    </Field>
                    <Field label="Fabric Details">
                      <input value={form.fabricDetails} onChange={e => f('fabricDetails', e.target.value)} className={inp} placeholder="Woven, Printed..." />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Length">
                      <input value={form.length} onChange={e => f('length', e.target.value)} className={inp} placeholder="Full Length, 5.5m..." />
                    </Field>
                    <Field label="Color">
                      <input value={form.color} onChange={e => f('color', e.target.value)} className={inp} placeholder="Royal Blue, Ivory..." />
                    </Field>
                  </div>
                  <Field label="Occasion">
                    <input value={form.occasion} onChange={e => f('occasion', e.target.value)} className={inp} placeholder="Wedding, Festive, Casual..." />
                  </Field>
                </FormSection>

                {/* Sizes & Stock */}
                <FormSection title="Sizes & Stock" icon={<FiTag size={13} />} defaultOpen>
                  <Field label="Available Sizes">
                    <div className="flex flex-wrap gap-2 mt-1">
                      {ALL_SIZES.map(size => (
                        <button
                          key={size} type="button" onClick={() => toggleSize(size)}
                          className={`px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-all ${
                            form.sizes.includes(size)
                              ? 'bg-[#c8a96b] text-white border-[#c8a96b]'
                              : 'bg-white text-[#666] border-[#ddd] hover:border-[#c8a96b]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Stock Quantity">
                    <input type="number" min="0" value={form.stock} onChange={e => f('stock', e.target.value)} className={inp} placeholder="Leave blank for unlimited" />
                  </Field>
                </FormSection>

                {/* Tags & Care */}
                <FormSection title="Tags & Care Instructions" icon={<FiTag size={13} />} defaultOpen={false}>
                  <Field label="Tags (comma separated)">
                    <input value={form.tags} onChange={e => f('tags', e.target.value)} className={inp} placeholder="silk, wedding, bridal, zari" />
                  </Field>
                  <Field label="Care Instructions (one per line)">
                    <textarea rows={4} value={form.care} onChange={e => f('care', e.target.value)} className={`${inp} resize-none`} placeholder={"Dry clean only\nDo not bleach\nIron on low heat"} />
                  </Field>
                </FormSection>

                <button type="submit" className="w-full bg-[#111] hover:bg-[#c8a96b] text-white py-3.5 rounded-full text-[14px] font-semibold transition-all duration-300 flex items-center justify-center gap-2">
                  <FiCheck size={15} />
                  {editId ? 'Save Changes' : 'Add Product to Store'}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ═══ DELETE CONFIRM ═══ */}
      <AnimatePresence>
        {deleteConfirm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-[60]" onClick={() => setDeleteConfirm(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[61] bg-white rounded-2xl shadow-2xl p-6 w-[290px] text-center mx-3"
            >
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 size={20} className="text-red-500" />
              </div>
              <h3 className="font-bold text-[16px] text-[#1a1a1a] mb-2">Delete Product?</h3>
              <p className="text-[13px] text-[#888] mb-5">This cannot be undone.</p>
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
