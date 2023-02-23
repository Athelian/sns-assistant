'use client'
import logo from '@/components/logo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/authContext'
import React from 'react'

import { Slogan, StyledHeader, StyledNavbar } from './styles'
import { auth } from '@/firebase/clientApp'

export default function Header() {
  const isAuthenticated = useAuth()
  const path = usePathname()
  const isRoot = path === '/'

  return (
    <StyledHeader isRoot={isRoot}>
      <div>
        {isRoot ? <div>{logo}</div> : <Link href="/">{logo}</Link>}
        {isRoot && (
          <StyledNavbar>
            {isAuthenticated !== null &&
              (isAuthenticated ? (
                <>
                  <Link href="/">My Account</Link>
                  <span
                    onClick={() => {
                      auth.signOut()
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
