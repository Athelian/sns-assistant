import NextAuth, { AuthOptions } from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'

export const authOptions: AuthOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
  },
}
export default NextAuth(authOptions)
