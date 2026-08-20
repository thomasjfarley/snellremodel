import { cookies } from 'next/headers'

export async function isPortalAuthenticated() {
  const cookieStore = await cookies()
  const token = cookieStore.get('srsp_auth')?.value
  return token === 'authenticated'
}
