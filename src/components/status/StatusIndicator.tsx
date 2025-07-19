
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ActivityIcon, CheckCircleIcon, ServerIcon, ZapIcon } from 'lucide-react';
import { SystemStatusType } from '@/services/status-service';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

const StatusIndicator = () => {
  // Since the tables don't exist, we'll use a default status
  const defaultStatus: SystemStatusType = 'operational';

  const getStatusIcon = (statusType: SystemStatusType = defaultStatus) => {
    switch (statusType) {
      case 'operational':
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      case 'degraded':
        return <ActivityIcon className="h-4 w-4 text-yellow-500" />;
      case 'maintenance':
        return <ServerIcon className="h-4 w-4 text-blue-500" />;
      case 'outage':
        return <ActivityIcon className="h-4 w-4 text-red-500" />;
      default:
        return <ZapIcon className="h-4 w-4 text-purple-500" />;
    }
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link 
        to="/status" 
        className="px-4 py-2 rounded-md text-sm font-medium transition-colors text-gray-400 hover:text-white hover:bg-purple-500/20 flex items-center gap-1.5 group"
      >
        <div className="p-1 rounded-full bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
          {getStatusIcon(defaultStatus)}
        </div>
        <span>Status</span>
      </Link>
    </motion.div>
  );
};

export default StatusIndicator;
