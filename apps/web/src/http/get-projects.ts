import { api } from './api-client'

interface GetProjectsResponse {
  projects: Array<{
    name: string
    id: string
    slug: string
    avatarUrl: string | null
    createdAt: string
    ownerId: string
    organizationId: string
    description: string | null
    owner: {
      name: string | null
      id: string
      avatarUrl: string | null
    }
  }>
}

export async function getProjects(orgSlug: string) {
  const result = await api
    .get(`organizations/${orgSlug}/projects`)
    .json<GetProjectsResponse>()

  return result
}
