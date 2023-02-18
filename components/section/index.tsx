import { Container, TextContainer } from './styles'

export default function Section({
  variant,
  header,
  body,
}: {
  variant: 'light' | 'dark'
  header: string
  body: string
}) {
  return (
    <Container>
      <TextContainer variant={variant}>
        <div>{header}</div>
        <div>{body}</div>
      </TextContainer>
    </Container>
  )
}
