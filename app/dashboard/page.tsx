'use client'

// import { StyledContainer } from '@/app/styles'

function Dashboard() {
  const handleClick = () => {
    // @see https://developers.facebook.com/docs/sharing/reference/share-dialog/
    FB.ui({
      method: 'share',
      href: 'https://developers.facebook.com/docs/',
    })
  }

  return (
    <div>
      <button onClick={handleClick}>シェアする</button>
    </div>
  )
}

export default Dashboard
