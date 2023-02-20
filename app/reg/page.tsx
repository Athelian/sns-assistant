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
  signInWithRedirect,
  getRedirectResult,
  FacebookAuthProvider,
  linkWithRedirect,
} from 'firebase/auth'

import { auth } from '@/lib/init'

import { StyledButtonContainer, StyledContainer } from './styles'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import NoSsrWrapper from '@/components/noSsrWrapper'

const googleProvider = new GoogleAuthProvider()
const twitterProvider = new TwitterAuthProvider()
const facebookProvider = new FacebookAuthProvider()

type ProviderId =
  | typeof GoogleAuthProvider.PROVIDER_ID
  | typeof TwitterAuthProvider.PROVIDER_ID
  | typeof FacebookAuthProvider.PROVIDER_ID

function getAuthRedirectIsPending() {
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i)
    if (
      key?.startsWith('firebase:pendingRedirect') &&
      sessionStorage.getItem(key) === '"true"'
    ) {
      return true
    }
  }
  return false
}

function signInWithGoogle() {
  return signInWithRedirect(auth, googleProvider)
}

function signInWithTwitter() {
  return signInWithRedirect(auth, twitterProvider)
}

function signInWithFacebook() {
  return signInWithRedirect(auth, facebookProvider)
}

function getProviderFromProviderId(providerId: ProviderId) {
  switch (providerId) {
    case GoogleAuthProvider.PROVIDER_ID:
      return googleProvider
    case TwitterAuthProvider.PROVIDER_ID:
      return twitterProvider
    case FacebookAuthProvider.PROVIDER_ID:
    default:
      return facebookProvider
  }
}

function isProviderId(val: string): val is ProviderId {
  return [
    GoogleAuthProvider.PROVIDER_ID,
    TwitterAuthProvider.PROVIDER_ID,
    FacebookAuthProvider.PROVIDER_ID,
  ].includes(val as ProviderId)
}

function Reg() {
  const router = useRouter()
  const [loading, setLoading] = useState(getAuthRedirectIsPending())
  // Provider required for linking
  const providerToLink = sessionStorage.getItem('providerToLink')

  const signInWith = useCallback((providerId: ProviderId) => {
    switch (providerId) {
      case GoogleAuthProvider.PROVIDER_ID:
        return signInWithGoogle()
      case TwitterAuthProvider.PROVIDER_ID:
        return signInWithTwitter()
      case FacebookAuthProvider.PROVIDER_ID:
      default:
        return signInWithFacebook()
    }
  }, [])

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
              `You have already signed up with ${verifiedProvider.join(
                ' and '
              )} for that email. Would you like to link your account now?`
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
  }, [router, signInWith, providerToLink])

  const toggleSignIn = useCallback(
    (providerId: ProviderId) => {
      setLoading(true)
      if (!auth.currentUser) {
        signInWith(providerId)
      } else {
        return auth.signOut()
      }
    },
    [signInWith]
  )

  return (
    <StyledContainer>
      {loading ? (
        <CircularProgress />
      ) : (
        <StyledButtonContainer>
          <Button
            variant="contained"
            onClick={() => toggleSignIn('google.com')}
          >
            <FontAwesomeIcon icon={faGoogle} />
            <span>Google</span>
          </Button>
          <Button
            variant="contained"
            onClick={() => toggleSignIn('twitter.com')}
          >
            <FontAwesomeIcon icon={faTwitter} />
            <span>Twitter</span>
          </Button>
          <Button
            variant="contained"
            onClick={() => toggleSignIn('facebook.com')}
          >
            <FontAwesomeIcon icon={faFacebook} />
            <span>Facebook</span>
          </Button>
        </StyledButtonContainer>
      )}
    </StyledContainer>
  )
}

export default function NoSsrReg() {
  return (
    <NoSsrWrapper>
      <Reg />
    </NoSsrWrapper>
  )
}
