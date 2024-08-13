import { api } from './api-client'

interface SignUpWithPasswordRequest {
  email: string
  name: string
  password: string
}

type SignUpWithPasswordResponse = void

export async function signUp({
  email,
  password,
  name,
}: SignUpWithPasswordRequest): Promise<SignUpWithPasswordResponse> {
  await api.post('users', {
    json: {
      email,
      password,
      name,
    },
  })
}
