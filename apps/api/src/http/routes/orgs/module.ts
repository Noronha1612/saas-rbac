import { FastifyInstance } from 'fastify'

import { createOrganization } from './create-organization'
import { getMembership } from './get-membership'
import { getOrganization } from './get-organization'
import { getOrganizations } from './get-organizations'
import { shutdownOrganization } from './shutdown-organization'
import { transferOrganization } from './transfer-organization'
import { updateOrganization } from './update-organization'

export async function organizationsModule(app: FastifyInstance) {
  app.register(getOrganizations)
  app.register(getOrganization)
  app.register(getMembership)
  app.register(createOrganization)
  app.register(updateOrganization)
  app.register(shutdownOrganization)
  app.register(transferOrganization)
}
