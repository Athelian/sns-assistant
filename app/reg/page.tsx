'use client'
import { Button, CircularProgress } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'

import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth'

import { auth } from '@/lib/init'

import { StyledButtonContainer, StyledContainer } from './styles'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const getAuthRedirectIsPending = () => {
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
  /**
   * Function called when clicking the Login/Logout button.
   */
  function toggleSignInGoogle() {
    if (!auth.currentUser) {
      setLoading(true)
      var provider = new GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/plus.login')
      signInWithRedirect(auth, provider)
    } else {
      auth.signOut()
    }
  }

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

  /**
   * Function called when clicking the Login/Logout button.
   */
  function toggleSignInTwitter() {
    if (!auth.currentUser) {
      const provider = new TwitterAuthProvider()
      signInWithPopup(auth, provider)
        .then(function (result) {
          // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
          // You can use these server side with your app's credentials to access the Twitter API.

          // @ts-expect-error Need to define shape of twitter response.
          const token = result.credential.accessToken as string
          // @ts-expect-error Need to define shape of twitter response.
          const secret = result.credential.secret as string
          // The signed-in user info.
          const user = result.user
        })
        .catch(function (error) {
          // Handle Errors here.
          const errorCode = error.code
          const errorMessage = error.message
          // The email of the user's account used.
          const email = error.email
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential
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
            &nbsp;Google
          </Button>
          <Button variant="contained" onClick={toggleSignInTwitter}>
            <FontAwesomeIcon icon={faTwitter} />
            &nbsp;Twitter
          </Button>
        </StyledButtonContainer>
      )}
    </StyledContainer>
  )
}
