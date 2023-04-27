import { RefObject } from 'react'

interface ProgressBarProps { length: number, ulRef?: RefObject<HTMLUListElement> }
function ProgressBar ({ length, ulRef }:ProgressBarProps) {
  const bars = []
  for (let i = 0; i < length; i++) {
    bars.push(<li key={i} className={`${i === 0 ? 'bg-slate-300' : 'bg-slate-500'} w-3 h-[2px]`} />)
  }
  return (
    <ul
      ref={ulRef}
      className='flex gap-1 group-hover:opacity-100 opacity-0 transition'
    >{bars}
    </ul>
  )
}

export default ProgressBar
