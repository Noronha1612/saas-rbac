'use client'

import { Check, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/utils/Spinner'
import { useFormState } from '@/hooks/useFormState'

import { acceptInviteAction, rejectInviteAction } from './actions'

interface PendingInviteActionsProps {
  inviteId: string
}

export function PendingInviteActions({ inviteId }: PendingInviteActionsProps) {
  const [, acceptAction, isAccepting] = useFormState(() =>
    acceptInviteAction(inviteId),
  )
  const [, rejectAction, isRejecting] = useFormState(() =>
    rejectInviteAction(inviteId),
  )

  return (
    <div className="flex gap-1">
      <form onSubmit={acceptAction}>
        <Button
          type="submit"
          size="xs"
          variant="outline"
          disabled={isAccepting}
        >
          {isAccepting ? (
            <Spinner />
          ) : (
            <>
              <Check className="mr-1.5 size-3" />
              Accept
            </>
          )}
        </Button>
      </form>
      <form onSubmit={rejectAction}>
        <Button
          type="submit"
          size="xs"
          variant="ghost"
          className="text-muted-foreground"
          disabled={isRejecting}
        >
          {isRejecting ? (
            <Spinner />
          ) : (
            <>
              <X className="mr-1.5 size-3" />
              Deny
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
