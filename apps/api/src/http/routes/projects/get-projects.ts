import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/getUserPermissions'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function getProjects(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:orgSlug/projects',
      {
        schema: {
          tags: ['Projects'],
          summary: 'Get all organization projects',
          security: [{ bearerAuth: [] }],
          params: z.object({
            orgSlug: z.string(),
          }),
          response: {
            200: z.object({
              projects: z.array(
                z.object({
                  id: z.string().uuid(),
                  name: z.string(),
                  slug: z.string(),
                  description: z.string().nullable(),
                  ownerId: z.string().uuid(),
                  avatarUrl: z.string().url().nullable(),
                  organizationId: z.string().uuid(),
                  createdAt: z.date(),
                  owner: z.object({
                    id: z.string().uuid(),
                    name: z.string().nullable(),
                    avatarUrl: z.string().url().nullable(),
                  }),
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

        const projects = await prisma.project.findMany({
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            ownerId: true,
            avatarUrl: true,
            organizationId: true,
            createdAt: true,
            owner: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
          where: {
            organizationId: organization.id,
          },
          orderBy: {
            createdAt: 'desc',
          },
        })

        if (cannot('get', 'Project')) {
          throw new UnauthorizedError(
            'You are not allowed to see organization projects.',
          )
        }

        return reply.status(200).send({
          projects,
        })
      },
    )
}
