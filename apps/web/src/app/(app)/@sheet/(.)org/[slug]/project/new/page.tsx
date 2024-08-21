import { ProjectForm } from '@/app/(app)/org/[slug]/project/new/ProjectForm'
import { InterceptedSheetContent } from '@/components/page-utils/InterceptedSheetContent'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'

export default function CreateOrganization() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Create Project</SheetTitle>
        </SheetHeader>

        <ProjectForm />
      </InterceptedSheetContent>
    </Sheet>
  )
}
