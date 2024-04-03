export type cartType = [
  {
    id: number
    products: [
      {
        id: number
        title: string
        price: number
        quantity: number
        total: number
        discountPercentage: number
        discountedPrice: number
        thumbnail: string
      }
    ]
  }
]
