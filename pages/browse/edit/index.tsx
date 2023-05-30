import { useContext, useState } from 'react'
import { VscAdd, VscClose } from 'react-icons/vsc'
import Image from 'next/image'
import { UserDataContext } from '@/contexts/UserDataContext'
import Link from 'next/link'
import DeleteModal from '@/components/modals/DeleteModal'
import { Profile } from '@/types/profile'
import NewProfileModal from '@/components/modals/NewProfileModal'

export default function Edit () {
  const { userData } = useContext(UserDataContext)
  const [newProfileModal, setNewProfileModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState<Profile>({ id: -1, name: '', img_url: '' })

  return (
    <>
      <DeleteModal
        isOpen={openDeleteModal}
        setIsOpen={setOpenDeleteModal}
        profile={selectedProfile}
      />
      <NewProfileModal
        isOpen={newProfileModal}
        setIsOpen={setNewProfileModal}
      />
      <div className='flex items-center flex-col h-full justify-center select-none'>
        <div className='flex p-4 gap-4'>
          {userData?.profiles.map((profile) =>
            <div
              key={profile.id}
              className='relative group'
            >
              <VscClose
                className='h-10 w-10 absolute z-10 -right-1 -top-1
                hover:scale-125 transition cursor-pointer'
                onClick={() => {
                  setSelectedProfile(profile)
                  setOpenDeleteModal(true)
                }}
              />
              <Image
                className='h-32 w-32 rounded'
                width={0} height={0} src={profile.img_url} alt={`${profile.name} profile`}
              />
              <h3 className='pt-1 text-center text-gray-400 group-hover:text-white'>{profile.name}</h3>
            </div>
          )}
          {userData.profiles.length < 5 &&
            <div
              className='flex items-center justify-center text-xl
                h-32 w-32 border-2 rounded cursor-pointer
              border-gray-500 text-gray-500
              hover:border-gray-50 hover:text-gray-50'
              onClick={() => setNewProfileModal(true)}
            >
              <VscAdd />
            </div>}
        </div>
        <Link
          href='/browse'
          className='hover:underline bold mt-20 text-xl text-red-500 hover:text-red-300 transition'
        >
          Go back
        </Link>
      </div>
    </>
  )
}
