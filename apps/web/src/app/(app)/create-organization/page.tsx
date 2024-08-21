import { Header } from '@/components/page-utils/Header'

import { OrganizationForm } from '../org/OrganizationForm'

export default function CreateOrganization() {
  return (
    <div className="space-y-4 py-4">
      <Header />

      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <h1 className="text-2xl font-bold">Create organization</h1>

        <OrganizationForm />
      </main>
    </div>
  )
}
