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
          message: z.string(),
          postedAt: z.string().or(z.date()),
        })
      )
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.post.createMany({
        data: input.map(({ postedAt, ...rest }) => ({
          ...rest,
          postedAt:
            typeof postedAt === 'string' ? new Date(postedAt) : postedAt,
        })),
      })
    }),
})
