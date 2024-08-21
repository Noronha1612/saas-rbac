import { ability, getCurrentOrgSlug } from '@/auth/auth'
import { Header } from '@/components/page-utils/Header'
import { Tabs } from '@/components/page-utils/Tabs'

export default async function OrgLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const currentOrgSlug = getCurrentOrgSlug()
  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')
  const canGetMembers = permissions?.can('get', 'User')
  const canGetProjects = permissions?.can('get', 'Project')

  return (
    <div>
      <div className="pt-6">
        <Header />
        <Tabs
          options={[
            {
              label: 'Projects',
              path: `/org/${currentOrgSlug}`,
              permission: canGetProjects,
            },
            {
              label: 'Members',
              path: `/org/${currentOrgSlug}/members`,
              permission: canGetMembers,
            },
            {
              label: 'Settings & Billing',
              path: `/org/${currentOrgSlug}/settings`,
              permission: canUpdateOrganization || canGetBilling,
            },
          ]}
        />
      </div>
      <main className="mx-auto w-full max-w-[1200px] py-4">{children}</main>
    </div>
  )
}
