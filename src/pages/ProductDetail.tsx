import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '~/common/Product'
import { getProduct } from '~/apis/product'

const ProductDetail = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  useEffect(() => {
    ;(async () => {
      const data = await getProduct(+productId!)
      setProduct(data)
    })()
  }, [productId])
  return (
    <div className='flex flex-col items-center p-5'>
      <h2 className='text-2xl font-bold mb-5'>Chi tiết sản phẩm</h2>
      <div className='flex border rounded overflow-hidden shadow-lg max-w-4xl w-full bg-white'>
        <img src={product?.thumbnail} alt={product?.title} className='w-1/2 h-auto object-cover' />
        <div className='p-5 flex flex-col justify-between'>
          <div>
            <p className='text-lg font-bold'>Tên sản phẩm: {product?.title}</p>
            <p className='text-lg font-bold mt-2'>Giá: {product?.price}</p>
            <p className='text-lg font-bold mt-2'>Thương hiệu: {product?.brand}</p>
            <p className='text-lg font-bold mt-2'>Mô tả: {product?.description}</p>
          </div>
          <div>
            <p className='text-lg font-bold'>Mã sản phẩm: {productId}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
