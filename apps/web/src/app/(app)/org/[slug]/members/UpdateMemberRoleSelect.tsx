'use client'

import { Role } from '@saas/auth'
import { ComponentProps, useTransition } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/utils/Spinner'

import { updateMemberAction } from './actions'

interface UpdateMemberRoleSelectProps extends ComponentProps<typeof Select> {
  memberId: string
}

export function UpdateMemberRoleSelect({
  memberId,
  ...props
}: UpdateMemberRoleSelectProps) {
  const [isUpdating, startTransition] = useTransition()

  async function updateMemberRole(role: Role) {
    startTransition(async () => {
      await updateMemberAction(memberId, role)
    })
  }

  return (
    <Select
      onValueChange={updateMemberRole}
      {...props}
      disabled={isUpdating || props.disabled}
    >
      <SelectTrigger className="h-8 w-32">
        {isUpdating ? <Spinner /> : <SelectValue />}
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="ADMIN">Admin</SelectItem>
        <SelectItem value="MEMBER">Member</SelectItem>
        <SelectItem value="BILLING">Billing</SelectItem>
      </SelectContent>
    </Select>
  )
}
