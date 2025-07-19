
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/navbar/Navbar';
import PageTransition from '@/components/layout/PageTransition';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Settings, Clock, BookOpen, Star, FileText, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import ScriptCard from '@/components/scripting/ScriptCard';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  const { user, getUserConnections } = useAuth();
  const [favoriteScripts, setFavoriteScripts] = useState<any[]>([]); // Replace with proper script type
  
  const username = user?.user_metadata?.username || 'User';
  const email = user?.email || '';
  const avatarUrl = user?.user_metadata?.avatar_url || user?.identities?.[0]?.identity_data?.avatar_url || '';
  const discordConnected = getUserConnections().discord;
  
  // This would fetch actual script data based on favorite IDs
  // For now, just mock the data
  useEffect(() => {
    // Mock data - in a real app, you'd fetch the actual scripts based on favorited IDs
    setFavoriteScripts([
      { id: '1', name: 'Teleport Script', category: 'Movement', lastUpdated: '2 days ago' },
      { id: '2', name: 'Auto Farm', category: 'Farming', lastUpdated: '1 week ago' },
    ]);
  }, []);

  // Get initials for avatar fallback
  const getInitials = () => {
    if (username) return username.charAt(0).toUpperCase();
    if (email) return email.charAt(0).toUpperCase();
    return 'U';
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        
        <main className="container px-4 md:px-6 mx-auto pt-28 pb-16">
          <div className="max-w-5xl mx-auto">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-10">
              <Avatar className="h-24 w-24 border-4 border-white/10">
                <AvatarImage src={avatarUrl} alt={username} />
                <AvatarFallback className="text-xl bg-primary/20 text-primary">{getInitials()}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold">{username}</h1>
                <p className="text-gray-400 mt-1">{email}</p>
                
                <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                  <Button variant="outline" size="sm">
                    <Link to="/settings">Edit Profile</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Profile Tabs */}
            <Tabs defaultValue="scripts" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="scripts" className="data-[state=active]:bg-white/10">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Scripts
                </TabsTrigger>
                <TabsTrigger value="favorites" className="data-[state=active]:bg-white/10">
                  <Star className="h-4 w-4 mr-2" />
                  Favorites
                </TabsTrigger>
                <TabsTrigger value="connections" className="data-[state=active]:bg-white/10">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Connections
                </TabsTrigger>
                <TabsTrigger value="activity" className="data-[state=active]:bg-white/10">
                  <Clock className="h-4 w-4 mr-2" />
                  Activity
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="scripts" className="mt-0">
                <Card className="border border-white/10 bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-primary" />
                      Your Scripts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-6">
                      <p className="text-gray-400 mb-4">You haven't created any scripts yet</p>
                      <Button variant="outline" size="sm">
                        <Link to="/library">Browse Scripts</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="favorites" className="mt-0">
                <Card className="border border-white/10 bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="h-5 w-5 mr-2 text-amber-400" />
                      Favorite Scripts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {favoriteScripts.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {favoriteScripts.map((script) => (
                          <div key={script.id}>
                            {/* You'll need to implement the actual script card component */}
                            <div className="border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors">
                              <h3 className="font-medium">{script.name}</h3>
                              <p className="text-sm text-gray-400">{script.category}</p>
                              <p className="text-xs text-gray-500 mt-2">Last updated: {script.lastUpdated}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-gray-400 mb-4">You haven't favorited any scripts yet</p>
                        <Button variant="default" size="sm">
                          <Link to="/library">Browse Library</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="connections" className="mt-0">
                <Card className="border border-white/10 bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <LinkIcon className="h-5 w-5 mr-2 text-blue-400" />
                      Account Connections
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg border border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#5865F2] p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 127.14 96.36" fill="white">
                              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-medium">Discord</h3>
                            <p className="text-sm text-gray-400">Connect your Discord account</p>
                          </div>
                        </div>
                        
                        {discordConnected ? (
                          <Badge className="bg-green-500 text-white">Connected</Badge>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.location.href = '/login'}
                          >
                            Connect
                          </Button>
                        )}
                      </div>
                      
                      {/* More connection options can be added here */}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activity" className="mt-0">
                <Card className="border border-white/10 bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-blue-400" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-6">
                      <p className="text-gray-400">No recent activity to display</p>
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

export default Profile;
