import React from 'react'

import Image from 'next/image'

// import { Subtitle } from '@/components/logo/styles'

const logo = (
  <>
    <Image
      src="/snai-high-resolution-logo-color-on-transparent-background.png"
      alt="snai logo"
      width={400}
      height={129.2}
      priority
    />
    <div className="min-w-max">A revolution in social media networking</div>
  </>
)

export default logo
