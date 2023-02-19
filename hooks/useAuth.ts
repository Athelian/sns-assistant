import { auth } from '@/lib/init'
import { useState } from 'react'

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  auth.onAuthStateChanged((nextOrObserver) => {
    console.log('next obs', nextOrObserver)
    setIsAuthenticated(!!nextOrObserver)
  })

  return { isAuthenticated }
}
