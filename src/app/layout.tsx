import '../styles/globals.css';
import '../styles/reset.css';
import '../styles/vars.css';
// Next
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Head from 'next/head';
// Auth
import { ClerkProvider } from '@clerk/nextjs'

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "trakly - Network and Job Hunt Smarter",
  description: "trakly is a web application built with Next.js, Clerk, and MongoDB for managing contacts, companies, and message templates. Perfect for networking and job hunting.",
  keywords: "trakly, Next.js, Clerk, PostgreSQL, Express.js, networking, career, job hunting, contacts management, companies management, message templates",
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
        <body className={roboto.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
