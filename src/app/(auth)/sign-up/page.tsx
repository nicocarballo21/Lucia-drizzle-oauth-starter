'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useServerAction } from 'zsa-react'
import { Terminal } from 'lucide-react'

import { signUpAction } from './actions'

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
import { LoaderButton } from '@/components/loader-button'
import { useToast } from '@/components/ui/use-toast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const registrationSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  })

export default function RegisterPage() {
  const { toast } = useToast()

  const { execute, isPending, error } = useServerAction(signUpAction, {
    onError({ err }) {
      toast({
        title: 'Something went wrong',
        description: err.message,
        variant: 'destructive',
      })
    },
  })

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  function onSubmit(values: z.infer<typeof registrationSchema>) {
    execute(values)
  }

  return (
    <div className='mx-auto max-w-[400px] space-y-6 py-24'>
      <h1 className={cn(pageTitleStyles, 'text-center')}>Sign Up</h1>

      <Form {...form}>
        <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='w-full'
                    placeholder='Enter your email'
                    type='email'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    placeholder='Enter your password'
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

          {error ? (
            <Alert variant='destructive'>
              <Terminal className='h-4 w-4' />
              <AlertTitle>Uhoh, we couldn&apos;t log you in</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          ) : null}

          <LoaderButton className='w-full' isLoading={isPending} type='submit'>
            Register
          </LoaderButton>
        </form>
      </Form>
    </div>
  )
}
