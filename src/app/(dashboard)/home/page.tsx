
import styles from './home.module.css'
// Internal Components
import DashboardContainerCard from '@/components/Cards/DashboardCards/DashboardContainerCard/DashboardContainerCard';
import DashboardHomeRecentContacts from '@/components/Dashboard/DashboardHome/DashboardHomeRecentContacts/DashboardHomeRecentContacts';
import DashboardHomeRecentCompanies from '@/components/Dashboard/DashboardHome/DashboardHomeRecentCompanies/DashboardHomeRecentCompanies';
import DashboardHomeTemplates from '@/components/Dashboard/DashboardHome/DashboardHomeTemplates/DashboardHomeTemplates';
import Carousel from '@/components/Carousels/Carousel/Carousel';
// Auth
import { useAuth, useUser } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Dashboard() {

  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();


  if (userId) {
    // Query DB for user specific information or display assets only to signed in users
  }

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser()

  // Use `user` to render user details or create UI elements

  return (
    <section className={styles.dashboard_home}>
        <DashboardContainerCard title='Recently added contacts'>
          <Carousel>
              <DashboardHomeRecentContacts />
          </Carousel>
        </DashboardContainerCard>
        <DashboardContainerCard title='Recently added companies'>
          <Carousel>
              <DashboardHomeRecentCompanies />
          </Carousel>
        </DashboardContainerCard>
        <DashboardContainerCard title='Message templates'>
          <Carousel>
              <DashboardHomeTemplates />
          </Carousel>
        </DashboardContainerCard>
    </section>
  )
}
