import React from 'react'
import { cn } from '@/shared/lib/utils'
import { Button, Input } from '@/shared/ui'
import { useStore } from '@/entities/user/store'
import { observer } from 'mobx-react-lite'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInSchema, TSignInSchema } from '@/entities/user/models'

interface Props {
  className?: string
}

// TODO - деструктурировать

export const LoginForm: React.FC<Props> = observer(({ className }) => {
  const { store } = useStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<TSignInSchema>({
    mode: 'onTouched',
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<TSignInSchema> = (data) => {
    console.log(data)
    store.login(data.email, data.password)
  }

  return <div className={cn('', className)}>
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
      <label>
        <Input placeholder='Email' {...register("email")} />
        {
          errors.email && <span>{errors.email.message}</span>
        }
      </label>
      <label>
        <Input placeholder='Password' {...register("password")} />
        {
          errors.password && <span>{errors.password.message}</span>
        }
      </label>
      <Button disabled={!isValid}>
        Войти
      </Button>
    </form>
  </div>
})
