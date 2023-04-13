import range from 'lodash/range'

type Props = {
  rating: number
}
export const ProductRating: React.FC<Props> = (Props) => {
  const { rating } = Props
  const handleRating = (index: number) => {
    if (index - rating <= 0) {
      return '100%'
    } else if (index - rating > 0 && index - rating < 1) {
      return (index - rating) * 100 + '%'
    }
    return '0%'
  }
  return (
    <div className='flex items-center text-center mr-[10px]'>
      {range(5).map((index: number) => {
        return (
          <div key={index} className='relative'>
            <div className='absolute top-0 left-0 h-full overflow-hidden'>
              <svg
                enableBackground='new 0 0 15 15'
                viewBox='0 0 15 15'
                x='0'
                y='0'
                className='h-full w-full  overflow-hidden  fill-yellow   '
              >
                <polygon
                  points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit='10'
                ></polygon>
              </svg>
            </div>
            <svg
              enableBackground='new 0 0 15 15'
              viewBox='0 0 15 15'
              x='0'
              y='0'
              className='lg:w-4 lg:h-4 h-3 w-3 fill-current text-gray-300'
            >
              <polygon
                points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit='10'
              ></polygon>
            </svg>
          </div>
        )
      })}
    </div>
  )
}
