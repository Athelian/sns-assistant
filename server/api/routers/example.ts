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

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany()
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!'
  }),

  writeFacebookMessages: protectedProcedure
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
