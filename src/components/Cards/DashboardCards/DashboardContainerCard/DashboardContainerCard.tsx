import styles from './DashboardContainerCard.module.css'
import Link from 'next/link'

interface DashboardCardProps {
    children: any,
    title: string,
    subTitle?: string,
    subTitleLink?: string,
    isGridContainer?: boolean,
}

// reusable UI cards for dashboard content
export default function DashboardContainerCard({children, title, subTitle, subTitleLink, isGridContainer}: DashboardCardProps) {

  return (
    <section className={styles.dashboard_container_card}>
      <div className={styles.header_container}>
        <h3>{title}</h3>
        { !subTitleLink && <p>{subTitle}</p> }
        { subTitleLink && <p><Link href={subTitleLink}>{subTitle}</Link></p> }
      </div>
      {isGridContainer ? (
        <div className={styles.children_grid_container}>
          {children}
        </div>
      ): (
        <>
          {children}
        </>
      )}
    </section>
  )
}
