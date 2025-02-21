import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yawsztgksvbqpbksilhe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlhd3N6dGdrc3ZicXBia3NpbGhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxNjkyMDYsImV4cCI6MjA1NTc0NTIwNn0.Chhj9YUtlFaUmERoganFAUKnYSu-6KiK0mxErK0yGrY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
