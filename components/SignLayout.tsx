import Image from 'next/image'
import { PropsWithChildren } from 'react'

const LOGO = require('@/public/images/logo.png')

function SignLayout ({ children }: PropsWithChildren) {
  return (
    <div className='relative h-full bg-[url("../public/images/hero.jpg")] bg-no-repeat bg-cente bg-fixed bg-cover'>
      <div className='bg-black w-full h-full md:bg-opacity-50'>
        <div className='px-10 py-2 md:py-4 w-full md:px-12 flex items-center justify-start transition duration-500 bg-zinc-900 bg-opacity-90'>
          <Image width={0} height={24} src={LOGO} alt='logo' />
        </div>
        {children}
      </div>
    </div>
  )
}

export default SignLayout
