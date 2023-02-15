import { https } from 'firebase-functions'
import admin from 'firebase-admin'
import TwitterApi from 'twitter-api-v2'

// OpenAI API init
import { Configuration, OpenAIApi } from 'openai'
admin.initializeApp()

// Database reference
const dbRef = admin.firestore().doc('tokens/demo')

// Twitter API init
const twitterClient = new TwitterApi({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
})

const callbackURL = 'http://127.0.0.1:5000/sns-assistant/us-central1/auth'
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

// STEP 1 - Auth URL
exports.auth = https.onRequest(async (_, resp) => {
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
})

// STEP 2 - Verify callback code, store access_token
exports.callback = https.onRequest(async (req, resp) => {
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
})

// STEP 3 - Refresh tokens and post tweets
exports.tweet = https.onRequest(async (_, resp) => {
  const snapshotData = (await dbRef.get()).data()

  if (snapshotData === undefined) {
    resp.status(400).send('Failed to get snapshot data')
    return
  }

  const { refreshToken } = snapshotData

  const {
    client: refreshedClient,
    accessToken,
    refreshToken: newRefreshToken,
  } = await twitterClient.refreshOAuth2Token(refreshToken)

  await dbRef.set({
    accessToken,
    refreshToken: newRefreshToken,
  })

  const nextTweetGeneration = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: 'tweet something cool for #techtwitter',
    max_tokens: 64,
  })

  const nextTweet = nextTweetGeneration.data.choices[0].text

  if (nextTweet === undefined) {
    resp.status(400).send('Failed to generate tweet')
    return
  }

  const { data } = await refreshedClient.v2.tweet(nextTweet)

  resp.send(data)
})
