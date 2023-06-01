import React, { Dispatch, SetStateAction, useContext, useRef, useState } from 'react'
import Image from 'next/image'
import { avatars } from '@/utils/avatars'
import { profileSchema } from '@/schemas/profileSchema'
import { AuthContext } from '@/contexts/AuthContext'
import {
  addProfileToUser,
  getProfilesFromUser
} from '@/services/firebase/profileActions'
import { UserDataContext } from '@/contexts/UserDataContext'
import { Profile } from '@/types/profile'

import { ToastContainer, ToastOptions, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SubmitButton from '../common/SubmitButton'

const toastConfig: ToastOptions = {
  position: 'top-center',
  autoClose: 800,
  hideProgressBar: true,
  closeButton: false,
  theme: 'dark',
  toastId: 'new-profile-toast-id'
}

type ModalProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}
const NewProfileModal = ({ isOpen, setIsOpen }: ModalProps) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const [avatar, setAvatar] = useState<string>(avatars[0].img_url)
  const user = useContext(AuthContext)
  const { setUserData } = useContext(UserDataContext)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const data = {
      name: nameRef.current?.value ?? '',
      img_url: avatar
    }

    if (!user) return
    try {
      await profileSchema.validate(data)
      setIsSubmitting(true)
      addProfileToUser(user.uid, data)
        .then(() => {
          getProfilesFromUser(user.uid)
            .then(profiles => {
              setUserData(prev => ({
                currentProfileId: prev.currentProfileId,
                profiles: profiles as Profile[] || []
              }))
            }).finally(() => {
              setIsOpen(false)
              setIsSubmitting(false)
            })
        }).catch((e) => {
          console.log('catch error: ', e)
        })
    } catch (err: any) {
      toast.error(err.errors[0], toastConfig)
    }
  }

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
      <div className='bg-zinc-800 bg-opacity-70 backdrop-blur-md rounded p-8 border border-zinc-600'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Create new profile</h2>
        <form>
          <input
            type='text' id='name' ref={nameRef}
            className='p-3 mb-5 rounded-md bg-neutral-600 w-full'
            placeholder='Profile name'
          />
          <div className='mb-5'>
            <label className='block mb-2 font-medium'>Select avatar:</label>
            <div className='grid grid-cols-4 gap-2'>
              {avatars.map(({ name, img_url }) =>
                <Image
                  key={name} width={0} height={0}
                  src={img_url} alt={`avatar ${name}`}
                  className={`${avatar === img_url ? 'border-2' : ''}
                  w-20 h-20 rounded cursor-pointer hover:opacity-80`}
                  onClick={() => setAvatar(img_url)}
                />
              )}
            </div>
          </div>
          <SubmitButton
            text='Submit'
            isSubmitting={isSubmitting}
            onClick={handleSubmit}
          />
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default NewProfileModal
