import { useContext, useEffect, useState } from 'react'
import { VscAdd } from 'react-icons/vsc'
import Image from 'next/image'
import { Profile } from '@/types/profile'
import { ProfileContext } from '@/contexts/ProfileContext'
import { profiles as pf } from '@/utils/profiles'

export default function WhoIsWatching () {
  const { setProfile } = useContext(ProfileContext)
  const [profiles, setProfiles] = useState<Profile[]>([])

  useEffect(() => {
    setProfiles(pf)
  }, [])

  return (
    <div className='flex items-center flex-col h-full justify-center select-none'>
      <h1 className='text-3xl pb-4'>Who is watching now ?</h1>
      <div className='flex p-4 gap-4'>
        {profiles.map((profile, id) =>
          <ProfileCard
            key={id} profile={profile}
            onClick={() => setProfile(profile)}
          />
        )}
        {profiles.length < 5 &&
          <div className='flex items-center justify-center text-xl
            h-32 w-32 border-2 rounded cursor-pointer
            border-gray-500 text-gray-500
            hover:border-gray-50 hover:text-gray-50'
          >
            <VscAdd />
          </div>}
      </div>
    </div>
  )
}

interface ProfileCardProps { profile: Profile, onClick: () => void }
function ProfileCard ({ profile, onClick }: ProfileCardProps) {
  return (
    <div
      className='group relative cursor-pointer'
      onClick={() => onClick()}
    >
      <div className='h-32 w-32 rounded group-hover:border-4 border-gray-200 absolute' />
      <Image
        className='h-32 w-32 rounded'
        width={0} height={0} src={profile.img_url} alt={`${profile.name} profile`}
      />
      <h3 className='pt-1 text-center text-gray-400 group-hover:text-white'>{profile.name}</h3>
    </div>
  )
}
