
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import Button from '@/components/common/Button';
import Navbar from '@/components/navbar/Navbar';
import PageTransition from '@/components/layout/PageTransition';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GridBackground from '@/components/ui/grid-background';
import Particles from '@/components/ui/particles';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [discordLoading, setDiscordLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signInWithDiscord } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      setLoading(true);
      await signIn(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDiscordLogin = async () => {
    try {
      setDiscordLoading(true);
      await signInWithDiscord();
    } catch (error) {
      console.error(error);
    } finally {
      setDiscordLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <GridBackground />
          <Particles quantity={30} />
        </div>
        <Navbar />
        
        <main className="container mx-auto px-4 py-24 flex justify-center items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="glass-morphism rounded-2xl p-8 border border-white/10">
              <div className="mb-6 text-center">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <LogIn className="w-12 h-12 mx-auto mb-4 text-primary" />
                </motion.div>
                <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
                <p className="text-gray-400">Sign in to access your Essence account</p>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full mt-6"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
              
              <div className="my-6 flex items-center gap-3">
                <Separator className="flex-grow" />
                <span className="text-sm text-gray-400">OR</span>
                <Separator className="flex-grow" />
              </div>
              
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752c4] text-white border-none"
                onClick={handleDiscordLogin}
                disabled={discordLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 127.14 96.36" fill="currentColor">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                </svg>
                {discordLoading ? "Connecting..." : "Continue with Discord"}
              </Button>
              
              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-xs">
                By signing in, you agree to our{" "}
                <a href="#" className="text-gray-400 hover:underline">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="text-gray-400 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </PageTransition>
  );
};

export default Login;
