'use server'

import { signInWithPassword } from '@/http/sign-in-with-password'

export async function signInWithEmailAndPassword(data: FormData) {
  const email = String(data.get('email'))
  const password = String(data.get('password'))

  const result = await signInWithPassword({ email, password })

  console.log(result)
}
