import axios, { AxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'

import { Generality } from '../../Types/Generality.type'

export function AxiosErrorApi<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}
export function UNPROCESSABLE_ENTITYError<T>(error: unknown): error is AxiosError<T> {
  return AxiosErrorApi(error) && error?.response?.status === StatusCodes.UNPROCESSABLE_ENTITY
}

export function UNAUTHORIZEDError<T>(error: unknown): error is AxiosError<T> {
  return AxiosErrorApi(error) && error?.response?.status === StatusCodes.UNAUTHORIZED
}
export function NOT_FOUNDError<T>(error:unknown):error is AxiosError<T>{
  return AxiosErrorApi(error) && error?.response?.status === StatusCodes.NOT_FOUND
}

export function UNAUTHORIZEDERROR<T>(error: unknown): error is AxiosError<T> {
  return (
    AxiosErrorApi<Generality<{ message: string; name: string }>>(error) &&
    error?.response?.status === StatusCodes.UNAUTHORIZED &&
    error?.response?.data?.data?.name === 'EXPIRED_TOKEN'
  )
}
