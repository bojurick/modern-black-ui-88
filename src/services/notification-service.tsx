
import { supabase } from '@/integrations/supabase/client';
import { CustomNotification } from '@/components/ui/custom-notification';
import { toast } from 'sonner';
import { ReactNode } from 'react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface INotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  is_read?: boolean;
  created_at: string;
  user_id?: string;
  is_global?: boolean;
}

// Show a notification using the CustomNotification component
export const showNotification = (
  title: string,
  message: string,
  type: NotificationType = 'info',
  duration: number = 5000
) => {
  toast.custom((t) => (
    <CustomNotification
      title={title}
      message={message}
      type={type}
      showProgress={true}
      duration={duration}
      onClose={() => toast.dismiss(t)}
    />
  ));
};

// Completely override the default toast methods with our custom notification
toast.success = (message: ReactNode, options?: { duration?: number }) => {
  showNotification('Success', String(message), 'success', options?.duration);
  return '';
};

toast.error = (message: ReactNode, options?: { duration?: number }) => {
  showNotification('Error', String(message), 'error', options?.duration);
  return '';
};

toast.info = (message: ReactNode, options?: { duration?: number }) => {
  showNotification('Info', String(message), 'info', options?.duration);
  return '';
};

toast.warning = (message: ReactNode, options?: { duration?: number }) => {
  showNotification('Warning', String(message), 'warning', options?.duration);
  return '';
};

// Fetch user notifications
export const fetchUserNotifications = async (userId: string) => {
  try {
    // Get both user-specific and global notifications
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .or(`user_id.eq.${userId},is_global.eq.true`)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data as INotification[] || [];
  } catch (error: any) {
    console.error('Error fetching notifications:', error.message);
    throw error;
  }
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);
      
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Error marking notification as read:', error.message);
    throw error;
  }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .or(`user_id.eq.${userId},is_global.eq.true`)
      .eq('is_read', false);
      
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Error marking all notifications as read:', error.message);
    throw error;
  }
};

// Delete notification
export const deleteNotification = async (notificationId: string) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);
      
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Error deleting notification:', error.message);
    throw error;
  }
};

// Real-time notifications
export const subscribeToNotifications = (userId: string, callback: (notification: INotification) => void) => {
  const channel = supabase
    .channel('notifications')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        callback(payload.new as INotification);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `is_global=eq.true`,
      },
      (payload) => {
        callback(payload.new as INotification);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
