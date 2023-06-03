import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { ToastContainer, ToastOptions, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const toastConfig: ToastOptions = {
  position: 'top-center',
  autoClose: 800,
  hideProgressBar: true,
  closeButton: false,
  theme: 'dark',
  toastId: 'modal-toast'
}

type Props = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}
function ModalLayout ({ isOpen, setIsOpen, children }: Props) {
  if (!isOpen) return null
  return (
    <div
      className='z-50 fixed w-full h-full backdrop-blur-md flex items-center justify-center select-none'
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          setIsOpen(false)
        }
      }}
    >
      <ToastContainer />
      {children}
    </div>
  )
}

export default ModalLayout

export function showModalToast (message:string) {
  toast.error(message, toastConfig)
}
