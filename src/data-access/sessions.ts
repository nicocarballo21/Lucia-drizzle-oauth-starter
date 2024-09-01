import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { sessions } from '@/db/schema'
import { UserId } from '@/use-cases/types'

export async function deleteSessionForUser(userId: UserId) {
  await db.delete(sessions).where(eq(sessions.userId, userId))
}
