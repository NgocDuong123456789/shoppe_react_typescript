import { InputHTMLAttributes } from 'react'

interface PropsQuantity extends InputHTMLAttributes<HTMLElement> {
  max?: number
  value: number | string
  className: string
  onType: (value: number | string) => void
  onIncrease: (value: number) => void
  onDecrease: (value: number) => void
}
export const QuantityProduct = ({ className, max, value, onType, onIncrease, onDecrease, ...rest }: PropsQuantity) => {

  const Incrase = () => {
    let _value = Number(value) + 1
    if (Number(_value) >= Number(max)) return (_value = Number(max))
    onIncrease && onIncrease(_value)
  }

  const Reduce = () => {
    let _value = Number(value) - 1
    if (Number(_value) < 1) return (_value = 1)
    onDecrease && onDecrease(_value)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberValue = e.target.value
    if (/^\d*$/.test(numberValue) || numberValue === '') {
      onType && onType(e.target.value)
    }
  }

  return (
    <div>
      <div className='flex'>
        <div className='flex items-center mx-4'>
          <div className='flex items-center w-full'>
            <button className='border border-FFCD95 lg:px-3  px-2 lg:h-8 h-7' onClick={Reduce}>
              <svg enableBackground='new 0 0 10 10' viewBox='0 0 10 10' x='0' y='0' className='lg:w-3 lg:h-3 w-2 h-2'>
                <polygon points='4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5'></polygon>
              </svg>
            </button>
            <input type='text' className={className} value={value} {...rest} onChange={(e) => handleChange(e)} />
            <button className='border border-FFCD95  lg:px-3  px-2 lg:h-8 h-7' onClick={Incrase}>
              <svg enableBackground='new 0 0 10 10' viewBox='0 0 10 10' x='0' y='0' className='lg:h-3lg:w-3 w-2 h-2'>
                <polygon points='10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5'></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
