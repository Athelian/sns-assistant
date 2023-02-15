import Image from 'next/image'
import { Cabin } from '@next/font/google'
import styles from './page.module.sass'
import Section from '@/components/section'

const inter = Cabin({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`${inter.className} ${styles.main}`}>
      <section className={styles.banner}>
        <Image
          src="/snai-high-resolution-logo-color-on-transparent-background.png"
          alt="snai logo"
          width={400}
          height={129.2}
          priority
        />
        <div className={styles.subtitle}>
          A revolution in social media networking.
        </div>
      </section>
      <Section
        header={
          'Turbocharge your social media presence with artificial intelligence'
        }
        body={
          'Integrate world class machine learning with your business platform to manage your social media presence. By using SNAI, you are leading the way in the new world of automated marketing'
        }
      />
    </main>
  )
}
