import http from './http'
import { ProductList, product } from '../../Types/product.type'
import { QueryConfigs} from '../../Types/Generality.type'
import { Generality } from '../../Types/Generality.type'

interface Categories {
  _id: string
  name: string
}
export const productApi = {
  getProduct: async (params: QueryConfigs) => {
    return await http.get<ProductList>('products', {
      params: params
    })
  },
  getProducts: async (params: string) => {
    return await http.get<ProductList>('products', {
      params: params
    })
  },

  getCategories: async () => {
    return await http.get<Generality<Categories[]>>('categories')
  },
  getProductDetail: async (id: string) => {
    return await http.get<Generality<product>>(`products/${id}`)
  }
}
