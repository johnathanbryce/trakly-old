import styles from './LayoutDashboardColumn.module.css'


interface LayoutDashboardColumnProps {
    children: React.ReactNode,
}

export default function LayoutDashboardColumn({children}: LayoutDashboardColumnProps) {
  return (
    <section className={styles.layout_dashboard_column}>
        {children}
    </section>
  )
}