import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth'

type ProviderId =
  | typeof GoogleAuthProvider.PROVIDER_ID
  | typeof TwitterAuthProvider.PROVIDER_ID
  | typeof FacebookAuthProvider.PROVIDER_ID
