
import { supabase } from '@/integrations/supabase/client';

export type SystemStatusType = 'operational' | 'degraded' | 'maintenance' | 'outage';

export interface SystemStatus {
  id: number;
  status: SystemStatusType;
  message: string;
  updated_at: string;
  updated_by: string;
}

export interface ServiceStatus {
  id: number;
  name: string;
  status: SystemStatusType;
  message?: string;
  updated_at: string;
}

// Get current system status
export const getSystemStatus = async (): Promise<SystemStatus> => {
  try {
    const { data, error } = await supabase
      .from('system_status')
      .select('*')
      .single();
      
    if (error) throw error;
    return data as SystemStatus;
  } catch (error: any) {
    console.error('Error fetching system status:', error.message);
    throw error;
  }
};

// Update system status
export const updateSystemStatus = async (
  status: SystemStatusType,
  message: string,
  updatedBy: string
): Promise<SystemStatus> => {
  try {
    const { data, error } = await supabase
      .from('system_status')
      .update({
        status,
        message,
        updated_by: updatedBy,
        updated_at: new Date().toISOString()
      })
      .eq('id', 1) // Assuming we have a main status record with ID 1
      .select()
      .single();
      
    if (error) throw error;
    return data as SystemStatus;
  } catch (error: any) {
    console.error('Error updating system status:', error.message);
    throw error;
  }
};

// Get all service statuses
export const getServiceStatuses = async (): Promise<ServiceStatus[]> => {
  try {
    const { data, error } = await supabase
      .from('service_statuses')
      .select('*')
      .order('name');
      
    if (error) throw error;
    return data as ServiceStatus[] || [];
  } catch (error: any) {
    console.error('Error fetching service statuses:', error.message);
    throw error;
  }
};

// Update service status
export const updateServiceStatus = async (
  serviceId: number,
  status: SystemStatusType,
  message?: string
): Promise<ServiceStatus> => {
  try {
    const { data, error } = await supabase
      .from('service_statuses')
      .update({
        status,
        message,
        updated_at: new Date().toISOString()
      })
      .eq('id', serviceId)
      .select()
      .single();
      
    if (error) throw error;
    return data as ServiceStatus;
  } catch (error: any) {
    console.error('Error updating service status:', error.message);
    throw error;
  }
};

// Get status history
export const getStatusHistory = async (limit = 10): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('status_history')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Error fetching status history:', error.message);
    throw error;
  }
};
