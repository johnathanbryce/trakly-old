
import styles from './home.module.css'
// Internal Components
import DashboardContainerCard from '@/components/Cards/DashboardCards/DashboardContainerCard/DashboardContainerCard';
import DashboardHomeRecentContacts from '@/components/Dashboard/DashboardHome/DashboardHomeRecentContacts/DashboardHomeRecentContacts';
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
          <div className={styles.dashboard_home_flex_wrapper}>
            <DashboardHomeRecentContacts />
          </div>
        </DashboardContainerCard>
        <DashboardContainerCard title='Recently added companies'>
          <div className={styles.dashboard_home_flex_wrapper}>

          </div>
        </DashboardContainerCard>
        <DashboardContainerCard title='Message templates'>
          <div className={styles.dashboard_home_flex_wrapper}>

          </div>
        </DashboardContainerCard>
    </section>
  )
}
