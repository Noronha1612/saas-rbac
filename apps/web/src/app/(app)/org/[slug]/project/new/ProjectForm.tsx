'use client'

import { AlertTriangle } from 'lucide-react'
import { useParams } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Spinner } from '@/components/utils/Spinner'
import { useFormState } from '@/hooks/useFormState'
import { queryClient } from '@/lib/react-query'

import { createProjectAction } from './actions'

export function ProjectForm() {
  const { slug: orgSlug } = useParams<{ slug: string }>()

  const [{ errors, message, success }, action, isPending] = useFormState(
    createProjectAction,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['projects', orgSlug],
        })
      },
    },
  )

  return (
    <form onSubmit={action} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Create project failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      {success === true && message && (
        <Alert variant="success">
          <AlertTriangle className="size-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="name">Project name</Label>
        <Input name="name" id="name" />

        {errors?.name && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea name="description" id="description" />

        {errors?.description && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            {errors.description[0]}
          </p>
        )}
      </div>

      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? <Spinner /> : 'Save project'}
      </Button>
    </form>
  )
}
