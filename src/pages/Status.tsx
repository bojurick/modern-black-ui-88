
import { 
  CheckCircleIcon, 
  ActivityIcon, 
  ServerIcon, 
  InfoIcon,
  HeartPulseIcon,
  ShieldIcon,
  CloudIcon,
  DatabaseIcon 
} from 'lucide-react';
import Navbar from '@/components/navbar/Navbar';
import PageTransition from '@/components/layout/PageTransition';
import { SystemStatusType } from '@/services/status-service';
import { Separator } from '@/components/ui/separator';
import GridBackground from '@/components/ui/grid-background';
import Particles from '@/components/ui/particles';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ExecutorStatus from '@/components/status/ExecutorStatus';

const StatusPage = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  
  // Default values since the tables don't exist yet
  const systemStatus: SystemStatusType = 'operational';
  const systemMessage = "All systems are operational. We're currently building our status tracking system.";
  const updatedAt = new Date().toISOString();
  
  // Sample service statuses for demonstration
  const sampleServices = [
    { id: 1, name: "API Service", status: 'operational' as SystemStatusType, updated_at: updatedAt },
    { id: 2, name: "Authentication", status: 'operational' as SystemStatusType, updated_at: updatedAt },
    { id: 3, name: "Database", status: 'operational' as SystemStatusType, updated_at: updatedAt },
    { id: 4, name: "Cloud Storage", status: 'operational' as SystemStatusType, updated_at: updatedAt },
    { id: 5, name: "Security Systems", status: 'operational' as SystemStatusType, updated_at: updatedAt }
  ];

  const getStatusIcon = (status?: SystemStatusType) => {
    switch (status) {
      case 'operational':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'degraded':
        return <ActivityIcon className="h-5 w-5 text-yellow-500" />;
      case 'maintenance':
        return <ServerIcon className="h-5 w-5 text-blue-500" />;
      case 'outage':
        return <ActivityIcon className="h-5 w-5 text-red-500" />;
      default:
        return <InfoIcon className="h-5 w-5 text-gray-400" />;
    }
  };
  
  const getStatusText = (status?: SystemStatusType) => {
    switch (status) {
      case 'operational':
        return 'Operational';
      case 'degraded':
        return 'Degraded Performance';
      case 'maintenance':
        return 'Maintenance';
      case 'outage':
        return 'Outage';
      default:
        return 'Unknown';
    }
  };
  
  const getStatusBadgeClass = (status?: SystemStatusType) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'maintenance':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'outage':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getServiceIcon = (serviceName: string) => {
    switch (serviceName.toLowerCase()) {
      case "api service":
        return <ServerIcon className="h-5 w-5" />;
      case "authentication":
        return <ShieldIcon className="h-5 w-5" />;
      case "database":
        return <DatabaseIcon className="h-5 w-5" />;
      case "cloud storage":
        return <CloudIcon className="h-5 w-5" />;
      case "security systems":
        return <ShieldIcon className="h-5 w-5" />;
      default:
        return <ServerIcon className="h-5 w-5" />;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <GridBackground />
          <Particles quantity={30} />
          
          {/* Radiant Blur Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-red-500/20 blur-[150px] -z-10 opacity-40"></div>
        </div>
        
        <Navbar />
        
        <main className="container px-4 md:px-6 mx-auto pt-28 pb-16 relative z-10">
          <motion.div 
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block mb-3 px-3 py-1 rounded-full bg-red-500/20 text-sm text-red-400 self-start">
              System Health
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              <HeartPulseIcon className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold">System Status</h1>
            </div>
            
            {/* Executor Status Component */}
            <ExecutorStatus className="mb-8" />
            
            {/* System Status Card */}
            <motion.div 
              className={`${isLight ? 'bg-white shadow-lg border-gray-200' : 'glass-morphism bg-card/30 backdrop-blur-sm border-white/10'} rounded-xl border p-6 mb-8`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(systemStatus)}
                  <h2 className="text-xl font-semibold">
                    All Systems Operational
                  </h2>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(systemStatus)}`}>
                  {getStatusText(systemStatus)}
                </span>
              </div>
              <p className={`${isLight ? 'text-gray-600' : 'text-gray-300'} mb-2`}>{systemMessage}</p>
              <p className="text-sm text-gray-500">
                Status monitoring system coming soon
              </p>
            </motion.div>
            
            {/* Services Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold mb-4">Service Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sampleServices.map((service) => (
                  <motion.div
                    key={service.id}
                    className={`${isLight ? 'bg-white shadow-md border-gray-200' : 'glass-morphism bg-card/20 backdrop-blur-sm border-white/10'} rounded-xl border p-4 transition-all hover:shadow-lg`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${service.status === 'operational' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                          {getServiceIcon(service.name)}
                        </div>
                        <span className={`${isLight ? 'text-gray-800' : 'text-gray-200'} font-medium`}>{service.name}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(service.status)}`}>
                        {getStatusText(service.status)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Status History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4">Recent Updates</h2>
              <div className={`${isLight ? 'bg-white shadow-md border-gray-200' : 'glass-morphism bg-card/30 backdrop-blur-sm border-white/10'} rounded-xl border overflow-hidden`}>
                <div className="p-8 text-center">
                  <div className="h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 mx-auto mb-4">
                    <ActivityIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Status history and incident reporting will be available soon. Check back for updates on system performance and maintenance records.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </PageTransition>
  );
};

export default StatusPage;
