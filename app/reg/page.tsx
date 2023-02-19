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
} from 'firebase/auth'

import { auth } from '@/lib/init'

import { StyledButtonContainer, StyledContainer } from './styles'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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

export default function Reg() {
  const router = useRouter()
  const [loading, setLoading] = useState(getAuthRedirectIsPending())

  useEffect(() => {
    getRedirectResult(auth)
      .then(function (result) {
        console.log('redirectResult', result)
        if (result) {
          router.push('/')
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // The email of the user's account used.
        var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert(
            'You have already signed up with a different auth provider for that email.'
          )
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [router])

  function toggleSignInGoogle() {
    if (!auth.currentUser) {
      setLoading(true)
      const provider = new GoogleAuthProvider()
      signInWithRedirect(auth, provider)
    } else {
      auth.signOut()
    }
  }

  function toggleSignInTwitter() {
    if (!auth.currentUser) {
      setLoading(true)
      const provider = new TwitterAuthProvider()
      signInWithRedirect(auth, provider)
    } else {
      auth.signOut()
    }
  }

  function toggleSignInFacebook() {
    if (!auth.currentUser) {
      setLoading(true)
      const provider = new FacebookAuthProvider()
      signInWithRedirect(auth, provider)
    } else {
      auth.signOut()
    }
  }

  return (
    <StyledContainer>
      {loading ? (
        <CircularProgress />
      ) : (
        <StyledButtonContainer>
          <Button variant="contained" onClick={toggleSignInGoogle}>
            <FontAwesomeIcon icon={faGoogle} />
            <span>Google</span>
          </Button>
          <Button variant="contained" onClick={toggleSignInTwitter}>
            <FontAwesomeIcon icon={faTwitter} />
            <span>Twitter</span>
          </Button>
          <Button variant="contained" onClick={toggleSignInFacebook}>
            <FontAwesomeIcon icon={faFacebook} />
            <span>Facebook</span>
          </Button>
        </StyledButtonContainer>
      )}
    </StyledContainer>
  )
}
