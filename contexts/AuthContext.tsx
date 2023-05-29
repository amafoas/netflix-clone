import { auth } from '@/firebase/firebase'
import { User } from 'firebase/auth'
import { ReactNode, createContext, useEffect, useState } from 'react'

const AuthContext = createContext<User | null >(null)

function AuthProvider ({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ?? null)
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthProvider
}
