import dynamic from 'next/dynamic'
import { ReactNode, ReactElement, Fragment } from 'react'

const NoSSRWrapper = (props: { children: ReactNode | ReactElement }) => (
  <Fragment>{props.children}</Fragment>
)

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
})
