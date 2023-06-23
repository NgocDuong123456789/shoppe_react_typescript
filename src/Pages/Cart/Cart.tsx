import { useQuery, useMutation } from '@tanstack/react-query'
import { useEffect, useState, useMemo } from 'react'

import produce from 'immer'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import { PropPurchase } from '../../Types/product.type'
import { purchasesApi } from '../../Components/Api/purchases.api'
import { queryStatus } from '../../Components/queryStatus/queryStatus'
import { NumberFormat } from '../../Components/Utils/utils'
import { QuantityProduct } from '../../Components/QuantityProduct/QuantityProduct'
import { Button } from '../../Components/Button/Button'
import { Toast } from '../../Components/Toast/Toast'

interface ExtendedPurchase extends PropPurchase {
  disable: boolean
  checked: boolean
}
const Cart = () => {
  const { t } = useTranslation()
  //const {purchase,setPurchase}= useContext(AppContext)
  const [purchase, setPurchase] = useState<ExtendedPurchase[]>([])

  const location = useLocation().state?.product_id

  const query = queryStatus()
  const { data, refetch } = useQuery({
    queryKey: ['dataPurchase', query],
    queryFn: () => purchasesApi.getToCart(query)
  })
  const purchaseInCart = data?.data.data
  const isAllChecked = useMemo(() => {
    return purchase?.every((purchase) => purchase.checked)
  }, [purchase])

  const arrayChecked = useMemo(() => {
    return purchase?.filter((purchase) => purchase.checked)
  }, [purchase])

  const isChecked = useMemo(() => {
    return arrayChecked.map((purchase) => purchase._id)
  }, [arrayChecked])

  const sumTotalProduct = useMemo(() => {
    return arrayChecked?.reduce((sum, val) => {
      return sum + val.buy_count * val.price
    }, 0)
  }, [arrayChecked])

  const body = useMemo(
    () =>
      arrayChecked.map((purchase) => {
        return {
          product_id: purchase.product._id,
          buy_count: Number(purchase.buy_count)
        }
      }),
    [arrayChecked]
  )

  useEffect(() => {
    setPurchase(
      purchaseInCart?.map((purchase) => ({
        ...purchase,
        disable: false,
        checked: Boolean(purchase?._id === location)
      })) || []
    )
  }, [purchaseInCart])
  useEffect(() => {
    history.replaceState(null, '')
  })

  const mutation = useMutation({
    mutationFn: (body: string[]) => purchasesApi.deletePurchase(body),
    onSuccess: () => {
      refetch()
    }
  })
  const updatePurchaseMutation = useMutation({
    mutationFn: purchasesApi.updatePuchase
  })

  const handleDelete = (purchaseIdex: number) => {
    const purchaseId = purchase[purchaseIdex]._id
    mutation.mutate([purchaseId], {
      onSuccess: () => {
        refetch()
      }
    })
  }

  const handleChecked = (productIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurchase(
      produce((draft) => {
        draft[productIndex].checked = e.target.checked
      })
    )
  }

  const handleCAllChecked = () => {
    setPurchase((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }
  const handleManyDelete = () => {
    mutation.mutate(isChecked, {
      onSuccess: () => {
        refetch()
      }
    })
  }

  const buyProductMuTaTion = useMutation({
    mutationFn: purchasesApi.buyProduct
  })

  const handleBuyProduct = () => {
    if (arrayChecked.length > 0) {
      buyProductMuTaTion.mutate(body, {
        onSuccess: () => {
          refetch()
          Toast(true, 'Buy Product Successfully !')
        }
      })
    } else {
      Toast(false, 'Chưa có sản phẩm nào được chọn !')
    }
  }
  const handleTypeQuantity = (index: number, value: number | string) => {
    setPurchase(
      produce((draft) => {
        draft[index].buy_count = Number(value)
      })
    )
  }
  const handleQuantity = (purchaseIndex: number, value: number) => {
    const purchaseId = purchase[purchaseIndex].product._id
    updatePurchaseMutation.mutate(
      { product_id: purchaseId, buy_count: value },
      {
        onSuccess: () => {
          refetch()
          toast.success('cập nhật thành công !')
        }
      }
    )
   
  }

  return (
    <div className='bg-blackWhite lg:px-[110px] lg:py-10  py-4 relative w-full ls:pt-[53px]'>
      <Helmet>
        <title>Shopping Cart</title>
        <meta name='Shopping Cart' content='đây là trang mua bán' />
      </Helmet>
      {purchase.length > 0 ? (
        <>
          <div className='lg:grid-cols-12 gap-5 bg-white lg:py-5 px-7 mb-10 hidden lg:grid w-full '>
            <div className='col-span-6 flex items-center'>
              <input type='checkbox' className='lg:mr-3 mr-1' checked={isAllChecked} onChange={handleCAllChecked} />
              <p>{t('Cart.Product')}</p>
            </div>
            <div className='col-span-6 flex items-items justify-between'>
              <p>{t('Cart.UnitPrice')}</p>
              <p>{t('Cart.Quantity')}</p>
              <p>{t('Cart.TotalPrice')}</p>
              <p>{t('Cart.Actions')}</p>
            </div>
          </div>
          {purchase?.map((purchase, index) => {
            return (
              <div className=' grid grid-cols-12 gap-5 bg-white py-3 px-7   items-center' key={purchase._id}>
                <div className='lg:col-span-6 flex items-center  col-span-12'>
                  <input
                    type='checkbox'
                    className='lg:mr-3 mr-1'
                    checked={purchase.checked}
                    onChange={handleChecked(index)}
                  />
                  <img
                    src={purchase.product.image}
                    alt='ảnh product'
                    className='lg:w-[80px]  lg:h-[80px] object-cover mx-5 w-[40px] h-[40px]'
                  />
                  <p className='line-clamp-2 lg:text-lg text-[10px]'>{purchase.product.name}</p>
                </div>
                <div className='lg:col-span-6 col-span-12 flex items-center justify-between'>
                  <p className='lg:text-xl text-sm'>{`₫${NumberFormat(purchase.product.price as number)}`}</p>

                  <QuantityProduct
                    max={purchase?.product?.quantity}
                    className='outline-none border  border-FFCD95 w-[50px] lg:h-8 h-7 pl-[5px] lg:text-xl text-sm'
                    value={purchase.buy_count}
                    onType={(value) => handleTypeQuantity(index, value)}
                    onIncrease={(value) => handleQuantity(index, value)}
                    onDecrease={(value) => handleQuantity(index, value)}
                  />

                  <p className='text-orange lg:text-xl text-sm'>{`₫${NumberFormat(
                    Number(purchase.product.price) * purchase.buy_count
                  )}`}</p>
                  <button
                    className='hover:text-orange cursor-pointer lg:text-xl text-sm'
                    onClick={() => handleDelete(index)}
                  >
                    {t('Cart.Delete')}
                  </button>
                </div>
              </div>
            )
          })}
          <div className=' grid grid-cols-12 gap-5 bg-white py-5 px-7 lg:mt-10 mt-5'>
            <div className='col-span-6 flex items-center'>
              <input type='checkbox' className='lg:mr-3 mr-1' checked={isAllChecked} onChange={handleCAllChecked} />
              <p className='mx-5 lg:text-lg text-[10px]'>{t('Cart.SelectAll')}</p>
              <button className='lg:text-lg text-sm ' onClick={handleManyDelete}>
                {t('Cart.DeleteAll')}
              </button>
            </div>
            <div className='col-span-6 flex items-items justify-end'>
              <div className='flex items-center'>
                <p className='hidden lg:block'>
                  {t('Cart.Total')} ({purchase.length} {t('Cart.Item')}){' '}
                </p>
                <p className='text-orange lg:text-3xl text-xl'>₫{NumberFormat(sumTotalProduct)}</p>
              </div>
              <button
                className='bg-orange text-white lg:px-10 lg:py-2 ml-7 lg:text-xl text-[10px] px-2'
                onClick={handleBuyProduct}
              >
                {t('Cart.CheckOut')}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className='w-full flex items-center text-center m-auto justify-center py-10'>
          <div>
            {' '}
            <img
              className='lg:w-18 object-cover  lg:h-18 w-13 h-13'
              src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/9bdd8040b334d31946f49e36beaf32db.png'
              alt='ảnh trống'
            />
            <p className='lg:py-2  py-5 lg:text-xl text-base'>{t('Cart.EmptyCart')}</p>
            <Button className=' px-6 py-3 bg-orange text-white border '>
              <Link to='/'>{t('productDetail.BuyNow')}</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
export default Cart
