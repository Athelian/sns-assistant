import classNames from 'classnames'
import { Cabin } from '@next/font/google'
import styles from './page.module.sass'
import './globals.sass'
import Footer from '@/components/footer'

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
        <main className={classNames(inter.className, styles.main)}>
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
