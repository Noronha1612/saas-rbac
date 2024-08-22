import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { UserPlus2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { getPendingInvites } from '@/http/get-pending-invites'

import { PendingInviteActions } from './PendingInviteActions'

dayjs.extend(relativeTime)

export async function PendingInvites() {
  const { invites } = await getPendingInvites()

  return (
    <Popover>
      <PopoverTrigger data-after={invites.length} className="tag-after" asChild>
        <Button size="icon" variant="ghost">
          <UserPlus2 className="size-4" />
          <span className="sr-only">Pending invites</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 space-y-2">
        <span className="block text-sm font-medium">
          Pending invites ({invites.length})
        </span>

        {invites.length === 0 && (
          <p className="text-sm text-muted-foreground">No invites found</p>
        )}

        <div className="space-y-2">
          {invites.map((invite) => (
            <>
              <Separator />

              <p
                key={invite.id}
                className="text-balance text-sm leading-relaxed text-muted-foreground"
              >
                <span className="font-medium text-foreground">
                  {invite.author?.name ?? 'Someone'}
                </span>{' '}
                invited you to join{' '}
                <span className="font-medium text-foreground">
                  {invite.organization.name}.
                </span>{' '}
                {dayjs(invite.createdAt).fromNow()}
              </p>

              <PendingInviteActions inviteId={invite.id} />
            </>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
