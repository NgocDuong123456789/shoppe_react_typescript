import { describe, expect, it } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderRouter } from '../../../Components/Utils/__tests__/test.test'

describe('ProductDetail', () => {
  it('render UI ProductDetail', async () => {
    renderRouter({
      router:
        'productDetail/Mã%20FAXANH245%20giảm%2010K%20đơn%20từ%2050K%20Áo%20Thun%20Nam%20Thể%20Thao%20Dập%20Vân%20CT%20AN298-i,60abae5ddbfa6e153cb9962f'
    })
    // await waitFor(()=>{
    //     expect(document.body).toMatchSnapshot()
    // })
   
  
  })
})
