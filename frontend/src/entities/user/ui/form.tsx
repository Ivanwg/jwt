import React from 'react';
import { cn } from '@/shared/lib/utils';
import { FormInput, Button } from '@/shared/ui';
import { FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { TSignInSchema, TSignUpSchema } from '../models';

interface Props {
  className?: string,
  onSubmit: SubmitHandler<TSignInSchema | TSignUpSchema>,
  form: UseFormReturn<TSignInSchema | TSignUpSchema>,
  btnText: string,
  error?: string
}

export const AuthForm: React.FC<Props> = ({ className, form, onSubmit, btnText, error }) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-3', className)}>
        <FormInput placeholder='Email' name='email' />
        <FormInput placeholder='Password' name='password' />
        <Button disabled={!form.formState.isValid}>
          { btnText }
        </Button>
        {
          !!error && <span className="text-red-500 bg-red-500/10 p-3">{error}</span>
        }
      </form>
    </FormProvider>
  );
}