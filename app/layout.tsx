'use client'
import { ThemeProvider } from '@mui/material'
import { Cabin } from '@next/font/google'

import RootStyleRegistry from '@/app/emotion'
import theme from '@/app/theme'
import Footer from '@/components/footer'
import Header from '@/components/header'
import AuthContextComp from '@/contexts/authContext'

import './globals.sass'

import { StyledMain } from './styles'

const inter = Cabin({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <RootStyleRegistry>
          <ThemeProvider theme={theme}>
            <AuthContextComp>
              <StyledMain className={inter.className}>
                <Header />
                {children}
                <Footer />
              </StyledMain>
            </AuthContextComp>
          </ThemeProvider>
        </RootStyleRegistry>
      </body>
    </html>
  )
}
