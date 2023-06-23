import { it, describe } from 'vitest'

import http from '../http'
describe('test API', () => {
  it('test login', () => {
    const res = http.post('login', { email: 'nga9999@gmail.com', password: '123456789' })
    console.log(res)
  })
})
