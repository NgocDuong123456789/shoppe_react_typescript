import { describe, expect, test } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'

import { path } from './Components/Contants/path'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { renderRouter } from './Components/Utils/__tests__/test.test'
expect.extend(matchers) // vì dùng vitest nên cần thay đổi
describe('test App', () => {
  // vì App nằm trong Browser nên cần bọc BrowerRouter

  test('App render và chuyển trang', async () => {
    // render(<App />, {
    //   wrapper: BrowserRouter
    // })
    renderRouter({ router:'/' })
    const user = userEvent.setup()
  await   waitFor(() => {
      // sẽ run callback 1 vần
      // cho đến khi hết timeout
      // số lần run phục thuộc vào timeout và interval
      // mặc đinh timeout:1000ms
      expect(document.querySelector('title')?.textContent).toBe('Shoppe Việt Name | Mua Bán Thương Mại')
    })
    // verify chuyển sang trang login
    await user.click(screen.getByText(/homeSidebar.Login/i))
    await waitFor(() => {
      expect(screen.queryByText('Bạn mới biết đến Shoppe?')).toBeInTheDocument()
    })

    test('test notFound', async () => {
      const badRoute = '/some/bad/router'
     
      renderRouter({ router: badRoute })
      await waitFor(() => {
        expect(screen.queryByText(/Page not found/i)).toBeInTheDocument()
      })
    })
  })

  test('test register', async () => {
    renderRouter({ router: path.register })

    await waitFor(() => {
      expect(screen.queryByText(/Bạn mới biết đến Shoppe?/i)).toBeInTheDocument()
    })
  })
  screen.debug(document.body.parentElement as HTMLElement, 99999999)
})
