import { Generality } from './Generality.type'
export interface product {
  _id: string
  images: string[]
  price?: number
  rating: number
  price_before_discount?: number
  quantity: number
  sold: number
  view: number
  name: string
  description: string
  category: { _id: string; name: string; _v: number }
  image: string
  createdAt: string
  updatedAt: string
}

export type ProductList = Generality<{
  products: product[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}>

export interface PropPurchase {
  // [x: string]: unknown
  buy_count: number
  price: number
  price_before_discount: number
  status: number
  users: string
  _id: string
  product: product
}
