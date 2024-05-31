import styles from './login.module.css'
// Auth
import { SignIn } from "@clerk/nextjs";

export default function Login() {
  const dashboardUrl = process.env.NEXT_PUBLIC_CLERK_DASHBOARD_URL;

  return  <SignIn forceRedirectUrl={dashboardUrl} />;
}
