import Link from 'next/link'
import { VscArrowLeft } from 'react-icons/vsc'

function NotImplemented () {
  return (
    <div className='h-full w-full flex justify-center items-center flex-col'>
      <h1 className='text-3xl text-center pb-24'>
        Ooops!<br /> It seems that it's not implemented.
      </h1>
      <Link
        href='/browse'
        className='flex items-center gap-1 group
        bold mt-20 text-xl text-red-500 border py-1 px-3 border-red-500
        transition hover:text-red-300 hover:border-red-300'
      >
        <VscArrowLeft className='group-hover:scale-125 transition' />
        Go back
      </Link>
    </div>
  )
}

export default NotImplemented
