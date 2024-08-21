import { api } from './api-client'

interface GetOrganizationResponse {
  organization: {
    name: string
    id: string
    slug: string
    domain: string | null
    shouldAttachUsersByDomain: boolean
    avatarUrl: string | null
    createdAt: string
    updatedAt: string
    ownerId: string
  }
}

export async function getOrganization(orgSlug: string) {
  const result = await api
    .get(`organizations/${orgSlug}`)
    .json<GetOrganizationResponse>()

  return result
}
