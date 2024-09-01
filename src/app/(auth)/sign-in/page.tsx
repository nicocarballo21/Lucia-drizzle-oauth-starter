'use client'

import * as React from 'react'
import { Mail } from 'lucide-react'
import Link from 'next/link'

import { MagicLinkForm } from './magic-link-form'

import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { btnStyles } from '@/styles/icons'

export default function SignInPage() {
  return (
    <div className='mx-auto flex min-h-[80dvh] items-center justify-center py-24'>
      <div className='mx-auto max-w-md space-y-6'>
        <div className='space-y-2 text-center'>
          <h1 className='text-3xl font-bold'>Sign In</h1>
          <p className='text-gray-500 dark:text-gray-400'>
            Sign in to your account using one of the options below.
          </p>
        </div>
        <div className='space-y-4'>
          <Link
            className={cn(
              buttonVariants({
                variant: 'secondary',
              }),
              'w-full',
            )}
            href='/api/login/google'
          >
            <GoogleIcon className='mr-2 h-5 w-5 stroke-white' />
            Sign in with Google
          </Link>
          <Link
            className={cn(
              buttonVariants({
                variant: 'secondary',
              }),
              'w-full',
            )}
            href='/api/login/github'
          >
            <GithubIcon className='mr-2 h-5 w-5' />
            Sign in with GitHub
          </Link>
          <Link
            className={cn(
              buttonVariants({
                variant: 'secondary',
              }),
              'w-full',
            )}
            href='/api/login/discord'
          >
            <DiscordIcon className='mr-2 h-5 w-5' />
            Sign in with Discord
          </Link>

          <div className='relative py-4'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-gray-100 px-2 text-gray-500 dark:bg-gray-950 dark:text-gray-400'>
                Or sign in with email
              </span>
            </div>
          </div>

          <MagicLinkForm />

          <div className='relative py-4'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-gray-100 px-2 text-gray-500 dark:bg-gray-950 dark:text-gray-400'>
                Other options
              </span>
            </div>
          </div>

          <div className='flex justify-center'>
            <Button asChild className={cn(btnStyles, 'w-full')} variant='ghost'>
              <Link href='/sign-in/email'>
                <Mail /> Sign in with Email
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} role='img' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <title>Google</title>
      <path d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z' />
    </svg>
  )
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill='none'
      height='24'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 24 24'
      width='24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' />
      <path d='M9 18c-4.51 2-5-2-7-2' />
    </svg>
  )
}

function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill='none'
      height='24'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 24 24'
      width='24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12 2C6.48 2 2 6.48 2 12c0 4.19 2.71 7.73 6.49 9.01-.09-.68-.49-1.24-1.08-1.53-.37-.17-.78-.26-1.19-.26-1.1 0-2 .9-2 2s.9 2 2 2c.41 0 .82-.09 1.19-.26.59-.29.99-.85 1.08-1.53C15.29 19.73 18 16.19 18 12c0-5.52-4.48-10-10-10z' />
      <path d='M8 14s1-2 4-2 4 2 4 2' />
      <path d='M9 8h.01' />
      <path d='M15 8h.01' />
    </svg>
  )
}
