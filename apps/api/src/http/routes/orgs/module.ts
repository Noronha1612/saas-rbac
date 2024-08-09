import { FastifyInstance } from 'fastify'

import { createOrganization } from './create-organization'

export async function organizationsModule(app: FastifyInstance) {
  app.register(createOrganization)
}
