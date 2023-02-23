'use client'
import { Button, CircularProgress } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faGoogle,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'

import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  getRedirectResult,
  FacebookAuthProvider,
  linkWithRedirect,
} from 'firebase/auth'

import { auth } from '@/firebase/clientApp'

import { StyledButtonContainer, StyledContainer } from './styles'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ProviderId } from '@/types/auth'
import {
  getAuthRedirectIsPending,
  getProviderFromProviderId,
  isProviderId,
  signInWith,
} from '@/app/reg/helpers'
import withoutSsr from '@/components/noSsrHoc'

function Reg() {
  const router = useRouter()
  const [loading, setLoading] = useState(getAuthRedirectIsPending())
  // Provider required for linking
  const providerToLink = sessionStorage.getItem('providerToLink')

  useEffect(() => {
    getRedirectResult(auth)
      .then(function (result) {
        console.log('redirectResult', result)
        if (result) {
          if (providerToLink && isProviderId(providerToLink)) {
            sessionStorage.removeItem('providerToLink')
            linkWithRedirect(
              result.user,
              getProviderFromProviderId(providerToLink)
            )
          } else {
            fetch('/api/createUser', {
              method: 'POST',
              body: JSON.stringify(result.user),
            }).then((res) => res.json())
            router.push('/')
          }
        }
      })
      .catch(function (error) {
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
        } else {
          console.error(error)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [router, providerToLink])

  const toggleSignIn = (providerId: ProviderId) => {
    setLoading(true)
    if (!auth.currentUser) {
      signInWith(providerId)
    } else {
      return auth.signOut()
    }
  }

  return (
    <StyledContainer>
      {loading ? (
        <CircularProgress />
      ) : (
        <StyledButtonContainer>
          <Button
            variant="contained"
            onClick={() => toggleSignIn(GoogleAuthProvider.PROVIDER_ID)}
          >
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
          <Button
            variant="contained"
            onClick={() => toggleSignIn(FacebookAuthProvider.PROVIDER_ID)}
          >
            <FontAwesomeIcon icon={faFacebook} />
            <span>Facebook</span>
          </Button>
        </StyledButtonContainer>
      )}
    </StyledContainer>
  )
}

export default withoutSsr(Reg)
