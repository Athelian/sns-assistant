'use client'
import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

import logo from '@/components/logo'
import { useAuth } from '@/contexts/authContext'
// import { auth } from '@/firebase/clientApp'

import { Slogan, StyledHeader, StyledNavbar } from './styles'

export default function Header() {
  const isAuthenticated = useAuth()
  const path = usePathname()
  const router = useRouter()
  const isRoot = path == '/'
  const isDashboard = path == '/dashboard'
  const isNavigable = path !== '/reg'

  return (
    <StyledHeader isRoot={isRoot}>
      <div>
        {isRoot ? <div>{logo}</div> : <Link href="/">{logo}</Link>}
        {isNavigable && (
          <StyledNavbar>
            {isAuthenticated !== null &&
              (isAuthenticated ? (
                <>
                  {!isDashboard && <Link href="/dashboard">Dashboard</Link>}
                  <span
                    onClick={() => {
                      // auth.signOut()
                      router.push('/')
                    }}
                  >
                    Logout
                  </span>
                </>
              ) : (
                <>
                  <Link href="/reg">Log In</Link>
                  <Link href="/reg">Sign Up</Link>
                </>
              ))}
          </StyledNavbar>
        )}
      </div>
      {isRoot && <Slogan>Install a new marketing team.</Slogan>}
    </StyledHeader>
  )
}
