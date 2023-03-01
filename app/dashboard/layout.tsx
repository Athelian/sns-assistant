'use client'
import FacebookSDK from '@/facebook/sdk'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <FacebookSDK />
      {children}
    </div>
  )
}
