import Image from 'next/image'
import Link from 'next/link'

import githubIcon from '@/assets/icons/github-icon.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { signInWithGithub } from '../actions'

export default function SignUpPage() {
  return (
    <div className="space-y-4">
      <form action="" className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input name="name" id="name" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input name="email" type="email" id="email" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" id="password" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="password_confirmation">Confirm your password</Label>
          <Input
            name="password_confirmation"
            type="password"
            id="password_confirmation"
          />
        </div>

        <Button className="w-full" type="submit">
          Create account
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
