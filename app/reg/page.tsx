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
  getAuthRedirectIsPending,
  getProviderFromProviderId,
  isProviderId,
  signInWith,
} from '@/app/reg/helpers'
import { StyledContainer } from '@/app/styles'
import withoutSsr from '@/components/noSsrHoc'
import { auth } from '@/firebase/clientApp'

import { StyledButtonContainer } from './styles'

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
            router.push('/dashboard')
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

  return (
    <StyledContainer>
      {loading ? (
        <CircularProgress />
      ) : (
        <StyledButtonContainer>
          <Button
            variant="contained"
            onClick={() => {
              setLoading(true)
              signInWith(GoogleAuthProvider.PROVIDER_ID)
            }}
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
            onClick={() => {
              setLoading(true)
              signInWith(FacebookAuthProvider.PROVIDER_ID)
            }}
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
