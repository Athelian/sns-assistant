import { Subtitle } from '@/components/logo/styles'
import Image from 'next/image'
import React from 'react'

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

export default logo
