import { User } from 'firebase/auth'
import * as admin from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'
import { NextApiRequest, NextApiResponse } from 'next'

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

// Handle login
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user: User = JSON.parse(req.body)
    const docRef = db.doc(`users/${user.uid}`)
    if (!(await docRef.get()).exists) {
      docRef.create({})
    }
    res.redirect(307, '/dashboard')
  } catch (e) {
    res.status(400).json(e)
  }
}
