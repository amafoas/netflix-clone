import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc'
import styles from '@/styles/BrowseMenu.module.css'

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
          <li><a className={styles.browsemenu_item} href='#'>Home</a></li>
          <li><a className={styles.browsemenu_item} href='#'>Series</a></li>
          <li><a className={styles.browsemenu_item} href='#'>Films</a></li>
          <li><a className={styles.browsemenu_item} href='#'>New & Popular</a></li>
          <li><a className={styles.browsemenu_item} href='#'>My list</a></li>
          <li><a className={styles.browsemenu_item} href='#'>Browse by languages</a></li>
        </ul>
      </div>
    </div>
  )
}
