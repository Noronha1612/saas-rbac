import { FastifyInstance } from 'fastify'

import { createOrganization } from './create-organization'
import { getMembership } from './get-membership'
import { getOrganization } from './get-organization'
import { getOrganizations } from './get-organizations'

export async function organizationsModule(app: FastifyInstance) {
  app.register(getOrganizations)
  app.register(getOrganization)
  app.register(getMembership)
  app.register(createOrganization)
}
