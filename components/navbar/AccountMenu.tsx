import Image from 'next/image'
import { ReactNode } from 'react'
import { VscTriangleDown, VscTriangleUp, VscAccount, VscQuestion, VscEdit } from 'react-icons/vsc'

const AVATAR = require('@/public/images/default-blue.png')

export default function AccountMenu () {
  return (
    <div className='flex items-center gap-2 group'>
      <Image className='rounded w-7' width={0} height={0} src={AVATAR} alt='avatar' />
      <VscTriangleDown className='hidden lg:block transition-transform duration-200 group-hover:rotate-180' size={14} />
      <div className='hidden absolute right-2 top-10 mr-10 pt-5 group-hover:block'>
        <div className='border-b-2'>
          <VscTriangleUp className='absolute top-2 right-6' size={20} />
        </div>
        <ul className='bg-slate-800 border border-gray-700 bg-opacity-70'>
          <MenuItem
            href='#' text='Jorge'
            leftIcon={<Image width={0} height={0} className='rounded' alt='Account avatar' src={AVATAR} />}
          />
          <MenuItem
            href='#' text='Marta'
            leftIcon={<Image width={0} height={0} className='rounded' alt='Account avatar' src={AVATAR} />}
          />
          <MenuItem
            href='#' text='Claudio'
            leftIcon={<Image width={0} height={0} className='rounded' alt='Account avatar' src={AVATAR} />}
          />
          <MenuItem
            href='#' text='Manage profiles' topDivider
            leftIcon={<VscEdit size={22} />}
          />
          <MenuItem
            href='#' text='Account'
            leftIcon={<VscAccount size={23} />}
          />
          <MenuItem
            href='#' text='Help center'
            leftIcon={<VscQuestion size={30} />}
          />
          <MenuItem
            href='#' text='Sign out of Netflix' topDivider center
          />
        </ul>
      </div>
    </div>
  )
}

interface MenutItemProps {
  href: string
  text: string
  topDivider?: boolean
  center?: boolean
  leftIcon?: ReactNode
}
function MenuItem ({ href, text, leftIcon, topDivider, center }: MenutItemProps) {
  return (
    <li className={`flex items-center gap-2 px-3 w-48 cursor-pointer
    ${topDivider ? 'border-slate-700 border-t' : ''}
    ${center ? 'justify-center' : ''}
    hover:bg-slate-800 hover:bg-opacity-50 hover:underline`}
    >
      {leftIcon
        ? <div className='w-7 items-center justify-center flex'>{leftIcon}</div>
        : null}
      <a
        href={href}
        className='block text-xs py-3'
      >{text}
      </a>
    </li>
  )
}
