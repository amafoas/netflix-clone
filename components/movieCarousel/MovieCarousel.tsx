import React, { RefObject, useEffect, useRef, useState } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import MovieCard from './MovieCard'
import SideButton from './SideButton'
import ProgressBar from './ProgressBar'
import { Movie } from '@/types/movie'
import styles from '@/styles/MovieCarousel.module.css'

type Direction = 'left' | 'right'
export interface Props { label: string, movies: Movie[] }

function MovieCarousel ({ label, movies }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const leftBtnRef = useRef<HTMLButtonElement>(null)
  const rightBtnRef = useRef<HTMLButtonElement>(null)
  const progressBarRef = useRef<HTMLUListElement>(null)
  const [pbLength, setPbLength] = useState<number>(0)

  useEffect(() => {
    if (!sliderRef.current) return
    function updateValues () {
      const values = getSliderValues(sliderRef, movies.length)
      if (values.index > values.maxIndex) {
        sliderRef?.current?.style.setProperty('--slider-index', String(values.maxIndex))
      }
      setPbLength(values.maxIndex + 1)
      updateButtonsAndBar(values.index, values.index, values.maxIndex)
    }

    updateValues()
    window.addEventListener('resize', updateValues)

    return () => window.removeEventListener('resize', updateValues)
  }, [movies.length])

  const slide = (direction: Direction) => {
    if (!sliderRef.current) return
    const { index, maxIndex } = getSliderValues(sliderRef, movies.length)
    const newIndex = index + (direction === 'left' ? -1 : 1)

    sliderRef.current.style.setProperty('--slider-index', String(newIndex))

    updateButtonsAndBar(index, newIndex, maxIndex)
  }

  const updateButtonsAndBar = (index: number, newIndex: number, maxIndex: number) => {
    if (leftBtnRef.current) {
      leftBtnRef.current.classList.toggle('hidden', newIndex <= 0)
    }
    if (rightBtnRef.current) {
      rightBtnRef.current.classList.toggle('hidden', newIndex >= maxIndex)
    }

    if (progressBarRef.current) {
      const pbchildren = progressBarRef.current.children
      if (pbchildren.length > newIndex) {
        pbchildren[index].classList.replace('bg-slate-300', 'bg-slate-500')
        pbchildren[newIndex].classList.replace('bg-slate-500', 'bg-slate-300')
      }
    }
  }

  return (
    <div className='mb-10 group select-none'>
      <div className='flex items-center justify-between mx-[--horizontal-spacing]'>
        <div className='text-lg flex items-center mb-1 pl-1'>
          <h3 className='font-medium'>{label}</h3>
          <FiChevronRight className='text-cyan-500 transition-all z-10 opacity-0 group-hover:opacity-100' />
        </div>
        <ProgressBar length={pbLength} ulRef={progressBarRef} />
      </div>
      <div className='relative overflow-hidden flex justify-center group'>
        <SideButton
          btnRef={leftBtnRef}
          action={() => slide('left')}
          hidden left
        />
        <div ref={sliderRef} className={`${styles.slider} flex w-[92%] transition-transform duration-300`}>
          {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
        <SideButton
          btnRef={rightBtnRef}
          action={() => slide('right')}
        />
      </div>
    </div>
  )
}

function getSliderValues (
  sliderRef: RefObject<HTMLDivElement>, moviesLength: number
):{ maxIndex: number, index: number } {
  if (!sliderRef.current) return { index: 0, maxIndex: 0 }
  const curr: HTMLElement = sliderRef.current
  const index = parseInt(window.getComputedStyle(curr).getPropertyValue('--slider-index'))
  const itemsPerScreen = parseInt(window.getComputedStyle(curr).getPropertyValue('--items-per-screen'))
  const maxIndex = Math.ceil(moviesLength / itemsPerScreen) - 1
  return { index, maxIndex }
}

export default React.memo(MovieCarousel)
