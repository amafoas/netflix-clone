import { BsPlayFill, BsPlus, BsHandThumbsUp } from 'react-icons/bs'
import useProfile from '@/hooks/useProfile'
import { useState } from 'react'

interface Props {
  actionID: number
}
function ActionButtonGroup ({ actionID }: Props) {
  const { profile, toggleLike, toggleBookmark } = useProfile()
  const [isBookmarking, setIsBookmarking] = useState(false)
  const [isLiking, setIsLiking] = useState(false)

  return (
    <div className='flex gap-2 mb-4'>
      <div className='flex items-center justify-center
      bg-slate-100 rounded-full w-8 h-8
        hover:bg-opacity-80 transition cursor-pointer'
      >
        <BsPlayFill className='text-2xl text-black' />
      </div>
      <div
        className={`flex items-center justify-center
        border-2 border-slate-100 rounded-full w-8 h-8
        border-opacity-50 hover:border-opacity-100 transition cursor-pointer
        ${profile()?.bookmarks?.includes(actionID) ? 'border-opacity-100 bg-slate-100 text-black' : ''}`}
        onClick={() => {
          if (!isBookmarking) {
            setIsBookmarking(true)
            toggleBookmark(actionID)
              .finally(() => { setIsBookmarking(false) })
          }
        }}
      >
        <BsPlus className='text-2xl' />
      </div>
      <div
        className={`flex items-center justify-center
        border-2 border-slate-100 rounded-full w-8 h-8
        border-opacity-50 hover:border-opacity-90 transition cursor-pointer
        ${profile()?.likes?.includes(actionID) ? 'border-opacity-100 bg-slate-100 text-black' : ''}`}
        onClick={() => {
          if (!isLiking) {
            setIsLiking(true)
            toggleLike(actionID)
              .finally(() => setIsLiking(false))
          }
        }}
      >
        <BsHandThumbsUp />
      </div>
    </div>
  )
}

export default ActionButtonGroup
