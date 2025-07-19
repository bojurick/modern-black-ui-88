
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

type Theme = 'dark' | 'light';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, updateProfile } = useAuth();
  const [theme, setThemeState] = useState<Theme>('dark'); // Default to dark

  // Initialize theme from user preferences or system
  useEffect(() => {
    // First check user's saved preference
    if (user?.user_metadata?.theme) {
      setThemeState(user.user_metadata.theme as Theme);
    } else {
      // Default to dark mode
      setThemeState('dark');
    }
  }, [user]);

  // Apply theme changes to document
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  // Function to update theme
  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    
    // Save theme preference to user profile if logged in
    if (user) {
      try {
        await updateProfile({ theme: newTheme });
      } catch (error) {
        console.error('Failed to save theme preference:', error);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
