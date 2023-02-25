import { ReactNode, ReactElement, Fragment, ComponentType } from 'react'

import dynamic from 'next/dynamic'

const NoSsrWrapper = dynamic(
  () =>
    Promise.resolve((props: { children: ReactNode | ReactElement }) => (
      <Fragment>{props.children}</Fragment>
    )),
  {
    ssr: false,
  }
)

export default function withoutSsr<T>(Component: ComponentType<T>) {
  return function hoc(hocProps: T) {
    return (
      <NoSsrWrapper>
        <Component {...hocProps} {...{}} />
      </NoSsrWrapper>
    )
  }
}
