import styled from '@emotion/styled'

export const Main = styled.main`
  min-height: 100vh;
  min-width: 800px;
  font-size: x-large;
  background-color: #6339a5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Banner = styled.header`
  height: 800px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  color: white;
  > div {
    height: fit-content;
    position: relative;
    max-width: 980px;
    padding: 0 28px;
    z-index: 2;
    width: -webkit-fill-available;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
`

export const Navbar = styled.nav`
  > a {
    margin: 0 1rem;
  }
`

export const Subtitle = styled.div`
  min-width: max-content;
`

export const Slogan = styled.div`
  font-size: 128px;
`

export const Body = styled.section`
  background-color: white;
`
