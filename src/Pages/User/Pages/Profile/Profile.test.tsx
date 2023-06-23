import { describe, test, expect } from 'vitest'
import { waitFor, screen } from '@testing-library/react'

import { renderRouter } from '../../../../Components/Utils/__tests__/test.test'
import { path } from '../../../../Components/Contants/path'
import { saveAccessTokenLS } from '../../../../Components/Utils/localstorage'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjgwMzdlNmQ3YzYyMDM0MDg1NzFhYyIsImVtYWlsIjoibmdhOTk5QGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDQtMDFUMTc6MzI6MDcuNzkzWiIsImlhdCI6MTY4MDM3MDMyNywiZXhwIjoxNjgwMzgyNjcyfQ.CZk3-7vN5_rUj3Me18M0GGQ_JdxbLwL3Cp0wy0uIGp4'
describe('Profile', () => {
  test('test Profile', async () => {
    saveAccessTokenLS(access_token)
    const { container } = renderRouter({ router: path.profile })
    await waitFor(() => {
      expect((container.querySelector('form input[placeholder="ten"]') as HTMLInputElement).value).toBe('df')
    })
    screen.debug(document.body.parentElement as HTMLElement, 999999999)
  })
})
