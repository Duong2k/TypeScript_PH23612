import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound/NotFound'
import ProductDetail from './pages/ProductDetail'
import { useEffect, useState } from 'react'
import { Product } from './common/Product'
import Dashboard from './admin/Dashboard'
import ProductAdd from './admin/ProductAdd'
import ProductEdit from './admin/ProductEdit'
import instance from './apis'
import { createProduct, getProducts, updateProduct } from './apis/product'

const App = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    ;(async () => {
      const data = await getProducts()
      setProducts(data)
    })()
  }, [])

  const handleAddProduct = (product: Product) => {
    ;(async () => {
      const data = await createProduct(product)
      setProducts([...products, data])
    })()
    navigate('/admin')
  }
  const handleEditProduct = (product: Product) => {
    ;(async () => {
      const data = await updateProduct(product)
      setProducts(products.map((p) => (p.id === data.id ? data : p)))
    })()
    navigate('/admin')
  }
  const handleDeleteProduct = (id: number) => {
    ;(async () => {
      const isConfirm = window.confirm('Are you sure?')
      if (isConfirm) {
        const data = await instance.delete(`/products/${id}`)
        console.log(data)
        setProducts(products.filter((item) => item.id !== id && item))
      }
    })()
  }
  return (
    <>
      <Header />
      <main className='container-main'>
        <Routes>
          <Route path='/'>
            <Route index element={<Home products={products} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/shop/:productId' element={<ProductDetail />} />
          </Route>
          <Route path='/admin'>
            <Route index element={<Dashboard products={products} onDel={handleDeleteProduct} />} />
            <Route path='/admin/add' element={<ProductAdd onAdd={handleAddProduct} />} />
            <Route path='/admin/edit/:id' element={<ProductEdit onEdit={handleEditProduct} />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
export default App
