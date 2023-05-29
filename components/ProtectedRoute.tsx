import React, { ReactNode, useContext, useEffect } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

function ProtectedRoute ({ children }: {children: ReactNode}) {
  const user = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.replace('/')
    }
  }, [user, router])

  if (!user) return null

  return <>{children}</>
}

export default ProtectedRoute
