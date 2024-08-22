import { Role } from '@saas/auth'
import { revalidateTag } from 'next/cache'

import { api } from './api-client'

interface CreateInviteRequest {
  email: string
  role: Role
}

export async function createInvite(
  orgSlug: string,
  { email, role }: CreateInviteRequest,
) {
  await api.post(`organizations/${orgSlug}/invites`, {
    json: {
      email,
      role,
    },
  })

  revalidateTag(`invites-${orgSlug}`)
}
