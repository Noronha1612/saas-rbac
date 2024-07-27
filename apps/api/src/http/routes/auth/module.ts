import { FastifyInstance } from 'fastify'

import { createAccount } from './create-account'

export async function authModule(app: FastifyInstance) {
  app.register(createAccount)
}
