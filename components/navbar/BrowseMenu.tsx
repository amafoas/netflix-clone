import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc'
import styles from '@/styles/BrowseMenu.module.css'
import Link from 'next/link'

export default function BrowseMenu () {
  return (
    <div className={styles.browsemenu_main_container}>
      <div className='text-xs flex items-center gap-2 ml-8 md:hidden cursor-pointer relative'>
        <p>Browse</p>
        <VscTriangleDown />
      </div>
      <div className={styles.browsemenu_container}>
        <div className='border-b-2 flex justify-center md:hidden'>
          <VscTriangleUp className='absolute top-5' size={20} />
        </div>
        <ul className={styles.browsemenu_list}>
          <li><Link className={styles.browsemenu_item} href='/browse'>Home</Link></li>
          <li><Link className={styles.browsemenu_item} href='/not-implemented'>Series</Link></li>
          <li><Link className={styles.browsemenu_item} href='/not-implemented'>Films</Link></li>
          <li><Link className={styles.browsemenu_item} href='/not-implemented'>New & Popular</Link></li>
          <li><Link className={styles.browsemenu_item} href='/not-implemented'>My list</Link></li>
          <li><Link className={styles.browsemenu_item} href='/not-implemented'>Browse by languages</Link></li>
        </ul>
      </div>
    </div>
  )
}
