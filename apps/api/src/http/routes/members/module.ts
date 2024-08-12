import { FastifyInstance } from 'fastify'

import { getMembers } from './get-members'
import { removeMember } from './remove-member'
import { updateMember } from './update-member'

export async function membersModule(app: FastifyInstance) {
  app.register(getMembers)
  app.register(updateMember)
  app.register(removeMember)
}
