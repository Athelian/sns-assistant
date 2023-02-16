import Image from 'next/image'
import Link from 'next/link'
import { Cabin } from '@next/font/google'
import styles from './page.module.sass'
import Section from '@/components/section'
import classNames from 'classnames'

const inter = Cabin({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={classNames(inter.className, styles.main)}>
      <header className={styles.banner}>
        <div>
          <div>
            <Image
              src="/snai-high-resolution-logo-color-on-transparent-background.png"
              alt="snai logo"
              width={400}
              height={129.2}
              priority
            />
            <div className={styles.subtitle}>
              A revolution in social media networking
            </div>
          </div>
          <nav className={styles.navbar}>
            <Link href="/login">Log In</Link>
            <Link href="/reg">Sign Up</Link>
          </nav>
        </div>
        <div className={styles.slogan}>Install a new marketing team.</div>
      </header>
      <section className={styles.body}>
        {[
          [
            'Elevate your social media presence with artificial intelligence',
            'Integrate world class machine learning with your business platform to manage your social edia presence. By using SNAI, you are leading the way in the new world of automated marketing.',
          ],
          [
            'Turbocharge your engagement with online audiences',
            'Respond to enquiries the moment they arrive with your latest product information and in a style that represents your brand.',
          ],
          [
            "Automate your brand's advertising",
            'With Snai you can generate new product showcases without lifting a finger. Integrate your product line and let your new team take care of the rest.',
          ],
        ].map(([header, body], i) => {
          return (
            <Section
              key={i}
              variant={i % 2 === 0 ? 'dark' : 'light'}
              header={header}
              body={body}
            />
          )
        })}
      </section>
      <footer className={styles.footer}>
        <span>Created by Eliot Austin-Forbes</span>
        <span>© 2023 Snai, All rights reserved.</span>
      </footer>
    </main>
  )
}
