'use server'

import { getCurrentOrgSlug } from '@/auth/auth'
import { revokeInvite } from '@/http/revoke-invite'

export async function revokeInviteAction(inviteId: string) {
  const orgSlug = getCurrentOrgSlug()

  if (!orgSlug) {
    throw new Error('Not found organization slug.')
  }

  await revokeInvite(orgSlug, inviteId)
}
