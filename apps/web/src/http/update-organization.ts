import { api } from './api-client'

interface UpdateOrganizationRequest {
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

type UpdateOrganizationResponse = void

export async function updateOrganization(
  orgSlug: string,
  { name, domain, shouldAttachUsersByDomain }: UpdateOrganizationRequest,
): Promise<UpdateOrganizationResponse> {
  await api.put(`organizations/${orgSlug}`, {
    json: {
      name,
      domain,
      shouldAttachUsersByDomain,
    },
  })
}
