import { useState, createContext, ReactNode, Dispatch, SetStateAction } from 'react'
import { Profile } from '@/types/profile'

interface ContextType {
  profile: Profile | null
  setProfile: Dispatch<SetStateAction<Profile | null>>
}
const ProfileContext = createContext<ContextType>({
  profile: null,
  setProfile: () => {}
})

interface ProfileProviderProps { children: ReactNode }
function ProfileProvider ({ children }:ProfileProviderProps) {
  const [profile, setProfile] = useState<Profile | null>(null)
  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export {
  ProfileContext,
  ProfileProvider
}
