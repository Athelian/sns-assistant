import { NextApiRequest, NextApiResponse } from 'next'
import { User } from 'firebase/auth'

import { db } from '@/firebase/nodeApp'

// Create a new user
export default async function handler(
  req: NextApiRequest,
  resp: NextApiResponse
) {
  try {
    const user: User = JSON.parse(req.body)
    db.collection('users').doc(user.uid).set({})
  } catch (e) {
    resp.status(400).json(e)
  }
}
