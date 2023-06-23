import React from 'react'
interface Prop {
  children: React.ReactNode
  isLoading?: boolean
  disabled?: boolean
  className?: string
  type?: string
}
export const Button = ({ children, isLoading, disabled, className, type, ...rest }: Prop) => {
  const newClassName = disabled ? className + 'cursor-not-allowed' : className
  return (
    <button className={newClassName} {...rest} type='submit'>
      {isLoading && (
        <div
          className='inline-block h-5 w-5 mr-[10px] animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
          role='status'
        ></div>
      )}
      <span>{children}</span>
    </button>
  )
}
