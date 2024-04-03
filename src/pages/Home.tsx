import React from 'react'
import { Link } from 'react-router-dom'
import { Product } from '~/common/Product'

interface Props {
  products: Product[]
}

const Home: React.FC<Props> = ({ products }) => {
  return (
    <section className='bg-gray-100 py-8'>
      <div className='container mx-auto px-2 pt-4 pb-12 text-gray-800'>
        <h1 className='w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800'>Product List</h1>
        <div className='w-full mb-4'>
          <div className='h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t'></div>
        </div>
        <div className='flex flex-wrap justify-center'>
          {products.map((product) => (
            <div key={product.id} className='w-full md:w-1/3 lg:w-1/4 p-6 flex flex-col'>
              <Link to={`/shop/${product.id}`}>
                <img
                  className='h-64 w-full object-cover hover:grow hover:shadow-lg'
                  src={product.images && product.images.length > 0 ? product.images[0] : 'defaultImageLink'}
                  alt={product.title}
                />
                <div className='mt-4'>
                  <h3 className='text-gray-900 text-xl'>{product.title}</h3>
                  <p className='mt-2 text-gray-600'>${product.price}</p>
                  <p className='text-gray-500'>{product.brand}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Home
