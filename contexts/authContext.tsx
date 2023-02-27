import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from 'react'

import { onAuthStateChanged } from 'firebase/auth'

// import { auth } from '@/firebase/clientApp'

type AuthContextType = boolean | null

export const AuthContext = createContext<AuthContextType>(null)

export default function AuthContextComp({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  // useEffect(() => {
  //   // Listen authenticated user
  //   const unsubscriber = onAuthStateChanged(auth, async (user) => {
  //     try {
  //       if (user) {
  //         setIsAuthenticated(true)
  //         document.cookie = 'authorized=true'
  //       } else {
  //         setIsAuthenticated(false)
  //         document.cookie = 'authorized=false'
  //       }
  //     } catch (error) {
  //       // Most probably a connection error. Handle appropriately.
  //     }
  //   })

  //   // Unsubscribe auth listener on unmount
  //   return () => unsubscriber()
  // }, [])

  return (
    <AuthContext.Provider value={isAuthenticated}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook that shorthands the context!
export const useAuth = () => useContext(AuthContext)
