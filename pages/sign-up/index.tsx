import React, { useRef } from 'react'
import SignLayout from '@/components/SignLayout'
import { signUp } from '@/firebase/auth'
import { signUpSchema } from '@/utils/signValidation'

import { ToastContainer, ToastOptions, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

const toastConfig: ToastOptions = {
  position: 'top-center',
  autoClose: 800,
  hideProgressBar: true,
  closeButton: false,
  theme: 'dark',
  toastId: 'sign-in-toast-id'
}

export default function SignUp () {
  const router = useRouter()
  const emailRef = useRef<HTMLInputElement>(null)
  const confirmEmailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  const handleSignUp = async (e:React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data = {
      email: emailRef.current?.value ?? '',
      confirmEmail: confirmEmailRef.current?.value,
      password: passwordRef.current?.value ?? '',
      confirmPassword: confirmPasswordRef.current?.value
    }

    try {
      await signUpSchema.validate(data)
      const { error } = await signUp(data.email, data.password)

      if (error) {
        console.log(error.code)
        toast.error(error.message, toastConfig)
      } else {
        router.replace('/browse')
      }
    } catch (err: any) {
      toast.error(err.errors[0], toastConfig)
    }
  }

  return (
    <SignLayout>
      <div className='flex justify-center'>
        <div className='bg-black bg-opacity-70 p-16 self-center w-full mt-2 md:max-w-md rounded'>
          <h2 className=' text-4xl mb-8 font-semibold'>Sign up</h2>
          <form className='flex flex-col gap-4'>
            <input
              ref={emailRef}
              name='email' type='email' placeholder='Email'
              className='p-3 rounded-md bg-neutral-600 '
            />
            <input
              ref={confirmEmailRef}
              name='email' type='email' placeholder='Confirm email'
              className='p-3 rounded-md bg-neutral-600 '
            />
            <input
              ref={passwordRef}
              name='password' type='password' placeholder='Password'
              className='p-3 rounded-md bg-neutral-600 '
            />
            <input
              ref={confirmPasswordRef}
              name='password' type='password' placeholder='Confirm password'
              className='p-3 rounded-md bg-neutral-600 '
            />
            <button
              className='bg-red-600 py-3  rounded-md w-full mt-5 hover:bg-red-700 transition'
              type='button' onClick={handleSignUp}
            >Sign up
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </SignLayout>
  )
}
