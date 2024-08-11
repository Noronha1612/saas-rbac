import { roleSchema } from '@saas/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/getUserPermissions'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function getMembers(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:orgSlug/members',
      {
        schema: {
          tags: ['Members'],
          summary: 'Get all organization members',
          security: [{ bearerAuth: [] }],
          params: z.object({
            orgSlug: z.string(),
          }),
          response: {
            200: z.object({
              members: z.array(
                z.object({
                  id: z.string().uuid(),
                  userId: z.string().uuid(),
                  role: roleSchema,
                  name: z.string().nullable(),
                  email: z.string().email(),
                  avatarUrl: z.string().url().nullable(),
                }),
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const { orgSlug } = request.params
        const userId = await request.getCurrentUserId()
        const { organization, membership } =
          await request.getUserMembership(orgSlug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('get', 'User')) {
          throw new UnauthorizedError(
            'You are not allowed to see organization members.',
          )
        }

        const members = await prisma.member.findMany({
          select: {
            id: true,
            role: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
              },
            },
          },
          where: {
            organizationId: organization.id,
          },
          orderBy: {
            role: 'asc',
          },
        })

        return reply.status(200).send({
          members: members.map(({ user, ...member }) => ({
            id: member.id,
            role: member.role,
            userId: user.id,
            name: user.name,
            email: user.email,
            avatarUrl: user.avatarUrl,
          })),
        })
      },
    )
}
