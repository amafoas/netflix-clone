import { auth } from './firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'

const errorMessages: { [key: string]: string } = {
  'auth/email-already-exists': 'Email already exists',
  'auth/email-already-in-use': 'Email already in use',
  'auth/wrong-password': 'Email or password are incorrect',
  'auth/user-not-found': 'Email or password are incorrect',
  'auth/invalid-password': 'Password is not valid',
  'auth/invalid-email': 'Email is not valid',
  'auth/too-many-requests': 'Too many login attempts. Please try again later.'
}
const defaultMessage = 'An error occurred while trying to connect to the server'

function getAuthErrorMessage (code: string): string {
  return errorMessages[code] ?? defaultMessage
}

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
