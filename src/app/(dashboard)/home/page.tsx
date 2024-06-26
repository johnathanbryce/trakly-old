
// Internal Components
import DashboardContainerCard from '@/components/Cards/DashboardCards/DashboardContainerCard/DashboardContainerCard';
import DashboardHomeRecentContacts from '@/components/Dashboard/DashboardHome/DashboardHomeRecentContacts/DashboardHomeRecentContacts';
import DashboardHomeRecentCompanies from '@/components/Dashboard/DashboardHome/DashboardHomeRecentCompanies/DashboardHomeRecentCompanies';
import DashboardHomeTemplates from '@/components/Dashboard/DashboardHome/DashboardHomeTemplates/DashboardHomeTemplates';

export default function Dashboard() {
  return (
    <>
        <DashboardContainerCard title='Recently added contacts' subTitle="View all..." subTitleLink='/contacts' isGridContainer={false}>
            <DashboardHomeRecentContacts />
        </DashboardContainerCard>

        <DashboardContainerCard title='Recently added companies' subTitle="View all..." subTitleLink='/companies' isGridContainer={false}>
            <DashboardHomeRecentCompanies />
        </DashboardContainerCard>
        
        <DashboardContainerCard title='Message templates' subTitle="View all..." subTitleLink='/templates' isGridContainer={false}>
            <DashboardHomeTemplates />
        </DashboardContainerCard>
    </>
  
  )
}
