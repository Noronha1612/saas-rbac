import { Role } from '@saas/auth'
import { revalidateTag } from 'next/cache'

import { api } from './api-client'

interface UpdateMemberRequest {
  role: Role
}

export async function updateMember(
  orgSlug: string,
  memberId: string,
  { role }: UpdateMemberRequest,
) {
  await api.put(`organizations/${orgSlug}/members/${memberId}`, {
    json: {
      role,
    },
  })

  revalidateTag(`members-${orgSlug}`)
}
