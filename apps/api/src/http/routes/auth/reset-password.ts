import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function resetPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/passwords/reset',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Reset password',
        body: z.object({
          code: z.string(),
          password: z.string().min(6),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (req, rep) => {
      const { code, password } = req.body

      const tokenFromCode = await prisma.token.findUnique({
        where: {
          id: code,
        },
      })

      if (!tokenFromCode) {
        throw new UnauthorizedError('Code is not valid or expired')
      }

      const passwordHash = await hash(password, 6)

      await prisma.$transaction([
        prisma.user.update({
          where: {
            id: tokenFromCode.userId,
          },
          data: {
            passwordHash,
          },
        }),

        prisma.token.delete({
          where: {
            id: code,
          },
        }),
      ])

      return rep.status(204).send()
    },
  )
}
