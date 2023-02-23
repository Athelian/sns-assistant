import { auth } from '@/firebase/clientApp'
import { useEffect, useState } from 'react'

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((nextOrObserver) => {
      console.log('next obs', nextOrObserver)
      setIsAuthenticated(!!nextOrObserver)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return { isAuthenticated }
}
