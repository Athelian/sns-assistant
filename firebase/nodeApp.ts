import * as admin from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'

const firebaseConfig = {
  credential: admin.credential.cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail:
      'firebase-adminsdk-5d1en@sns-assistant.iam.gserviceaccount.com',
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
}

if (!admin.apps.length) {
  admin.initializeApp(firebaseConfig)
}

const db = getFirestore()

export { db }
