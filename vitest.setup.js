import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import {  rest } from 'msw'
import { baseURL} from './src/Components/Contants/config'
import {authRequests} from './src/msw/Auth.msw'
import {productsRequest} from './src/msw/product.msw.ts'
import {meRequests} from './src/msw/user.msw'


const server = setupServer(...authRequests,...productsRequest,...meRequests)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
