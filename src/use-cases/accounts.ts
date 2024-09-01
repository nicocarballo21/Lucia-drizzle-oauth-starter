import {
  getAccountByDiscordId,
  getAccountByGithubId,
  getAccountByGoogleId,
} from '@/data-access/accounts'

export async function getAccountByGoogleIdUseCase(googleId: string) {
  return await getAccountByGoogleId(googleId)
}

export async function getAccountByGithubIdUseCase(githubId: string) {
  return await getAccountByGithubId(githubId)
}

export async function getAccountByDiscordIdUseCase(discordId: string) {
  return await getAccountByDiscordId(discordId)
}
