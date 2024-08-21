'use client'

import { UserMinus } from 'lucide-react'

import { Button, ButtonProps } from '@/components/ui/button'
import { Spinner } from '@/components/utils/Spinner'
import { useFormState } from '@/hooks/useFormState'

import { removeMemberAction } from './actions'

type RemoveMemberButtonProps = ButtonProps & {
  memberId: string
}

export function RemoveMemberButton({
  memberId,
  ...props
}: RemoveMemberButtonProps) {
  const [, handleRemoveMember, isRemovingMember] = useFormState(() =>
    removeMemberAction(memberId),
  )

  return (
    <form onSubmit={handleRemoveMember}>
      <Button
        {...props}
        type="submit"
        size="sm"
        variant="destructive"
        disabled={props.disabled || isRemovingMember}
      >
        {isRemovingMember ? (
          <Spinner />
        ) : (
          <>
            <UserMinus className="mr-2 size-4" />
            Remove
          </>
        )}
      </Button>
    </form>
  )
}
