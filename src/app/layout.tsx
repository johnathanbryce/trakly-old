import '../styles/globals.css';
import '../styles/reset.css';
import '../styles/vars.css';
// Next
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from 'next/head';
// Auth

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "trakly - Network and Job Hunt Smarter",
  description: "trakly is a web application built with Next.js, Clerk, and MongoDB for managing contacts, companies, and message templates. Perfect for networking and job hunting.",
  keywords: "trakly, Next.js, Clerk, MongoDB, networking, job hunting, contacts management, message templates",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
