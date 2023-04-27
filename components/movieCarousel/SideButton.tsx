import { RefObject } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface SideButtonProps {
  btnRef: RefObject<HTMLButtonElement>
  left?: boolean
  action: () => void
  hidden?: boolean
}

function SideButton ({ left, btnRef, action, hidden }:SideButtonProps) {
  return (
    <button
      ref={btnRef}
      onClick={action}
      className={`absolute flex justify-center items-center flex-grow-0
      ${left ? 'left-0 pr-1' : 'right-0 pl-1'} ${hidden ? 'hidden' : ''}
      w-[--horizontal-spacing] h-full py-1 z-10 text-3xl transition duration-500`}
    >
      {left
        ? <FiChevronLeft className='bg-zinc-900 h-full w-full bg-opacity-50 opacity-0 group-hover:opacity-100 rounded-r-sm' />
        : <FiChevronRight className='bg-zinc-900 h-full w-full bg-opacity-50 opacity-0 group-hover:opacity-100 rounded-l-sm' />}
    </button>
  )
}

export default SideButton
