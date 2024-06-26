import styles from './DashboardContainerCardFullHeight.module.css'

interface DashboardCardProps {
    children: any,
    title: string,
    subTitle?: string,
}

// reusable UI cards for dashboard content
export default function DashboardContainerCardFullHeight({
    children, title, subTitle
}: DashboardCardProps) {

  return (
    <section className={styles.dashboard_container_card}>
      <div className={styles.header_container}>
        <h3>{title}</h3>
      </div>
      {children}
    </section>
  )
}
