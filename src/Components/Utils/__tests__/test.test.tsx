import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '../../../App'
import { Provider, getInitaAppContext } from '../../../useContext/useContext'
export const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0 // tắt đi render nhiều lần
      },
      mutations: {
        retry: false
      }
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => null
    }
  })
  const Provider = ({ children }: { children: React.ReactNode }) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
  return Provider
}
const ProviderQuery = createWrapper()

export const renderRouter = ({ router = '/' } = {}) => {
  window.history.pushState({}, 'test page', router)
  const defaultValue = getInitaAppContext()
  return render(
    <ProviderQuery>
      <Provider defaultValue={defaultValue}>
        <App />
      </Provider>
    </ProviderQuery>,
    {
      wrapper: BrowserRouter
    }
  )
}
