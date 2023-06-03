// import { useContext } from 'react'
import { BsPlayFill, BsPlus, BsHandThumbsUp } from 'react-icons/bs'
import { getProfilesFromUser, updateProfileBookmarksFromUser } from '@/services/firebase/profileActions'
import { useContext, useEffect, useRef, useState } from 'react'
import { UserDataContext } from '@/contexts/UserDataContext'
import { AuthContext } from '@/contexts/AuthContext'
import { getProfile, toggleValueInArray } from '@/utils/utils'
import { Profile } from '@/types/profile'

interface Props {
  actionID: number
}
function ActionButtonGroup ({ actionID }: Props) {
  const user = useContext(AuthContext)
  const { userData, setUserData } = useContext(UserDataContext)
  const [saving, setSaving] = useState(false)
  const profileRef = useRef<Profile | null>(null)

  useEffect(() => {
    profileRef.current = getProfile(userData.currentProfileId, userData.profiles)
  }, [userData])

  const handleSave = () => {
    if (saving) return
    if (!user || !profileRef.current) return

    const newBookmarks = profileRef.current.bookmarks ?? []
    toggleValueInArray(newBookmarks, actionID)

    try {
      setSaving(true)
      updateProfileBookmarksFromUser(user.uid, userData.currentProfileId, newBookmarks)
        .then(() => {
          getProfilesFromUser(user.uid)
            .then(profiles => {
              setUserData(prev => ({
                currentProfileId: prev.currentProfileId,
                profiles: profiles as Profile[] || []
              }))
            }).finally(() => {
              setSaving(false)
            })
        }).catch(e => {
          console.log('catch error: ', e)
        })
    } catch (err: any) {
      console.log(err.errors[0])
    }
  }

  return (
    <div className='flex gap-2 mb-4'>
      <div className='flex items-center justify-center
      bg-slate-100 rounded-full w-8 h-8
        hover:bg-opacity-80 transition cursor-pointer'
      >
        <BsPlayFill className='text-2xl text-black' />
      </div>
      <div
        className={`flex items-center justify-center
        border-2 border-slate-100 rounded-full w-8 h-8
        border-opacity-50 hover:border-opacity-100 transition cursor-pointer
        ${profileRef.current?.bookmarks?.includes(actionID) ? 'border-opacity-100 bg-slate-100 text-black' : ''}`}
        onClick={handleSave}
      >
        <BsPlus className='text-2xl' />
      </div>
      <div className='flex items-center justify-center
        border-2 border-slate-100 rounded-full w-8 h-8
        border-opacity-50 hover:border-opacity-90 transition cursor-pointer'
      >
        <BsHandThumbsUp />
      </div>
    </div>
  )
}

export default ActionButtonGroup
