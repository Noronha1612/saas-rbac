'use server'

import { roleSchema } from '@saas/auth'
import { HTTPError } from 'ky'
import { z } from 'zod'

import { getCurrentOrgSlug } from '@/auth/auth'
import { createInvite } from '@/http/create-invite'
import { revokeInvite } from '@/http/revoke-invite'

const inviteSchema = z.object({
  email: z.string().email({ message: 'Provide a valid email' }),
  role: roleSchema,
})

export async function revokeInviteAction(inviteId: string) {
  const orgSlug = getCurrentOrgSlug()

  if (!orgSlug) {
    throw new Error('Not found organization slug.')
  }

  await revokeInvite(orgSlug, inviteId)
}

export async function createInviteAction(data: FormData) {
  const result = inviteSchema.safeParse(Object.fromEntries(data))

  if (result.success === false) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { email, role } = result.data

  try {
    const orgSlug = getCurrentOrgSlug()

    if (!orgSlug) {
      throw new Error('Not found organization slug.')
    }

    await createInvite(orgSlug, { email, role })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json<{ message: string }>()

      console.error(err)

      return {
        success: false,
        message,
        errors: null,
      }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Invite created successfully!',
    errors: null,
  }
}
