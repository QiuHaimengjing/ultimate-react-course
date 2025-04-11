import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://mvaavjkfuxlfemjlrqfa.supabase.co";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  supabaseUrl,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12YWF2amtmdXhsZmVtamxycWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NDY1MTQsImV4cCI6MjA1OTIyMjUxNH0.VGeTmvj7xpNDyUSwQ0PhKGqR2LB281FGaUOBT0h3-Fg"
);

export default supabase;
