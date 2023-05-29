import { Profile } from '@/types/profile'

export function getProfile (id: number, profiles: Profile[]): Profile | null {
  const foundProfile = profiles.find(profile => profile.id === id)
  return foundProfile || null
}
