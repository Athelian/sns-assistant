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
    <div className="flex justify-center items-center mx-0 my-32 &[*]:black">
      <div
        className={`h-fit max-w-[980px] first-letter:uppercase first-letter:font-bold first-letter:text-[86px] first-letter:mr-4 ${
          variant === 'dark' ? 'first-letter:text-[#ef86c1]' : ''
        }`}
      >
        <div>{header}</div>
        <div>{body}</div>
      </div>
    </div>
  )
}
