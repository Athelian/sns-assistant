'use client'
import FacebookSDK from '@/facebook/sdk'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FacebookSDK />
      {children}
    </>
  )
}

export default DashboardLayout
