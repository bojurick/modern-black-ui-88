
import React from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface CustomNotificationProps {
  title: string;
  message: string;
  type: NotificationType;
  showProgress?: boolean;
  duration?: number;
  onClose?: () => void;
}

const getIcon = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'error':
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    case 'warning':
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    case 'info':
    default:
      return <Info className="h-5 w-5 text-blue-500" />;
  }
};

const getBorderColor = (type: NotificationType, isLight: boolean) => {
  switch (type) {
    case 'success':
      return isLight ? 'border-l-green-500' : 'border-l-green-500';
    case 'error':
      return isLight ? 'border-l-red-500' : 'border-l-red-500';
    case 'warning':
      return isLight ? 'border-l-amber-500' : 'border-l-amber-500';
    case 'info':
    default:
      return isLight ? 'border-l-blue-500' : 'border-l-blue-500';
  }
};

const getTextColor = (type: NotificationType, isLight: boolean) => {
  switch (type) {
    case 'success':
      return isLight ? 'text-green-700' : 'text-green-500';
    case 'error':
      return isLight ? 'text-red-700' : 'text-red-400';
    case 'warning':
      return isLight ? 'text-amber-700' : 'text-amber-400';
    case 'info':
    default:
      return isLight ? 'text-blue-700' : 'text-blue-400';
  }
};

const getProgressColor = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return 'bg-green-500';
    case 'error':
      return 'bg-red-500';
    case 'warning':
      return 'bg-amber-500';
    case 'info':
    default:
      return 'bg-blue-500';
  }
};

export const CustomNotification: React.FC<CustomNotificationProps> = ({
  title,
  message,
  type,
  showProgress = true,
  duration = 5000,
  onClose
}) => {
  const [progress, setProgress] = React.useState(100);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  React.useEffect(() => {
    if (showProgress) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress - (100 / (duration / 100));
          return newProgress <= 0 ? 0 : newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [duration, showProgress]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`rounded-md ${isLight 
        ? 'bg-white shadow-md border border-gray-200' 
        : 'bg-black/60 backdrop-blur-md border border-white/10'} border-l-4 ${getBorderColor(type, isLight)} shadow-lg w-full max-w-md overflow-hidden`}
    >
      <div className="flex p-4">
        <div className="flex-shrink-0 mr-3">
          {getIcon(type)}
        </div>
        <div className="flex-1">
          <h4 className={`text-sm font-medium ${getTextColor(type, isLight)}`}>{title}</h4>
          <p className={`text-xs ${isLight ? 'text-gray-600' : 'text-gray-300'} mt-1`}>{message}</p>
        </div>
        <button 
          onClick={onClose} 
          className={`flex-shrink-0 ml-3 ${isLight ? 'text-gray-500 hover:text-gray-700' : 'text-gray-400 hover:text-gray-200'} transition-colors`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      {showProgress && (
        <div className={`h-1 w-full ${isLight ? 'bg-gray-100' : 'bg-black/5'}`}>
          <motion.div 
            className={`h-full ${getProgressColor(type)}`}
            initial={{ width: "100%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: duration / 1000, ease: "linear" }}
          />
        </div>
      )}
    </motion.div>
  );
};
