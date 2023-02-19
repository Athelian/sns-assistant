'use client'
import { Cabin } from '@next/font/google'
import Footer from '@/components/footer'

import './globals.sass'
import { StyledMain } from './styles'
import RootStyleRegistry from '@/app/emotion'
import Header from '@/components/header'
import { ThemeProvider } from '@mui/material'
import theme from '@/app/theme'
import { app, auth, initFirebase } from '@/lib/init'

initFirebase()
console.log(app)
console.log(auth)
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
            <StyledMain className={inter.className}>
              <Header />
              {children}
              <Footer />
            </StyledMain>
          </ThemeProvider>
        </RootStyleRegistry>
      </body>
    </html>
  )
}
