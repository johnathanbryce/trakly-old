import styles from './DashboardContainerCard.module.css'
import Link from 'next/link'

interface DashboardCardProps {
    children: any,
    title: string,
    subTitle?: string,
    subTitleLink?: string,
}

// reusable UI cards for dashboard content
export default function DashboardContainerCard({children, title, subTitle, subTitleLink}: DashboardCardProps) {

  return (
    <section className={styles.dashboard_container_card}>
      <div className={styles.header_container}>
        <h3>{title}</h3>
        { !subTitleLink && <p>{subTitle}</p> }
        { subTitleLink && <p><Link href={subTitleLink}>{subTitle}</Link></p> }
      </div>
        {children}
    </section>
  )
}
