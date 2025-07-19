
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  UserPlus, 
  Key, 
  BarChart3, 
  Bell, 
  Users, 
  Calendar, 
  Activity, 
  Server 
} from 'lucide-react';
import { getAdminStats, getRecentActivity } from '@/services/admin-service';
import { fetchUsers } from '@/services/admin-service';
import { showNotification } from '@/services/notification-service';
import { supabase } from '@/integrations/supabase/client';

// Define types for better TypeScript support
interface UserWithAuthData {
  id: string;
  name: string;
  email: string;
  role: string;
  joinDate: string;
}

interface ActivityLog {
  id: string;
  action: string;
  user: string;
  time: string;
}

export const AdminDashboard = () => {
  const [stats, setStats] = useState([
    { 
      title: 'Registered Users', 
      value: '0', 
      change: '+0%',
      trend: 'up', 
      icon: <Users className="h-4 w-4" /> 
    },
    { 
      title: 'Active Keys', 
      value: '0', 
      change: '+0%',
      trend: 'up', 
      icon: <Key className="h-4 w-4" /> 
    },
    { 
      title: 'Daily Logins', 
      value: '0', 
      change: '+0%',
      trend: 'up', 
      icon: <Calendar className="h-4 w-4" /> 
    },
    { 
      title: 'Server Load', 
      value: '0%', 
      change: '0%',
      trend: 'neutral', 
      icon: <Server className="h-4 w-4" /> 
    },
  ]);
  
  const [recentUsers, setRecentUsers] = useState<UserWithAuthData[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch admin stats
      const adminStats = await getAdminStats();
      
      // Update stats with real data
      setStats([
        { 
          title: 'Registered Users', 
          value: adminStats.registeredUsers.toString(), 
          change: '+12%',
          trend: 'up', 
          icon: <Users className="h-4 w-4" /> 
        },
        { 
          title: 'Active Keys', 
          value: adminStats.activeKeys.toString(), 
          change: '+5%',
          trend: 'up', 
          icon: <Key className="h-4 w-4" /> 
        },
        { 
          title: 'Daily Logins', 
          value: adminStats.dailyLogins.toString(), 
          change: '+8%',
          trend: 'up', 
          icon: <Calendar className="h-4 w-4" /> 
        },
        { 
          title: 'Server Load', 
          value: adminStats.serverLoad.toString() + '%', 
          change: '-7%',
          trend: 'down', 
          icon: <Server className="h-4 w-4" /> 
        },
      ]);
      
      // Fetch recent users with auth data
      const profiles = await fetchUsers();
      
      // Get auth users to get email data
      const { data: authData } = await supabase.auth.admin.listUsers();
      const authUsers = authData?.users || [];
      
      // Merge profile and auth data with proper type checking
      const usersWithAuthData: UserWithAuthData[] = profiles
        .map(profile => {
          const authUser = authUsers.find(user => user.id === profile.id);
          const email = authUser?.email || 'No email';
          const role = authUser?.user_metadata?.role || 'user';
          const joinDate = new Date(profile.created_at).toISOString().split('T')[0];
          
          return {
            id: profile.id,
            name: profile.username || email.split('@')[0],
            email: email,
            role: role,
            joinDate: joinDate
          };
        })
        .sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())
        .slice(0, 3);
      
      setRecentUsers(usersWithAuthData);
      
      // Fetch recent activity
      const activityLogs = await getRecentActivity(5);
      
      // Format activity logs for display
      const formattedLogs: ActivityLog[] = activityLogs.map(log => ({
        id: log.id,
        action: log.action || 'System Action',
        user: 'system', // Since we don't have user_email in activity_logs
        time: formatTimeAgo(new Date(log.created_at))
      }));
      
      setRecentActivity(formattedLogs);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      showNotification('Error', 'Failed to load dashboard data', 'error');
      setIsLoading(false);
    }
  };

  // Helper function to format time ago
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    
    return Math.floor(seconds) + ' seconds ago';
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                  stat.trend === 'up' ? 'bg-green-500/10' : stat.trend === 'down' ? 'bg-red-500/10' : 'bg-blue-500/10'
                }`}>
                  {stat.icon}
                </div>
              </div>
              <div className="mt-3">
                <p className={`text-xs ${
                  stat.trend === 'up' ? 'text-green-500' : stat.trend === 'down' ? 'text-red-500' : 'text-blue-500'
                }`}>
                  {stat.change} from last month
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="flex flex-col h-auto py-4 space-y-2">
              <UserPlus className="h-5 w-5" />
              <span>Add User</span>
            </Button>
            <Button className="flex flex-col h-auto py-4 space-y-2">
              <Key className="h-5 w-5" />
              <span>Generate Keys</span>
            </Button>
            <Button className="flex flex-col h-auto py-4 space-y-2">
              <BarChart3 className="h-5 w-5" />
              <span>View Reports</span>
            </Button>
            <Button className="flex flex-col h-auto py-4 space-y-2">
              <Bell className="h-5 w-5" />
              <span>Send Notification</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Newly registered users</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
              </div>
            ) : recentUsers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No users found
              </div>
            ) : (
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'admin' || user.role === 'head admin' || user.role === 'owner' || user.role === 'developer'
                          ? 'bg-red-500/10 text-red-500'
                          : user.role === 'trial mod' || user.role === 'trail support'
                            ? 'bg-blue-500/10 text-blue-500'
                            : 'bg-gray-500/10 text-gray-500'
                      }`}>
                        {user.role}
                      </span>
                      <span className="text-xs text-muted-foreground">{user.joinDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>System activity log</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
              </div>
            ) : recentActivity.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No recent activity
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.user}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
