import { Profile } from '@/types/profile'

// Client only
export function getItemsPerScreen () : number {
  return parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--items-per-screen')
  )
}

export function getProfile (id: number, profiles: Profile[]): Profile | null {
  const foundProfile = profiles.find(profile => profile.id === id)
  return foundProfile || null
}
