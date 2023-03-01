import clsx from 'clsx'
import { Cabin } from 'next/font/google'
import { headers } from 'next/headers'
import { Session } from 'next-auth'

import Footer from '@/components/footer'
import Header from '@/components/header'
import AuthContext from '@/contexts/authContext'

import './globals.css'

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LOCAL_AUTH_URL}/api/auth/session`,
    {
      headers: {
        cookie,
      },
    }
  )

  const session = await response.json()

  return Object.keys(session).length > 0 ? session : null
}

const inter = Cabin({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // undefined === waiting for session fetch to complete
  // null === user is not authenticated
  const session = await getSession(headers().get('cookie') ?? '')

  return (
    <html lang="en">
      <head />
      <body>
        <AuthContext session={session}>
          <main
            className={clsx(
              inter.className,
              'min-h-screen min-w-[800px] text-[x-large] flex flex-col justify-between'
            )}
          >
            <Header />
            {children}
            <Footer />
          </main>
        </AuthContext>
      </body>
    </html>
  )
}
