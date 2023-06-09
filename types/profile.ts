export interface Profile {
  id: number
  name: string
  img_url: string
  bookmarks: number[]
  likes: number[]
}

export interface ProfileData {
  name: string
  img_url: string
}
