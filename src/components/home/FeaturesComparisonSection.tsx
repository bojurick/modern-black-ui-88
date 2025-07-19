
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Shield, Zap, Layers, Code, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const FeaturesComparisonSection = () => {
  const features = [
    { name: "Easy to Use Interface", icon: <Layers className="h-5 w-5" /> },
    { name: "Script Compatibility", icon: <Code className="h-5 w-5" /> },
    { name: "Fast Execution", icon: <Zap className="h-5 w-5" /> },
    { name: "Regular Updates", icon: <Star className="h-5 w-5" /> },
    { name: "Dedicated Support", icon: <Shield className="h-5 w-5" /> }
  ];
  
  const products = [{
    name: "Essence",
    highlighted: true
  }, {
    name: "Competitor A",
    highlighted: false
  }, {
    name: "Competitor B",
    highlighted: false
  }];
  
  const featureComparison = [
    [true, true, true, true, true], // Essence
    [false, true, true, false, false], // Competitor A
    [false, false, true, false, true], // Competitor B
  ];

  return (
    <section className="py-16 relative z-10">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div 
          className="text-center mb-12" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-red-500/20 text-sm text-red-400">
            Comparison
          </div>
          <h2 className="text-3xl font-bold mb-4">Why Choose Essence?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See how Essence compares to other script executors on the market
          </p>
        </motion.div>

        <motion.div 
          className="relative glass-morphism rounded-2xl p-8 overflow-hidden" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Radiant Blur Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-red-500/20 blur-[100px] -z-10 opacity-70"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Left Side - Visual */}
              <div className="flex-1 order-2 lg:order-1">
                <div className="p-2 bg-black/50 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-xl">
                  <div className="bg-background-light p-6 rounded-lg border border-white/10">
                    <div className="space-y-6">
                      {features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-6">
                          <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                            {feature.icon}
                          </div>
                          
                          <div className="flex items-center flex-1 space-x-4">
                            <span className="text-sm font-medium">{feature.name}</span>
                            
                            <div className="flex space-x-4 ml-auto">
                              {products.map((product, productIdx) => (
                                <div key={`${idx}-${productIdx}`} className="flex items-center justify-center w-8 h-8">
                                  {featureComparison[productIdx][idx] === true ? (
                                    <CheckCircle className={`h-5 w-5 ${product.highlighted ? 'text-red-500' : 'text-green-500'}`} />
                                  ) : (
                                    <XCircle className="h-5 w-5 text-red-500" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-white/10 flex justify-between">
                      {products.map((product, idx) => (
                        <div key={idx} className="text-center">
                          <span className={`font-medium ${product.highlighted ? 'text-red-400' : 'text-gray-400'}`}>
                            {product.name}
                          </span>
                          {product.highlighted && (
                            <div className="mt-1">
                              <Badge className="bg-red-600 text-white hover:bg-red-700" variant="secondary">
                                Recommended
                              </Badge>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Side - Text Content */}
              <div className="flex-1 order-1 lg:order-2 text-left">
                <h3 className="text-2xl font-bold mb-4">Unmatched Features & Performance</h3>
                <p className="text-gray-400 mb-6">
                  Essence stands out from the competition with its powerful combination of features, 
                  performance, and user experience that other script executors simply can't match.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 mt-0.5">
                      <Shield className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Enhanced Security</h4>
                      <p className="text-sm text-gray-400">Advanced protection mechanisms to keep your account safe</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 mt-0.5">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Lightning Fast Performance</h4>
                      <p className="text-sm text-gray-400">Execute scripts with minimal latency and maximum efficiency</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 mt-0.5">
                      <Star className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Constant Evolution</h4>
                      <p className="text-sm text-gray-400">Regular updates to ensure compatibility with the latest games</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesComparisonSection;
