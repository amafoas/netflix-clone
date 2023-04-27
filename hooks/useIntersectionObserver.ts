import { MutableRefObject, useEffect, useState } from 'react'

function useIntersectionObserver (ref: MutableRefObject<any>) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    if (!ref || !ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold: 0.5 }
    )
    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [isIntersecting, ref])

  return isIntersecting
}

export default useIntersectionObserver
