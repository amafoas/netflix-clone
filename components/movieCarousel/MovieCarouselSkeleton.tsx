import { useEffect, ReactElement, useState } from 'react'
import { getItemsPerScreen } from '@/utils/utils'

function MovieCarouselSkeleton () {
  const [cards, setCards] = useState<ReactElement[]>([])

  useEffect(() => {
    function generateCards () {
      const ips = getItemsPerScreen()
      const newCards = Array.from({ length: ips }, (_, i) => (
        <div
          key={i}
          className='bg-slate-700 rounded-md m-1 aspect-video'
        />
      ))
      setCards(newCards)
    }

    generateCards()
    window.addEventListener('resize', generateCards)

    return () => window.removeEventListener('resize', generateCards)
  }, [])

  return (
    <div className='animate-pulse mb-10 select-none mx-[--horizontal-spacing]'>
      <div className='mb-1 ml-1 rounded-full h-5 w-32 bg-slate-700' />
      <div
        className='grid'
        style={{ gridTemplateColumns: 'repeat(var(--items-per-screen), 1fr)' }}
      >
        {cards}
      </div>
    </div>
  )
}

export default MovieCarouselSkeleton
