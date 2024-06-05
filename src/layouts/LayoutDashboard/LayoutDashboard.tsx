import styles from './LayoutDashboard.module.css'


interface LayoutDashboardProps {
    children: React.ReactNode,
}

export default function LayoutDashboard({children}: LayoutDashboardProps) {
  return (
    <section className={styles.layout_dashboard}>
        {children}
    </section>
  )
}
