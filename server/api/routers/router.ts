import type { Post, PrismaClient } from '@prisma/client'
import { Configuration, OpenAIApi } from 'openai'
import { z } from 'zod'

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '@/server/api/trpc'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const getFacebookPosts = ({ prisma }: { prisma: PrismaClient }) => {
  return prisma.post.findMany({
    orderBy: { postedAt: 'desc' },
  })
}

export const router = createTRPCRouter({
  generateFacebookPost: protectedProcedure.query(
    async ({ ctx: { prisma } }) => {
      const posts = await getFacebookPosts({ prisma })
      try {
        const completion = await openai.createCompletion({
          model: 'text-davinci-002',
          prompt: generatePrompt(posts),
          temperature: 0.6,
        })
        return completion.data.choices[0].text
      } catch (error: unknown) {
        // TODO: Throw TRPC error
        if (error instanceof Error) {
          console.error(`Error with OpenAI API request: ${error.message}`)
          return error.message
        }
      }
    }
  ),

  getFacebookPosts: protectedProcedure.query(async ({ ctx: { prisma } }) => {
    return await getFacebookPosts({ prisma })
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

  createFacebookPost: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const post = await ctx.prisma.post.create({
        data: {
          message: input,
          externalID: null,
          postedAt: new Date(),
        },
      })
      return post
    }),
})

function generatePrompt(posts: Post[]) {
  return `The following is a series of Facebook on the user's account. Generate a supplementary post
based on the content of the posts.

${posts.map((post, i) => `${i}: ${post.message}`).join('\n\n')}

`
}
