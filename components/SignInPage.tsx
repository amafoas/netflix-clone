import React, { useRef, useState } from 'react'
import { signIn } from '@/firebase/auth'
import Link from 'next/link'
import { signInSchema } from '@/utils/signValidation'
import SignLayout from '@/components/SignLayout'

import { ToastContainer, ToastOptions, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SubmitButton from './SubmitButton'

const toastConfig: ToastOptions = {
  position: 'top-center',
  autoClose: 800,
  hideProgressBar: true,
  closeButton: false,
  theme: 'dark',
  toastId: 'sign-in-toast-id'
}

export default function SignInPage () {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = {
      email: emailRef.current?.value ?? '',
      password: passwordRef.current?.value ?? ''
    }

    try {
      await signInSchema.validate(data)
      setIsSubmitting(true)
      const { error } = await signIn(data.email, data.password)

      if (error) {
        console.log(error.code)
        toast.error(error.message, toastConfig)
      }
      setIsSubmitting(false)
    } catch (err: any) {
      toast.error(err.errors[0], toastConfig)
    }
  }

  return (
    <SignLayout>
      <div className='flex justify-center'>
        <div className='bg-black bg-opacity-70 p-16 self-center w-full mt-2 md:max-w-md rounded'>
          <h2 className=' text-4xl mb-8 font-semibold'>Sign in</h2>
          <form className='flex flex-col gap-4'>
            <input
              ref={emailRef}
              name='email' type='email' placeholder='Email'
              className='p-3 rounded-md bg-neutral-600 '
            />
            <input
              ref={passwordRef}
              name='password' type='password' placeholder='Password'
              className='p-3 rounded-md bg-neutral-600 '
            />
            <SubmitButton
              text='Sign in'
              onClick={handleSignIn}
              isSubmitting={isSubmitting}
            />
            <p className='text-neutral-500 self-center mt-2'>
              First time using Nextflix?
              <Link
                href='/sign-up'
                className='text-white ml-1 hover:underline cursor-pointer'
              >Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </SignLayout>
  )
}
