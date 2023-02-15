import Image from 'next/image'
import { Cabin } from '@next/font/google'
import styles from './page.module.sass'
import Section from '@/components/section'
import classNames from 'classnames'

const inter = Cabin({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={classNames(inter.className, styles.main)}>
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
        variant="dark"
        header={
          'Elevate your social media presence with artificial intelligence'
        }
        body={
          'Integrate world class machine learning with your business platform to manage your social media presence. By using SNAI, you are leading the way in the new world of automated marketing'
        }
      />
      <Section
        variant="light"
        header={'Turbocharge your engagement with online audiences'}
        body={
          'Respond to enquiries the moment they arrive with your latest product information and in a style that represents your brand.'
        }
      />
      <Section
        variant="dark"
        header={"Automate your brand's advertising"}
        body={
          'With Snai you can generate new product showcases without lifting a finger. Integrate your product line and let the assistant take care of the rest.'
        }
      />
    </main>
  )
}
