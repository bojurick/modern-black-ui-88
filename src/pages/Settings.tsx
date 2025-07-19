
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Navbar from '@/components/navbar/Navbar';
import PageTransition from '@/components/layout/PageTransition';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  User, Settings as SettingsIcon, Lock, Bell, Moon, Sun, 
  Upload, Trash2, Save, AlertTriangle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const { theme, setTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [username, setUsername] = useState(user?.user_metadata?.username || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || '');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Get initials for avatar fallback
  const getInitials = () => {
    const name = user?.user_metadata?.username || user?.email || 'User';
    return name.charAt(0).toUpperCase();
  };
  
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type and size
    if (!file.type.includes('image')) {
      toast.error('Please select an image file');
      return;
    }
    
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB');
      return;
    }
    
    // In a real app, you'd upload to storage here
    // For now, create a local object URL
    setIsUploading(true);
    
    try {
      // Mock upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const objectUrl = URL.createObjectURL(file);
      setAvatarUrl(objectUrl);
      
      // In a real app, you'd get a real URL from storage
      // and update the profile with it
      // For now, we'll just update with the object URL
      await updateProfile({ avatar_url: objectUrl });
      
      toast.success('Profile picture updated');
    } catch (error) {
      toast.error('Failed to update profile picture');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleSaveProfile = async () => {
    if (!username.trim()) {
      toast.error('Username cannot be empty');
      return;
    }
    
    setIsSaving(true);
    
    try {
      await updateProfile({ username });
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        
        <main className="container px-4 md:px-6 mx-auto pt-28 pb-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 flex items-center">
              <SettingsIcon className="mr-2 h-6 w-6 text-primary" />
              Settings
            </h1>
            
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 mb-8">
                <TabsTrigger value="profile" className="data-[state=active]:bg-white/10">
                  <User className="h-4 w-4 mr-2 hidden sm:block" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="appearance" className="data-[state=active]:bg-white/10">
                  <Moon className="h-4 w-4 mr-2 hidden sm:block" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-white/10">
                  <Lock className="h-4 w-4 mr-2 hidden sm:block" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-white/10">
                  <Bell className="h-4 w-4 mr-2 hidden sm:block" />
                  Notifications
                </TabsTrigger>
              </TabsList>
              
              {/* Profile Tab */}
              <TabsContent value="profile" className="mt-0 space-y-6">
                <Card className="border border-white/10 bg-card">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your profile details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                      <div className="relative">
                        <Avatar 
                          className="h-24 w-24 cursor-pointer border-4 border-white/10 hover:border-primary/50 transition-colors"
                          onClick={handleAvatarClick}
                        >
                          <AvatarImage src={avatarUrl} alt={username} />
                          <AvatarFallback className="text-xl bg-primary/20 text-primary">
                            {getInitials()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 shadow-lg cursor-pointer">
                          <Upload className="h-4 w-4" />
                        </div>
                        
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          className="hidden" 
                          accept="image/*" 
                          onChange={handleFileChange}
                        />
                      </div>
                      
                      <div className="flex-1 space-y-4 w-full">
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input 
                            id="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Your username"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            value={user?.email || ''} 
                            disabled
                            className="bg-gray-800/50 text-gray-400 cursor-not-allowed"
                          />
                          <p className="text-xs text-gray-400">Email cannot be changed</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-3">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setUsername(user?.user_metadata?.username || '');
                          setAvatarUrl(user?.user_metadata?.avatar_url || '');
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                      >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-white/10 bg-card">
                  <CardHeader>
                    <CardTitle className="text-red-500 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Danger Zone
                    </CardTitle>
                    <CardDescription>Irreversible account actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                      <div>
                        <h3 className="font-medium">Delete Account</h3>
                        <p className="text-sm text-gray-400">
                          Permanently delete your account and all data
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Appearance Tab */}
              <TabsContent value="appearance" className="mt-0">
                <Card className="border border-white/10 bg-card">
                  <CardHeader>
                    <CardTitle>Theme Settings</CardTitle>
                    <CardDescription>Customize your interface</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {theme === 'dark' ? (
                          <Moon className="h-5 w-5 text-blue-400" />
                        ) : (
                          <Sun className="h-5 w-5 text-yellow-400" />
                        )}
                        <div>
                          <Label htmlFor="theme-mode">Dark Mode</Label>
                          <p className="text-sm text-gray-400">
                            {theme === 'dark' 
                              ? 'Switch to light mode' 
                              : 'Switch to dark mode'}
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="theme-mode"
                        checked={theme === 'dark'}
                        onCheckedChange={handleThemeChange}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Security Tab */}
              <TabsContent value="security" className="mt-0">
                <Card className="border border-white/10 bg-card">
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your security preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <div className="pt-2">
                        <Button>
                          <Save className="h-4 w-4 mr-2" />
                          Update Password
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Notifications Tab */}
              <TabsContent value="notifications" className="mt-0">
                <Card className="border border-white/10 bg-card">
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage how we contact you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-400">Get emails about your account</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Update Notifications</p>
                          <p className="text-sm text-gray-400">Get notified about new features</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing Emails</p>
                          <p className="text-sm text-gray-400">Receive promotional emails</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
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

export default Settings;
