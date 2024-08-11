import { FastifyInstance } from 'fastify'

import { getMembers } from './get-members'

export async function membersModule(app: FastifyInstance) {
  app.register(getMembers)
}
