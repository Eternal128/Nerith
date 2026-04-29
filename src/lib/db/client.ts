// Supabase client — falls back gracefully in demo mode

import { isDemoMode } from '@/lib/env'
import { createClient as _createClient } from '@supabase/supabase-js'

type SupabaseClient = ReturnType<typeof _createClient>

let supabase: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient | null {
  if (isDemoMode) return null
  if (!supabase) {
    supabase = _createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return supabase
}

export function getSupabaseAdmin(): SupabaseClient | null {
  if (isDemoMode) return null
  return _createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
