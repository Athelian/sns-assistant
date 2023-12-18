import https from 'https'

import type { Post, PrismaClient } from '@prisma/client'
import { Configuration, OpenAIApi } from 'openai'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const getFacebookPosts = ({ prisma }: { prisma: PrismaClient }) => {
  return prisma.post.findMany({
    orderBy: { postedAt: 'desc' },
  })
}

// TODO: Split router based on provider
export const router = createTRPCRouter({
  initFacebookUser: protectedProcedure
    .input(
      z.object({ providerAccountId: z.string(), userAccessToken: z.string() })
    )
    .mutation(async ({ input, ctx }) => {
      const { providerAccountId } = input
      https.get(
        `https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.NEXT_PUBLIC_FACEBOOK_BUSINESS_APP_ID}&client_secret=${process.env.FACEBOOK_BUSINESS_APP_SECRET}&fb_exchange_token=${input.userAccessToken}`,
        (res) => {
          res.on('data', async (d: Uint8Array) => {
            const res = JSON.parse(d.toString())
            if (!res.access_token) {
              throw new Error('No access token')
            }
            if (ctx.session.user.id) {
              const { access_token: userAccessToken } = res
              const account = await ctx.prisma.account.findUnique({
                where: {
                  provider_providerAccountId: {
                    providerAccountId: providerAccountId,
                    provider: 'facebook',
                  },
                },
              })
              if (!account) {
                await ctx.prisma.account.create({
                  data: {
                    user: { connect: { id: ctx.session.user.id } },
                    type: 'oauth',
                    provider: 'facebook',
                    providerAccountId: providerAccountId,
                    long_lived_access_token: userAccessToken,
                  },
                })
              } else {
                ctx.prisma.account.update({
                  where: {
                    provider_providerAccountId: {
                      providerAccountId: providerAccountId,
                      provider: 'facebook',
                    },
                  },
                  data: {
                    long_lived_access_token: userAccessToken,
                  },
                })
              }
            }
          })
        }
      )
    }),

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
      // TODO: Publish to Facebook
      return post
    }),
})

function generatePrompt(posts: Post[]) {
  return `The following is a series of Facebook on the user's account. Generate a supplementary post
based on the content of the posts.

${posts.map((post, i) => `${i}: ${post.message}`).join('\n\n')}

`
}
