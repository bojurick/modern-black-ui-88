
import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, Zap, Wrench, Rocket } from 'lucide-react';

const StatsSection = () => {
  const statistics = [
    { value: "150K+", label: "Active Users", icon: <Laptop className="w-8 h-8 text-red-500" /> },
    { value: "98% UNC", label: "Script Support", icon: <Zap className="w-8 h-8 text-red-500" /> },
    { value: "24/7", label: "Support", icon: <Wrench className="w-8 h-8 text-red-500" /> },
    { value: "2M+", label: "Monthly Executions", icon: <Rocket className="w-8 h-8 text-red-500" /> }
  ];

  const countAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 relative z-10">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Radiant Blur Effect - Changed to red */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-red-500/20 blur-[100px] -z-10 opacity-70"></div>
        
        <div className="glass-morphism rounded-2xl py-10 px-6 sm:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={countAnimation}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 10,
                    delay: index * 0.1
                  }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl mb-3 text-red-400">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
