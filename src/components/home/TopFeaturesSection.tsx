
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Shield, Zap, Cpu, Settings, BarChart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';

const TopFeaturesSection = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  
  const topFeatures = [
    {
      title: "Advanced Script Execution",
      description: "Load and execute complex scripts with powerful capabilities",
      icon: <Code className="h-6 w-6" />,
      color: "red-500",
      bgLight: "bg-red-50",
      textLight: "text-red-800"
    },
    {
      title: "Unmatched Security",
      description: "Stay undetected with our advanced protection technology",
      icon: <Shield className="h-6 w-6" />,
      color: "red-500",
      bgLight: "bg-red-50",
      textLight: "text-red-800"
    },
    {
      title: "Lightning Performance",
      description: "Experience optimized performance with minimal resource usage",
      icon: <Zap className="h-6 w-6" />,
      color: "red-500",
      bgLight: "bg-red-50",
      textLight: "text-red-800"
    },
    {
      title: "Advanced AI Technology",
      description: "Benefit from cutting-edge AI for intelligent script handling",
      icon: <Cpu className="h-6 w-6" />,
      color: "red-500",
      bgLight: "bg-red-50",
      textLight: "text-red-800"
    },
    {
      title: "Customizable Settings",
      description: "Personalize your experience with extensive configuration options",
      icon: <Settings className="h-6 w-6" />,
      color: "red-500",
      bgLight: "bg-red-50",
      textLight: "text-red-800"
    },
    {
      title: "Real-time Analytics",
      description: "Monitor performance metrics and script execution analytics",
      icon: <BarChart className="h-6 w-6" />,
      color: "red-500",
      bgLight: "bg-red-50",
      textLight: "text-red-800"
    }
  ];

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Radiant Blur Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-red-500/20 blur-[150px] -z-10 opacity-30"></div>
      
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-red-500/20 text-sm text-red-400">
            <Zap className="inline-block h-4 w-4 mr-1" />
            <span>Key Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Top-tier Features</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience gaming excellence with our advanced script execution and 
            exceptional performance optimization.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topFeatures.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={featureVariants}
              className="group"
            >
              <Card className={`relative h-full overflow-hidden border-0 ${
                isLight 
                  ? `${feature.bgLight} shadow-lg` 
                  : 'bg-black/50 backdrop-blur-md'
                } hover:shadow-xl transition-all duration-300`}>
                {/* Red highlight gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-red-500/5 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Top red border accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-red-600 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
                
                <CardContent className="p-8 relative z-10">
                  <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center ${
                    isLight 
                      ? `${feature.bgLight} ${feature.textLight}` 
                      : 'bg-red-500/20 text-red-400'
                    } shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-3 ${
                    isLight ? feature.textLight : 'text-white'
                  } group-hover:text-red-400 transition-colors duration-300`}>
                    {feature.title}
                  </h3>
                  
                  <p className={`${
                    isLight ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    {feature.description}
                  </p>
                  
                  {/* Hover Indicator */}
                  <div className="mt-4 pt-4 border-t border-red-500/20 transform transition-all duration-300 text-red-400 opacity-0 group-hover:opacity-100 flex items-center text-sm font-medium">
                    <span>Learn more</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopFeaturesSection;
