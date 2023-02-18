'use client'
import { Cabin } from '@next/font/google'
import Footer from '@/components/footer'

import './globals.sass'
import { StyledMain } from './styles'
import RootStyleRegistry from '@/app/emotion'
import Header from '@/components/header'

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
          <StyledMain className={inter.className}>
            <Header />
            {children}
            <Footer />
          </StyledMain>
        </RootStyleRegistry>
      </body>
    </html>
  )
}
