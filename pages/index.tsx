import { useRouter } from 'next/navigation'
import Link from 'next/link'
import SignLayout from '@/components/SignLayout'

export default function Home () {
  const router = useRouter()

  return (
    <SignLayout>
      <div className='flex justify-center'>
        <div className='bg-black bg-opacity-70 p-16 self-center w-full mt-2 md:max-w-md rounded'>
          <h2 className=' text-4xl mb-8 font-semibold'>Sign in</h2>
          <div className='flex flex-col gap-4'>
            <input name='email' type='email' placeholder='Email' className='p-3 rounded-md bg-neutral-600 ' />
            <input name='password' type='password' placeholder='Password' className='p-3 rounded-md bg-neutral-600 ' />
            <button
              className='bg-red-600 py-3  rounded-md w-full mt-5 hover:bg-red-700 transition'
              type='button' onClick={() => router.push('/browse')}
            >Sign in
            </button>
            <p className='text-neutral-500 self-center mt-2'>
              First time using Nextflix?
              <Link
                href='/sign-up'
                className='text-white ml-1 hover:underline cursor-pointer'
              >Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </SignLayout>
  )
}
