import styles from './LayoutAuthPages.module.css'

interface LayoutAuthPagesProps {
    children: React.ReactNode,
}

export default function LayoutAuthPages({children}: LayoutAuthPagesProps) {

  return (
    <section className={styles.layout_auth_pages}>
            {children}
    </section>
  )
}
