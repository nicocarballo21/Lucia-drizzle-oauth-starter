import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useServerAction } from 'zsa-react'

import { signInMagicLinkAction } from './actions'

import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { LoaderButton } from '@/components/loader-button'
import { useToast } from '@/components/ui/use-toast'

const magicLinkSchema = z.object({
  email: z.string().email(),
})

export function MagicLinkForm() {
  const { toast } = useToast()

  const { execute, isPending } = useServerAction(signInMagicLinkAction, {
    onError({ err }) {
      toast({
        title: 'Something went wrong',
        description: err.message,
        variant: 'destructive',
      })
    },
  })

  const form = useForm<z.infer<typeof magicLinkSchema>>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(values: z.infer<typeof magicLinkSchema>) {
    execute(values)
  }

  return (
    <Form {...form}>
      <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} className='w-full' placeholder='Enter your email' type='email' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton className='w-full' isLoading={isPending} type='submit'>
          Sign in with magic link
        </LoaderButton>
      </form>
    </Form>
  )
}
