
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// User Management
export const fetchUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Error fetching users:', error.message);
    throw error;
  }
};

export const updateUserRole = async (userId: string, role: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({ role })
      .eq('id', userId);
      
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Error updating user role:', error.message);
    throw error;
  }
};

export const updateUserStatus = async (userId: string, status: 'active' | 'inactive' | 'suspended') => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({ status })
      .eq('id', userId);
      
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Error updating user status:', error.message);
    throw error;
  }
};

// Keys Management
export const generateKeys = async (quantity: number, duration: string, generatedBy: string) => {
  try {
    const keys = Array.from({ length: quantity }, () => generateRandomKey());
    
    const keysToInsert = keys.map(key => ({
      key,
      duration,
      generated_by: generatedBy,
      status: 'active',
      created_at: new Date()
    }));
    
    const { data, error } = await supabase
      .from('license_keys')
      .insert(keysToInsert)
      .select();
      
    if (error) throw error;
    return { keys, data };
  } catch (error: any) {
    console.error('Error generating keys:', error.message);
    throw error;
  }
};

export const fetchKeys = async () => {
  try {
    const { data, error } = await supabase
      .from('license_keys')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Error fetching keys:', error.message);
    throw error;
  }
};

// System Status
export const updateSystemStatus = async (
  status: 'operational' | 'degraded' | 'maintenance' | 'outage',
  message: string,
  updatedBy: string
) => {
  try {
    const { data, error } = await supabase
      .from('system_status')
      .update({ 
        status, 
        message,
        updated_by: updatedBy,
        updated_at: new Date()
      })
      .eq('id', 1) // Assuming we have one main status record
      .select();
      
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Error updating system status:', error.message);
    throw error;
  }
};

export const getSystemStatus = async () => {
  try {
    const { data, error } = await supabase
      .from('system_status')
      .select('*')
      .eq('id', 1) // Main status record
      .single();
      
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Error fetching system status:', error.message);
    throw error;
  }
};

// Notifications
export const sendGlobalNotification = async (
  title: string,
  message: string,
  type: 'info' | 'success' | 'warning' | 'error',
  sentBy: string
) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert({
        title,
        message,
        type,
        sent_by: sentBy,
        is_global: true,
        created_at: new Date()
      })
      .select();
      
    if (error) throw error;
    
    // In a real app, we would trigger a real-time notification here
    toast.success('Global notification sent successfully');
    return data;
  } catch (error: any) {
    console.error('Error sending global notification:', error.message);
    throw error;
  }
};

export const sendUserNotification = async (
  userId: string,
  title: string,
  message: string,
  type: 'info' | 'success' | 'warning' | 'error',
  sentBy: string
) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        title,
        message,
        type,
        sent_by: sentBy,
        is_global: false,
        created_at: new Date()
      })
      .select();
      
    if (error) throw error;
    
    toast.success(`Notification sent to user successfully`);
    return data;
  } catch (error: any) {
    console.error('Error sending user notification:', error.message);
    throw error;
  }
};

// Stats and Analytics
export const getAdminStats = async () => {
  try {
    // In a real app, these would be actual database queries
    // For now, returning mock data for demonstration
    return {
      registeredUsers: 1234,
      activeKeys: 567,
      dailyLogins: 899,
      serverLoad: 23
    };
  } catch (error: any) {
    console.error('Error fetching admin stats:', error.message);
    throw error;
  }
};

export const getRecentActivity = async (limit = 10) => {
  try {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Error fetching recent activity:', error.message);
    throw error;
  }
};

// Helper functions
const generateRandomKey = () => {
  const keyChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 16;
  let result = '';
  
  for (let i = 0; i < length; i++) {
    if (i > 0 && i % 4 === 0) {
      result += '-';
    }
    result += keyChars.charAt(Math.floor(Math.random() * keyChars.length));
  }
  
  return result;
};
