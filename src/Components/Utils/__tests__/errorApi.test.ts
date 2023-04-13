import { AxiosError } from 'axios'
import { describe, it, expect } from 'vitest'
import { StatusCodes } from 'http-status-codes'

import {
  AxiosErrorApi,
  UNPROCESSABLE_ENTITYError,
  UNAUTHORIZEDError,
  NOT_FOUNDError,
  UNAUTHORIZEDERROR
} from '../errorApi'

describe('test error API', () => {
  it('test error AxiosError  API', () => {
    expect(AxiosErrorApi(new AxiosError())).toBe(true)
    expect(AxiosErrorApi(new Date())).toBe(false)
  })
})

describe('test error API', () => {
  it('test error UNPROCESSABLE_ENTITYError API', () => {
    expect(
      UNPROCESSABLE_ENTITYError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: StatusCodes.UNPROCESSABLE_ENTITY,
          data: null
        } as any)
      )
    ).toBe(true)
    expect(UNPROCESSABLE_ENTITYError(new Date(1, 2, 3))).toBe(false)
  })
})

describe('test error API', () => {
  it('test error UNAUTHORIZEDError  API', () => {
    expect(
      UNAUTHORIZEDError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: StatusCodes.UNAUTHORIZED,
          data: null
        } as any)
      )
    ).toBe(true)
    expect(UNAUTHORIZEDError(new Date(1, 2, 3))).toBe(false)
  })
})

describe('test error API', () => {
  it('test error  NOT_FOUND API', () => {
    expect(
      NOT_FOUNDError(
        new AxiosError(undefined, undefined, undefined, undefined, { status: StatusCodes.NOT_FOUND, data: null } as any)
      )
    ).toBe(true)
  })
  expect(NOT_FOUNDError(new Date(1990, 1, 1))).toBe(false)
})

describe('test error API', () => {
  it('test error  UNAUTHORIZEDERROR API', () => {
    expect(
      UNAUTHORIZEDERROR(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: StatusCodes.UNAUTHORIZED,
          data: {
            data: {
              name: 'EXPIRED_TOKEN'
            }
          }
        } as any)
      )
    ).toBe(true)
    expect(
      UNAUTHORIZEDERROR(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: StatusCodes.UNAUTHORIZED,
          data: {
            data: {
              name: 'NOT FOUND'
            }
          }
        } as any)
      )
    ).toBe(false)
    expect(UNAUTHORIZEDERROR(new Date(1990, 1, 1))).toBe(false)
  })
})
