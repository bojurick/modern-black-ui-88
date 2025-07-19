
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, UserPlus, User, Check } from 'lucide-react';
import Button from '@/components/common/Button';
import Navbar from '@/components/navbar/Navbar';
import PageTransition from '@/components/layout/PageTransition';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import GridBackground from '@/components/ui/grid-background';
import Particles from '@/components/ui/particles';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    if (!agreed) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    
    try {
      setLoading(true);
      await signUp(email, password, username);
      navigate('/dashboard');
    } catch (error) {
      // Error is handled in signUp method
      console.error(error);
    } finally {
      setLoading(false);
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
        
        <main className="container mx-auto px-4 py-20 flex justify-center items-center relative z-10">
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
                  <UserPlus className="w-12 h-12 mx-auto mb-4 text-primary" />
                </motion.div>
                <h1 className="text-2xl font-bold mb-2">Create an account</h1>
                <p className="text-gray-400">Join Essence and unlock the full potential</p>
              </div>
              
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Your username"
                      className="pl-10"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                
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
                  <Label htmlFor="password">Password</Label>
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
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox 
                    id="terms" 
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked as boolean)} 
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-400">
                    I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                  </Label>
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full mt-6"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/10">
                <div className="rounded-full bg-blue-500/20 p-1">
                  <Check className="h-4 w-4 text-blue-400" />
                </div>
                <p className="text-sm text-gray-300">Secure, encrypted connection</p>
              </div>
              
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/10">
                <div className="rounded-full bg-green-500/20 p-1">
                  <Check className="h-4 w-4 text-green-400" />
                </div>
                <p className="text-sm text-gray-300">Fast script execution</p>
              </div>
              
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/10">
                <div className="rounded-full bg-purple-500/20 p-1">
                  <Check className="h-4 w-4 text-purple-400" />
                </div>
                <p className="text-sm text-gray-300">Access to premium script library</p>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </PageTransition>
  );
};

export default Signup;
