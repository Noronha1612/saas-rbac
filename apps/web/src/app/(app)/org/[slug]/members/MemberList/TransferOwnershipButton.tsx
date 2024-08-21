'use client'

import { ArrowLeftRight } from 'lucide-react'
import { useTransition } from 'react'

import { Button, ButtonProps } from '@/components/ui/button'
import { Spinner } from '@/components/utils/Spinner'

import { transferOwnershipAction } from './actions'

interface TransferOwnershipButtonProps extends ButtonProps {
  toUserId: string
}

export function TransferOwnershipButton({
  toUserId,
  ...props
}: TransferOwnershipButtonProps) {
  const [isTransfering, startTransition] = useTransition()

  async function transferOwnership() {
    startTransition(async () => {
      await transferOwnershipAction(toUserId)
    })
  }

  return (
    <Button
      size="sm"
      variant="ghost"
      {...props}
      onClick={transferOwnership}
      disabled={isTransfering || props.disabled}
    >
      {isTransfering ? (
        <Spinner />
      ) : (
        <>
          <ArrowLeftRight className="mr-2 size-4" />
          Transfer ownership
        </>
      )}
    </Button>
  )
}
