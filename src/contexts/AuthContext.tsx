
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { CustomNotification } from '@/components/ui/custom-notification';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithDiscord: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: {
    username?: string;
    avatar_url?: string;
    theme?: string;
  }) => Promise<void>;
  favoriteScript: (scriptId: string) => Promise<void>;
  unfavoriteScript: (scriptId: string) => Promise<void>;
  getFavoriteScripts: () => Promise<string[]>;
  getUserConnections: () => { discord?: boolean };
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin emails - update these with your actual admin emails
const ADMIN_EMAILS = [
  'admin@yourdomain.com', // Replace with your actual admin email
];

// Check if user is an admin
const isUserAdmin = (user: any) => {
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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error fetching session:', error);
      } else if (data?.session) {
        setSession(data.session);
        setUser(data.session.user);
        
        const adminStatus = isUserAdmin(data.session.user);
        setIsAdmin(adminStatus);
      }
      
      setIsLoading(false);
      
      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const adminStatus = isUserAdmin(session.user);
          setIsAdmin(adminStatus);
          
          if (adminStatus && event === 'SIGNED_IN') {
            toast.custom((t) => (
              <CustomNotification
                title={`Logged In As ${session.user.user_metadata?.username || session.user.email} (ADMIN)`}
                message="Welcome to the admin panel. You have full access to all features."
                type="success"
                showProgress={true}
                duration={5000}
                onClose={() => toast.dismiss(t)}
              />
            ));
          }
        } else {
          setIsAdmin(false);
        }
        
        setIsLoading(false);
      });
      
      return () => {
        authListener?.subscription.unsubscribe();
      };
    };
    
    getSession();
  }, []);

  const signUp = async (email: string, password: string, username: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            theme: 'dark',
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });
      
      if (error) throw error;
      
      toast.success('Account created successfully!');
      return;
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (isUserAdmin(data.user)) {
        toast.success('Logged in as Administrator!');
      } else {
        toast.success('Logged in successfully!');
      }
      
      return;
    } catch (error: any) {
      toast.error(error.message || 'Failed to log in');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithDiscord = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: 'identify email',
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in with Discord');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to log out');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: { username?: string; avatar_url?: string; theme?: string }) => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase.auth.updateUser({
        data: {
          ...user.user_metadata,
          ...data,
        },
      });
      
      if (error) throw error;
      
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
      throw error;
    }
  };

  const favoriteScript = async (scriptId: string) => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      let currentFavorites = user.user_metadata.favorite_scripts || [];
      
      if (!currentFavorites.includes(scriptId)) {
        currentFavorites.push(scriptId);
        
        const { error } = await supabase.auth.updateUser({
          data: {
            ...user.user_metadata,
            favorite_scripts: currentFavorites,
          },
        });
        
        if (error) throw error;
        toast.success('Script added to favorites');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to favorite script');
      throw error;
    }
  };

  const unfavoriteScript = async (scriptId: string) => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      let currentFavorites = user.user_metadata.favorite_scripts || [];
      
      const updatedFavorites = currentFavorites.filter((id: string) => id !== scriptId);
      
      const { error } = await supabase.auth.updateUser({
        data: {
          ...user.user_metadata,
          favorite_scripts: updatedFavorites,
        },
      });
      
      if (error) throw error;
      toast.success('Script removed from favorites');
    } catch (error: any) {
      toast.error(error.message || 'Failed to unfavorite script');
      throw error;
    }
  };

  const getFavoriteScripts = async (): Promise<string[]> => {
    if (!user) return [];
    return user.user_metadata.favorite_scripts || [];
  };

  const getUserConnections = () => {
    if (!user) return { discord: false };
    
    const isDiscordConnected = user.app_metadata?.provider === 'discord';
    
    return {
      discord: isDiscordConnected,
    };
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        session, 
        isLoading, 
        isAdmin,
        signUp, 
        signIn,
        signInWithDiscord,
        signOut, 
        updateProfile,
        favoriteScript,
        unfavoriteScript,
        getFavoriteScripts,
        getUserConnections
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
