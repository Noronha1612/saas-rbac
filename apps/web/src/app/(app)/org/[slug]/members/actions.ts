'use server'

import { Role } from '@saas/auth'

import { getCurrentOrgSlug } from '@/auth/auth'
import { removeMember } from '@/http/remove-member'
import { updateMember } from '@/http/update-member'

export async function removeMemberAction(memberId: string) {
  const orgSlug = getCurrentOrgSlug()

  if (!orgSlug) {
    throw new Error('Not found organization slug.')
  }

  await removeMember(orgSlug, memberId)
}

export async function updateMemberAction(memberId: string, role: Role) {
  const orgSlug = getCurrentOrgSlug()

  if (!orgSlug) {
    throw new Error('Not found organization slug.')
  }

  await updateMember(orgSlug, memberId, {
    role,
  })
}
