import { Product } from '~/common/Product'
import instance from '.'

export const createProduct = async (product: Product) => {
  try {
    const { data } = await instance.post('/products', product)
    return data
  } catch (error) {
    console.log(error)
  }
}
export const updateProduct = async (product: Product) => {
  try {
    const { data } = await instance.put(`/products/${product.id}`, product)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getProduct = async (productId: number) => {
  try {
    const { data } = await instance.get(`/products/${productId}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getProducts = async () => {
  try {
    const { data } = await instance.get(`/products`)
    return data
  } catch (error) {
    console.log(error)
  }
}
