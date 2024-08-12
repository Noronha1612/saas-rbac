import { FastifyInstance } from 'fastify'

import { createInvite } from './create-invite'

export async function invitesModule(app: FastifyInstance) {
  app.register(createInvite)
}
