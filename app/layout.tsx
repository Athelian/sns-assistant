'use client'
import { ThemeProvider } from '@mui/material'
import { Cabin } from 'next/font/google'
import { headers } from 'next/headers'
import { Session } from 'next-auth'

import RootStyleRegistry from '@/app/emotion'
import theme from '@/app/theme'
import Footer from '@/components/footer'
import Header from '@/components/header'
import AuthContext from '@/contexts/authContext'
import FacebookSDK from '@/facebook/sdk'

import './globals.sass'

import { StyledMain } from './styles'

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(
    `${process.env.LOCAL_AUTH_URL}/api/auth/session`,
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
  const session = await getSession(headers().get('cookie') ?? '')

  return (
    <html lang="en">
      <head />
      <body>
        <FacebookSDK />
        <RootStyleRegistry>
          <ThemeProvider theme={theme}>
            <AuthContext session={session}>
              <StyledMain className={inter.className}>
                <Header />
                {children}
                <Footer />
              </StyledMain>
            </AuthContext>
          </ThemeProvider>
        </RootStyleRegistry>
      </body>
    </html>
  )
}
