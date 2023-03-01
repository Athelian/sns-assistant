'use client'
import FacebookSDK from '@/facebook/sdk'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <FacebookSDK />
      {children}
    </div>
  )
}

export default DashboardLayout
