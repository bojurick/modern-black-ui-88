
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import PageTransition from '@/components/layout/PageTransition';
import GridBackground from '@/components/ui/grid-background';
import Particles from '@/components/ui/particles';
import { Button } from '@/components/ui/button';

const AuthCallback = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      // Parse the hash fragment
      const hash = window.location.hash;
      const query = window.location.search;
      
      if (hash || query) {
        try {
          // The auth callback will handle the token exchange
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            throw error;
          }
          
          if (data.session) {
            setSuccess(true);
            // Redirect after a short delay to let the user see the success message
            setTimeout(() => {
              navigate('/dashboard');
            }, 2000);
          }
        } catch (err: any) {
          console.error('Auth callback error:', err);
          setError(err.message || 'Authentication failed');
        }
      } else {
        setError('Invalid callback URL');
      }
    };
    
    handleCallback();
  }, [navigate]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex items-center justify-center relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <GridBackground />
          <Particles quantity={30} />
        </div>
        
        <div className="container px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto glass-morphism rounded-2xl p-8 border border-white/10 text-center"
          >
            {error ? (
              <>
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Authentication Failed</h2>
                <p className="text-gray-400 mb-6">{error}</p>
                <Button onClick={() => navigate('/login')}>
                  Try Again
                </Button>
              </>
            ) : success ? (
              <>
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Successfully Linked!</h2>
                <p className="text-gray-400 mb-2">Your Discord account has been successfully connected.</p>
                <p className="text-gray-400 mb-6">Redirecting you to dashboard...</p>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-6">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Authenticating...</h2>
                <p className="text-gray-400">Please wait while we verify your account.</p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AuthCallback;
