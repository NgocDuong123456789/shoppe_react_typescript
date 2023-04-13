import http from './http'
import { Generality } from '../../Types/Generality.type'
import { Me } from '../../Types/user.type'

export interface PropsBody {
  address?: string
  date_of_birth?: Date
  name?: string
  phone?: string
  avatar?: string
  password?: string
  new_password?: string
}
export const meApi = {
  getApiMe: async () => {
    return await http.get<Generality<Me>>('me')
  },

  updateMe: async (body: PropsBody) => {
    return await http.put('user', body)
  },

  uploadAvata: async (body: FormData) => {
    return await http.post('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
