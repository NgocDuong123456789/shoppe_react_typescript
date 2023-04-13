import { describe, test, expect, beforeEach } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'

import { path } from '../../Components/Contants/path'
import { renderRouter } from '../../Components/Utils/__tests__/test.test'

expect.extend(matchers)

describe('test Login', async () => {
  beforeEach(() => {
    renderRouter({ router: path.login })
  })
  test('test error Login', async () => {
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    })
    const submit = document.querySelector('form button[type="submit"]') as HTMLButtonElement
    const user = userEvent.setup()

    user.click(submit)

    expect(screen.findByText(/không để trống trường này/i)).toBeTruthy()
  })

  test('should display min length error when password is invalid', async () => {
    const emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    const passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement
    fireEvent.change(emailInput, {
      target: {
        value: 'test@mail.com'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: '123'
      }
    })
    fireEvent.submit(document.querySelector('form button[type="submit"]') as HTMLButtonElement)
    await waitFor(async () => {
      expect(await screen.findByText(/độ dài tối thiểu 6 ký tự/i)).toBeTruthy()
    })
  })
  test('test không lỗi', async () => {
    const emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    const passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement
    fireEvent.change(emailInput, {
      target: {
        value: 'nga9999@gmail.com'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: '123456789'
      }
    })

    await waitFor(() => {
      expect(screen.queryByText(/độ dài tối thiểu 6 ký tự/i)).toBeNull()
    })
    fireEvent.submit(document.querySelector('form button[type="submit"]') as HTMLButtonElement)
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Shoppe Việt Name | Mua Bán Thương Mại')
    })
  })
  screen.debug(document.body.parentElement as HTMLElement, 999999999)
})
