import { useState, createContext, ReactNode, Dispatch, SetStateAction, useEffect } from 'react'
import { Profile } from '@/types/profile'
import { auth } from '@/services/firebase/firebase'
import { getProfilesFromUser } from '@/services/firebase/profileActions'

type UserData = {
  currentProfileId: number
  profiles: Profile[]
}

const emptyUserData: UserData = {
  currentProfileId: -1,
  profiles: []
}

type ContextType = {
  userData: UserData
  setUserData: Dispatch<SetStateAction<UserData>>
}
const UserDataContext = createContext<ContextType>({
  userData: emptyUserData,
  setUserData: () => {}
})

function UserDataProvider ({ children }:{ children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>(emptyUserData)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getProfilesFromUser(user.uid)
          .then(profiles => {
            setUserData(prev => ({
              currentProfileId: prev.currentProfileId,
              profiles: profiles as Profile[] || []
            }))
          })
      }
    })
    return () => unsubscribe()
  }, [])

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  )
}

export {
  UserDataContext,
  UserDataProvider
}
