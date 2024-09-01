'use server'

import { z } from 'zod'

import { resetPasswordUseCase } from '@/use-cases/users'
import { unauthenticatedAction } from '@/lib/safe-action'
import { rateLimitByKey } from '@/lib/limiter'

export const resetPasswordAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
    }),
  )
  .handler(async ({ input }) => {
    await rateLimitByKey({ key: input.email, limit: 1, window: 30000 })
    await resetPasswordUseCase(input.email)
  })
