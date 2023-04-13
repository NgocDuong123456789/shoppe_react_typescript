import { User } from '../../Types/user.type'

export const LocalStorageEventTarget = new EventTarget()

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

  const clearLocalStorageEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLocalStorageEvent)
}
