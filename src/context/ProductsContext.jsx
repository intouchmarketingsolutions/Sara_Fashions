import { createContext, useContext, useState, useEffect } from 'react'
import { allProducts as staticProducts } from '../data/products'

const ProductsContext = createContext()

export function ProductsProvider({ children }) {
  const [adminProducts, setAdminProducts] = useState(() =>
    JSON.parse(localStorage.getItem('sara_admin_products') || '[]')
  )
  const [statusMap, setStatusMap] = useState(() =>
    JSON.parse(localStorage.getItem('sara_product_status') || '{}')
  )

  const allProducts = [
    ...staticProducts.map(p => ({ ...p, isStatic: true, status: statusMap[p.id] || 'available' })),
    ...adminProducts.map(p => ({ ...p, isStatic: false, status: statusMap[p.id] || p.status || 'available' })),
  ]

  const addProduct = (data) => {
    const product = { ...data, id: `adm_${Date.now()}`, isAdmin: true, status: 'available', rating: 4, reviews: 0 }
    const updated = [...adminProducts, product]
    setAdminProducts(updated)
    localStorage.setItem('sara_admin_products', JSON.stringify(updated))
  }

  const updateProduct = (id, data) => {
    const updated = adminProducts.map(p => p.id === id ? { ...p, ...data } : p)
    setAdminProducts(updated)
    localStorage.setItem('sara_admin_products', JSON.stringify(updated))
  }

  const deleteProduct = (id) => {
    const updated = adminProducts.filter(p => p.id !== id)
    setAdminProducts(updated)
    localStorage.setItem('sara_admin_products', JSON.stringify(updated))
  }

  const setProductStatus = (id, status) => {
    const updated = { ...statusMap, [id]: status }
    setStatusMap(updated)
    localStorage.setItem('sara_product_status', JSON.stringify(updated))
  }

  return (
    <ProductsContext.Provider value={{ allProducts, adminProducts, addProduct, updateProduct, deleteProduct, setProductStatus, statusMap }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => useContext(ProductsContext)
