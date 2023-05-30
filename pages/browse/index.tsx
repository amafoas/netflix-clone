import React, { useContext } from 'react'
import { firstRequests } from '@/services/tmdb'
import { Movie } from '@/types/movie'
import WhoIsWatching from '@/components/browse/WhoIsWatching'
import BrowseMain from '@/components/browse/BrowseMain'
import { UserDataContext } from '@/contexts/UserDataContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import { getProfile } from '@/utils/utils'

interface Responses {[key: string]: Movie[]}
interface Props{responses: Responses }

export default function Browse ({ responses }:Props) {
  const { userData } = useContext(UserDataContext)

  return (
    <ProtectedRoute>
      {getProfile(userData.currentProfileId, userData.profiles)
        ? <BrowseMain responses={responses} />
        : <WhoIsWatching />}
    </ProtectedRoute>
  )
}

export async function getServerSideProps () {
  const responses: Responses = {}

  await Promise.all(
    Object.keys(firstRequests).map(async (key) => {
      const url = firstRequests[key]
      const res = await fetch(url)
      const data = await res.json()

      responses[key] = data.results
    })
  )

  return {
    props: { responses }
  }
}
