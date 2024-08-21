import { revalidateTag } from 'next/cache'

import { api } from './api-client'

export async function revokeInvite(orgSlug: string, inviteId: string) {
  await api.delete(`organizations/${orgSlug}/invites/${inviteId}`)

  revalidateTag(`invites-${orgSlug}`)
}
