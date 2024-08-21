import { revalidateTag } from 'next/cache'

import { api } from './api-client'

interface TransferOwnershipRequest {
  toUserId: string
}

export async function transferOwnership(
  orgSlug: string,
  { toUserId }: TransferOwnershipRequest,
) {
  await api.patch(`organizations/${orgSlug}/owner`, {
    json: {
      transferToUserId: toUserId,
    },
  })

  revalidateTag(`members-${orgSlug}`)
}
