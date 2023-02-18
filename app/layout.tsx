'use client'
import { Cabin } from '@next/font/google'
import Footer from '@/components/footer'

import './globals.sass'
import { Main } from './styles'

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
          <Main className={inter.className}>
            {children}
            <Footer />
          </Main>
      </body>
    </html>
  )
}
