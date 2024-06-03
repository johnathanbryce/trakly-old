
import styles from './HeaderDashboard.module.css'
//Auth
import { SignOutButton } from '@clerk/nextjs';

export default function HeaderDashboard() {
  return (
    <header className={styles.header}>
        <h2> Trakly</h2>
        {/* <SignOutButton redirectUrl='/'/ > */}
        <SignOutButton>
            <button className={styles.log_out_btn}>Log out</button>
        </SignOutButton>
    </header>
  )
}
