'use client'
// Recoil Global State
import { RecoilRoot } from 'recoil';
// Components
import HeaderDashboard from '@/components/Headers/HeaderDashboard/HeaderDashboard';
import Navigation from '@/components/Dashboard/Navigation/Navigation';
// Layout
import LayoutDashboard from '@/layouts/LayoutDashboard/LayoutDashboard';
import LayoutDashboardColumn from '@/layouts/LayoutDashboardColumn/LayoutDashboardColumn';

/* all user logged in files receive this layout */
export default function LoggedInLayout({
    children,
  } : {
    children: React.ReactNode
  }) {;

  
    return (
      <RecoilRoot>
        <HeaderDashboard />
        <LayoutDashboard>
          <Navigation />
          <LayoutDashboardColumn> {/* column layout for content left & right padding when navbar is sticky footer */}
            {children}
          </LayoutDashboardColumn>
        </LayoutDashboard>
      </RecoilRoot>
    )
  }