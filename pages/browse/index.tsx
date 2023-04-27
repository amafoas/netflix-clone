import React, { useState, useRef, useEffect } from 'react'
import { HoverCardContext, defaultValue } from '@/contexts/HoverCardContext'
import NavBar from '@/components/navbar/Navbar'
import Banner from '@/components/Banner'
import HoverCard from '@/components/HoverCard'
import MovieCarousel, { Props as MovieCarouselProps } from '@/components/movieCarousel/MovieCarousel'
import { Movie } from '@/types/movie'
import { firstRequests, getMoviesRequestUrl } from '@/utils/requests'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'

interface Responses {[key: string]: Movie[]}
interface Props{responses: Responses }

export default function Browse ({ responses }:Props) {
  const [hoverCard, setHoverCard] = useState(defaultValue)
  const bottomPageRef = useRef(null)
  const reachBottom = useIntersectionObserver(bottomPageRef)
  const MovieCarouselRef = useRef<React.ReactElement<MovieCarouselProps>[]>([])

  useEffect(() => {
    if (!reachBottom) return
    let request = getMoviesRequestUrl.next()
    let count = 0
    while (!request.done && count < 3) {
      (async () => {
        const { name, url, id } = request.value
        const res = await fetch(url)
        const data = await res.json()

        MovieCarouselRef.current.push(
          <MovieCarousel key={id} label={name} movies={data.results} />
        )
      })()
      request = getMoviesRequestUrl.next()
      count++
    }
  }, [reachBottom, bottomPageRef])

  return (
    <div className='h-full'>
      <NavBar />
      <Banner data={responses.trending[0]} />
      <HoverCardContext.Provider value={{ hoverCard, setHoverCard }}>
        <HoverCard />
        <div className='mt-[-10%] xl:mt-[-17%]'>
          <MovieCarousel label='Trending' movies={responses.trending} />
          <MovieCarousel label='Top rated' movies={responses.topRated} />
          <MovieCarousel label='Netflix Originals' movies={responses.netflixOriginals} />
          <MovieCarousel label='Action Movies' movies={responses.actionMovies} />
          {MovieCarouselRef.current.map((MovieCarousel) => MovieCarousel)}
        </div>
      </HoverCardContext.Provider>
      <div ref={bottomPageRef} className='h-40 bg-zinc-900 flex items-center justify-center'>
        <small className='text-xl'>Oops!! it seems there are no more genres to show</small>
      </div>
    </div>
  )
}

export async function getServerSideProps () {
  const responses: Responses = {}

  await Promise.all(
    Object.keys(firstRequests).map(async (key) => {
      const url = firstRequests[key]
      const res = await fetch(url)
      const data = await res.json()

      responses[key] = data.results
    })
  )

  return {
    props: { responses }
  }
}
