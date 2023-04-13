import { useState, useRef, useId } from 'react'
import { motion } from 'framer-motion'
import { IoMdArrowDropup } from 'react-icons/io'

import {
  useFloating,
  autoUpdate,
  offset,
 
  arrow,
  FloatingPortal
} from '@floating-ui/react'

interface Props {
  children: React.ReactNode
  RenderProp: React.ReactNode
}

export const Tooltip = ({ children, RenderProp }: Props) => {
  const arrowRef = useRef(null)

  const id = useId()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { x, y, strategy, refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(5),
   
      arrow({
        element: arrowRef
      })
    ],
    whileElementsMounted: autoUpdate
  })
  const showPopover = () => {
    setIsOpen(true)
  }
  const hidePopover = () => {
    setIsOpen(false)
  }

  return (
    <div className='lg:relative'>
      <div ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
        {children}
        <FloatingPortal id={id}>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
              className='text-black'
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content'
              }}
            >
              {RenderProp}
              <IoMdArrowDropup
                className='text-white lg:absolute lg:top-[-30px] lg:left-[50%] lg:translate-x-001 lg:block hidden'
                style={{ fontSize: 50 }}
              />
            </motion.div>
          )}
        </FloatingPortal>
      </div>
    </div>
  )
}
