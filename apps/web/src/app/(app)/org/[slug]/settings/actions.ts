'use server'

import { redirect } from 'next/navigation'

import { getCurrentOrgSlug } from '@/auth/auth'
import { shutdownOrganization } from '@/http/shutdown-organization'

export async function shutdownOrganizationAction() {
  const currentOrganizationSlug = getCurrentOrgSlug()

  if (currentOrganizationSlug) {
    await shutdownOrganization({
      orgSlug: currentOrganizationSlug,
    })
  }

  redirect('/')
}
