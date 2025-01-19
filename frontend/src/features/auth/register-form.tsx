import React, { useState } from 'react'
import { cn } from '@/shared/lib/utils'
import { Button, Input } from '@/shared/ui'
import { useStore } from '@/entities/user/store'

interface Props {
  className?: string
}

export const RegisterForm: React.FC<Props> = ({ className }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {store} = useStore()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    store.register(email, password)
  }

  return <div className={cn('', className)}>
    <form onSubmit={onSubmit} className='flex flex-col gap-3'>
      <label>
        <Input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        <Input placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <Button>
        Зарегистрироваться
      </Button>
    </form>
  </div>
}
