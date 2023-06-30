import { InputHTMLAttributes, forwardRef } from 'react'
export interface InputNumber extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  value: string
}

export const InputNumber = forwardRef<HTMLInputElement, InputNumber>(function InputRef(
  { className, value, onChange, ...rest },
  ref
) {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberValue = e.target.value
    if (/^\d+$/.test(numberValue) || numberValue === '') {
      onChange && onChange(e)
    }
  }
  return (
    <div>
      <input ref={ref} value={value} className={className} {...rest} onChange={(e) => handleOnChange(e)} />
    </div>
  )
})
