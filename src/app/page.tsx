// Next
import Link from "next/link";
// Auth

export default function Home() {
  return (
    <main>
      <h1> Home Page </h1>
      <Link href='/sign-in'> Sign in </Link>
      <Link href='/sign-up'> Sign up</Link>
    </main>
  );
}
