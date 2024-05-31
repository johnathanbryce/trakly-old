import styles from './sign-in.module.css'
// Layout
import LayoutAuthPages from '@/layouts/LayoutAuthPages/LayoutAuthPages';
// Auth
import { SignIn as SignInUser } from "@clerk/nextjs";

const appearance = {
  variables: {
    fontSize: '1.65rem',
    spacingUnit: '1.2rem'
  },
};

export default function SignIn() {
  const dashboardUrl = process.env.NEXT_PUBLIC_CLERK_DASHBOARD_URL;

  return (
    <LayoutAuthPages>
      <SignInUser forceRedirectUrl={dashboardUrl} appearance={appearance} />
    </LayoutAuthPages>
  )
}
