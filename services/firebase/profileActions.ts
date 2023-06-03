import { ProfileData } from '@/types/profile'
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
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

      return Object.values(userProfiles) ?? []
    }
  } catch (error) {
    console.log('Error obteniendo los perfiles:', error)
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

export async function updateProfileFromUser (user_uid: string, profile_id: number, new_profile_data: ProfileData) {
  try {
    const userDocRef = doc(db, 'user_profiles', user_uid)
    const docSnap = await getDoc(userDocRef)

    if (docSnap.exists()) {
      const profilesData = docSnap.data().profiles

      await updateDoc(userDocRef, {
        profiles: {
          ...profilesData,
          [profile_id]: {
            ...profilesData[profile_id],
            ...new_profile_data
          }
        }
      })
    }
  } catch (error) {
    return error
  }
}

export async function addLikeToProfile (user_uid: string, profile_id: number, like: number): Promise<void> {
  try {
    const userDocRef = doc(db, 'user_profiles', user_uid)
    await updateDoc(userDocRef, {
      [`profiles.${profile_id}.likes`]: arrayUnion(like)
    })
  } catch (error) {
    console.log('Error al agregar el like:', error)
  }
}

export async function removeLikeFromProfile (user_uid: string, profile_id: number, like: number): Promise<void> {
  try {
    const userDocRef = doc(db, 'user_profiles', user_uid)
    await updateDoc(userDocRef, {
      [`profiles.${profile_id}.likes`]: arrayRemove(like)
    })
  } catch (error) {
    console.log('Error al agregar el like:', error)
  }
}

export async function addBookmarkToProfile (user_uid: string, profile_id: number, bookmark: number): Promise<void> {
  try {
    const userDocRef = doc(db, 'user_profiles', user_uid)
    await updateDoc(userDocRef, {
      [`profiles.${profile_id}.bookmarks`]: arrayUnion(bookmark)
    })
  } catch (error) {
    console.log('Error al agregar el bookmark:', error)
  }
}

export async function removeBookmarkFromProfile (user_uid: string, profile_id: number, bookmark: number): Promise<void> {
  try {
    const userDocRef = doc(db, 'user_profiles', user_uid)
    await updateDoc(userDocRef, {
      [`profiles.${profile_id}.bookmarks`]: arrayRemove(bookmark)
    })
  } catch (error) {
    console.log('Error al agregar el bookmark:', error)
  }
}
