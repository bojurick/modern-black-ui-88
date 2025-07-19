
import { useState } from 'react';
import { 
  ActivityIcon, 
  CheckCircleIcon, 
  ZapIcon, 
  AlertTriangleIcon, 
  ClockIcon 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SystemStatusType } from '@/services/status-service';
import { useTheme } from '@/contexts/ThemeContext';

type ExecutorStatusProps = {
  className?: string;
}

type ExecutorStateType = 'idle' | 'running' | 'completed' | 'error' | 'queued';

const ExecutorStatus = ({ className }: ExecutorStatusProps) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // For demo purposes - in a real app this would come from an API
  const [executorState, setExecutorState] = useState<ExecutorStateType>('idle');
  const [lastRun, setLastRun] = useState<string>(new Date().toLocaleString());
  const [executionCount, setExecutionCount] = useState<number>(127);
  const [averageRuntime, setAverageRuntime] = useState<string>("3.4s");
  
  const getStateIcon = (state: ExecutorStateType) => {
    switch (state) {
      case 'running':
        return <ActivityIcon className="h-8 w-8 text-blue-500" />;
      case 'completed':
        return <CheckCircleIcon className="h-8 w-8 text-green-500" />;
      case 'error':
        return <AlertTriangleIcon className="h-8 w-8 text-red-500" />;
      case 'queued':
        return <ClockIcon className="h-8 w-8 text-yellow-500" />;
      case 'idle':
      default:
        return <ZapIcon className="h-8 w-8 text-purple-500" />;
    }
  };
  
  const getStateText = (state: ExecutorStateType) => {
    switch (state) {
      case 'running':
        return 'Running';
      case 'completed':
        return 'Completed';
      case 'error':
        return 'Error';
      case 'queued':
        return 'Queued';
      case 'idle':
      default:
        return 'Ready';
    }
  };
  
  const getStateColor = (state: ExecutorStateType) => {
    switch (state) {
      case 'running':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'queued':
        return 'bg-yellow-500';
      case 'idle':
      default:
        return 'bg-purple-500';
    }
  };

  // Demo function to cycle through states when clicking on the card
  const cycleState = () => {
    const states: ExecutorStateType[] = ['idle', 'queued', 'running', 'completed', 'error'];
    const currentIndex = states.indexOf(executorState);
    const nextIndex = (currentIndex + 1) % states.length;
    setExecutorState(states[nextIndex]);
    
    if (states[nextIndex] === 'completed') {
      setLastRun(new Date().toLocaleString());
      setExecutionCount(prev => prev + 1);
    }
  };

  return (
    <motion.div 
      className={`w-full ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card 
        className={`${isLight ? 'bg-white' : 'glass-morphism bg-black/40 backdrop-blur-sm'} overflow-hidden border border-zinc-200/30 dark:border-zinc-700/30 hover:shadow-lg transition-all duration-300`}
        onClick={cycleState}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2 text-zinc-800 dark:text-zinc-100">
            Executor Status
            <span className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-500 dark:text-zinc-400 font-normal">
              v1.2.0
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${getStateColor(executorState)}/20`}>
                  {getStateIcon(executorState)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
                    {getStateText(executorState)}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Last run: {lastRun}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="flex flex-col items-center p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/50">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Total Runs</span>
                <span className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">{executionCount}</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/50">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Avg Runtime</span>
                <span className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">{averageRuntime}</span>
              </div>
            </div>
          </div>
          
          {/* Progress bar that shows when running */}
          {executorState === 'running' && (
            <motion.div 
              className="mt-4 h-1 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden"
              initial={{ width: '100%' }}
            >
              <motion.div 
                className="h-full bg-blue-500"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExecutorStatus;
