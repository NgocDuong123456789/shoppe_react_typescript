import range from 'lodash/range'
import omit from 'lodash/omit'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next";

import { QueryParams } from '../../Hook/QueryParams'

export const StartProduct = () => {
  const {t}= useTranslation()
  const searchQueryParam = QueryParams()

  const navigate = useNavigate()
  const handleRatingStart = (rating: number) => {
    navigate({
      pathname: '/',
      search: createSearchParams(
        omit(
          {
            ...searchQueryParam,
            rating_filter: String(rating)
          },
          ['sort_by','name']
        )
      ).toString()
    })
  }
  return (
    <div className=''>
      {range(5).map((index: number) => {
        return (
          <div key={index}>
            <div className='flex items-center '>
              {range(5).map((indexStart: number) => {
                return (
                  <button
                    key={indexStart}
                    className='mx-[1px] my-[10px] cursor-pointer'
                    onClick={() => handleRatingStart(5 - index)}
                  >
                    <div className='relative'>
                      <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x='0' y='0' className=' lg:w-4 lg:h-4  h-3 w-3'>
                        <polygon
                          points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeMiterlimit='10'
                        ></polygon>
                      </svg>
                      {indexStart < 5 - index && (
                        <svg
                          enableBackground='new 0 0 15 15'
                          viewBox='0 0 15 15'
                          x='0'
                          y='0'
                          className='md:h-3 lg:h-4 fill-orange absolute top-0 left-0'
                        >
                          <polygon
                            points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeMiterlimit='10'
                          ></polygon>
                        </svg>
                      )}
                    </div>
                  </button>
                )
              })}
              <p>{t("homeSidebar.Up")}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
