import React, { useContext } from 'react'
import { HoverCardContext } from '@/contexts/HoverCardContext'
import { Movie } from '@/types/movie'
import styles from '@/styles/MovieCarousel.module.css'
import Image from 'next/image'

interface Props { movie: Movie }
function MovieCard ({ movie }: Props) {
  const { setHoverCard } = useContext(HoverCardContext)
  let timeoutId: ReturnType<typeof setTimeout>
  const title = movie.title ?? movie.name ?? 'err: no name'
  const backdrop_path = movie.backdrop_path ?? movie.poster_path

  return (
    <div
      className={`${styles.card} p-1`}
      onMouseEnter={(event) => {
        const { top, left, height, width } = event.currentTarget.getBoundingClientRect()
        const y = top + window.scrollY
        timeoutId = setTimeout(() => {
          setHoverCard({
            x: left, y, height, width, title, backdrop_path, isHover: true, id: movie.id
          })
        }, 350)
      }}
      onMouseLeave={() => clearTimeout(timeoutId)}
    >
      <Image
        alt={title}
        className='rounded-md aspect-video object-cover bg-slate-800'
        width={400} height={0}
        src={'https://image.tmdb.org/t/p/w400/' + backdrop_path}
      />
    </div>
  )
}

export default React.memo(MovieCard)
