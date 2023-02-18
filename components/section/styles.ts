import styled from '@emotion/styled'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8rem 0;
  * {
    color: black;
  }
`

export const TextContainer = styled.div`
  height: fit-content;
  max-width: 980px;
  padding: 0 4rem;
  &:first-letter {
    ${(props: { variant: 'light' | 'dark' }) =>
      props.variant === 'dark' && 'color: #ef86c1;'}
    text-transform: uppercase;
    font-weight: bolder;
    font-size: 86px;
    margin-right: 1rem;
  }
`
