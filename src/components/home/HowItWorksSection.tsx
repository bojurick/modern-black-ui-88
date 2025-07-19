
import React from 'react';
import { Zap, Settings, Gamepad2, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWorksSection = () => {
  const workflowSteps = [
    { 
      icon: <Zap className="h-5 w-5" />, 
      title: "Get Your Key", 
      description: "Obtain your unique access key to unlock all features" 
    },
    { 
      icon: <Gamepad2 className="h-5 w-5" />, 
      title: "Load Essence", 
      description: "Launch the Essence executor from your dashboard" 
    },
    { 
      icon: <Settings className="h-5 w-5" />, 
      title: "Configure Settings", 
      description: "Customize your experience with advanced options" 
    },
    { 
      icon: <Shield className="h-5 w-5" />, 
      title: "Enjoy Enhanced Gameplay", 
      description: "Experience games with powerful scripts and features" 
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Radiant Blur Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-red-500/20 blur-[150px] -z-10 opacity-40"></div>
      
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left side - Application UI mockup */}
          <motion.div 
            className="flex-1 order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="p-2 bg-black/50 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-xl">
              <div className="rounded-lg bg-background-light p-5 border border-white/10">
                <div className="flex flex-col space-y-4">
                  {workflowSteps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{step.title}</h4>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 relative">
                  <div className="h-12 w-full rounded-md bg-black/40 border border-white/5 flex items-center px-4">
                    <input 
                      type="text" 
                      className="w-full bg-transparent text-sm border-none outline-none placeholder:text-white/30"
                      placeholder="What would you like to do first?"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right side - Text content */}
          <motion.div 
            className="flex-1 order-1 lg:order-2 text-left"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="inline-block mb-3 px-3 py-1 rounded-full bg-red-500/20 text-sm text-red-400">
              How It Works
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How Essence Works</h2>
            <p className="text-gray-400 mb-6">
              Discover the advanced capabilities of Essence, where state-of-the-art features
              such as script execution, real-time monitoring, and custom configurations
              effortlessly transform your gaming experience.
            </p>
            <p className="text-gray-400">
              Our intuitive interface makes it easy to load and execute scripts, customize settings,
              and monitor performance - all with unparalleled security and reliability.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
