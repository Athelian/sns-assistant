import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithRedirect,
  TwitterAuthProvider,
} from 'firebase/auth'

import {
  facebookProvider,
  googleProvider,
  twitterProvider,
} from '@/app/reg/constants'
import { auth } from '@/firebase/clientApp'
import { ProviderId } from '@/types/auth'

export function getAuthRedirectIsPending() {
  return (
    sessionStorage.getItem(
      `firebase:pendingRedirect:${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}:[DEFAULT]`
    ) === '"true"'
  )
}

export function signInWith(providerId: ProviderId) {
  return signInWithRedirect(auth, getProviderFromProviderId(providerId))
}

export function getProviderFromProviderId(providerId: ProviderId) {
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

export function isProviderId(val: string): val is ProviderId {
  return [
    GoogleAuthProvider.PROVIDER_ID,
    TwitterAuthProvider.PROVIDER_ID,
    FacebookAuthProvider.PROVIDER_ID,
  ].includes(val as ProviderId)
}
