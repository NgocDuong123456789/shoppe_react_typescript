import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import pick from 'lodash/pick'
import omit from 'lodash/omit'
import { useForm, Controller } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'

import { StartProduct } from '../../../Components/StartProduct/StartProduct'
import { productApi } from '../../../Components/Api/product.api'
import { SchemaForm, schema } from '../../../Components/Utils/rule'
import { QueryParams } from '../../../Hook/QueryParams'
import { InputNumber } from '../../../Components/InputNumber/InputNumber'

type PropsInput = Pick<SchemaForm, 'price_max' | 'price_min'>
const schemaInput = schema.pick(['price_max', 'price_min'])
export const AsideProduct = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const useQueryParam = QueryParams()
  const {
    handleSubmit,
    control,
    reset,
    trigger,

    formState: { errors }
  } = useForm<PropsInput>({
    defaultValues: {
      price_max: '',
      price_min: ''
    },
    resolver: yupResolver(schemaInput)
  })
  const onSubmit = handleSubmit((data) => {
    const { price_max, price_min } = data
    navigate({
      pathname: '/',
      search: createSearchParams({
        ...useQueryParam,
        price_max: price_max as string,
        price_min: price_min as string
      }).toString()
    })
    reset()
  })

  const { data } = useQuery({
    queryKey: ['category'],
    queryFn: () => productApi.getCategories()
  })

  const categoriesData = data?.data.data

  const handleCategories = (id: string) => {
    navigate({
      pathname: '/',
      search: createSearchParams(
        pick(
          {
            ...useQueryParam,
            category: id
          },
          ['category']
        )
      ).toString()
    })
  }
  const handleDelete = () => {
    if (useQueryParam.sort_by === undefined) {
      navigate({
        pathname: '/',
        search: createSearchParams(
          omit(
            {
              ...useQueryParam,
              sort_by: 'sold'
            },
            ['rating_filter']
          )
        ).toString()
      })
    } else {
      navigate({
        pathname: '/',
        search: createSearchParams(
          omit(
            {
              ...useQueryParam
            },
            ['rating_filter']
          )
        ).toString()
      })
    }
  }

  return (
    <div className='bg-blackWhite hidden lg:block'>
      <Link to='/' className='flex items-center text-center '>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6  h-6 mr-1'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
          />
        </svg>
        <h2 className='font-bold'>{t('homeSidebar.AllCategories')}</h2>
      </Link>
      <ul className='mt-5'>
        {categoriesData?.map((category) => {
          return (
            <button
              className='flex items-center my-[8px] '
              key={category._id}
              onClick={() => handleCategories(category._id)}
            >
              {' '}
              {useQueryParam.category === category._id ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3 h-3  fill-orange mr-[5px]'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
                  />
                </svg>
              ) : (
                ''
              )}
              <Link
                to='/'
                className={classNames('', {
                  'text-orange': useQueryParam.category === category._id,
                  'text-black': useQueryParam.category !== category._id
                })}
              >
                {t(`category.${category.name}`)}
                
              </Link>
            </button>
          )
        })}
      </ul>
      <div className='w-full bg-DFDFDF h-[1px] my-[15px]'></div>
      <div className='flex items-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
          />
        </svg>

        <h2 className='font-bold text-sm ml-[5px]'>{t('homeSidebar.Filter')}</h2>
      </div>
      <p className='my-[15px]'> {t('homeSidebar.Pricerange')}</p>
      <form onSubmit={onSubmit}>
        <div className='flex items-center  w-full justify-between'>
          <Controller
            control={control}
            name='price_min'
            render={({ field: { value, ref, onChange } }) => (
              <InputNumber
                ref={ref}
                className='h-[40px]  text-xs pl-[5px] outline-none w-[70px] mr-5'
                placeholder='₫ TỪ'
                value={value as string}
                onChange={(e) => onChange(e, trigger('price_max'))}
              />
            )}
          />
          <Controller
            control={control}
            name='price_max'
            render={({ field: { value, ref, onChange } }) => (
              <InputNumber
                ref={ref}
                className='h-[40px]  text-xs pl-[5px] outline-none w-[70px] mr-5'
                placeholder='₫ Đến'
                value={value as string}
                onChange={(e) => onChange(e, trigger('price_min'))}
              />
            )}
          />
        </div>
        <small className='text-orange mt-[7px] mb-[15px]'>{errors?.price_max?.message}</small>
        <button className='w-full bg-orange py-2 text-white my-5'> {t('homeSidebar.Apply')}</button>
      </form>
      <div className='w-full bg-DFDFDF h-[1px] my-[15px]'></div>
      <div>
        <p className='my-5'>{t('homeSidebar.Evaluate')}</p>

        <StartProduct />
      </div>
      <div className='w-full bg-DFDFDF h-[1px] my-[15px]'></div>
      <button className='w-full bg-orange py-2 text-white my-6' onClick={handleDelete}>
        {t('homeSidebar.DeleteAll')}
      </button>
    </div>
  )
}
