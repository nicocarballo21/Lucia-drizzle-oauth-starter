'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Terminal } from 'lucide-react'
import Link from 'next/link'
import { useServerAction } from 'zsa-react'

import { changePasswordAction } from './actions'

import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { pageTitleStyles } from '@/styles/common'
import { cn } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { LoaderButton } from '@/components/loader-button'

const registrationSchema = z
  .object({
    password: z.string().min(8),
    token: z.string(),
    passwordConfirmation: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  })

export default function ResetPasswordPage({ searchParams }: { searchParams: { token: string } }) {
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      password: '',
      token: searchParams.token,
      passwordConfirmation: '',
    },
  })

  const { execute, isPending, isSuccess, error } = useServerAction(changePasswordAction)

  function onSubmit(values: z.infer<typeof registrationSchema>) {
    execute({
      token: values.token,
      password: values.password,
    })
  }

  return (
    <div className='mx-auto max-w-[400px] space-y-6 py-24'>
      {isSuccess ? (
        <>
          <h1 className={cn(pageTitleStyles, 'text-center')}>Password Updated</h1>
          <Alert variant='success'>
            <Terminal className='h-4 w-4' />
            <AlertTitle>Password updated</AlertTitle>
            <AlertDescription>Your password has been successfully updated.</AlertDescription>
          </Alert>

          <Button asChild className='w-full' variant='default'>
            <Link href='/sign-in/email'>Login with New Password</Link>
          </Button>
        </>
      ) : null}

      {!isSuccess && (
        <>
          <h1 className={cn(pageTitleStyles, 'text-center')}>Change Password</h1>

          {error ? (
            <Alert variant='destructive'>
              <Terminal className='h-4 w-4' />
              <AlertTitle>Uhoh, something went wrong</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          ) : null}

          <Form {...form}>
            <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className='w-full'
                        placeholder='Enter your new password'
                        type='password'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='passwordConfirmation'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className='w-full'
                        placeholder='Enter Confirm your Password'
                        type='password'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoaderButton className='w-full' isLoading={isPending} type='submit'>
                Change Password
              </LoaderButton>
            </form>
          </Form>
        </>
      )}
    </div>
  )
}
