import { User } from '../../Types/user.type'

export const LocalStorageEventTarget = new EventTarget()

// tạo ra 1 cái event
// sau đó xuất ra 1 cái event và ở 1 nơi nào đó lắng nghe cái event đó 

export const saveAccessTokenLS = (accessToken: string) => {
 return  localStorage.setItem('access_token', accessToken)
}

export const saveRefreshTokenLS = (refreshToken: string) => {
  return localStorage.setItem('refresh_token', refreshToken)
}

export const getAccessToken = () => {
  return localStorage.getItem('access_token') || ''
}

export const getRefreshToken = () => {
  return localStorage.getItem('refresh_token') || ''
}

export const saveProfileLS = (user: User) => {
  return localStorage.setItem('profile', JSON.stringify(user))
}
export const getProfile = () => {
  const result = localStorage.getItem('profile')
  return result && JSON.parse(result)
}

export const removeLS = () => {

  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
  localStorage.removeItem('refresh_token')
  
  // ở hàm remove local , khi gọi hàm removeLS thì ở 1 nơi nào đó lắng nghe cái sự kiện để xóa các dữ liệu trên local
  // trong khi bên removeLS bị xóa thì bên app lắng nghe sự khiện 
  // nghãi là khi xóa bị 401 xóa hết local và lắng nghe sự kiện bên app để xóa dữ liệu ở useContext

  const clearLocalStorageEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLocalStorageEvent)
}
