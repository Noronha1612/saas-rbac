import { organizationSchema } from '@saas/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/getUserPermissions'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function transferOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/organizations/:slug/owner',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Transfer organization ownership',
          security: [{ bearerAuth: [] }],
          body: z.object({
            transferToUserId: z.string(),
          }),
          params: z.object({
            slug: z.string(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { transferToUserId } = request.body
        const { slug } = request.params

        const userId = await request.getCurrentUserId()
        const { organization, membership } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        const authOrganization = organizationSchema.parse(organization)

        console.log(membership)
        console.log(organization)

        if (cannot('transfer_ownership', authOrganization)) {
          throw new UnauthorizedError(
            'You are not allowed to transfer this organization to another user.',
          )
        }

        const transferToMembership = await prisma.member.findUnique({
          where: {
            organizationId_userId: {
              organizationId: organization.id,
              userId: transferToUserId,
            },
          },
        })

        if (!transferToMembership) {
          throw new BadRequestError(
            'Target user is not a user of this organization',
          )
        }

        await prisma.$transaction([
          prisma.member.update({
            where: {
              organizationId_userId: {
                organizationId: organization.id,
                userId: transferToUserId,
              },
            },
            data: {
              role: 'ADMIN',
            },
          }),
          prisma.organization.update({
            where: {
              id: organization.id,
            },
            data: {
              ownerId: transferToUserId,
            },
          }),
        ])

        return reply.status(204).send()
      },
    )
}