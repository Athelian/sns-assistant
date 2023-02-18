'use client'
import Section from '@/components/section'

import { StyledSection } from './styles'

export default function Page() {
  return (
    <StyledSection>
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
    </StyledSection>
  )
}
