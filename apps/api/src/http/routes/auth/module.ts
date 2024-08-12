import { FastifyInstance } from 'fastify'

import { authenticateWithGithub } from './authenticate-with-github'
import { authenticateWithPassword } from './authenticate-with-password'
import { createAccount } from './create-account'
import { getProfile } from './get-profile'
import { requestPasswordRecover } from './request-password-recover'
import { resetPassword } from './reset-password'

export async function authModule(app: FastifyInstance) {
  app.register(getProfile)
  app.register(createAccount)
  app.register(authenticateWithPassword)
  app.register(authenticateWithGithub)
  app.register(requestPasswordRecover)
  app.register(resetPassword)
}
