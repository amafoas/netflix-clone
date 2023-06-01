import { AuthContext } from '@/contexts/AuthContext'
import { UserDataContext } from '@/contexts/UserDataContext'
import { getProfilesFromUser, updateProfileFromUser } from '@/services/firebase/profileActions'
import { Profile } from '@/types/profile'
import React, { Dispatch, SetStateAction, useContext, useRef, useState } from 'react'

import { ToastContainer, ToastOptions, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SubmitButton from '../common/SubmitButton'
import { avatars } from '@/utils/avatars'
import Image from 'next/image'
import { profileSchema } from '@/schemas/profileSchema'

const toastConfig: ToastOptions = {
  position: 'top-center',
  autoClose: 800,
  hideProgressBar: true,
  closeButton: false,
  theme: 'dark',
  toastId: 'edit-profile-toast-id'
}

type ModalProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  profile: Profile
}

const EditModal = ({ isOpen, setIsOpen, profile }: ModalProps) => {
  const { setUserData } = useContext(UserDataContext)
  const user = useContext(AuthContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const [avatar, setAvatar] = useState<string>(avatars[0].img_url)

  const handleEdit = async (event: React.FormEvent) => {
    event.preventDefault()

    const data = {
      name: nameRef.current?.value ?? '',
      img_url: avatar
    }

    if (!user) return
    try {
      await profileSchema.validate(data)
      setIsSubmitting(true)
      updateProfileFromUser(user.uid, profile.id, data)
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
    <>
      <ToastContainer />
      <div
        className='z-50 fixed w-full h-full backdrop-blur-md flex items-center justify-center select-none'
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setIsOpen(false)
          }
        }}
      >
        <div className='bg-zinc-800 bg-opacity-70 backdrop-blur-md rounded p-8 border border-zinc-600'>
          <h2 className='text-2xl font-bold mb-2 text-center'>Editing {profile.name} profile</h2>
          <form>
            <input
              type='text' id='name' ref={nameRef}
              className='p-3 rounded-md bg-neutral-600 w-full mb-5'
              placeholder='New profile name'
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
              text='Edit'
              isSubmitting={isSubmitting}
              onClick={handleEdit}
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default EditModal
