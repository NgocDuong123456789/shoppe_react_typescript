import { Auth } from '../../Types/Auth.type'
import http from './http'


export const registerApi = async ({ email, password }: { email: string; password: string }) => {
  return await http.post<Auth>('register', {
    email,
    password
  })
}

export const loginApi = async ({ email, password }: { email: string; password: string }) => {
  return await http.post<Auth>('login', {
    email,
    password
  })
}

export const LogoutApi = async () => {
  return await http.post('logout')
}
