'use client'
import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'

import logo from '@/components/logo'
// import { auth } from '@/firebase/clientApp'

import { Slogan, StyledHeader, StyledNavbar } from './styles'

export default function Header() {
  const { data: session } = useSession()
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
            {!!session ? (
              <>
                {!isDashboard && <Link href="/dashboard">Dashboard</Link>}
                <span
                  onClick={() => {
                    signOut()
                    router.push('/')
                  }}
                >
                  Logout
                </span>
              </>
            ) : (
              <>
                {/* <Link href="/reg">Log In</Link> */}
                <span
                  onClick={() => {
                    signIn()
                    router.push('/dashboard')
                  }}
                >
                  Sign Up
                </span>
              </>
            )}
          </StyledNavbar>
        )}
      </div>
      {isRoot && <Slogan>Install a new marketing team.</Slogan>}
    </StyledHeader>
  )
}
