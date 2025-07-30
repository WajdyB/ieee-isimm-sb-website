import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for IEEE ISIMM Student Branch
export interface Event {
  id: number
  title: string
  description: string
  date: string
  location: string
  attendees: number
  images: string[]
  created_at: string
  updated_at: string
}

export interface CommitteeMember {
  id: number
  name: string
  position: string
  image: string
  facebook: string
  email: string
  linkedin: string
  created_at: string
  updated_at: string
}
