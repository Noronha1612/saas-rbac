import { compare } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

export async function authenticateWithPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/password',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate with email and password',
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          400: z.object({ message: z.string() }),
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (req, rep) => {
      const { email, password } = req.body

      const userFromEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!userFromEmail) {
        return rep.status(400).send({ message: 'Invalid credentials' })
      }

      if (userFromEmail.passwordHash === null) {
        return rep
          .status(400)
          .send({ message: 'User does not have a password, use social login' })
      }

      const isPasswordValid = await compare(
        password,
        userFromEmail.passwordHash,
      )

      if (!isPasswordValid) {
        return rep.status(400).send({ message: 'Invalid credentials' })
      }

      const token = await rep.jwtSign(
        {
          sub: userFromEmail.id,
        },
        {
          sign: {
            expiresIn: '7d',
          },
        },
      )

      return rep.status(201).send({ token })
    },
  )
}
