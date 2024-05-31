import '../styles/globals.css';
import '../styles/reset.css';
import '../styles/vars.css';
// Next
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from 'next/head';
// Auth
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "trakly - Network and Job Hunt Smarter",
  description: "trakly is a web application built with Next.js, Clerk, and MongoDB for managing contacts, companies, and message templates. Perfect for networking and job hunting.",
  keywords: "trakly, Next.js, Clerk, MongoDB, networking, career, job hunting, contacts management, companies management, message templates",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
{/*         <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header> */}
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
