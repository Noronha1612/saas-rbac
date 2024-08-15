import { Slash } from 'lucide-react'
import Image from 'next/image'

import EnterpriseIcon from '@/assets/icons/rocketseat-icon.svg'

import { OrganizationSwitcher } from './OrganizationSwitcher'
import { ProfileButton } from './ProfileButton'

export function Header() {
  return (
    <header className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src={EnterpriseIcon}
          alt="Enterprise"
          className="size-6 invert dark:invert-0"
        />

        <Slash className="size-3 -rotate-[24deg] text-border" />

        <OrganizationSwitcher />
      </div>

      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </header>
  )
}
