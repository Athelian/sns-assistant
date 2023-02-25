import { useCallback } from 'react'

import Script from 'next/script'

export default function FacebookSDK() {
  const handleLoadedSdk = useCallback(() => {
    window.fbAsyncInit = () => {
      FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v16.0',
      })
    }
  }, [])

  return (
    <Script
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src="https://connect.facebook.net/en_US/sdk.js"
      onLoad={handleLoadedSdk}
    />
  )
}
