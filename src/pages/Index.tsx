import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Button from '@/components/common/Button';
import Navbar from '@/components/navbar/Navbar';
import PageTransition from '@/components/layout/PageTransition';
import Particles from '@/components/ui/particles';
import GridBackground from '@/components/ui/grid-background';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import TopFeaturesSection from '@/components/home/TopFeaturesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FeaturesComparisonSection from '@/components/home/FeaturesComparisonSection';
import StatsSection from '@/components/home/StatsSection';
import FAQSection from '@/components/home/FAQSection';
import FeaturedGamesCarousel from '@/components/home/FeaturedGamesCarousel';
import MediaShowcase from '@/components/home/MediaShowcase';
import BuddySystemWidget from '@/components/home/BuddySystemWidget';
import { useTheme } from '@/contexts/ThemeContext';
const Index = () => {
  const {
    theme
  } = useTheme();
  const isLight = theme === 'light';
  return <PageTransition>
      <div className="min-h-screen flex flex-col relative">
        <Navbar />
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <GridBackground />
          <Particles quantity={50} />
        </div>
        
        {/* Main Radiant Blur Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-red-500/20 blur-[150px] -z-5 opacity-30"></div>
        
        {/* UNC Badge */}
        <div className={`unc-badge ${isLight ? 'bg-red-100 text-red-800 border-red-200' : ''}`}>
          98% UNC
        </div>
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 flex items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-10">
              <motion.div initial={{
              opacity: 0,
              scale: 0.9
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              duration: 0.7,
              type: "spring"
            }}>
                <motion.h1 className={`text-4xl sm:text-5xl max-w-3xl mx-auto leading-tight ${isLight ? 'text-gray-900' : 'text-white'} md:text-6xl font-bold`}>
                  The Ultimate
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600"> Exploiting </span>
                  Experience
                </motion.h1>
              </motion.div>
              
              <motion.p initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: 0.3
            }} className={`text-xl max-w-2xl mx-auto ${isLight ? 'text-gray-700' : 'text-white/80'}`}>
                Experience Essence - the next generation script executor with unmatched performance, 
                security, and a modern interface for all your gaming needs.
              </motion.p>
              
              <motion.div className="flex flex-col sm:flex-row gap-4 mt-8" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: 0.4
            }}>
                <Link to="/dashboard">
                  <Button variant="primary" size="lg" icon={<ChevronRight className="h-5 w-5" />} iconPosition="right">
                    Get Started
                  </Button>
                </Link>
                <Link to="/library">
                  <Button variant="outline" size="lg">
                    Browse Scripts
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Games Carousel */}
        <FeaturedGamesCarousel />
        
        {/* Stats Section */}
        <StatsSection />
        
        {/* Media Showcase Section */}
        <MediaShowcase />
        
        {/* Top Features Section */}
        <TopFeaturesSection />
        
        {/* How It Works Section */}
        <HowItWorksSection />
        
        {/* Buddy System Widget */}
        <BuddySystemWidget />
        
        {/* Features Comparison Section */}
        <FeaturesComparisonSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* FAQ Section */}
        <FAQSection />
        
        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="container px-4 md:px-6">
            <motion.div className={`relative z-10 max-w-3xl mx-auto p-8 sm:p-12 rounded-2xl overflow-hidden glass-morphism ${isLight ? 'bg-white/80 border-gray-200 shadow-md' : ''}`} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} viewport={{
            once: true
          }}>
              <div className="absolute inset-0 -z-10">
                <div className={`absolute inset-0 bg-gradient-to-tr from-red-500/20 to-red-600/20 rounded-xl ${isLight ? 'opacity-60' : ''}`} />
              </div>
              
              <h2 className={`text-3xl font-bold mb-4 text-center ${isLight ? 'text-gray-900' : ''}`}>Ready to Elevate Your Experience?</h2>
              <p className={`${isLight ? 'text-gray-700' : 'text-gray-200'} mb-8 text-center`}>
                Join thousands of users who have transformed their gameplay with Essence's powerful script executor.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/signup">
                  <Button variant="primary" size="lg">
                    Create Account
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" size="lg">
                    Explore Features
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className={`py-8 border-t ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className={`${isLight ? 'text-gray-600' : 'text-gray-400'} text-sm`}>© 2025 Essence. All rights reserved. | Website Made By Boost ♥ | Main WPF Ui Made by M4A1 | Owned by MasterGrinder.</p>
              </div>
              <div className="flex space-x-6">
                <a href="#" className={`${isLight ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-white'} transition-colors`}>
                  Terms
                </a>
                <a href="#" className={`${isLight ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-white'} transition-colors`}>
                  Privacy
                </a>
                <a href="#" className={`${isLight ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-white'} transition-colors`}>
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>;
};
export default Index;