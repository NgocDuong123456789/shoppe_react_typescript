import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { baseURL } from '../Contants/config'
import { LOGIN_URL, LOGOUT_URL, REGISTER_URL, REFRESH_TOKEN_URL } from '../Contants/auth'

import {
  getAccessToken,
  getRefreshToken,
  saveAccessTokenLS,
  saveProfileLS,
  removeLS,
  saveRefreshTokenLS
} from '../Utils/localstorage'
import { UNAUTHORIZEDError, UNAUTHORIZEDERROR } from '../Utils/errorApi'
import { Generality } from '../../Types/Generality.type'
let accessToken = getAccessToken()
let refreshToken = getRefreshToken()
let refreshPromise: Promise<string> | null = null

const http = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
    // 'expire-access-token': 10,
    // 'expire-refresh-token': 60 * 60
  }
})
const handleRefreshToken = async () => {
  return await http
    .post<Generality<{ access_token: string }>>(REFRESH_TOKEN_URL, { refresh_token: refreshToken })
    .then((res) => {
      const access_token = String(res?.data?.data.access_token)
      accessToken = access_token
      saveAccessTokenLS(access_token)
      return access_token
    })
    .catch((err) => {
      accessToken = ''
      refreshToken = ''
      removeLS()
      toast.error(err)
      throw err
    })
}

http.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.authorization = accessToken

      return config
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => {
    if (response.config.url === LOGIN_URL || response.config.url === REGISTER_URL) {
      const access_token = response.data.data.access_token
      const refresh_token = response.data.data.refresh_token

      accessToken = access_token
      refreshToken = refresh_token
      saveAccessTokenLS(access_token)
      saveRefreshTokenLS(refresh_token)
      saveProfileLS(response.data.data.user)
    } else if (response.config.url === LOGOUT_URL) {
      removeLS()
      accessToken = ''
      refreshToken = ''
    }
    return response
  },
  (error: AxiosError<{ message: string; name: string }>) => {
    if (error?.response?.status !== 422 && error?.response?.status !== 401) {
      //  toast.error( error.message)
    }
    if (UNAUTHORIZEDError(error)) {
      if (
        UNAUTHORIZEDERROR<Generality<{ message: string; name: string }>>(error) &&
        error?.config?.url !== REFRESH_TOKEN_URL
      ) {
        refreshPromise = refreshPromise
          ? refreshPromise
          : handleRefreshToken().finally(() => {
              setTimeout(() => {
                refreshPromise = null
              }, 10000)
            })
        return refreshPromise.then((access_token) => {
          accessToken = access_token
          const config = error.config
          if (config?.headers) {
            config.headers.authorization = accessToken
            return http(config)
          }
          // return http({ ...config, headers: { ...config?.headers, authorization: access_token } })
        })
      } else {
        removeLS()
        accessToken = ''
        refreshToken = ''

        //  toast.error(error?.response?.data.message as string)
      }
    }

    return Promise.reject(error)
  }
)

export default http
