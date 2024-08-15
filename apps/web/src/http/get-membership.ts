import { Role } from '@saas/auth'

import { api } from './api-client'

interface GetMembershipResponse {
  membership: {
    id: string
    role: Role
    organizationId: string
    userId: string
  }
}

export async function getMembership(orgSlug: string) {
  const result = await api
    .get(`organizations/${orgSlug}/membership`)
    .json<GetMembershipResponse>()

  return result
}
