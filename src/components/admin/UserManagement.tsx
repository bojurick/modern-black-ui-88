import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, EyeOff, Edit, Trash, Lock, Check, X, Bell, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { fetchUsers, updateUserRole, updateUserStatus } from '@/services/admin-service';
import { showNotification } from '@/services/notification-service';
import { sendUserNotification } from '@/services/admin-service';
import { useAuth } from '@/contexts/AuthContext';

// Admin credentials and roles
const ADMIN_CREDENTIALS = {
  roles: ['admin', 'head admin', 'owner', 'developer', 'trial mod', 'trail support']
};

export const UserManagement = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [viewingUser, setViewingUser] = useState<any | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    type: 'info' as 'info' | 'success' | 'warning' | 'error'
  });
  const { user } = useAuth();

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      // In a real app, this would fetch from the database
      // For now, we'll use the mock data and add some delay to simulate loading
      setTimeout(() => {
        const mockUsers = [
          { id: 1, username: 'john_doe', email: 'john@example.com', role: 'user', status: 'active', joinDate: '2023-05-12', lastLogin: '2023-10-15' },
          { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'trial mod', status: 'active', joinDate: '2023-06-20', lastLogin: '2023-10-14' },
          { id: 3, username: 'admin_user', email: 'admin@example.com', role: 'admin', status: 'active', joinDate: '2023-01-05', lastLogin: '2023-10-16' },
          { id: 4, username: 'dev_account', email: 'dev@example.com', role: 'developer', status: 'active', joinDate: '2023-02-18', lastLogin: '2023-10-10' },
          { id: 5, username: 'support_agent', email: 'support@example.com', role: 'trail support', status: 'inactive', joinDate: '2023-04-30', lastLogin: '2023-09-20' },
          { id: 6, username: 'djejhjejr', email: 'djejhjejr@gmail.com', role: 'owner', status: 'active', joinDate: '2023-01-01', lastLogin: '2023-10-17' },
          { id: 7, username: 'reseller1', email: 'reseller1@example.com', role: 'reseller', status: 'active', joinDate: '2023-03-15', lastLogin: '2023-10-12' },
          { id: 8, username: 'banned_user', email: 'banned@example.com', role: 'user', status: 'suspended', joinDate: '2023-07-22', lastLogin: '2023-08-30' },
        ];
        
        setUsers(mockUsers);
        setIsLoading(false);
      }, 800);
      
      // Uncomment when connected to real backend
      // const data = await fetchUsers();
      // setUsers(data);
    } catch (error) {
      showNotification('Error', 'Failed to load users', 'error');
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const handleEditUser = (user: any) => {
    setEditingUser({...user});
  };

  const handleViewUser = (user: any) => {
    setViewingUser({...user});
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    
    try {
      // Simulating API call
      setUsers(users.map(user => 
        user.id === editingUser.id ? editingUser : user
      ));
      
      // Uncomment when connected to real backend
      // await updateUserRole(editingUser.id, editingUser.role);
      // await updateUserStatus(editingUser.id, editingUser.status);
      
      setEditingUser(null);
      showNotification('Success', 'User updated successfully', 'success');
    } catch (error) {
      showNotification('Error', 'Failed to update user', 'error');
    }
  };

  const handleResetPassword = () => {
    if (!viewingUser) return;
    
    // In a real app, this would call an API to reset the password
    showNotification('Success', `Password reset email sent to ${viewingUser.email}`, 'success');
    
    // For demo purposes, we'll just show the "new" password
    setNewPassword('NewTempPassword123!');
  };

  const handleSendNotification = async () => {
    if (!user || !notification.title || !notification.message) {
      showNotification('Error', 'Please fill in all fields', 'error');
      return;
    }
    
    try {
      if (selectedUsers.length === 0) {
        showNotification('Error', 'Please select at least one user', 'error');
        return;
      }
      
      // Send notification to each selected user
      for (const userId of selectedUsers) {
        // Uncomment when connected to real backend
        // await sendUserNotification(
        //   userId, 
        //   notification.title, 
        //   notification.message, 
        //   notification.type,
        //   user.email
        // );
      }
      
      showNotification('Success', 'Notifications sent successfully', 'success');
      setShowNotificationModal(false);
      setNotification({ title: '', message: '', type: 'info' });
      setSelectedUsers([]);
    } catch (error) {
      showNotification('Error', 'Failed to send notifications', 'error');
    }
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId) 
        : [...prev, userId]
    );
  };

  const selectAllUsers = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id.toString()));
    }
  };

  const closeEditModal = () => setEditingUser(null);
  const closeViewModal = () => {
    setViewingUser(null);
    setNewPassword('');
    setShowPassword(false);
  };
  const closeNotificationModal = () => setShowNotificationModal(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                View, edit, and manage user accounts
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => setShowNotificationModal(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Bell className="h-4 w-4" /> 
                Send Notification
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input 
                placeholder="Search users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {ADMIN_CREDENTIALS.roles.map((role) => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                  <SelectItem value="user">user</SelectItem>
                  <SelectItem value="reseller">reseller</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="sm:w-auto">Add User</Button>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onCheckedChange={selectAllUsers}
                    />
                  </TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-24">
                      <div className="flex flex-col items-center justify-center">
                        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-2"></div>
                        <p className="text-muted-foreground">Loading users...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12">
                      <p className="text-muted-foreground">No users found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedUsers.includes(user.id.toString())}
                          onCheckedChange={() => toggleUserSelection(user.id.toString())}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === 'admin' || user.role === 'head admin' || user.role === 'owner' || user.role === 'developer' 
                            ? 'bg-red-500/10 text-red-500' 
                            : user.role === 'trial mod' || user.role === 'trail support'
                              ? 'bg-blue-500/10 text-blue-500'
                              : user.role === 'reseller'
                                ? 'bg-purple-500/10 text-purple-500'
                                : 'bg-gray-500/10 text-gray-500'
                        }`}>
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'active' ? 'bg-green-500/10 text-green-500' 
                          : user.status === 'inactive' ? 'bg-yellow-500/10 text-yellow-500'
                          : 'bg-red-500/10 text-red-500'
                        }`}>
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleViewUser(user)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleEditUser(user)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit User</CardTitle>
              <CardDescription>Update user details and role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    value={editingUser.username} 
                    onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={editingUser.email} 
                    onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select 
                    value={editingUser.role} 
                    onValueChange={(value) => setEditingUser({...editingUser, role: value})}
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">user</SelectItem>
                      {ADMIN_CREDENTIALS.roles.map((role) => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                      <SelectItem value="reseller">reseller</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={editingUser.status} 
                    onValueChange={(value) => setEditingUser({...editingUser, status: value})}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={closeEditModal}>Cancel</Button>
              <Button onClick={handleUpdateUser}>Save Changes</Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* View User Modal */}
      {viewingUser && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>User Profile</CardTitle>
                <Button variant="ghost" size="icon" onClick={closeViewModal}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>View detailed user information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Username</Label>
                    <p className="font-medium">{viewingUser.username}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">{viewingUser.email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Role</Label>
                    <p className="font-medium">{viewingUser.role}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Status</Label>
                    <p className="font-medium">{viewingUser.status}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Join Date</Label>
                    <p className="font-medium">{viewingUser.joinDate}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Last Login</Label>
                    <p className="font-medium">{viewingUser.lastLogin}</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={handleResetPassword} 
                    className="flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4" />
                    Reset Password
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedUsers([viewingUser.id.toString()]);
                      setShowNotificationModal(true);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Send Notification
                  </Button>
                </div>
                
                {newPassword && (
                  <div className="bg-muted p-3 rounded-md">
                    <div className="flex items-center mb-1">
                      <Label className="text-sm font-medium mr-2">Temporary Password:</Label>
                      <div className="relative flex-1">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          value={newPassword} 
                          readOnly 
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This password would be sent to the user's email in a real application.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={closeViewModal}>Close</Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Send Notification Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Send Notification</CardTitle>
                <Button variant="ghost" size="icon" onClick={closeNotificationModal}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                Send a notification to {selectedUsers.length} selected user{selectedUsers.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="notification-title">Title</Label>
                  <Input 
                    id="notification-title" 
                    value={notification.title} 
                    onChange={(e) => setNotification({...notification, title: e.target.value})}
                    placeholder="Notification title"
                  />
                </div>
                <div>
                  <Label htmlFor="notification-message">Message</Label>
                  <Input 
                    id="notification-message" 
                    value={notification.message} 
                    onChange={(e) => setNotification({...notification, message: e.target.value})}
                    placeholder="Notification message"
                  />
                </div>
                <div>
                  <Label htmlFor="notification-type">Type</Label>
                  <Select 
                    value={notification.type} 
                    onValueChange={(value: any) => setNotification({...notification, type: value})}
                  >
                    <SelectTrigger id="notification-type">
                      <SelectValue placeholder="Select notification type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={closeNotificationModal}>Cancel</Button>
              <Button onClick={handleSendNotification}>Send Notification</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};
