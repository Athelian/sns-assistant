import NextAuth, { AuthOptions } from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user }) {
      let isAllowedToSignIn = true
      // const allowedUser = ['YOURGITHUBACCID']
      console.log(user)
      // if (allowedUser.includes(String(user.id))) {
      //   isAllowedToSignIn = true
      // } else {
      //   isAllowedToSignIn = false
      // }
      return isAllowedToSignIn
    },
  },
}
export default NextAuth(authOptions)
