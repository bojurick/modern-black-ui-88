
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/navbar/Navbar';
import PageTransition from '@/components/layout/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { showNotification } from '@/services/notification-service';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import Particles from '@/components/ui/particles';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { UserManagement } from '@/components/admin/UserManagement';
import { KeyGenerator } from '@/components/admin/KeyGenerator';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { StatusPage } from '@/components/admin/StatusPage';

// Check if user is admin - moved from deleted lib/supabase.ts
const isUserAdmin = (user: any) => {
  if (!user) return false;
  
  // Admin emails - update these with your actual admin emails
  const ADMIN_EMAILS = [
    'admin@yourdomain.com', // Replace with your actual admin email
  ];
  
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

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    // Check if user is admin
    if (!user || !isUserAdmin(user)) {
      showNotification('Access Denied', 'This area is restricted to administrators only.', 'error');
      navigate('/dashboard');
      return;
    }
    
    // Show confetti and welcome toast for admin
    setShowConfetti(true);
    showNotification(
      'Welcome Admin',
      `Logged in as ${user.user_metadata?.username || user.email}`,
      'success'
    );
    
    // Hide confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [user, navigate]);

  if (!user || !isUserAdmin(user)) {
    return null; // Don't render anything if not admin
  }

  return (
    <PageTransition>
      <div className="min-h-screen relative">
        {showConfetti && (
          <Particles 
            quantity={100} 
            color="hsl(var(--primary))" 
            speed={2}
            className="z-50" 
          />
        )}
        
        <Navbar />
        
        <main className="container mx-auto px-4 pt-28 pb-16">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-left">Admin Panel</h1>
                <p className="text-muted-foreground text-left">
                  Manage users, generate keys, and monitor system activity
                </p>
              </div>
            </div>
            
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-5">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="users">User Management</TabsTrigger>
                <TabsTrigger value="keys">Key Generator</TabsTrigger>
                <TabsTrigger value="status">System Status</TabsTrigger>
                <TabsTrigger value="logs" className="hidden lg:block">Activity Logs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" className="mt-6">
                <AdminDashboard />
              </TabsContent>
              
              <TabsContent value="users" className="mt-6">
                <UserManagement />
              </TabsContent>
              
              <TabsContent value="keys" className="mt-6">
                <KeyGenerator />
              </TabsContent>
              
              <TabsContent value="status" className="mt-6">
                <StatusPage />
              </TabsContent>
              
              <TabsContent value="logs" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Logs</CardTitle>
                    <CardDescription>
                      View recent system and user activity.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <TableRow key={i}>
                            <TableCell className="font-mono">{new Date().toISOString()}</TableCell>
                            <TableCell>user{i}@example.com</TableCell>
                            <TableCell>Login</TableCell>
                            <TableCell>IP: 192.168.1.{i}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

// Simple stat card component
const StatCard = ({ title, value, trend, percent }: { 
  title: string; 
  value: string; 
  trend: 'up' | 'down'; 
  percent: string;
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className={`text-xs ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend === 'up' ? '↑' : '↓'} {percent}% from last month
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPanel;
