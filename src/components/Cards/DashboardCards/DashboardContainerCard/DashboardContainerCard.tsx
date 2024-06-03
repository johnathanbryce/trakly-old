import styles from './DashboardContainerCard.module.css'

interface DashboardCardProps {
    children: any,
    title: string,
}

// reusable UI cards for dashboard content
export default function DashboardContainerCard({children, title}: DashboardCardProps) {

  return (
    <section className={styles.dashboard_container_card}>
      <h3>{title}</h3>
        {children}
    </section>
  )
}
