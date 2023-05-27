import Link from 'next/link'

function NotImplemented () {
  return (
    <div className='h-full w-full flex justify-center items-center flex-col'>
      <h1 className='text-3xl text-center pb-24'>
        Ooops!<br /> It seems that it's not implemented.
      </h1>
      <Link
        href='/browse'
        className='underline text-xl text-red-500 hover:text-red-300 transition'
      >
        Go back
      </Link>
    </div>
  )
}

export default NotImplemented
