import Image from 'next/image'
import { VscSearch, VscBell } from 'react-icons/vsc'
import AccountMenu from './AccountMenu'
import BrowseMenu from './BrowseMenu'
import { useEffect, useRef } from 'react'

const LOGO = require('@/public/images/logo.png')

export default function Navbar () {
  const navRef = useRef(null)

  useEffect(() => {
    if (navRef && navRef.current) {
      const curr: HTMLElement = navRef.current
      const handleScroll = () => {
        if (window.scrollY >= 66) {
          curr.classList.add('bg-zinc-900')
        } else {
          curr.classList.remove('bg-zinc-900')
        }
      }

      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [navRef])

  return (
    <nav
      ref={navRef} className='z-50 fixed px-10 md:px-12 py-3 md:py-4 w-full
    flex items-center justify-start transition duration-500
    bg-gradient-to-b from-zinc-950 from-10% to-transparent'
    >
      <Image width={0} height={24} src={LOGO} alt='logo' />
      <BrowseMenu />
      <div className='flex gap-4 ml-auto items-center'>
        <VscSearch style={{ transform: 'rotateY(180deg)' }} size={19} />
        <VscBell size={20} />
        <AccountMenu />
      </div>
    </nav>
  )
}
