'use client'

import { XCircle } from 'lucide-react'
import { useActionState } from 'react'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/utils/Spinner'

import { shutdownOrganizationAction } from './actions'

export function ShutdownOrganizationButton() {
  const [, action, isPending] = useActionState(shutdownOrganizationAction, null)

  return (
    <form action={action}>
      <Button
        type="submit"
        variant="destructive"
        className="w-56"
        disabled={isPending}
      >
        {isPending ? (
          <Spinner />
        ) : (
          <>
            <XCircle className="mr-2 size-4" />
            Shutdown organization
          </>
        )}
      </Button>
    </form>
  )
}
