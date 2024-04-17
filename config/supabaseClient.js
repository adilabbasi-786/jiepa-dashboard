import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jmudtnzpglicnhwvfdki.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptdWR0bnpwZ2xpY25od3ZmZGtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5NjEyNDUsImV4cCI6MjAyMzUzNzI0NX0.2bTutEDKo8KaoqLzNsTCQkIXJeFuo99HHDrFs5VJRKo';


export const supabase = createClient(supabaseUrl, supabaseKey);