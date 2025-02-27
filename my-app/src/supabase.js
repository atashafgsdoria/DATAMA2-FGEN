// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qlldaarhspqfvvfpnuqf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbGRhYXJoc3BxZnZ2ZnBudXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NTY4ODIsImV4cCI6MjA1NjIzMjg4Mn0.Q3BCKZzUZ2oas4qPAj9qCNZekuYmSTDRPRcFrl7Wro4';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
