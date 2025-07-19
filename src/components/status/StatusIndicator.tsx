
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ActivityIcon, CheckCircleIcon, ServerIcon, ZapIcon } from 'lucide-react';
import { SystemStatusType, getSystemStatus } from '@/services/status-service';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

const StatusIndicator = () => {
  const { data: systemStatus } = useQuery({
    queryKey: ['system-status'],
    queryFn: getSystemStatus,
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: false,
  });

  const status = systemStatus?.status || 'operational';

  const getStatusIcon = (statusType: SystemStatusType) => {
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
          {getStatusIcon(status)}
        </div>
        <span>Status</span>
      </Link>
    </motion.div>
  );
};

export default StatusIndicator;
