import admin from 'firebase-admin'
import { NextApiRequest, NextApiResponse } from 'next'
import TwitterApi from 'twitter-api-v2'

admin.initializeApp()

// Database reference
const dbRef = admin.firestore().doc('tokens/demo')

// Twitter API init
const twitterClient = new TwitterApi({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
})

const callbackURL = 'http://127.0.0.1:5000/sns-assistant/us-central1/auth'

// STEP 1 - Auth URL
export default async function handler(
  _: NextApiRequest,
  resp: NextApiResponse
) {
  const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
    callbackURL,
    {
      scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
    }
  )

  // store verifier
  await dbRef.set({
    codeVerifier,
    state,
  })

  resp.redirect(url)
}
