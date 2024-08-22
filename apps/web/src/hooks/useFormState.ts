import { FormEvent, useState, useTransition } from 'react'
import { requestFormReset } from 'react-dom'

interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

interface Options {
  initialState?: FormState
  onSuccess?: () => Promise<void> | void
}

export function useFormState(
  action: (data: FormData) => Promise<FormState | void>,
  { initialState, onSuccess }: Options = {},
) {
  const [isPending, startTransition] = useTransition()
  const [formState, setFormState] = useState<FormState>(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
    },
  )

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const result = await action(data)

      if (result?.success && onSuccess) {
        await onSuccess()
      }

      if (result) {
        setFormState(result)
      }

      requestFormReset(form)
    })
  }

  return [formState, handleSubmit, isPending] as const
}
