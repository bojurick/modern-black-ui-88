
import { motion } from 'framer-motion';
import { Eye, Star, Zap, Shield, Key, Clock } from 'lucide-react';
import { Script } from '@/services/supabase-scripts';

interface ScriptCardProps {
  script: Script;
  delay?: number;
  onClick?: () => void;
}

const ScriptCard = ({ script, delay = 0, onClick }: ScriptCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-card/60 backdrop-blur-sm border border-white/10 rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-all duration-300 group"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors mb-1 line-clamp-2">
            {script.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
              Universal
            </span>
          </div>
        </div>
        
        {/* Status badges */}
        <div className="flex flex-col gap-1">
          {script.verified && (
            <div className="flex items-center gap-1 text-green-400">
              <Shield className="h-3 w-3" />
              <span className="text-xs">Verified</span>
            </div>
          )}
          {script.scriptType === 'paid' && (
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="h-3 w-3" />
              <span className="text-xs">Premium</span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {script.description && (
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {script.description}
        </p>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{formatViews(script.views)}</span>
          </div>
          {script.key && (
            <div className="flex items-center gap-1 text-yellow-400">
              <Key className="h-4 w-4" />
              <span className="text-xs">Key Required</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span className="text-xs">{formatDate(script.createdAt)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <div className="flex items-center gap-2">
          {script.isPatched && (
            <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded">
              Patched
            </span>
          )}
          <span className={`text-xs px-2 py-1 rounded ${
            script.scriptType === 'free' 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-yellow-500/20 text-yellow-400'
          }`}>
            {script.scriptType === 'free' ? 'Free' : 'Premium'}
          </span>
        </div>
        
        <button className="text-primary hover:text-primary/80 transition-colors">
          <Zap className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default ScriptCard;
