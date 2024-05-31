'use client'
// Recoil Global State
import { RecoilRoot } from 'recoil';

/* all user logged in files receive this layout */
export default function LoggedInLayout({
    children,
  } : {
    children: React.ReactNode
  }) {;

  
    return (
      <RecoilRoot>
        {children}
      </RecoilRoot>
    )
  }