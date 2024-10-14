import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project URL and API key
const SUPABASE_URL = 'https://skidrtpcxhcskyyjcedu.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNraWRydHBjeGhjc2t5eWpjZWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1Njc4NDUsImV4cCI6MjA0NDE0Mzg0NX0.Q8xDE6ycJUEd2m2f-qlx7uf4nQuSmFFFKjkGvUIfaIU'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

