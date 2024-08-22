import { revalidateTag } from 'next/cache'

import { api } from './api-client'

interface CreateProjectRequest {
  name: string
  description: string
}

type CreateProjectResponse = void

export async function createProject(
  orgSlug: string,
  { name, description }: CreateProjectRequest,
): Promise<CreateProjectResponse> {
  await api.post(`organizations/${orgSlug}/projects`, {
    json: {
      name,
      description,
    },
  })

  revalidateTag(`projects-${orgSlug}`)
}
