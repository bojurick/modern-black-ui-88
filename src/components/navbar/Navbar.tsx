
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from '../common/Logo';
import { UserProfile } from './UserProfile';
import { useAuth } from '@/contexts/AuthContext';
import StatusIndicator from '../status/StatusIndicator';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Workflow Library', path: '/library' },
    { name: 'Execute', path: '/execute' },
    { name: 'Status', path: '/status' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Blurred Background */}
      <div className={`absolute inset-0 backdrop-blur-md ${
        scrolled ? 'bg-background/70' : 'bg-transparent'
      } transition-all duration-300`}></div>
      
      {/* Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] w-full">
        <div className="h-full w-full mx-auto" 
          style={{ 
            background: 'linear-gradient(90deg, rgba(234,56,76,0.5) 0%, rgba(234,56,76,1) 50%, rgba(234,56,76,0.5) 100%)' 
          }}>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors
                    ${location.pathname === link.path
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
              >
                {location.pathname === link.path && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-md bg-white/10"
                    transition={{ type: 'spring', duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Auth Buttons or User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <UserProfile />
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium bg-primary/90 hover:bg-primary text-white rounded-md transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5"
            aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-background/80 backdrop-blur-md border-b border-white/10"
        >
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors
                  ${location.pathname === link.path
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <div className="pt-4 pb-2 border-t border-white/10 mt-4">
                <Link
                  to="/profile"
                  className="block px-4 py-3 rounded-md text-sm font-medium transition-colors text-gray-400 hover:text-white hover:bg-white/5"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-3 rounded-md text-sm font-medium transition-colors text-gray-400 hover:text-white hover:bg-white/5"
                >
                  Settings
                </Link>
              </div>
            ) : (
              <div className="pt-4 pb-2 border-t border-white/10 mt-4 grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm text-center font-medium text-white/80 hover:text-white border border-white/20 rounded-md transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm text-center font-medium bg-primary text-white rounded-md transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
