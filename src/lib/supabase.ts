
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kqwxbtfeukxqcxhmtrfq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtxd3hidGZldWt4cWN4aG10cmZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5MTk1MTIsImV4cCI6MjA1NzQ5NTUxMn0.M07vwyaUvPFLb6pKOe_KNo7rQn1-YemTVt95SvwaFZA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin credentials for development purposes only
// In production, these should be stored securely and not in the codebase
export const ADMIN_CREDENTIALS = {
  email: 'EssenceAdministrator@beta.com', // Fixed spelling from "EssenceAdminstrator" to "EssenceAdministrator"
  password: 'EssenceDevelopment123!***&!!',
  roles: ['admin', 'trial mod', 'trail support', 'head admin', 'owner', 'developer', 'reseller']
};

// List of admin emails
export const ADMIN_EMAILS = [
  ADMIN_CREDENTIALS.email,
  'djejhjejr@gmail.com' // Added the user's Supabase account
];

// Check if user is an admin
export const isUserAdmin = (user: any) => {
  if (!user) return false;
  
  // Check user email against list of admin emails
  if (ADMIN_EMAILS.includes(user.email)) {
    return true;
  }
  
  // Check user roles from metadata
  return user.user_metadata?.role === 'admin' || 
         user.user_metadata?.role === 'head admin' || 
         user.user_metadata?.role === 'owner' || 
         user.user_metadata?.role === 'developer';
};
