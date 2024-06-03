'use client'
import styles from './Navigation.module.css'
// Next
import Link from 'next/link'
import { usePathname } from 'next/navigation';
// Internal Assets
import { IconBriefcase, IconHome, IconAddressBook, IconTemplate } from '@tabler/icons-react'

export default function Navigation() {
  // next pathname
  const pathname = usePathname();

  const iconSize = 26;
  return (
    <nav className={styles.main_nav}>
        <Link href='/home' className={`${styles.nav_item_container} ${pathname === '/home' ? styles.active : ''}`}>
            <IconHome className={styles.icon} size={iconSize} />
            Home
        </Link>
        <Link href='/contacts' className={`${styles.nav_item_container} ${pathname === '/contacts' ? styles.active : ''}`}>
            <IconAddressBook className={styles.icon} size={iconSize} />
            Contacts
        </Link>
        <Link href='/companies' className={`${styles.nav_item_container} ${pathname === '/companies' ? styles.active : ''}`}>
            <IconBriefcase className={styles.icon}  size={iconSize}/>
            Companies
        </Link>
        <Link href='/templates' className={`${styles.nav_item_container} ${pathname === '/templates' ? styles.active : ''}`}>
            <IconTemplate className={styles.icon} size={iconSize} />
            Templates
        </Link>
    </nav>
  )
}
