/* eslint-disable react-hooks/rules-of-hooks */
import { lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { useContext } from 'react'

// eslint-disable-next-line react-hooks/rules-of-hooks

import { path } from '../src/Components/Contants/path'
import NotFound from './Pages/NotFound/NotFound'
import { AppContext } from './useContext/useContext'
import MainLayout from './Layouts/MainLayout/MainLayout'

const Register = lazy(() => import('./Pages/Register/Register'))
const Login = lazy(() => import('./Pages/Login/Login'))
const ProductDetail = lazy(() => import('./Pages/Products/ProductDetail/ProductDetail'))
const Cart = lazy(() => import('./Pages/Cart/Cart'))
const Profile = lazy(() => import('./Pages/User/Pages/Profile/Profile'))
const ProductList = lazy(() => import('./Pages/Products/ProductList'))
const LayoutUser = lazy(() => import('./Pages/User/Layouts/LayoutUser'))
const ChangePassword = lazy(() => import('./Pages/User/Pages/ChangePassword/ChangePassword'))
const PurchaseOrder = lazy(() => import('./Pages/User/Pages/PurchaseOrder/PurchaseOrder'))

export const routesElement = () => {
  const ProtectionRouter = () => {
    const { authorization } = useContext(AppContext)
    return authorization ? <Outlet /> : <Navigate to='/login' />
  }

  const NotProtectionRouter = () => {
    const { authorization } = useContext(AppContext)
    return !authorization ? <Outlet /> : <Navigate to='/' />
  }

  const routes = useRoutes([
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <ProductList />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectionRouter />,
      children: [
        {
          path: path.cart,
          element: (
            <MainLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Cart />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '',
          element: (
            <MainLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <LayoutUser />
              </Suspense>
            </MainLayout>
          ),

          children: [
            {
              path: path.profile,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: path.changePassword,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <ChangePassword />
                </Suspense>
              )
            },

            {
              path: path.purchaseOrder,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <PurchaseOrder />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '',
      element: <NotProtectionRouter />,
      children: [
        {
          path: path.login,
          element: (
            <MainLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Login />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.register,
          element: (
            <MainLayout>
              <Suspense fallback={<div>Loading...</div>}>
                {' '}
                <Register />
              </Suspense>
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    }
  ])
  return routes
}
