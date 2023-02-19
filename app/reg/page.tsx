'use client'
import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'

import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
} from 'firebase/auth'

import { auth } from '@/lib/init'

import { StyledButtonContainer, StyledContainer } from './styles'

export default function Reg() {
  /**
   * Function called when clicking the Login/Logout button.
   */
  function toggleSignInGoogle() {
    if (!auth.currentUser) {
      const provider = new GoogleAuthProvider()
      signInWithPopup(auth, provider)
        .then(function (result) {
          /**
           * This gives you a Google Access Token. You can use it to access the Google API.
           * This is taken from docs, but it is wrong it is either
           * _tokenResponse.oauthAccessToken (not on interface) or user.stsTokenManager.accessToken
           */
          const user = result.user
          console.log(result)
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
      <StyledButtonContainer>
        <Button variant="contained" onClick={toggleSignInGoogle}>
          <FontAwesomeIcon icon={faGoogle} size="lg" />
          &nbsp;Google
        </Button>
        <Button variant="contained" onClick={toggleSignInTwitter}>
          <FontAwesomeIcon icon={faTwitter} size="lg" />
          &nbsp;Twitter
        </Button>
      </StyledButtonContainer>
    </StyledContainer>
  )
}
