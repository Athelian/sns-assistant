import styled from '@emotion/styled'

export const StyledHeader = styled.header`
  ${(props: { isRoot?: boolean }) => props.isRoot && 'height: 740px;'}
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  padding: 6rem 0 2rem 0;
  background-color: #6339a5;
  > div {
    height: fit-content;
    position: relative;
    max-width: 980px;
    padding: 0 28px;
    z-index: 2;
    width: fill-available;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
`

export const StyledNavbar = styled.nav`
  > a {
    margin: 0 1rem;
  }
`

export const Slogan = styled.div`
  font-size: 124px;
`
