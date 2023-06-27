/* eslint-disable import/namespace */
import { useParams } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-toastify'
import DOMPurify from 'dompurify'
import { useNavigate } from 'react-router-dom'
import { convert } from 'html-to-text'

import { productApi } from '../../../Components/Api/product.api'
import { QuantityProduct } from '../../../Components/QuantityProduct/QuantityProduct'
import { getIdFromNameId, NumberFormat } from '../../../Components/Utils/utils'
import { Product } from '../../../Components/Product/Product'
import { purchasesApi } from '../../../Components/Api/purchases.api'
import { UNPROCESSABLE_ENTITYError } from '../../../Components/Utils/errorApi'
import { Generality } from '../../../Types/Generality.type'
import { queryStatus } from '../../../Components/queryStatus/queryStatus'
import { path } from '../../../Components/Contants/path'
import Skeleton from '../../../Components/Skeleton/Skeleton'

const ProductDetail = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const imageRef = useRef<HTMLImageElement>(null)
  const divRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()
  const [quantity, SetQuantity] = useState<number | string>(1)

  const handleBuy_Count = (value: number | string) => {
    SetQuantity(value)
  }
  const queryPurchase = queryStatus()

  const idURL = getIdFromNameId(useParams().id as string)
  const { data } = useQuery({
    queryKey: ['productDetail', idURL],
    queryFn: () => productApi.getProductDetail(idURL as string)
  })
  const productDetail = data?.data.data && data?.data.data

  const [renderImage, setRenderImage] = useState<string>('')
  const [prevImage, setPrevImage] = useState<number[]>([0, 5])

  const discountPrice = (priceBefore: number, price: number) => {
    return Math.floor(((priceBefore - price) / priceBefore) * 100) + '%'
  }
  const { data: productCategory, isLoading } = useQuery({
    queryKey: ['category', idURL],
    queryFn: () => productApi.getProducts(productDetail?.category._id as string)
  })
  const mutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchasesApi.addToCart(body)
  })

  const handleMouseEnter = (image: string) => {
    setRenderImage(image)
  }
  const handleCovertImageprev = () => {
    if (prevImage[0] === 0) return
    setPrevImage((prev) => prev.map((num) => num - 1))
  }
  const handleCoverImageNext = () => {
    if (prevImage[1] === productDetail?.images.length) return
    setPrevImage((prev) => prev.map((num) => num + 1))
  }

  const handleZoomImage = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const div = divRef.current as HTMLDivElement
    const image = imageRef.current as HTMLImageElement

    div.style.top = e.clientY + 'px'
    div.style.left = e.clientX + 'px'
    div.style.backgroundImage = `url(${renderImage}`
    div.style.backgroundSize = '2000px'
    div.style.display = 'block'

    const WeightImage = image.offsetWidth
    const HeightImage = image.clientHeight
    const pagex = e.pageX
    const pagey = e.pageY
    const X = image.offsetLeft
    const Y = image.offsetTop
    const x = ((pagex - X) / WeightImage) * 100 + '%'
    const y = ((pagey - Y) / HeightImage) * 100 + '%'
    div.style.backgroundPosition = `${x} ${y}`
  }
  useEffect(() => {
    setRenderImage((productDetail?.image as string) || (productDetail?.images[0] as string))
  }, [productDetail])

  const handleZoomLeave = () => {
    const div = divRef.current as HTMLDivElement
    div.style.display = 'none'
  }
  const handleAddToCart = () => {
    mutation.mutate(
      { product_id: idURL, buy_count: quantity as number },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['dataPurchase', queryPurchase] })
          toast.success('update cart successfully')
        },
        onError: (error) => {
          if (UNPROCESSABLE_ENTITYError<Generality<{ buy_count: string }>>(error)) {
            toast.error(error.response?.data.data.buy_count)
          }
        }
      }
    )
  }

  const handleBuyNow = async () => {
    const res = await mutation.mutateAsync({ product_id: idURL, buy_count: Number(quantity) })
    const purchase = res.data as any

    navigate(path.cart, {
      state: {
        product_id: purchase?.data._id as any
      }
    })
  }

  return (
    <div className='bg-[white] lg:px-[110px] lg:py-10  py-5 ls:pt-[45px]'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{productDetail?.name || 'Shoppe_clone'}</title>
        <meta
          name='trang chi tiết sản phẩm'
          content={convert(productDetail ? productDetail.description : '', {
            wordwrap: 130
          })}
        />
      </Helmet>
      {isLoading ? (
        <div className='grid grid-cols-5 gap-4'>
          <Skeleton />
          <Skeleton /> 
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className='grid grid-cols-12 lg:gap-5 bg-white'>
          <div className='lg:col-span-5 col-span-12  ls:p-4'>
            <div className='w-full lg:my-5 lg:mx-5  '>
              <img
                src={renderImage || productDetail?.image}
                alt='ảnh chi tiết'
                className='w-full cursor-zoom-in object-cover relative'
                onMouseMove={(e) => handleZoomImage(e)}
                ref={imageRef}
                onMouseLeave={handleZoomLeave}
              />
              <div
                className='h-[150px] w-[150px] rounded-full border hidden border-orange fixed translate-y-001 translate-x-001 pointer-events-none'
                ref={divRef}
              ></div>
            </div>
            <div className='grid grid-cols-5 gap-4  lg:ml-5 w-full pb-3 cursor-pointer relative mt-[10px]'>
              <div className='absolute  top-[45%] translate-y-001 left-[10px]'>
                {productDetail && productDetail?.images.length >= 5 && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='lg:w-7 lg:h-7  lg:bg-blackWhite  '
                    onClick={handleCovertImageprev}
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                )}
              </div>

              {productDetail?.images.slice(...prevImage).map((image, index) => {
                return (
                  <div
                    className={classNames('col-span-1 w-full ', {
                      'border-2 border-orange': renderImage === image,
                      border: renderImage !== image
                    })}
                    key={index}
                  >
                    <img
                      src={image}
                      alt='ảnh chi tiết sản phẩm'
                      className='w-full'
                      onMouseEnter={() => handleMouseEnter(image)}
                    />
                  </div>
                )
              })}

              <div className='absolute top-[45%] translate-y-001 right-[10px]'>
                {productDetail && productDetail?.images.length >= 5 && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='lg:w-7 lg:h-7  lg:bg-blackWhite'
                    onClick={handleCoverImageNext}
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                )}
              </div>
            </div>
          </div>
          <div className='lg:col-span-7 my-5 mx-6 col-span-12'>
            <h1 className=' font-bold lg:text-2xl text-sm line-clamp-2 '>{productDetail?.name}</h1>
            <div className='bg-blackWhite flex items-center lg:py-6 lg:px-[30px] lg:my-10 w-full  py-3  my-[20px]'>
              <p className='line-through lg:text-lg text-md '>
                {' '}
                ₫{NumberFormat(productDetail?.price_before_discount as number)}
              </p>
              <h2 className=' lg:text-3xl text-2xl text-orange mx-[20px]'>
                ₫{NumberFormat(productDetail?.price as number)}
              </h2>
              <div className=' text-white bg-orange px-[4px] py-[3px] lg:text-[15px] text-[10px] font-bold text-center items-center flex'>
                {`${t('productDetail.Off')} ${discountPrice(
                  productDetail?.price_before_discount as number,
                  productDetail?.price as number
                )}`}
              </div>
            </div>
            <div className='flex items-center w-full'>
              <p className='text-[10px] lg:text-lg'>{t('productDetail.Quantity')}</p>

              <QuantityProduct
                max={productDetail?.quantity}
                onType={handleBuy_Count}
                onIncrease={handleBuy_Count}
                onDecrease={handleBuy_Count}
                className='outline-none border  border-FFCD95 w-[50px] h-7 lg:h-8 pl-[10px]'
                value={quantity}
              />

              <p className='text-[10px] lg:text-lg'>{`${productDetail?.quantity} ${t(
                'productDetail.Piecesavailable'
              )}`}</p>
            </div>
            {productDetail?.quantity && Number(quantity) > productDetail?.quantity && (
              <p className='text-orange mt-[20px] lg:text-xl text-sm'>{t('productDetail.errorProduct')}</p>
            )}
            <div className='flex items-center  m-auto w-full justify-center'>
              <button
                className='border border-orange bg-FBEBED text-orange lg:px-6 lg:py-4 px-4 py-2 mr-[30px] my-[40px]'
                onClick={handleAddToCart}
              >
                <div className='flex items-center '>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='lg:w-6 lg:h-6 fill-orange w-4 h-4'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                    />
                  </svg>
                  <h3 className='text-orange lg:text-xl text-[13px]'>{t('productDetail.AddToCart')}</h3>
                </div>
              </button>
              <div className='bg-orange text-white lg:px-6 lg:py-4 px-4 py-2 '>
                <button className='lg:text-xl text-sm' onClick={handleBuyNow}>
                  {t('productDetail.BuyNow')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='mt-5 grid grid-cols-12  bg-white lg:p-10 p-5'>
        <div className='col-span-12'>
          <h2 className='lg:text-2xl mb-10'>{t('productDetail.ProductDescription')}</h2>

          <div
            className='w-full lg:text-sm text-[10px] '
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(productDetail?.description as string) }}
          />
        </div>
      </div>
      <div className='grid grid-cols-12  bg-white '>
        <div className='col-span-12 lg:p-10 p-5'>
          <h2 className='lg:text-xl  text-lg mb-10'>{t('productDetail.ProductSpecifications')}</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5'>
            {productCategory?.data.data.products.map((category) => {
              return (
                <div key={category._id} className='col-span-1'>
                  <Product product={category} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductDetail
