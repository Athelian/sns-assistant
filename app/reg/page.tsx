'use client'
import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import { TwitterAuthProvider, signInWithPopup } from 'firebase/auth'

import { auth } from '@/lib/init'

import { StyledContainer } from './styles'
import { useState } from 'react'

export default function Reg() {
  const [twitterState, setTwitterState] = useState<{
    token: string | null
    secret: string | null
  }>({
    token: null,
    secret: null,
  })

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
          var token = result.credential.accessToken as string
          // @ts-expect-error Need to define shape of twitter response.
          var secret = result.credential.secret as string
          // The signed-in user info.
          var user = result.user
          setTwitterState({ token, secret })
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
    } else {
      auth.signOut()
    }
  }

  return (
    <StyledContainer>
      <div>
        <Button variant="contained" onClick={toggleSignInTwitter}>
          <FontAwesomeIcon icon={faTwitter} />
          &nbsp;Twitter
        </Button>
      </div>
    </StyledContainer>
  )
}
