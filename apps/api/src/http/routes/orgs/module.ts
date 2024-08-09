import { FastifyInstance } from 'fastify'

import { createOrganization } from './create-organization'
import { getMembership } from './get-membership'

export async function organizationsModule(app: FastifyInstance) {
  app.register(getMembership)
  app.register(createOrganization)
}
