import { FastifyInstance } from 'fastify'

import { getOrganizationBilling } from './get-organization-billing'

export async function billingModule(app: FastifyInstance) {
  app.register(getOrganizationBilling)
}
