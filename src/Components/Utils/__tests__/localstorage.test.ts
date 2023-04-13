import { describe, it, expect, beforeEach } from 'vitest'

import { User } from '../../../Types/user.type'
import {
  saveAccessTokenLS,
  saveRefreshTokenLS,
  saveProfileLS,
  getProfile,
  getRefreshToken,
  getAccessToken,
  removeLS
} from '../localstorage'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWVkOTA0NmQ3YzYyMDM0MDg1NjlmNCIsImVtYWlsIjoibmdhOTk5OUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTMwVDA4OjIzOjU2Ljk2N1oiLCJpYXQiOjE2ODAxNjQ2MzYsImV4cCI6MTY4MDc2OTQzNn0.eU8BrU5iMjDRrkGR3TtzzKEWZGwwZr5MTMNTOh2tXLY'
const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWVkOTA0NmQ3YzYyMDM0MDg1NjlmNCIsImVtYWlsIjoibmdhOTk5OUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTMwVDA4OjIzOjU2Ljk2N1oiLCJpYXQiOjE2ODAxNjQ2MzYsImV4cCI6MTY4ODgwNDYzNn0.Hfj6CoAGXoTuGNYBDgPpa5N05Ufj5DZ03OPDm49Ce0g'
const profile = {
  _id: '641ed9046d7c6203408569f4',
  roles: ['User'],
  email: 'nga9999@gmail.com',
  createdAt: '2023-03-25T11:20:36.986Z',
  updatedAt: '2023-03-29T22:26:42.594Z',
  __v: 0,
  address: 'nam định',
  date_of_birth: '1990-08-16T17:00:00.000Z',
  name: 'df',
  phone: '34343434334242',
  avatar: '1ea0cd16-2708-470a-b177-5beec740893a.png'
}
beforeEach(() => {
  localStorage.clear()
})

describe('test error localstorage', () => {
  it('test error saveAccessTokenLS', () => {
    saveAccessTokenLS(access_token)
    expect(localStorage.getItem('access_token')).toBe(access_token)
  })
})

describe('test error localStorage', () => {
  it('test error saveRefreshTokenLS', () => {
    saveRefreshTokenLS(refresh_token)
    expect(localStorage.getItem('refresh_token')).toBe(refresh_token)
  })
})

describe('test error localStorage', () => {
  it('test error getRefreshToken', () => {
    saveRefreshTokenLS(refresh_token)
    getRefreshToken()
    expect(localStorage.getItem('refresh_token')).toBe(refresh_token)
  })
})

describe('test error localStorage', () => {
  it('test error  getAccessToken', () => {
    saveAccessTokenLS(access_token)
    getAccessToken()
    expect(localStorage.getItem('access_token')).toBe(access_token)
  })
})

describe('test error localStorage', () => {
  it('test error saveProfileLS', () => {
    saveProfileLS(profile as User)
    expect(JSON.parse(localStorage.getItem('profile') as string)).toEqual(profile)
  })
})

describe('test error localStorage', () => {
  it('test error  getProfile', () => {
    saveProfileLS(profile as User)
    getProfile()
    expect(JSON.parse(localStorage.getItem('profile') as string)).toEqual(profile)
  })
})

describe('test error  localStorage ', () => {
  it('test error  removeLS ', () => {
    saveRefreshTokenLS(refresh_token)
    saveRefreshTokenLS(refresh_token)
    saveProfileLS(profile as User)
    removeLS()
    expect(localStorage.getItem('access_token')).toBe(null)
    expect(localStorage.getItem('refresh_token')).toBe(null)
    expect(localStorage.getItem('profile')).toBe(null)
  })
})
