import React from 'react'
import { cn } from '@/shared/lib/utils'
import { AuthForm, SignUpSchema, TSignUpSchema, useStore } from '@/entities/user'
import { observer } from 'mobx-react-lite'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {
  className?: string
}

export const RegisterForm: React.FC<Props> = observer(({ className }) => {
  const { store } = useStore()

  const form = useForm<TSignUpSchema>({
    mode: 'onTouched',
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  
  const onSubmit: SubmitHandler<TSignUpSchema> = (data) => {
    store.register(data.email, data.password)
  }

  return <div className={cn('', className)}>
      <AuthForm form={form} onSubmit={onSubmit} btnText='Зарегистрироваться' error={store.error} />
    </div>
})
