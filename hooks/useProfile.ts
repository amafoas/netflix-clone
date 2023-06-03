import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { UserDataContext } from '@/contexts/UserDataContext'
import {
  removeLikeFromProfile, addLikeToProfile,
  removeBookmarkFromProfile, addBookmarkToProfile,
  getProfilesFromUser
} from '@/services/firebase/profileActions'
import { Profile } from '@/types/profile'

function useProfile () {
  const user = useContext(AuthContext)
  const { userData, setUserData } = useContext(UserDataContext)

  const profile = (): Profile | null => {
    if (!user) return null
    const foundProfile = userData.profiles.find(profile => profile.id === userData.currentProfileId)
    return foundProfile || null
  }

  const toggleBookmark = async (movie_id: number) => {
    const currentProfile = profile()
    if (!user || !currentProfile) return
    try {
      if (currentProfile.bookmarks?.includes(movie_id)) {
        await removeBookmarkFromProfile(user.uid, currentProfile.id, movie_id)
      } else {
        await addBookmarkToProfile(user.uid, currentProfile.id, movie_id)
      }
      const profiles = await getProfilesFromUser(user.uid)
      setUserData(prev => ({
        ...prev, profiles: profiles as Profile[] || []
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const toggleLike = async (movie_id: number) => {
    const currentProfile = profile()
    if (!user || !currentProfile) return
    try {
      if (currentProfile.likes?.includes(movie_id)) {
        await removeLikeFromProfile(user.uid, currentProfile.id, movie_id)
      } else {
        await addLikeToProfile(user.uid, currentProfile.id, movie_id)
      }
      const profiles = await getProfilesFromUser(user.uid)
      setUserData(prev => ({
        ...prev, profiles: profiles as Profile[] || []
      }))
    } catch (error) {
      console.log(error)
    }
  }

  return {
    profile,
    toggleBookmark,
    toggleLike
  }
}

export default useProfile
