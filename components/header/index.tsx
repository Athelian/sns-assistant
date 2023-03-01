'use client'
import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'

import logo from '@/components/logo'

export default function Header() {
  const { data: session } = useSession()
  const path = usePathname()
  const isRoot = path == '/'
  const isDashboard = path == '/dashboard'
  const isNavigable = path !== '/reg'

  return (
    <header
      className={`flex justify-between flex-col items-center bg-[#6339a5] text-[white] pt-24 pb-8 px-0 ${
        isRoot ? 'h-[740px]' : ''
      }`}
    >
      <div className="h-fit relative max-w-[980px] z-[2] w-[stretch] flex items-end justify-between px-7 py-0">
        {isRoot ? <div>{logo}</div> : <Link href="/">{logo}</Link>}
        {isNavigable && (
          <nav>
            {!!session ? (
              <>
                {!isDashboard && (
                  <Link
                    className="text-[white] no-underline mx-4 my-0 hover:text-[#ef86c1] hover:cursor-pointer"
                    href="/dashboard"
                  >
                    Dashboard
                  </Link>
                )}
                <span
                  className="text-[white] no-underline mx-4 my-0 hover:text-[#ef86c1] hover:cursor-pointer"
                  onClick={() => {
                    signOut({ callbackUrl: '/' })
                  }}
                >
                  Logout
                </span>
              </>
            ) : (
              <>
                <span
                  className="text-[white] no-underline mx-4 my-0 hover:text-[#ef86c1] hover:cursor-pointer"
                  onClick={() => {
                    signIn(undefined, {
                      callbackUrl: `${process.env.NEXT_PUBLIC_LOCAL_AUTH_URL}/dashboard`,
                    })
                  }}
                >
                  Log In
                </span>
                <span
                  className="text-[white] no-underline mx-4 my-0 hover:text-[#ef86c1] hover:cursor-pointer"
                  onClick={() => {
                    signIn(undefined, {
                      callbackUrl: `${process.env.NEXT_PUBLIC_LOCAL_AUTH_URL}/dashboard`,
                    })
                  }}
                >
                  Sign Up
                </span>
              </>
            )}
          </nav>
        )}
      </div>
      {isRoot && (
        <div className="h-fit relative max-w-[980px] z-[2] w-[stretch] flex items-end justify-between px-7 py-0 text-[124px]">
          Install a new marketing team.
        </div>
      )}
    </header>
  )
}
