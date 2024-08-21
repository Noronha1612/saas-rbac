'use server'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { getCurrentOrgSlug } from '@/auth/auth'
import { createOrganization } from '@/http/create-organization'
import { updateOrganization } from '@/http/update-organization'

import { organizationSchema } from './schema'

export async function createOrganizationAction(data: FormData) {
  const result = organizationSchema.safeParse(Object.fromEntries(data))

  if (result.success === false) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { domain, name, shouldAttachUsersByDomain } = result.data

  try {
    await createOrganization({ shouldAttachUsersByDomain, domain, name })

    revalidateTag('organizations')
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json<{ message: string }>()

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
    message: 'Organization created successfully!',
    errors: null,
  }
}

export async function updateOrganizationAction(data: FormData) {
  const result = organizationSchema.safeParse(Object.fromEntries(data))
  const orgSlug = getCurrentOrgSlug()

  if (result.success === false) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  if (!orgSlug) {
    return {
      success: false,
      message: 'Organization not found',
      errors: null,
    }
  }

  const { domain, name, shouldAttachUsersByDomain } = result.data

  try {
    await updateOrganization(orgSlug, {
      shouldAttachUsersByDomain,
      domain,
      name,
    })

    revalidateTag('organizations')
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json<{ message: string }>()

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
    message: 'Organization created successfully!',
    errors: null,
  }
}
