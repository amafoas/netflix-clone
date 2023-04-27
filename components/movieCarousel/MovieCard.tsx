/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react'
import { HoverCardContext } from '@/contexts/HoverCardContext'
import { Movie } from '@/types/movie'
import styles from '@/styles/MovieCarousel.module.css'

interface Props { movie: Movie }
function MovieCard ({ movie }: Props) {
  const { setHoverCard } = useContext(HoverCardContext)
  let timeoutId: ReturnType<typeof setTimeout>

  return (
    <div
      className={`${styles.card} p-1`}
      onMouseEnter={(event) => {
        const { top, left, height, width } = event.currentTarget.getBoundingClientRect()
        const y = top + window.scrollY
        timeoutId = setTimeout(() => {
          setHoverCard({
            x: left,
            y,
            height,
            width,
            isHover: true,
            title: movie.title ?? movie.name ?? 'err: no name',
            backdrop_path: movie.backdrop_path ?? movie.poster_path
          })
        }, 350)
      }}
      onMouseLeave={() => clearTimeout(timeoutId)}
    >
      <img
        alt={movie.title}
        className='rounded-md aspect-video'
        src={'https://image.tmdb.org/t/p/original' + (movie.backdrop_path ?? movie.poster_path)}
      />
    </div>
  )
}

export default React.memo(MovieCard)
