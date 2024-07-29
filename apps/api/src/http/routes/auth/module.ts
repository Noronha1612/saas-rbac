import { FastifyInstance } from 'fastify'

import { authenticateWithPassword } from './authenticate-with-password'
import { createAccount } from './create-account'

export async function authModule(app: FastifyInstance) {
  app.register(createAccount)
  app.register(authenticateWithPassword)
}
