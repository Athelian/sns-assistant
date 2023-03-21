import Image from 'next/image'

import SnaiLogo from '@/public/snai-high-resolution-logo-color-on-transparent-background.png'

const logo = (
  <>
    <Image src={SnaiLogo} alt="snai logo" width={400} height={129.2} priority />
    <div className="min-w-max">A revolution in social media networking</div>
  </>
)

export default logo
