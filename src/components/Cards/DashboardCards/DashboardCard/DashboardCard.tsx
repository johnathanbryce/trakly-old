import styles from './DashboardCard.module.css'

/*
    fetch data here
*/

interface DashboardCardProps {
    children: any,
}

export default function DashboardCard({children}: DashboardCardProps) {

  return (
    <section>
        {children}
    </section>
  )
}
