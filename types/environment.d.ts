namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'test' | 'production'
    LOCAL_AUTH_URL: string
    DATABASE_URL: string
    FACEBOOK_APP_ID: string
    FACEBOOK_SECRET: string
    OPENAI_API_KEY: string
  }
}
