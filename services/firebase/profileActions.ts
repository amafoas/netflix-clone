import { ProfileData } from '@/types/profile'
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'

export async function addProfileToUser (user_uid: string, profile_data: ProfileData) {
  try {
    const userDocRef = doc(db, 'user_profiles', user_uid)
    const docSnap = await getDoc(userDocRef)
    const newProfileRef = await addDoc(collection(db, 'user_profiles', user_uid, 'profiles'), profile_data)

    if (docSnap.exists() && docSnap.data().profiles) {
      const profilesData = docSnap.data().profiles

      await updateDoc(userDocRef, {
        profiles: {
          ...profilesData,
          [newProfileRef.id]: { ...profile_data, id: newProfileRef.id }
        }
      })
    } else {
      await setDoc(userDocRef, {
        profiles: {
          [newProfileRef.id]: { ...profile_data, id: newProfileRef.id }
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

export async function deleteProfileFromUser (user_uid: string, profile_id: number): Promise<void> {
  try {
    const userDocRef = doc(db, 'user_profiles', user_uid)
    const docSnap = await getDoc(userDocRef)

    if (docSnap.exists()) {
      const fieldObject = docSnap.get('profiles')
      const updatedFieldObject = { ...fieldObject }

      for (const key in updatedFieldObject) {
        if (key === String(profile_id)) {
          delete updatedFieldObject[key]
        }
      }

      await updateDoc(userDocRef, { profiles: updatedFieldObject })
    }
  } catch (error) {
    console.log('Error eliminando el perfil:', error)
    throw new Error('Failed to delete profile, please try again later')
  }
}

export async function updateProfileFromUser (user_uid: string, profile_id: number, profile_data: ProfileData) {
  try {
    const userDocRef = doc(db, 'user_profiles', user_uid)
    const docSnap = await getDoc(userDocRef)

    if (docSnap.exists()) {
      const profilesData = docSnap.data().profiles

      await updateDoc(userDocRef, {
        profiles: {
          ...profilesData,
          [profile_id]: { id: profile_id, ...profile_data }
        }
      })
    }
  } catch (error) {
    return error
  }
}
