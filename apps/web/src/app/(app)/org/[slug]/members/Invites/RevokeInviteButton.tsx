'use client'

import { XOctagon } from 'lucide-react'

import { Button, ButtonProps } from '@/components/ui/button'
import { Spinner } from '@/components/utils/Spinner'
import { useFormState } from '@/hooks/useFormState'

import { revokeInviteAction } from './actions'

type RevokeInviteButtonProps = ButtonProps & {
  inviteId: string
}

export function RevokeInviteButton({
  inviteId,
  ...props
}: RevokeInviteButtonProps) {
  const [, handleRevokeInvite, isRevokingInvite] = useFormState(() =>
    revokeInviteAction(inviteId),
  )

  return (
    <form onSubmit={handleRevokeInvite}>
      <Button
        {...props}
        type="submit"
        size="sm"
        variant="destructive"
        disabled={props.disabled || isRevokingInvite}
      >
        {isRevokingInvite ? (
          <Spinner />
        ) : (
          <>
            <XOctagon className="mr-2 size-4" />
            Revoke invite
          </>
        )}
      </Button>
    </form>
  )
}
