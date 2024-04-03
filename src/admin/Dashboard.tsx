import React from 'react'
import { Product } from '~/common/Product'
import { Link } from 'react-router-dom'

type Props = {
  products: Product[]
  onDel: (id: number) => void
}

const Dashboard = ({ products, onDel }: Props) => {
  return (
    <div className='flex flex-col items-center p-5'>
      <Link className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' to='/admin/add'>
        Add new product
      </Link>
      <div className='overflow-x-auto mt-5'>
        <table className='min-w-full divide-y divide-gray-200 bg-white text-sm'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>#</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Title</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Price</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Thumbnail
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Description
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Action</th>
            </tr>
          </thead>

          <tbody className='bg-white divide-y divide-gray-200'>
            {products.map((item) => (
              <tr key={item.id}>
                <td className='px-6 py-4 whitespace-nowrap'>{item.id}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{item.title}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{item.price}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <img className='h-10 w-10 rounded-full' src={item.thumbnail} alt={item.title} />
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>{item.description}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <button
                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => {
                      onDel(Number(item.id))
                    }}
                  >
                    Delete
                  </button>
                  <br />
                  <Link
                    to={`/admin/edit/${item.id}`}
                    className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2'
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
