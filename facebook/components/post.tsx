import type { Post } from '@prisma/client'

export default function Post({ post }: { post: Post }) {
  return (
    <div className="flex flex-col gap-4 w-full px-8 py-4 bg-neutral-50 rounded-lg">
      <div className="text-neutral-900">{post.message}</div>
      <div className="text-neutral-300">{post.postedAt.toDateString()}</div>
    </div>
  )
}
