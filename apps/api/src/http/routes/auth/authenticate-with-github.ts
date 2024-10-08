import { env } from '@saas/env'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function authenticateWithGithub(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/github',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate with github',
        body: z.object({
          code: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (req, rep) => {
      const { code } = req.body

      const oauthUrl = new URL('https://github.com/login/oauth/access_token')

      oauthUrl.searchParams.set('code', code)
      oauthUrl.searchParams.set('redirect_url', env.GITHUB_OAUTH_REDIRECT_URI)
      oauthUrl.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
      oauthUrl.searchParams.set('client_secret', env.GITHUB_OAUTH_SECRET_ID)

      const githubAccessTokenResponse = await fetch(oauthUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      })

      const githubAccessTokenData = await githubAccessTokenResponse.json()

      const { access_token: githubAccessToken } = z
        .object({
          access_token: z.string(),
          token_type: z.literal('bearer'),
          scope: z.string(),
        })
        .parse(githubAccessTokenData)

      try {
        const githubUserResponse = await fetch(
          new URL('https://api.github.com/user'),
          {
            headers: {
              Authorization: `Bearer ${githubAccessToken}`,
            },
          },
        )

        const githubUserData = await githubUserResponse.json()

        console.log(githubUserData)

        const {
          id: githubId,
          name,
          avatar_url: avatarUrl,
          email,
        } = z
          .object({
            id: z.number().int().transform(String),
            avatar_url: z.string().url(),
            name: z.string().nullable(),
            email: z.string().email().nullable(),
          })
          .parse(githubUserData)

        if (email === null) {
          throw new BadRequestError(
            'Your github account must have an email to authenticate',
          )
        }

        let user = await prisma.user.findUnique({
          where: {
            email,
          },
        })

        if (!user) {
          user = await prisma.user.create({
            data: {
              name,
              email,
              avatarUrl,
            },
          })
        }

        let account = await prisma.account.findUnique({
          where: {
            provider_userId: {
              provider: 'GITHUB',
              userId: user.id,
            },
          },
        })

        if (!account) {
          account = await prisma.account.create({
            data: {
              provider: 'GITHUB',
              providerAccountId: githubId,
              userId: user.id,
            },
          })
        }

        const token = await rep.jwtSign(
          {
            sub: user.id,
          },
          {
            sign: {
              expiresIn: '7d',
            },
          },
        )

        return rep.status(201).send({ token })
      } catch (err) {
        console.log(err)
      }
    },
  )
}
