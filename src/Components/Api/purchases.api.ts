import http from '../Api/http'
import { product, PropPurchase } from '../../Types/product.type'
import { Generality, queryStatusString } from '../../Types/Generality.type'
export interface buyProduct {
  product_id: string
  buy_count: number
}

export const purchasesApi = {
  addToCart: async ({ product_id, buy_count }: { product_id: string; buy_count: number }) => {
    return http.post<Generality<product[]>>('purchases/add-to-cart', { product_id, buy_count })
  },
  getToCart: async (status: queryStatusString) => {
    return await http.get<Generality<PropPurchase[]>>('purchases', {
      params: status
    })
  },

  deletePurchase: async (purchase_id: string[]) => {
    return await http.delete<Generality<{ message: string }>>('purchases', { data: purchase_id })
  },

  updatePuchase: async (body: { product_id: string; buy_count: number }) => {
    return await http.put('purchases/update-purchase', body)
  },

  buyProduct: async (body: { product_id: string; buy_count: number }[]) => {
    return await http.post('purchases/buy-products', body)
  }
}
