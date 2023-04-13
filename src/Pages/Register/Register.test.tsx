import { describe, it, expect, beforeEach } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

import { path } from '../../Components/Contants/path'
import { renderRouter } from '../../Components/Utils/__tests__/test.test'

expect.extend(matchers)
describe('test register', () => {
  beforeEach(() => {
    renderRouter({ router: path.register })
  })
  it('test register', async () => {
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/nhập email/i)).toBeTruthy()
    })
    const submit = document.querySelector('form button[type="submit"]') as HTMLButtonElement
    fireEvent.submit(submit)
    expect(screen.findByText(/không để trống trường này/i)).toBeTruthy()
  })
  it('test error ', async () => {
    const submit = document.querySelector('form button[type="submit"]') as HTMLButtonElement
    const emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    const passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement
    const confirm_password = document.querySelector('form input[type="password"]') as HTMLInputElement

    fireEvent.change(emailInput, {
      target: {
        value: 'test@gmail.com'
      }
    })

    fireEvent.change(passwordInput, {
      target: {
        value: '123'
      }
    })
    fireEvent.change(confirm_password, {
      target: {
        value: '123'
      }
    })
    fireEvent.submit(submit)
    await waitFor(async () => {
      expect(await screen.findByText(/độ dài tối thiểu 6 ký tự/i)).toBeTruthy()
    })
  })

  it('test error',  () => {
    const submit = document.querySelector('form button[type="submit"]') as HTMLButtonElement
    const emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    const passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement
    const confirm_password = document.querySelector('form input[type="password"]') as HTMLInputElement

    fireEvent.change(emailInput, {
      target: {
        value: 'test12@gmail.com'
      }
    })

    fireEvent.change(passwordInput, {
      target: {
        value: '123456'
      }
    })
    fireEvent.change(confirm_password, {
      target: {
        value: '123456'
      }
    })
   
     waitFor(() => {
      // những TH tìm k ra test hay element
      // thì nên dùng query hơn là dùng find
      expect(screen.queryByText(/độ dài tối thiểu 6 ký tự/i)).toBeNull()
    })
    fireEvent.submit(submit)
    screen.debug(document.body.parentElement as HTMLElement, 999999)
  })
  // screen.debug(document.body.parentElement as HTMLElement, 999999)
})
