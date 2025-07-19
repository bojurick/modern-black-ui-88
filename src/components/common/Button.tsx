
import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

type ButtonProps = {
  variant?: 'default' | 'primary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
} & Omit<HTMLMotionProps<'button'>, 'children'>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'default', 
    size = 'md', 
    className, 
    children, 
    disabled = false, 
    icon, 
    iconPosition = 'left', 
    ...props 
  }, ref) => {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const variants = {
      default: 'bg-secondary hover:bg-secondary/80 text-white',
      primary: `bg-primary hover:bg-primary/90 text-white`,
      outline: isLight 
        ? 'bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-800' 
        : 'bg-transparent border border-white/20 hover:bg-white/5 text-white',
      ghost: isLight
        ? 'bg-transparent hover:bg-gray-100 text-gray-800'
        : 'bg-transparent hover:bg-white/5 text-white',
      link: isLight
        ? 'bg-transparent underline-offset-4 hover:underline text-red-600 p-0 h-auto'
        : 'bg-transparent underline-offset-4 hover:underline text-white p-0 h-auto',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4',
      lg: 'h-12 px-6 text-lg',
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          variant !== 'link' && sizes[size],
          className
        )}
        disabled={disabled}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
        {...props}
      >
        {icon && iconPosition === 'left' && <span className={cn('mr-2', size === 'sm' ? 'text-xs' : '')}>{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className={cn('ml-2', size === 'sm' ? 'text-xs' : '')}>{icon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
