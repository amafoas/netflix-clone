import { auth } from './firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import getAuthErrorMessage from './getAuthErrorMessage'

export async function signIn (email: string, password: string) {
  let userCredential = null
  let error: any = null

  try {
    userCredential = await signInWithEmailAndPassword(auth, email, password)
  } catch (e: any) {
    error = { code: e.code, message: getAuthErrorMessage(e.code) }
  }

  return { userCredential, error }
}

export async function signUp (email: string, password: string) {
  let userCredential = null
  let error: any = null

  try {
    userCredential = await createUserWithEmailAndPassword(auth, email, password)
  } catch (e: any) {
    error = { code: e.code, message: getAuthErrorMessage(e.code) }
  }

  return { userCredential, error }
}
