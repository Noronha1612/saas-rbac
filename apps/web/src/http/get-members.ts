import { Role } from '@saas/auth'

import { api } from './api-client'

interface GetMembersResponse {
  members: Array<{
    name: string | null
    id: string
    avatarUrl: string | null
    role: Role
    userId: string
    email: string
  }>
}

export async function getMembers(orgSlug: string) {
  const result = await api
    .get(`organizations/${orgSlug}/members`)
    .json<GetMembersResponse>()

  return result
}
