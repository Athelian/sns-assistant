'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { Slogan, StyledHeader, StyledNavbar, Subtitle } from './styles'

const logo = (
  <>
    <Image
      src="/snai-high-resolution-logo-color-on-transparent-background.png"
      alt="snai logo"
      width={400}
      height={129.2}
      priority
    />
    <Subtitle>A revolution in social media networking</Subtitle>
  </>
)

export default function Header() {
  const path = usePathname()
  const isRoot = path === '/'

  return (
    <StyledHeader isRoot={isRoot}>
      <div>
        {isRoot ? <div>{logo}</div> : <Link href="/">{logo}</Link>}
        {isRoot && (
          <StyledNavbar>
            <Link href="/login">Log In</Link>
            <Link href="/reg">Sign Up</Link>
          </StyledNavbar>
        )}
      </div>
      {isRoot && <Slogan>Install a new marketing team.</Slogan>}
    </StyledHeader>
  )
}
