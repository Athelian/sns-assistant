import type { Post } from '@prisma/client'

export default function Post({ post }: { post: Post }) {
  return (
    <div>
      <div>{post.message}</div>
      <div>{post.createdAt.toDateString()}</div>
    </div>
  )
}
