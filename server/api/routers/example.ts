import { z } from 'zod'

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '@/server/api/trpc'

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      }
    }),

  getFacebookPosts: protectedProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany()

    return posts
  }),

  setFacebookPosts: protectedProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          message: z.string(),
          postedAt: z.string().or(z.date()),
        })
      )
    )
    .mutation(async ({ input, ctx }) => {
      const posts = await Promise.all(
        input.map(
          async ({ id: externalID, message, postedAt }) =>
            await ctx.prisma.post.upsert({
              where: { externalID },
              update: {
                message,
              },
              create: {
                message,
                externalID,
                postedAt:
                  typeof postedAt === 'string' ? new Date(postedAt) : postedAt,
              },
            })
        )
      )

      return posts
    }),
})
