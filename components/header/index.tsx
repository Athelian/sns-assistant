'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Slogan, StyledHeader, StyledNavbar, Subtitle } from './styles'

export default function Header() {
  const path = usePathname()
  const isRoot = path === '/'

  return (
    <StyledHeader isRoot={isRoot}>
      <div>
        <div>
          <Image
            src="/snai-high-resolution-logo-color-on-transparent-background.png"
            alt="snai logo"
            width={400}
            height={129.2}
            priority
          />
          <Subtitle>A revolution in social media networking</Subtitle>
        </div>
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
