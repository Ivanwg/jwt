import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Input } from './input';
import { useFormContext } from "react-hook-form"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string,
  required?: boolean,
  label?: string,
  name: string
}


export const FormInput: React.FC<Props> = ({ className, required, label, name, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]?.message as string


  return (
    <label className={cn('relative', className)}>
      {
        label &&
        <span className={cn('block', {
          'after:content-[""] after:w-1 after:h-1 after:rounded-full after:bg-[red] after:align-middle after:ml-1 after:inline-block': required
        })}>
          {label}
        </span>
      }
      <Input {...register(name)} {...props} />

      {
        error && <span className="block mt-1">{error}</span>
      }
    </label>
  );
}
