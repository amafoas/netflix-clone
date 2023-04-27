import { createContext } from 'react'

interface Card {
  x: number
  y: number
  height: number
  width: number
  title: string
  backdrop_path: string
  isHover: boolean
}

interface ContextType {
  hoverCard: Card
  setHoverCard: (newCard: Card) => void
}

export const defaultValue = {
  x: 0,
  y: 0,
  height: 0,
  width: 0,
  title: '',
  backdrop_path: '',
  isHover: false
}

export const HoverCardContext = createContext<ContextType>({
  hoverCard: defaultValue,
  setHoverCard: (newCard) => {}
})
