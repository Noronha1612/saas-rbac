import { z } from 'zod'

export const organizationSchema = z
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

export type OrganizationSchema = z.infer<typeof organizationSchema>
