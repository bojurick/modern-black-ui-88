import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Heart, Key, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
const BuddySystemWidget = () => {
  const {
    user
  } = useAuth();
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  // Generate a referral code based on user ID or a random code if not logged in
  const referralCode = user ? `ESS-${user.id.substring(0, 8)}` : `ESS-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast.success("Referral code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };
  return <section className="py-16 relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        {/* Radiant Blur Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-red-500/20 blur-[100px] -z-10 opacity-70"></div>
        
        <motion.div className="glass-morphism rounded-2xl p-8 md:p-12 relative overflow-hidden" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.7
      }} viewport={{
        once: true
      }}>
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="flex-1 order-2 lg:order-1">
              <div className="inline-block mb-3 px-3 py-1 rounded-full bg-red-500/20 text-sm text-red-400">
                Buddy System
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Share Essence, Get Rewarded</h2>
              <p className="text-gray-400 mb-6">
                Invite your friends to join Essence and be rewarded with a 3-day premium key when they sign up using your referral code. The more friends you bring, the more rewards you earn!
              </p>
              
              {/* Steps */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 mt-0.5">
                    <Share2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Step 1: Share Your Code</h4>
                    <p className="text-sm text-gray-400">Copy your unique referral code and share it with friends</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 mt-0.5">
                    <Heart className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Step 2: Friend Signs Up</h4>
                    <p className="text-sm text-gray-400">Your friend creates an account using your referral code</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 mt-0.5">
                    <Key className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Step 3: Get Rewarded</h4>
                    <p className="text-sm text-gray-400">Receive a 3-day premium key automatically in your account</p>
                  </div>
                </div>
              </div>
              
              {/* Referral Code */}
              {user ? <div>
                  <div className="flex items-center">
                    <div className="relative flex-1 max-w-md">
                      <input type="text" value={referralCode} readOnly className="w-full bg-black/40 border border-white/10 rounded-l-md py-2 px-4 text-white" />
                      <Button onClick={copyToClipboard} className="absolute right-0 top-0 bottom-0 rounded-l-none bg-red-500 hover:bg-red-600 text-white">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        <span className="ml-2 hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Track your referrals and rewards in your profile dashboard
                  </p>
                </div> : <div>
                  <Button onClick={() => navigate('/signup')} className="bg-red-500 hover:bg-red-600 text-white">Download Essence to Get Your Referral Code</Button>
                  <p className="text-xs text-gray-400 mt-2">Download and Create an account to start referring friends and earning rewards</p>
                </div>}
            </div>
            
            {/* Right Side - Visual Representation */}
            <div className="flex-1 order-1 lg:order-2">
              <motion.div className="relative mx-auto w-full max-w-md" initial={{
              opacity: 0,
              scale: 0.9
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} transition={{
              duration: 0.7,
              delay: 0.2
            }} viewport={{
              once: true
            }}>
                <div className="p-2 bg-black/50 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-xl">
                  <div className="bg-background-light p-6 rounded-lg border border-white/10">
                    {/* Visual representation of the buddy system */}
                    <div className="flex flex-col items-center space-y-6">
                      {/* You Icon */}
                      <div className="relative">
                        <div className="h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center">
                          <span className="text-2xl font-bold text-red-400">You</span>
                        </div>
                        <div className="absolute -right-1 -bottom-1 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center">
                          <Share2 className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      
                      {/* Connection Line */}
                      <div className="h-12 w-0.5 bg-gradient-to-b from-red-500 to-red-400"></div>
                      
                      {/* Friend Icon */}
                      <div className="relative">
                        <div className="h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center">
                          <span className="text-2xl font-bold text-red-400">Friend</span>
                        </div>
                        <div className="absolute -right-1 -bottom-1 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center">
                          <Heart className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      
                      {/* Connection Line */}
                      <div className="h-12 w-0.5 bg-gradient-to-b from-red-400 to-red-500"></div>
                      
                      {/* Reward Icon */}
                      <div className="relative">
                        <div className="h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center">
                          <Key className="h-8 w-8 text-red-400" />
                        </div>
                        <div className="absolute -right-1 -bottom-1 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">3d</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default BuddySystemWidget;