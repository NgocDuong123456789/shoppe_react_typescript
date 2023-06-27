import omit from 'lodash/omit'
import { useNavigate, createSearchParams } from 'react-router-dom'
import classNames from 'classnames'
import { useTranslation } from "react-i18next";

import { QueryParams } from '../../../Hook/QueryParams'
import { orderSort, sortBy } from '../../../Components/Contants/contant'

export const SortProduct = () => {
const {t} = useTranslation()
  const { view, sold = 'sold', price } = sortBy
  const searchQueryParam = QueryParams()
  const {  order } = searchQueryParam

  const navigate = useNavigate()

  const handleClick = (order: string) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        ...searchQueryParam,
        order: order,
        sort_by: 'price'
      }).toString()
    })
  }

  const handleSortByPrice = (sortBy: string) => {
    navigate({
      pathname: '/',
      search: createSearchParams(
        omit(
          {
            ...searchQueryParam,
            sort_by: sortBy
          },
          ['order','name']
        )
      ).toString()
    })
  }
  return (
    <div className='items-center h-[60px] w-full bg-DFDFDF hidden lg:flex'>
  
      <div className='mx-[15px]'>{t('homeSidebar.Sortby')}</div>
      <button
        className={classNames('py-[6px] px-[9px]  text-black mx-[10px] text-sm', {
          'bg-orange text-white': searchQueryParam.sort_by === sold,
          'bg-white text-black': searchQueryParam.sort_by !== sold
        })}
        onClick={() => handleSortByPrice(sold)}
      >
        {t('homeSidebar.Latest')}
      </button>
      <button
        className={classNames('py-[6px] px-[9px]  text-black mx-[10px] text-sm', {
          'bg-orange text-white': searchQueryParam.sort_by === view,
          'bg-white text-black': searchQueryParam.sort_by !== view
        })}
        onClick={() => handleSortByPrice(view)}
      >
        {t('homeSidebar.Popular')}
      </button>
      <button
        className={classNames('py-[6px] px-[9px]  text-black mx-[10px] text-sm', {
          'bg-orange text-white': searchQueryParam.sort_by === price,
          'bg-white text-black': searchQueryParam.sort_by !== price
        })}
        onClick={() => handleSortByPrice(price)}
      >
        {t('homeSidebar.TopSales')}
      </button>
      <select
        className='outline-none px-[9px] py-[9px] flex justify-between cursor-pointer text-sm'
        defaultValue={order || ''}
        onChange={(e) => handleClick(e.target.value)}
      >
        <option  disabled  value=''>
        {t('homeSidebar.Price')}
        </option>

        <option value={orderSort.asc} className='outline-none cursor-pointer text-sm'>
          Giá:Từ Thấp đến Cao
        </option>
        <option value={orderSort.desc} className='outline-none cursor-pointer text-sm'>
          Giá:Từ Cao đến Thấp
        </option>
      </select>
    </div>
  )
}
