'use client'
// import { useEffect, useState } from 'react'

import {
  faFacebook,
  faGoogle,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, CircularProgress } from '@mui/material'
// import {
//   GoogleAuthProvider,
//   TwitterAuthProvider,
//   getRedirectResult,
//   FacebookAuthProvider,
//   linkWithRedirect,
// } from 'firebase/auth'
import { useRouter } from 'next/navigation'

// import { StyledContainer } from '@/app/styles'
// import withoutSsr from '@/components/noSsrHoc'
// import { auth } from '@/firebase/clientApp'
import { ProviderId } from '@/types/auth'
import {
  getProviderFromProviderId,
  isProviderId,
  signInWith,
} from '@/utils/auth'

// import { StyledButtonContainer } from './styles'

export default function Reg() {
  const router = useRouter()
  // const providerToLink = sessionStorage.getItem('snai:providerToLink') // Provider required for linking

  // const [isLoggingIn, setIsLoggingIn] = useState(
  //   !!sessionStorage.getItem('snai:pendingLogin')
  // )

  // const handleSignInWith = (providerId: ProviderId) => {
  //   sessionStorage.setItem('snai:pendingLogin', 'true')
  //   setIsLoggingIn(true)
  //   signInWith(providerId)
  // }
  // const handleSignInWithGoogle = () => {
  //   handleSignInWith(GoogleAuthProvider.PROVIDER_ID)
  // }
  // const handleSignInWithFacebook = () => {
  //   handleSignInWith(FacebookAuthProvider.PROVIDER_ID)
  // }

  // useEffect(() => {
  //   getRedirectResult(auth)
  //     .then((result) => {
  //       if (result) {
  //         // If user logged in...
  //         if (providerToLink && isProviderId(providerToLink)) {
  //           // ...but they were in the middle of linking their accounts...
  //           linkWithRedirect(
  //             result.user,
  //             getProviderFromProviderId(providerToLink)
  //           )
  //           sessionStorage.removeItem('snai:providerToLink')
  //         } else {
  //           // ...otherwise call /api/login.
  //           fetch('/api/login', {
  //             method: 'POST',
  //             body: JSON.stringify(result.user),
  //           }).then((res) => {
  //             if (res.redirected) {
  //               router.push(res.url)
  //             }
  //           })
  //         }
  //         sessionStorage.removeItem('snai:pendingLogin')
  //       }
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code
  //       if (errorCode === 'auth/account-exists-with-different-credential') {
  //         const { providerId, verifiedProvider } =
  //           error.customData._tokenResponse
  //         if (
  //           confirm(
  //             `You have already signed up with ${verifiedProvider[0]} for that email. Would you like to link your account now?`
  //           )
  //         ) {
  //           sessionStorage.setItem('snai:providerToLink', providerId)
  //           signInWith(verifiedProvider[0])
  //         } else {
  //           sessionStorage.removeItem('snai:pendingLogin')
  //           setIsLoggingIn(false)
  //         }
  //       }
  //     })
  // }, [isLoggingIn, router, providerToLink])

  return (
    <div className="flex justify-center items-center grow-[6];">
      <div className="flex flex-col gap-4">
        <Button
          variant="contained"
          // onClick={handleSignInWithGoogle}
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
          // onClick={handleSignInWithFacebook}
        >
          <FontAwesomeIcon icon={faFacebook} />
          <span>Facebook</span>
        </Button>
      </div>
    </div>
  )
}

// export default Reg

// export default withoutSsr(Reg)
