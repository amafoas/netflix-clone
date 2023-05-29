import { ProfileData } from '@/types/profile'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'

export async function addProfileToUser (user_uid: string, profile_data: ProfileData) {
  try {
    const userDocRef = doc(db, 'user_profiles', user_uid)
    const docSnap = await getDoc(userDocRef)

    if (docSnap.exists() && docSnap.data().profiles) {
      const profilesData = docSnap.data().profiles

      const id = Object.keys(profilesData).length
      await updateDoc(userDocRef, {
        profiles: {
          ...profilesData,
          [id]: { ...profile_data, id }
        }
      })
    } else {
      await setDoc(userDocRef, {
        profiles: {
          0: { ...profile_data, id: 0 }
        }
      })
    }
  } catch (error) {
    return error
  }
}

export async function getProfilesFromUser (user_uid: string) {
  try {
    const userDocRef = doc(db, 'user_profiles', user_uid)
    const docSnap = await getDoc(userDocRef)

    if (docSnap.exists()) {
      const userProfiles = docSnap.data().profiles

      return Object.values(userProfiles)
    }
  } catch (error) {
    console.log('Error obteniendo los perfiles:', error)
    return []
  }
}
