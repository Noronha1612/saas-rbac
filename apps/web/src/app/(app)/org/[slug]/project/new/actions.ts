'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { getCurrentOrgSlug } from '@/auth/auth'
import { createProject } from '@/http/create-project'

const projectSchema = z.object({
  name: z.string().min(3, { message: 'Please include at least 3 characters.' }),
  description: z.string(),
})

export async function createProjectAction(data: FormData) {
  const result = projectSchema.safeParse(Object.fromEntries(data))

  if (result.success === false) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { name, description } = result.data

  try {
    const orgSlug = getCurrentOrgSlug()

    if (!orgSlug) {
      throw new Error('Not found organization slug.')
    }

    await createProject(orgSlug, { name, description })
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
    message: 'Project created successfully!',
    errors: null,
  }
}
