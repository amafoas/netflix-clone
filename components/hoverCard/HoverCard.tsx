/* eslint-disable @next/next/no-img-element */
import { useContext } from 'react'
import { HoverCardContext, emptyCard } from '@/contexts/HoverCardContext'
import ActionButtonGroup from './ActionButtonGroup'

export default function HoverCard () {
  const { hoverCard, setHoverCard } = useContext(HoverCardContext)

  const [width, height] = [hoverCard.width * 1.5, hoverCard.height]
  let [left, top] = [hoverCard.x - (width - hoverCard.width) / 2, hoverCard.y - height / 2]

  if (typeof window !== 'undefined') {
    const marginValue = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--horizontal-spacing')) / 100
    const margin = window.innerWidth * marginValue

    // apply left margin
    let horizontalClamp = Math.max(left, margin)

    // apply right margin
    const maxWidth = document.body.offsetWidth - margin
    if ((left + width) > maxWidth) {
      horizontalClamp = maxWidth - width
    }

    left = horizontalClamp
  }

  return (
    <div
      className={`absolute z-20 bg-zinc-800 rounded-md growAnimation
      shadow-lg shadow-zinc-900 border border-zinc-800
      h-fill
      ${hoverCard.isHover ? '' : 'hidden'}`}
      style={{ left, top, width }}
      onMouseLeave={() => setHoverCard(emptyCard)}
    >
      <img
        alt={hoverCard.title}
        className='aspect-video rounded-t-md'
        src={hoverCard.backdrop_path ? 'https://image.tmdb.org/t/p/w500/' + hoverCard.backdrop_path : ''}
      />
      <div className='w-full px-4 py-4'>
        <ActionButtonGroup actionID={hoverCard.id} />
        <p className='text-sm'>{hoverCard.title}</p>
      </div>
      <style jsx>{`
        .growAnimation {
          animation-name: grow;
          animation-duration: 250ms;
          animation-timing-function: ease;
        }
        
        @keyframes grow {
          0% {
            opacity: 0;
            transform: scale(.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}
      </style>
    </div>
  )
}
