import { User } from 'firebase/auth'
import { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/firebase/nodeApp'

// Create a new user
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
