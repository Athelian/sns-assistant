namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'test' | 'production'
    NEXT_PUBLIC_LOCAL_AUTH_URL: string
    DATABASE_URL: string
    NEXT_PUBLIC_FACEBOOK_APP_ID: string
    FACEBOOK_SECRET: string
    OPENAI_API_KEY: string
  }
}
