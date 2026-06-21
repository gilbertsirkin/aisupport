'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LogoutButton({ className }: { className?: string }) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={className ?? 'text-xs text-zinc-400 hover:text-red-400 transition-colors disabled:opacity-50'}
    >
      {loading ? 'Signing out…' : 'Logout'}
    </button>
  )
}
