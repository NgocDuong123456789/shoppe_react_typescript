import { it, describe, expect, beforeEach } from 'vitest'
import { StatusCodes } from 'http-status-codes'

import http from '../http'
import { saveRefreshTokenLS, saveAccessTokenLS } from '../../../Components/Utils/localstorage'
const idProduct = '60abae5ddbfa6e153cb9962f'
const access_token='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjgwMzdlNmQ3YzYyMDM0MDg1NzFhYyIsImVtYWlsIjoibmdhOTk5QGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDQtMDNUMDg6MTQ6NTguODU3WiIsImlhdCI6MTY4MDUwOTY5OCwiZXhwIjoxNjgxMTE0NDk4fQ.9dBtVCHWWLUo8s3eKQMomgzrA_oxpDZkcZkS4ioHmLc'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWVkOTA0NmQ3YzYyMDM0MDg1NjlmNCIsImVtYWlsIjoibmdhOTk5OUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTMxVDExOjMyOjUxLjQ5NFoiLCJpYXQiOjE2ODAyNjIzNzEsImV4cCI6MTIyODkyMzgzNTkyfQ.ZgXhqFgXwimNdYr9gtui9sHTC8B2Na3IdI-b4DrvJKM'

describe('test API product', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  it('test  API product', async () => {
    const res = await http.get('products')
    expect(res.status).toBe(StatusCodes.OK)
  })

  it('test API categories', async () => {
    const res = await http.get('categories')
    expect(res.status).toBe(StatusCodes.OK)
  })

  it('test API productDetail', async () => {
    const res = await http.get(`products/${idProduct}`)
    expect(res.status).toBe(StatusCodes.OK)
  })

  it('test me', async () => {
   
    saveAccessTokenLS(access_token)
    const res = await http.get('me')
    expect(res.status).toBe(StatusCodes.OK)
  })

  it('test refresh-token', async () => {
    //  saveAccessTokenLS(oldAccess_token)
    // saveRefreshTokenLS(refresh_token)
    const res = await http.get('me')
    expect(res.status).toBe(StatusCodes.OK)
    // const res = http.post('refresh-access-token')
  })
})
