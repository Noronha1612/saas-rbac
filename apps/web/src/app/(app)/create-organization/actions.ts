'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { createOrganization } from '@/http/create-organization'

const organizationSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: 'Please include at least 4 characters.' }),
    domain: z
      .string()
      .nullable()
      .refine(
        (domain) => {
          if (domain) {
            const domainRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/

            return domainRegex.test(domain)
          }

          return true
        },
        {
          message: 'Please provide a valid domain.',
        },
      ),

    shouldAttachUsersByDomain: z
      .union([z.literal('on'), z.literal('off'), z.boolean()])
      .transform((value) => value === true || value === 'on')
      .default(false),
  })
  .refine(
    (data) => {
      return !(data.shouldAttachUsersByDomain === true && !data.domain)
    },
    {
      message: 'Domain is required when auto-join is enabled.',
      path: ['domain'],
    },
  )

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
