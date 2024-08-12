import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { env } from '@saas/env'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { errorHandler } from './error-handler'
import { authModule } from './routes/auth/module'
import { invitesModule } from './routes/invites/module'
import { membersModule } from './routes/members/module'
import { organizationsModule } from './routes/orgs/module'
import { projectsModule } from './routes/projects/module'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Saas RBAC',
      description: 'Full stack saas rbac APP',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)

app.register(authModule)
app.register(organizationsModule)
app.register(projectsModule)
app.register(membersModule)
app.register(invitesModule)

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log(`Server listening on port: ${env.SERVER_PORT}`)
})
