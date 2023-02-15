import styles from './index.module.sass'

export default function Section({
  header,
  body,
}: {
  header: string
  body: string
}) {
  return (
    <section className={styles.container}>
      <div className={styles.background} />
      <div className={styles.textContainer}>
        <div className={styles.header}>{header}...</div>
        <div className={styles.body}>{body}</div>
      </div>
    </section>
  )
}

/**
 * <li>
          Turbocharge your social media presence with artificial intelligence
        </li>
        <li>Automate your engagement with online audiences</li>
        <li>Generate advertisements for new products</li>
 */
