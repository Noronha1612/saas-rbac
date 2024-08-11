import { FastifyInstance } from 'fastify'

import { createProject } from './create-project'

export async function projectsModule(app: FastifyInstance) {
  app.register(createProject)
}
