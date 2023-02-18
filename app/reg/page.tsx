'use client'
import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import { StyledContainer } from './styles'

export default function Reg() {
  return (
    <StyledContainer>
      <div>
        <Button variant="contained">
          <FontAwesomeIcon icon={faTwitter} />
          &nbsp;Twitter
        </Button>
      </div>
    </StyledContainer>
  )
}
