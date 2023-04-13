import { createSearchParams, Link } from 'react-router-dom'
import classNames from 'classnames'
import range from 'lodash/range'

import { QueryConfigs } from '../../Types/Generality.type'
import { Paginations } from '../../Types/Generality.type'
import { QueryParams } from '../../Hook/QueryParams'

interface PropsPagination {
  QueryParam: QueryConfigs
  pagination: Paginations
}

const RANGE = 2

export const Pagination = ({ QueryParam, pagination }: PropsPagination) => {
  const pageIndex = Number(QueryParams().page)

  let isShow = true
  let isShow2 = true
  const rangePagination = () => {
    const BeforeRender = () => {
      if (isShow) {
        isShow = false
        return <button>...</button>
      }
      return false
    }
    const rangePaginationAfter = () => {
      if (isShow2) {
        isShow2 = false
        return <button>...</button>
      }
      return false
    }

    return range(pagination?.page_size).map((page) => {
      const pageNumber = page + 1
      if (
        pageIndex <= RANGE * 2 + 1 &&
        pageNumber > pageIndex + RANGE &&
        pageNumber < pagination.page_size - RANGE + 1
      ) {
        return <div key={page}>{BeforeRender()}</div>
      } else if (pageIndex > RANGE * 2 + 1 && pageIndex < pagination.page_size - RANGE * 2) {
        if (pageNumber < pageIndex - RANGE && pageNumber > RANGE) {
          return <div key={page}>{BeforeRender()}</div>
        } else if (pageNumber > pageIndex + RANGE && pageNumber < pagination.page_size - RANGE + 1) {
          return <div key={page}>{rangePaginationAfter()}</div>
        }
      } else if (pageIndex > pagination.page_size - RANGE * 2 - 1) {
        if (pageNumber < pageIndex - RANGE && pageNumber > RANGE) {
          return <div key={page}>{rangePaginationAfter()}</div>
        }
      }
      return (
        <Link
          key={page}
          to={{
            pathname: '/',
            search: createSearchParams({
              ...QueryParam,
              page: String(pageNumber)
            }).toString()
          }}
          className={classNames('mx-7 lg:text-xl  hover:text-orange', {
            'text-white  bg-orange lg:px-6 lg:py-2 px-4 py-1': pageIndex === pageNumber,
            'text-black  ': pageIndex !== pageNumber
          })}
        >
          {pageNumber}
        </Link>
      )
    })
  }

  return (
    <div className='lg:my-10 my-4  flex items-center cursor-pointer'>
      <Link
        to={{
          pathname: '/',
          search: createSearchParams({
            ...QueryParam,
            page: String(pageIndex > 1 ? pageIndex - 1 : 1)
          }).toString()
        }}
        className=''
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='lg:w-7 lg:h-7 w-5 h-5 lg:mx-7 '
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
        </svg>
      </Link>
      {rangePagination()}

      <Link
        to={{
          pathname: '/',
          search: createSearchParams({
            ...QueryParam,
            page: String(pageIndex < pagination?.page_size ? pageIndex + 1 : pagination?.page_size)
          }).toString()
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='lg:w-7 lg:h-7 w-5 h-5 lg:mx-7'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
        </svg>
      </Link>
    </div>
  )
}
