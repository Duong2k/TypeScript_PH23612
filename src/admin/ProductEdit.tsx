import { SubmitHandler, useForm } from 'react-hook-form'
import { Product } from '~/common/Product'
import { joiResolver } from '@hookform/resolvers/joi'
import schemaProduct from '~/validation/product'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProduct } from '~/apis/product'

type Props = {
  onEdit: (product: Product) => void
}

const ProductEdit = ({ onEdit }: Props) => {
  const [product, setProduct] = useState<Product | null>(null)
  const { id } = useParams()
  useEffect(() => {
    ;(async () => {
      const data = await getProduct(Number(id))
      setProduct(data)
    })()
  }, [id])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Product>({
    resolver: joiResolver(schemaProduct)
  })

  const onSubmit: SubmitHandler<Product> = (data: Product) => {
    onEdit({ ...data, id })
  }
  return (
    <div className='flex flex-col items-center p-5'>
      <h1 className='text-2xl font-bold mb-5'>Edit Product</h1>
      <form className='w-full max-w-lg' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='title'>
            Ten san pham
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='title'
            type='text'
            defaultValue={product?.title}
            placeholder='Ten san pham...'
            {...register('title', { required: true, minLength: 3, maxLength: 100 })}
          />
          {errors.title && <p className='text-red-500 text-xs italic'>{errors.title.message}</p>}
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='price'>
            Gia san pham
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='price'
            type='text'
            defaultValue={product?.price as number}
            placeholder='Gia san pham...'
            {...register('price', { required: true, min: 0 })}
          />
          {errors.price && <p className='text-red-500 text-xs italic'>{errors.price.message}</p>}
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='description'>
            Mo ta san pham
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='description'
            type='text'
            defaultValue={product?.description}
            placeholder='Mo ta san pham...'
            {...register('description')}
          />
        </div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit'>
          Edit product
        </button>
      </form>
    </div>
  )
}

export default ProductEdit
