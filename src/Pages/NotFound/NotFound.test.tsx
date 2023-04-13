import { describe, it, expect } from 'vitest'

import { waitFor } from '@testing-library/react'
import { renderRouter } from '../../Components/Utils/__tests__/test.test'
describe('NOTfound', () => {
  it('render NotFound', async () => {
    const badRouter = '/abcd'
    renderRouter({router: badRouter })
    await waitFor(() => {
      expect(document.body).toMatchSnapshot()
    })
  })
})
