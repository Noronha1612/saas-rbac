import { FastifyInstance } from 'fastify'

import { acceptInvite } from './accept-invite'
import { createInvite } from './create-invite'
import { getInvite } from './get-invite'
import { getInvites } from './get-invites'

export async function invitesModule(app: FastifyInstance) {
  app.register(getInvite)
  app.register(getInvites)
  app.register(createInvite)

  app.register(acceptInvite)
}
