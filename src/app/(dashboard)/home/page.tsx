
import styles from './home.module.css'
// Internal Components
import DashboardContainerCard from '@/components/Cards/DashboardCards/DashboardContainerCard/DashboardContainerCard';
import DashboardHomeRecentContacts from '@/components/Dashboard/DashboardHome/DashboardHomeRecentContacts/DashboardHomeRecentContacts';
import DashboardHomeRecentCompanies from '@/components/Dashboard/DashboardHome/DashboardHomeRecentCompanies/DashboardHomeRecentCompanies';
import DashboardHomeTemplates from '@/components/Dashboard/DashboardHome/DashboardHomeTemplates/DashboardHomeTemplates';

export default function Dashboard() {
  return (
    <section className={styles.dashboard_home}>
        <DashboardContainerCard title='Recently added contacts' subTitle="View all..." subTitleLink='/contacts'>
            <DashboardHomeRecentContacts />
        </DashboardContainerCard>

        <DashboardContainerCard title='Recently added companies' subTitle="View all..." subTitleLink='/companies'>
            <DashboardHomeRecentCompanies />
        </DashboardContainerCard>
        
        <DashboardContainerCard title='Message templates' subTitle="View all..." subTitleLink='/templates'>
            <DashboardHomeTemplates />
        </DashboardContainerCard>
    </section>
  )
}
