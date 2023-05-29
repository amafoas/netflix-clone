import { useContext, useEffect } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import SignInPage from '@/components/SignInPage'
import { useRouter } from 'next/navigation'

export default function Home () {
  const user = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (user) router.replace('/browse')
  }, [user, router])

  if (user) return null

  return <SignInPage />
}
