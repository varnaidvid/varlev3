'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { Button } from './button'
import { X } from 'lucide-react'

interface ModalContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: any }) => {
  const [open, setOpen] = useState(false)

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

export function Modal({ children }: { children: any }) {
  return <ModalProvider>{children}</ModalProvider>
}

export const ModalTrigger = ({
  children,
  className,
  id
}: {
  children: any
  className?: string
  id?: string
}) => {
  const { setOpen } = useModal()
  return (
    <div id={id} className={cn('', className)} onClick={() => setOpen(true)}>
      {children}
    </div>
  )
}

export const ModalBody = ({
  children,
  className
}: {
  children: any
  className?: string
}) => {
  const { open } = useModal()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  const modalRef = useRef(null)
  const { setOpen } = useModal()
  useOutsideClick(modalRef, () => setOpen(false))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1,
            backdropFilter: 'blur(10px)'
          }}
          exit={{
            opacity: 0,
            backdropFilter: 'blur(0px)'
          }}
          className="fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full flex items-center justify-center z-50"
        >
          <Overlay />

          <motion.div
            ref={modalRef}
            className={cn(
              'min-h-[50%] max-h-[90%] min-w-[225px] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] mx-6 bg-white border border-transparent rounded-2xl relative z-50 flex flex-col flex-1 overflow-auto modal-lp',
              className
            )}
            initial={{
              opacity: 0,
              scale: 0.5,
              rotateX: 40,
              y: 40
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              rotateX: 10
            }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 15
            }}
          >
            <CloseIcon />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const ModalContent = ({
  children,
  className
}: {
  children: any
  className?: string
}) => {
  return <div className={cn('flex flex-col flex-1', className)}>{children}</div>
}

export const ModalFooter = ({
  children,
  className
}: {
  children: any
  className?: string
}) => {
  return (
    <div className={cn('flex justify-end p-4 border-t', className)}>
      {children}
    </div>
  )
}

const Overlay = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1,
        backdropFilter: 'blur(10px)'
      }}
      exit={{
        opacity: 0,
        backdropFilter: 'blur(0px)'
      }}
      className={`fixed inset-0 h-full w-full bg-black bg-opacity-50 z-50 ${className}`}
    ></motion.div>
  )
}

const CloseIcon = () => {
  const { setOpen } = useModal()
  return (
    <Button
      className="absolute top-4 right-6 text-neutral-700 group-hover:text-slate-800"
      variant={'outline'}
      size={'icon'}
      type="button"
      onClick={() => setOpen(false)}
    >
      <X className="" />
    </Button>
  )
}

// Hook to detect clicks outside of a component.
// Add it in a separate file, I've added here for simplicity
export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: Function
) => {
  useEffect(() => {
    const listener = (event: any) => {
      // DO NOTHING if the element being clicked is the target element or their children
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      callback(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, callback])
}
