import React, { Dispatch, SetStateAction, useContext, useRef, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { UserDataContext } from '@/contexts/UserDataContext'

import { Profile } from '@/types/profile'
import { getProfilesFromUser, deleteProfileFromUser } from '@/services/firebase/profileActions'
import SubmitButton from '../common/SubmitButton'
import ModalLayout, { showModalToast } from './ModalLayout'

type ModalProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  profile: Profile
}
const DeleteModal = ({ isOpen, setIsOpen, profile }: ModalProps) => {
  const { setUserData } = useContext(UserDataContext)
  const user = useContext(AuthContext)
  const nameRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDelete = async (event: React.FormEvent) => {
    event.preventDefault()

    if (nameRef.current?.value === profile.name) {
      if (!user) return
      setIsSubmitting(true)
      deleteProfileFromUser(user.uid, profile.id)
        .then(() => {
          getProfilesFromUser(user.uid)
            .then(profiles => {
              setUserData(prev => ({
                currentProfileId: prev.currentProfileId,
                profiles: profiles as Profile[] || []
              }))
            }).catch((e) => {
              console.log(e)
            }).finally(() => {
              setIsSubmitting(false)
              setIsOpen(false)
            })
        })
    } else {
      showModalToast('Names have to be the same to delete')
    }
  }

  return (
    <ModalLayout isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className='bg-zinc-800 bg-opacity-70 backdrop-blur-md rounded p-8 border border-zinc-600'>
        <h2 className='text-2xl font-bold mb-2 text-center'>Delete a profile</h2>
        <form>
          <div className='mb-5'>
            <small>To delete your profile type his name:</small>
            <p className='pb-4'>{profile.name}</p>
            <input
              type='text' ref={nameRef}
              className='p-3 rounded-md bg-neutral-600 w-full'
              placeholder='Profile name'
            />
          </div>
          <div className='flex space-x-2'>
            <SubmitButton
              text='Delete'
              isSubmitting={isSubmitting}
              onClick={handleDelete}
            />
          </div>
        </form>
      </div>
    </ModalLayout>
  )
}

export default DeleteModal
