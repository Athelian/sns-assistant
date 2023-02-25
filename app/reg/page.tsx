'use client'
import { useEffect, useState } from 'react'

import {
  faFacebook,
  faGoogle,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, CircularProgress } from '@mui/material'
import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  getRedirectResult,
  FacebookAuthProvider,
  linkWithRedirect,
} from 'firebase/auth'
import { useRouter } from 'next/navigation'

import {
  getLoginPending,
  getProviderFromProviderId,
  isProviderId,
  signInWith,
} from '@/app/reg/helpers'
import { StyledContainer } from '@/app/styles'
import withoutSsr from '@/components/noSsrHoc'
import { auth } from '@/firebase/clientApp'
import { ProviderId } from '@/types/auth'

import { StyledButtonContainer } from './styles'

function Reg() {
  const router = useRouter()
  const providerToLink = sessionStorage.getItem('providerToLink') // Provider required for linking

  const [isLoggingIn, setIsLoggingIn] = useState(getLoginPending())

  const handleSignInWith = (providerId: ProviderId) => {
    sessionStorage.setItem('sns:pendingLogin', 'true')
    setIsLoggingIn(true)
    signInWith(providerId)
  }
  const handleSignInWithGoogle = () => {
    handleSignInWith(GoogleAuthProvider.PROVIDER_ID)
  }
  const handleSignInWithFacebook = () => {
    signInWith(FacebookAuthProvider.PROVIDER_ID)
  }

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // If user logged in...
          if (providerToLink && isProviderId(providerToLink)) {
            // ...but they were in the middle of linking their accounts...
            linkWithRedirect(
              result.user,
              getProviderFromProviderId(providerToLink)
            )
            sessionStorage.removeItem('providerToLink')
          } else {
            // ...otherwise call /api/login.
            fetch('/api/login', {
              method: 'POST',
              body: JSON.stringify(result.user),
            })
              .then((res) => {
                if (res.redirected) {
                  router.push(res.url)
                }
              })
              .catch(() => {
                setIsLoggingIn(false)
              })
              .finally(() => {
                sessionStorage.removeItem('sns:pendingLogin')
              })
          }
        }
      })
      .catch((error) => {
        sessionStorage.removeItem('sns:pendingLogin')
        setIsLoggingIn(false)
        const errorCode = error.code
        if (errorCode === 'auth/account-exists-with-different-credential') {
          const { providerId, verifiedProvider } =
            error.customData._tokenResponse
          if (
            confirm(
              `You have already signed up with ${verifiedProvider[0]} for that email. Would you like to link your account now?`
            )
          ) {
            sessionStorage.setItem('providerToLink', providerId)
            signInWith(verifiedProvider[0])
          }
        }
      })
  }, [isLoggingIn, router, providerToLink])

  return (
    <StyledContainer>
      {isLoggingIn ? (
        <CircularProgress />
      ) : (
        <StyledButtonContainer>
          <Button variant="contained" onClick={handleSignInWithGoogle}>
            <FontAwesomeIcon icon={faGoogle} />
            <span>Google</span>
          </Button>
          {/* <Button
            variant="contained"
            onClick={() => toggleSignIn(TwitterAuthProvider.PROVIDER_ID)}
          >
            <FontAwesomeIcon icon={faTwitter} />
            <span>Twitter</span>
          </Button> */}
          <Button variant="contained" onClick={handleSignInWithFacebook}>
            <FontAwesomeIcon icon={faFacebook} />
            <span>Facebook</span>
          </Button>
        </StyledButtonContainer>
      )}
    </StyledContainer>
  )
}

export default withoutSsr(Reg)
