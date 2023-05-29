import { ReactNode, useContext } from 'react'
import Image from 'next/image'
import { VscTriangleDown, VscTriangleUp, VscAccount, VscQuestion, VscEdit } from 'react-icons/vsc'
import { ProfileContext } from '@/contexts/ProfileContext'
import { profiles } from '@/utils/profiles'
import { auth } from '@/firebase/firebase'
import { signOut } from 'firebase/auth'

export default function AccountMenu () {
  const { profile, setProfile } = useContext(ProfileContext)

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error al desloguear:', error)
    }
  }

  return (
    <div className='flex items-center gap-2 group'>
      <Image className='rounded w-7' width={0} height={0} src={profile?.img_url || ''} alt='avatar' />
      <VscTriangleDown className='hidden lg:block transition-transform duration-200 group-hover:rotate-180' size={14} />
      <div className='hidden absolute right-2 top-10 mr-10 pt-5 group-hover:block'>
        <div className='border-b-2'>
          <VscTriangleUp className='absolute top-2 right-6' size={20} />
        </div>
        <ul className='bg-slate-800 border border-gray-700 bg-opacity-70'>
          {profiles.map((pf) => {
            return pf.id !== profile?.id
              ? <MenuItem
                  key={pf.id} text={pf.name} onClick={() => setProfile(pf)}
                  leftIcon={<Image width={0} height={0} className='rounded' alt={`avatar ${pf.name}`} src={pf.img_url} />}
                />
              : null
          })}
          <MenuItem
            text='Manage profiles' topDivider
            leftIcon={<VscEdit size={22} />}
          />
          <MenuItem
            text='Account'
            leftIcon={<VscAccount size={23} />}
          />
          <MenuItem
            text='Help center'
            leftIcon={<VscQuestion size={30} />}
          />
          <MenuItem
            onClick={handleSignOut}
            text='Sign out of Netflix' topDivider center
          />
        </ul>
      </div>
    </div>
  )
}

interface MenutItemProps {
  text: string
  onClick?: () => void
  topDivider?: boolean
  center?: boolean
  leftIcon?: ReactNode
}
function MenuItem ({ text, onClick, leftIcon, topDivider, center }: MenutItemProps) {
  return (
    <li
      className={`flex items-center gap-2 px-3 w-48 cursor-pointer
    ${topDivider ? 'border-slate-700 border-t' : ''}
    ${center ? 'justify-center' : ''}
    hover:bg-slate-800 hover:bg-opacity-50 hover:underline`}
      onClick={() => { onClick != null && onClick() }}
    >
      {leftIcon
        ? <div className='w-7 items-center justify-center flex'>{leftIcon}</div>
        : null}
      <p
        className='text-xs py-3'
      >{text}
      </p>
    </li>
  )
}
