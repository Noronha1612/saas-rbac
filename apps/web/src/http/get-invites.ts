import { Role } from '@saas/auth'

import { api } from './api-client'

interface GetInvitesResponse {
  invites: Array<{
    id: string
    createdAt: string
    role: Role
    email: string
    author: {
      name: string | null
      id: string
    } | null
  }>
}

export async function getInvites(orgSlug: string) {
  const result = await api
    .get(`organizations/${orgSlug}/invites`, {
      next: {
        tags: [`invites-${orgSlug}`],
      },
    })
    .json<GetInvitesResponse>()

  return result
}
