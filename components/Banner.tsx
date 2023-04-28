import { AiOutlineInfoCircle, AiFillCaretRight } from 'react-icons/ai'

export default function Banner ({ data }:any) {
  const { backdrop_path, title, overview } = data
  return (
    <div
      style={{ backgroundImage: `url(${'https://image.tmdb.org/t/p/original' + backdrop_path})` }}
      className='h-[56.3vw] relative bg-center bg-contain bg-no-repeat -z-10'
    >
      <div className='h-full bg-gradient-to-b from-transparent from-60% to-zinc-900' />
      <div className='absolute ml-6 md:ml-12 xl:ml-[4%] flex flex-col gap-2
        bottom-[15%] sm:bottom-[30%] xl:bottom-[40%]
        sm:w-[60%] md:w-[50%] xl:w-[40%]'
      >
        <p
          className='drop-shadow text-2xl lg:text-4xl font-bold'
          style={{ textShadow: '-1px 0px 0 #000' }}
        >{title}
        </p>
        <p
          className='drop-shadow text-xs md:text-sm'
          style={{ textShadow: '-1px 0px 0 #000' }}
        >{overview}
        </p>
        <div className='flex gap-2'>
          <button className='flex gap-1 items-center rounded-md px-3 py-2
            text-slate-800 text-xs lg:text-lg font-medium
            bg-slate-50 hover:bg-opacity-50 transition'
          ><AiFillCaretRight />Play
          </button>
          <button className='flex gap-1 items-center rounded-md px-3 py-2
            text-xs lg:text-lg font-medium
            bg-slate-200 bg-opacity-30 hover:bg-opacity-20 transition'
          ><AiOutlineInfoCircle />More Info
          </button>
        </div>
      </div>
    </div>
  )
}
