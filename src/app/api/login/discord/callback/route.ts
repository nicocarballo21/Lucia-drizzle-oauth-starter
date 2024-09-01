import { cookies } from 'next/headers'
import { OAuth2RequestError } from 'arctic'

import { createDiscordUserUseCase } from '@/use-cases/users'
import { getAccountByGithubIdUseCase } from '@/use-cases/accounts'
import { discordAuth } from '@/lib/auth'
import { afterLoginUrl } from '@/app-config'
import { setSession } from '@/lib/session'

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const storedState = cookies().get('discord_oauth_state')?.value ?? null

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    })
  }

  try {
    const tokens = await discordAuth.validateAuthorizationCode(code)

    const discordUserResponse = await fetch('https://discord.com/api/v10/users/@me', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    })
    const discordUser: DiscordUser = await discordUserResponse.json()

    const existingAccount = await getAccountByGithubIdUseCase(discordUser.id)

    if (existingAccount) {
      await setSession(existingAccount.userId)
      return new Response(null, {
        status: 302,
        headers: {
          Location: afterLoginUrl,
        },
      })
    }

    const userId = await createDiscordUserUseCase(discordUser)

    await setSession(userId)

    return new Response(null, {
      status: 302,
      headers: {
        Location: afterLoginUrl,
      },
    })
  } catch (e) {
    console.error(e)
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      })
    }
    return new Response(null, {
      status: 500,
    })
  }
}

export interface DiscordUser {
  id: string
  username: string
  discriminator: string
  global_name?: string | null
  avatar?: string | null
  bot?: boolean
  system?: boolean
  mfa_enabled?: boolean
  banner?: string | null
  accent_color?: number | null
  locale?: string
  verified?: boolean
  email?: string | null
  flags?: number
  premium_type?: number
  public_flags?: number
}
