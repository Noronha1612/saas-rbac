'use client'

import { AlertTriangle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import githubIcon from '@/assets/icons/github-icon.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/utils/Spinner'
import { useFormState } from '@/hooks/useFormState'

import { signInWithGithub } from '../actions'
import { signUpAction } from './actions'

export function SignUpForm() {
  const router = useRouter()

  const [{ errors, message, success }, action, isPending] = useFormState(
    signUpAction,
    {
      onSuccess: () => router.push('/auth/sign-in'),
    },
  )

  return (
    <div className="space-y-4">
      <form onSubmit={action} className="space-y-4">
        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign In Failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input name="name" id="name" />

          {errors?.name && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">
              {errors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input name="email" type="email" id="email" />

          {errors?.email && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">
              {errors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" id="password" />

          {errors?.password && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">
              {errors.password[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password_confirmation">Confirm your password</Label>
          <Input
            name="password_confirmation"
            type="password"
            id="password_confirmation"
          />

          {errors?.password_confirmation && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">
              {errors.password_confirmation[0]}
            </p>
          )}
        </div>

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? <Spinner /> : 'Create account'}
        </Button>
        <Button
          className="w-full"
          type="button"
          variant="link"
          size="sm"
          asChild
        >
          <Link href="/auth/sign-in">Already registered? Sign in</Link>
        </Button>
      </form>
      <Separator />

      <form action={signInWithGithub}>
        <Button className="w-full" type="submit" variant="outline">
          <Image src={githubIcon} alt="" className="mr-2 size-4 dark:invert" />
          Sign up with Github
        </Button>
      </form>
    </div>
  )
}
