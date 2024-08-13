'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signUp } from '@/http/sign-up'

const signUpSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'Please provide a valid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must contain at least 6 characters' }),
    password_confirmation: z.string(),
    name: z.string().refine((value) => value.split(' ').length > 1, {
      message: 'Please enter your full name',
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Password confirmation does not match',
    path: ['password_confirmation'],
  })

export async function signUpAction(data: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(data))

  if (result.success === false) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { email, password, name } = result.data

  try {
    await signUp({ email, password, name })
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
    message: null,
    errors: null,
  }
}
