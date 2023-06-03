import { useState, createContext, ReactNode, Dispatch, SetStateAction } from 'react'

interface Card {
  x: number
  y: number
  height: number
  width: number
  title: string
  backdrop_path: string
  isHover: boolean
  id: number
}
const emptyCard: Card = {
  x: 0, y: 0, height: 0, width: 0, title: '', backdrop_path: '', isHover: false, id: 0
}

interface ContextType {
  hoverCard: Card
  setHoverCard: Dispatch<SetStateAction<Card>>
}
const HoverCardContext = createContext<ContextType>({
  hoverCard: emptyCard,
  setHoverCard: (newCard) => {}
})

interface HoverCardProviderProps {
  children: ReactNode
}
function HoverCardProvider ({ children }:HoverCardProviderProps) {
  const [hoverCard, setHoverCard] = useState(emptyCard)
  return (
    <HoverCardContext.Provider value={{ hoverCard, setHoverCard }}>
      {children}
    </HoverCardContext.Provider>
  )
}

export {
  emptyCard,
  HoverCardContext,
  HoverCardProvider
}
