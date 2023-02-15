import classNames from 'classnames'
import styles from './index.module.sass'

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
    <section className={styles.container}>
      <div
        className={classNames(
          styles.textContainer,
          styles[`textContainer--${variant}`]
        )}
      >
        <div className={styles.header}>{header}...</div>
        <div className={styles.body}>{body}</div>
      </div>
      <div
        className={classNames(
          styles.background,
          styles[`background--${variant}`]
        )}
      />
    </section>
  )
}
