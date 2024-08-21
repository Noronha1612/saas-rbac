import { Button } from '../ui/button'
import { NavLink } from './NavLink'

interface Option {
  label: string
  path: string
  permission?: boolean
}

interface TabProps {
  options: Option[]
}

export function Tabs({ options }: TabProps) {
  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
        {options.map((option) => {
          return option.permission === false ? (
            <></>
          ) : (
            <Button
              key={option.path}
              variant="ghost"
              size="sm"
              className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
              asChild
            >
              <NavLink href={option.path}>{option.label}</NavLink>
            </Button>
          )
        })}
      </nav>
    </div>
  )
}
