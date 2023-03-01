// import { NextApiRequest, NextApiResponse } from 'next'
// import { Configuration, OpenAIApi } from 'openai'
// import TwitterApi from 'twitter-api-v2'

// // Twitter API init
// const twitterClient = new TwitterApi({
//   clientId: 'YOUR_CLIENT_ID',
//   clientSecret: 'YOUR_CLIENT_SECRET',
// })

// const callbackURL = 'http://127.0.0.1:5000/sns-assistant/us-central1/auth'
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// })
// const openai = new OpenAIApi(configuration)

// // STEP 3 - Refresh tokens and post tweets
// export default async function handler(
//   _: NextApiRequest,
//   resp: NextApiResponse
// ) {
//   const snapshotData = {}

//   if (snapshotData === undefined) {
//     resp.status(400).send('Failed to get snapshot data')
//     return
//   }

//   const { refreshToken } = snapshotData

//   const {
//     client: refreshedClient,
//     accessToken,
//     refreshToken: newRefreshToken,
//   } = await twitterClient.refreshOAuth2Token(refreshToken)

//   const nextTweetGeneration = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: 'tweet something cool for #techtwitter',
//     max_tokens: 64,
//   })

//   const nextTweet = nextTweetGeneration.data.choices[0].text

//   if (nextTweet === undefined) {
//     resp.status(400).send('Failed to generate tweet')
//     return
//   }

//   const { data } = await refreshedClient.v2.tweet(nextTweet)

//   resp.send(data)
// }

export default function handler() {}
