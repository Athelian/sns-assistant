namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'test' | 'production'
    DATABASE_URL: string
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    NEXT_PUBLIC_FACEBOOK_BUSINESS_APP_ID: string
    NEXT_PUBLIC_FACEBOOK_APP_ID: string
    FACEBOOK_APP_SECRET: string
    FACEBOOK_BUSINESS_APP_SECRET: string
    OPENAI_API_KEY: string
  }
}
