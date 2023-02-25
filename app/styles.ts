import styled from '@emotion/styled'

export const StyledMain = styled.main`
  min-height: 100vh;
  min-width: 800px;
  font-size: x-large;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const StyledSection = styled.section`
  background-color: white;
`

export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 6;
  > div {
    height: max-content;
  }
`
