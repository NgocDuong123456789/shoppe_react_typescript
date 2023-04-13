import { rest } from 'msw'
import { baseURL } from '../Components/Contants/config'
export const oldAccess_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWVkOTA0NmQ3YzYyMDM0MDg1NjlmNCIsImVtYWlsIjoibmdhOTk5OUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTMxVDExOjMyOjUxLjQ5NFoiLCJpYXQiOjE2ODAyNjIzNzEsImV4cCI6MTY4MDI2MjM3Mn0.CvlnLOeFx8MBdf3b1G9U-ZNkEKu5yrzWHdChUvQHYhg'
export const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWVkOTA0NmQ3YzYyMDM0MDg1NjlmNCIsImVtYWlsIjoibmdhOTk5OUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTMxVDExOjMyOjUxLjQ5NFoiLCJpYXQiOjE2ODAyNjIzNzEsImV4cCI6MTIyODkyMzgzNTkyfQ.ZgXhqFgXwimNdYr9gtui9sHTC8B2Na3IdI-b4DrvJKM'

const meResponse = {
  message: 'Lấy người dùng thành công',
  data: {
    _id: '6428037e6d7c6203408571ac',
    roles: ['User'],
    email: 'nga999@gmail.com',
    createdAt: '2023-04-01T10:12:14.287Z',
    updatedAt: '2023-04-01T10:12:14.287Z'
  }
}



const meRequest = rest.post(`${baseURL}me`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(meResponse))
})

export const  meRequests = [meRequest ]
