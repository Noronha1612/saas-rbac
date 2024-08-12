import { FastifyInstance } from 'fastify'

import { createInvite } from './create-invite'
import { getInvite } from './get-invite'

export async function invitesModule(app: FastifyInstance) {
  app.register(getInvite)
  app.register(createInvite)
}
