import { redirect } from 'next/navigation'

import { ability } from '@/auth/auth'

import { ProjectForm } from './ProjectForm'

export default async function CreateProject() {
  const permissions = await ability()

  if (permissions?.cannot('create', 'Project')) {
    redirect('/')
  }

  return (
    <div className="space-y-">
      <h1 className="text-2xl font-bold">Create Project</h1>

      <ProjectForm />
    </div>
  )
}
