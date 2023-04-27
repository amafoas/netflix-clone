/* eslint-disable @next/next/no-img-element */
import { useContext } from 'react'
import { HoverCardContext, defaultValue } from '@/contexts/HoverCardContext'
import { BsPlayFill, BsPlus, BsHandThumbsUp } from 'react-icons/bs'

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
      onMouseLeave={() => setHoverCard(defaultValue)}
    >
      <img
        alt={hoverCard.title}
        className='aspect-video rounded-t-md'
        src={hoverCard.backdrop_path ? 'https://image.tmdb.org/t/p/original' + hoverCard.backdrop_path : ''}
      />
      <div className='w-full px-4 py-4'>
        <div className='flex gap-2 mb-4'>
          <div className='flex items-center justify-center
          bg-slate-100 rounded-full w-8 h-8
          hover:bg-opacity-80 transition cursor-pointer'
          >
            <BsPlayFill className='text-2xl text-black' />
          </div>
          <div className='flex items-center justify-center
          border-2 border-slate-100 rounded-full w-8 h-8
          border-opacity-50 hover:border-opacity-90 transition cursor-pointer'
          >
            <BsPlus className='text-2xl' />
          </div>
          <div className='flex items-center justify-center
          border-2 border-slate-100 rounded-full w-8 h-8
          border-opacity-50 hover:border-opacity-90 transition cursor-pointer'
          >
            <BsHandThumbsUp />
          </div>
        </div>
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
