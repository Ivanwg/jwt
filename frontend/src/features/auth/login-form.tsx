import React from 'react'
import { cn } from '@/shared/lib/utils'
import { AuthForm, useStore } from '@/entities/user'
import { observer } from 'mobx-react-lite'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInSchema, TSignInSchema } from '@/entities/user/models'

interface Props {
  className?: string
}

export const LoginForm: React.FC<Props> = observer(({ className }) => {
  const { store } = useStore()

  const form = useForm<TSignInSchema>({
    mode: 'onTouched',
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<TSignInSchema> = (data) => {
    store.login(data.email, data.password)
  }

  return <div className={cn('', className)}>
    <AuthForm form={form} onSubmit={onSubmit} btnText='Войти' error={store.error} />
  </div>
})
