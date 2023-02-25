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

// STEP 2 - Verify callback code, store access_token
export default async function handler(
  req: NextApiRequest,
  resp: NextApiResponse
) {
  const { state, code } = req.query

  if (code !== 'string') {
    resp.status(400).send('Invalid code')
    return
  }

  const snapshotData = (await dbRef.get()).data()

  if (snapshotData === undefined) {
    resp.status(400).send('Failed to get snapshot data')
    return
  }

  const { codeVerifier, state: storedState } = snapshotData

  if (state !== storedState) {
    resp.status(400).send('Stored tokens do not match!')
  }

  const {
    client: loggedClient,
    accessToken,
    refreshToken,
  } = await twitterClient.loginWithOAuth2({
    code,
    codeVerifier,
    redirectUri: callbackURL,
  })

  await dbRef.set({
    accessToken,
    refreshToken,
  })

  const { data } = await loggedClient.v2.me() // start using the client if you want

  resp.send(data)
}
