import { type AppType } from 'next/app'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import { api } from '@/utils/api'

import './globals.css'

const SNAI: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default api.withTRPC(SNAI)
