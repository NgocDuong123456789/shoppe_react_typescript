
import { rest } from 'msw'
import { baseURL } from '../Components/Contants/config'
export const oldAccess_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWVkOTA0NmQ3YzYyMDM0MDg1NjlmNCIsImVtYWlsIjoibmdhOTk5OUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTMxVDExOjMyOjUxLjQ5NFoiLCJpYXQiOjE2ODAyNjIzNzEsImV4cCI6MTY4MDI2MjM3Mn0.CvlnLOeFx8MBdf3b1G9U-ZNkEKu5yrzWHdChUvQHYhg'
export const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWVkOTA0NmQ3YzYyMDM0MDg1NjlmNCIsImVtYWlsIjoibmdhOTk5OUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTMxVDExOjMyOjUxLjQ5NFoiLCJpYXQiOjE2ODAyNjIzNzEsImV4cCI6MTIyODkyMzgzNTkyfQ.ZgXhqFgXwimNdYr9gtui9sHTC8B2Na3IdI-b4DrvJKM'

const loginResponse = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWVkOTA0NmQ3YzYyMDM0MDg1NjlmNCIsImVtYWlsIjoibmdhOTk5OUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA0LTAxVDA5OjI3OjE0LjA5N1oiLCJpYXQiOjE2ODAzNDEyMzQsImV4cCI6MTY4MDM1MzU3OX0.KCV_8a5uRd-xLzDOjLrWWyjzwY7tbtgH-MTcGGCwlNY',
    expires: 12345,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWVkOTA0NmQ3YzYyMDM0MDg1NjlmNCIsImVtYWlsIjoibmdhOTk5OUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA0LTAxVDA5OjI3OjE0LjA5N1oiLCJpYXQiOjE2ODAzNDEyMzQsImV4cCI6MTIyODkyNDYyNDU1fQ.D9B4AKVm8PwoVPDsJJG7bGT-8ydpSDBhWrjZMEz0PmA',
    expires_refresh_token: 121212121221,
    user: {
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
  }
}
const registerResponse = {
  message: 'Đăng ký thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5nYTk5OUBnbWFpbC5jb20iLCJpZCI6IjY0MjgwMzdlNmQ3YzYyMDM0MDg1NzFhYyIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDQtMDFUMTA6MTI6MTQuMjk2WiIsImlhdCI6MTY4MDM0MzkzNCwiZXhwIjoxNjgwOTQ4NzM0fQ.qUOzPEM5jkEURiELLrNBfSzWd6slszzRsBBC1Wfmqno',
    expires: 604800,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5nYTk5OUBnbWFpbC5jb20iLCJpZCI6IjY0MjgwMzdlNmQ3YzYyMDM0MDg1NzFhYyIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDQtMDFUMTA6MTI6MTQuMjk2WiIsImlhdCI6MTY4MDM0MzkzNCwiZXhwIjoxNjg4OTgzOTM0fQ.mMl53hF_kNX9Qn_GR5KAG04V5Ylc9hxXff82jWLjqj0',
    expires_refresh_token: 8640000,
    user: {
      roles: ['User'],
      _id: '6428037e6d7c6203408571ac',
      email: 'nga999@gmail.com',
      createdAt: '2023-04-01T10:12:14.287Z',
      updatedAt: '2023-04-01T10:12:14.287Z',
      __v: 0
    }
  }
}
const loginRequest = rest.post(`${baseURL}login`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(loginResponse))
})

const registerRequest = rest.post(`${baseURL}register`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(registerResponse))
})

export const authRequests = [loginRequest, registerRequest]
