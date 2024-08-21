import { revalidateTag } from 'next/cache'

import { api } from './api-client'

export async function removeMember(orgSlug: string, memberId: string) {
  await api.delete(`organizations/${orgSlug}/members/${memberId}`)

  revalidateTag(`members-${orgSlug}`)
}
