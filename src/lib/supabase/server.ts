import { createServerClient } from '@supabase/ssr'
import { cookies, headers } from 'next/headers'
import type { CookieOptions } from '@supabase/ssr'

export async function createClient() {
  const cookieStore = await cookies()
  const headerStore = await headers()

  const authHeader = headerStore.get('authorization')
  const bearerToken = authHeader?.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length)
    : null

  const client = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
      global: bearerToken
        ? {
            // Forward the bearer token as the actual Authorization header
            // on every request this client makes to Supabase. This is the
            // documented way to authenticate a server-side client with a
            // pre-existing access token (no cookie, no refresh token needed).
            headers: { Authorization: `Bearer ${bearerToken}` },
          }
        : undefined,
    }
  )

  return client
}
