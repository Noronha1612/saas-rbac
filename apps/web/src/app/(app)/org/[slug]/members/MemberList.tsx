import { organizationSchema } from '@saas/auth'
import { ArrowLeftRight, Crown } from 'lucide-react'

import { ability, getCurrentOrgSlug } from '@/auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getMembers } from '@/http/get-members'
import { getMembership } from '@/http/get-membership'
import { getOrganization } from '@/http/get-organization'

export async function MemberList() {
  const permissions = await ability()
  const currentOrg = getCurrentOrgSlug()

  const [{ members }, { organization }, { membership }] = await Promise.all([
    getMembers(currentOrg!),
    getOrganization(currentOrg!),
    getMembership(currentOrg!),
  ])

  const authOrg = organizationSchema.parse(organization)

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Members</h2>

      <div className="rounded border">
        <Table>
          <TableBody>
            {members.map((member) => {
              const isMe = member.userId === membership.userId
              const isOwner = organization.ownerId === member.userId

              return (
                <TableRow key={member.id} className={isMe ? 'bg-muted/50' : ''}>
                  <TableCell className="py-2.5" style={{ width: 48 }}>
                    <Avatar>
                      <AvatarFallback />
                      {member.avatarUrl && (
                        <AvatarImage
                          src={member.avatarUrl}
                          width={32}
                          height={32}
                          className="aspect-square size-full"
                        />
                      )}
                    </Avatar>
                  </TableCell>

                  <TableCell className="py-2.5">
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {member.name}
                        {isMe && (
                          <span className="text-muted-foreground"> (me)</span>
                        )}
                        {isOwner && (
                          <span className="ml-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <Crown className="size-3" />
                            Owner
                          </span>
                        )}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {member.email}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="py-2.5">
                    <div className="flex items-center justify-end gap-2">
                      {permissions?.can('transfer_ownership', authOrg) && (
                        <Button size="sm" variant="ghost">
                          <ArrowLeftRight className="mr-2 size-4" />
                          Transfer ownership
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
