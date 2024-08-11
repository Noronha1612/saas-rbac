import { FastifyInstance } from 'fastify'

import { createProject } from './create-project'
import { deleteProject } from './delete-project'
import { getProject } from './get-project'
import { getProjects } from './get-projects'

export async function projectsModule(app: FastifyInstance) {
  app.register(getProject)
  app.register(getProjects)
  app.register(createProject)
  app.register(deleteProject)
}
