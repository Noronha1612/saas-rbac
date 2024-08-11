import { FastifyInstance } from 'fastify'

import { createProject } from './create-project'
import { deleteProject } from './delete-project'

export async function projectsModule(app: FastifyInstance) {
  app.register(createProject)
  app.register(deleteProject)
}
