import styles from './sign-up.module.css'
// Layout
import LayoutAuthPages from '@/layouts/LayoutAuthPages/LayoutAuthPages';
// Auth
import { SignUp as SignUpUser } from "@clerk/nextjs";

const appearance = {
  variables: {
    fontSize: '1.65rem',
    spacingUnit: '1.2rem'
  },
};


export default function SignUp() {
  const dashboardUrl = process.env.NEXT_PUBLIC_CLERK_DASHBOARD_URL;
  
  return (
    <LayoutAuthPages>
      <SignUpUser forceRedirectUrl={dashboardUrl} appearance={appearance} />
    </LayoutAuthPages>
  )
}
