'use client'

import { StyledContainer } from '@/app/styles'
import withoutSsr from '@/components/noSsrHoc'

function Dashboard() {
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

export default withoutSsr(Dashboard)
