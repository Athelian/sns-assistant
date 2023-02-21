import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth'

export const googleProvider = new GoogleAuthProvider()
export const twitterProvider = new TwitterAuthProvider()
export const facebookProvider = new FacebookAuthProvider()
