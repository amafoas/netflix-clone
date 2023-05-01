import React, { useState, useRef, useEffect } from 'react'
import { HoverCardContext, defaultValue } from '@/contexts/HoverCardContext'
import NavBar from '@/components/navbar/Navbar'
import Banner from '@/components/Banner'
import MovieCarousel, { Props as MovieCarouselProps } from '@/components/movieCarousel/MovieCarousel'
import HoverCard from '@/components/HoverCard'
import MovieCarouselSkeleton from '@/components/movieCarousel/MovieCarouselSkeleton'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { firstRequests, getMoviesRequestUrl } from '@/utils/requests'
import { Movie } from '@/types/movie'

interface Responses {[key: string]: Movie[]}
interface Props{responses: Responses }

export default function Browse ({ responses }:Props) {
  const [hoverCard, setHoverCard] = useState(defaultValue)
  const [fetching, setFetching] = useState({ done: false, finish: false })
  const MovieCarouselRef = useRef<React.ReactElement<MovieCarouselProps>[]>([])
  const bottomPageRef = useRef(null)
  const reachBottom = useIntersectionObserver(bottomPageRef)

  useEffect(() => {
    if (!reachBottom || fetching.finish) return
    let request = getMoviesRequestUrl.next()
    if (request.done) {
      setFetching(({ done }) => ({ done, finish: true }))
      return
    }
    setFetching(({ done, finish }) => ({ done: !done, finish }))
    const promises = []
    for (let count = 0; !request.done && count < 3; count++) {
      const { name, url, id } = request.value
      promises.push(fetch(url)
        .then(res => res.json())
        .then(data => {
          MovieCarouselRef.current.push(
            <MovieCarousel key={id} label={name} movies={data.results} />
          )
        })
      )
      request = getMoviesRequestUrl.next()
    }
    Promise.all(promises).then(() => setFetching(({ done, finish }) => ({ done: !done, finish })))
  }, [reachBottom, fetching.finish])

  return (
    <div className='h-full'>
      <NavBar />
      <Banner data={responses.trending[0]} />
      <HoverCardContext.Provider value={{ hoverCard, setHoverCard }}>
        <HoverCard />
        <div className='mt-[-7%] md:mt-[-10%] xl:mt-[-17%] '>
          <MovieCarousel label='Trending' movies={responses.trending} />
          <MovieCarousel label='Top rated' movies={responses.topRated} />
          <MovieCarousel label='Netflix Originals' movies={responses.netflixOriginals} />
          {MovieCarouselRef.current.map((MovieCarousel) => MovieCarousel)}
        </div>
      </HoverCardContext.Provider>
      <div className={fetching.done ? '' : 'hidden'}>
        <MovieCarouselSkeleton />
        <MovieCarouselSkeleton />
      </div>
      <div ref={bottomPageRef} className='h-40 flex items-center'>
        <small className={`${fetching.finish ? '' : 'hidden'} mx-auto text-base`}>
          It seems that there are no more movies
        </small>
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
