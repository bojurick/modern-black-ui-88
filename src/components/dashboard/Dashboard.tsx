
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, BarChart3, BookOpen, History, Settings, Star } from 'lucide-react';
import Button from '../common/Button';

const statCards = [
  { 
    title: 'Scripts Executed', 
    value: '423', 
    change: '+17%', 
    icon: <Zap className="h-5 w-5 text-red-400" />,
    positive: true
  },
  { 
    title: 'Scripts Created', 
    value: '12', 
    change: '+2', 
    icon: <BookOpen className="h-5 w-5 text-green-400" />,
    positive: true
  },
  { 
    title: 'Execution Time', 
    value: '1.2s', 
    change: '-0.3s', 
    icon: <History className="h-5 w-5 text-purple-400" />,
    positive: true
  },
  { 
    title: 'Favorite Scripts', 
    value: '7', 
    change: '0', 
    icon: <Star className="h-5 w-5 text-amber-400" />,
    positive: null
  },
];

const recentScripts = [
  { name: 'Teleport Script', lastUsed: '2 hours ago', category: 'Movement' },
  { name: 'Auto Farm', lastUsed: '5 hours ago', category: 'Farming' },
  { name: 'ESP Hack', lastUsed: '1 day ago', category: 'Visual' },
  { name: 'Item Spawner', lastUsed: '3 days ago', category: 'Items' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const username = user?.user_metadata?.username || 'User';

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <motion.h1 
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            👋 Hello, {username}!
          </motion.h1>
          <motion.p 
            className="text-gray-400 mt-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Welcome back to your command center
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Button 
            variant="primary" 
            icon={<Zap className="h-4 w-4" />}
          >
            Quick Execute
          </Button>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
            className="card-glow"
          >
            <Card className="border border-white/10 bg-card hover:bg-card-hover transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">{card.title}</CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                {card.change && (
                  <p className={`text-xs ${card.positive === null 
                    ? 'text-gray-400' 
                    : card.positive 
                      ? 'text-green-400' 
                      : 'text-red-400'}`}>
                    {card.change} from last week
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity and Scripts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="card-glow"
        >
          <Card className="border border-white/10 bg-card overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Activity Overview</CardTitle>
                <BarChart3 className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-72 flex items-center justify-center bg-gradient-to-b from-card to-black/50">
                <p className="text-gray-400 text-sm">Activity chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Scripts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="card-glow"
        >
          <Card className="border border-white/10 bg-card h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Scripts</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentScripts.map((script, index) => (
                  <motion.div
                    key={script.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.6 }}
                    className="flex items-center gap-4 p-3 rounded-md hover:bg-white/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{script.name}</p>
                      <p className="text-xs text-gray-400">{script.category} • {script.lastUsed}</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-8">
                      Execute
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
