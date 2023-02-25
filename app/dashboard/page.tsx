'use client'

import { StyledContainer } from '@/app/styles'

export default function Dashboard() {
  FB.ui(
    {
      method: 'share',
      href: 'https://developers.facebook.com/docs/',
    },
    function (response) {
      console.log(response)
    }
  )

  return <StyledContainer>Tweets</StyledContainer>
}
