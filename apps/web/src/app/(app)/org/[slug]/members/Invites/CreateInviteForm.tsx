'use client'

import { AlertTriangle, UserPlus } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/utils/Spinner'
import { useFormState } from '@/hooks/useFormState'

import { createInviteAction } from './actions'

export function InviteForm() {
  const [{ errors, message, success }, action, isPending] =
    useFormState(createInviteAction)

  return (
    <form onSubmit={action} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Invite user failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-center gap-2">
        <div className="flex-1 space-y-1">
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="john@example.com"
          />
        </div>

        <div className="space-y-1">
          <Select name="role" defaultValue="MEMBER">
            <SelectTrigger id="role" className="w-full">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="MEMBER">Member</SelectItem>
              <SelectItem value="BILLING">Billing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <Spinner />
          ) : (
            <>
              <UserPlus className="mr-2 size-4" />
              Invite user
            </>
          )}
        </Button>
      </div>
      {errors?.email && (
        <p className="text-sm font-medium text-red-500 dark:text-red-400">
          {errors.email[0]}
        </p>
      )}
      {errors?.role && (
        <p className="text-sm font-medium text-red-500 dark:text-red-400">
          {errors.role[0]}
        </p>
      )}
    </form>
  )
}
