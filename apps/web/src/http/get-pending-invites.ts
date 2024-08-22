import { Role } from '@saas/auth'

import { api } from './api-client'

interface GetPendingInvitesResponse {
  invites: Array<{
    organization: {
      name: string
    }
    id: string
    createdAt: string
    role: Role
    email: string
    author: {
      name: string | null
      id: string
      avatarUrl: string | null
    } | null
  }>
}

export async function getPendingInvites() {
  const result = await api
    .get(`pending-invites`, {
      next: {
        tags: [`pending-invites`],
      },
    })
    .json<GetPendingInvitesResponse>()

  return result
}
