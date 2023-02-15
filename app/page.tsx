import Image from 'next/image'
import { Cabin } from '@next/font/google'
import styles from './page.module.sass'

const inter = Cabin({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`${inter.className} ${styles.main}`}>
      <section className={styles.banner}>
        <Image
          src="/snai-high-resolution-logo-color-on-transparent-background.png"
          alt="snai logo"
          width={200}
          height={64.6}
          priority
        />
        <div>A revolution in social media networking.</div>
      </section>
      <section className={styles.content}>
        <ul>
          <li>
            Turbocharge your social media presence with artificial intelligence
          </li>
          <li>Automate your engagement with online audiences</li>
          <li>Generate advertisements for new products</li>
        </ul>
      </section>
    </main>
  )
}
