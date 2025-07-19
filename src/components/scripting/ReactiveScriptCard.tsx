
import React from 'react';
import { motion } from 'framer-motion';
import { Star, VerifiedIcon, AlertTriangle, Code, Play } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { type Script } from '@/services/scriptblox-api';
import { toast } from 'sonner';
import { useTheme } from '@/contexts/ThemeContext';

interface ReactiveScriptCardProps {
  script: Script;
  onClick: () => void;
}

const ReactiveScriptCard: React.FC<ReactiveScriptCardProps> = ({ script, onClick }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  
  // Process image URL
  let imageSrc = '';
  if (script.game?.imageUrl && script.game.imageUrl.startsWith("http")) {
    imageSrc = script.game.imageUrl;
  } else if (script.game?.imageUrl) {
    imageSrc = `https://scriptblox.com${script.game.imageUrl}`;
  }

  const handleExecute = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("Script Executed", {
      description: `Successfully executing "${script.title}"`
    });
  };

  return (
    <motion.div
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className={`${isLight ? 'bg-white shadow-md' : 'bg-black/60 backdrop-blur-md'} rounded-xl overflow-hidden cursor-pointer group border ${isLight ? 'border-gray-200' : 'border-white/5'} transition-all hover:${isLight ? 'border-gray-300 shadow-lg' : 'border-white/10 shadow-lg'}`}
      onClick={onClick}
    >
      <div className="relative h-36 overflow-hidden">
        {imageSrc ? (
          <motion.img 
            src={imageSrc}
            alt={script.game?.name || 'Game thumbnail'}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1 }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://files.catbox.moe/gamwb1.jpg";
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-red-500/20 to-purple-500/20">
            <Code className={`h-10 w-10 ${isLight ? 'text-red-300' : 'text-white/20'}`} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        
        {script.scriptType === 'paid' && (
          <div className="absolute top-2 right-2 bg-amber-500/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm font-medium">
            PAID
          </div>
        )}
        
        {script.isPatched && (
          <div className="absolute top-2 left-2 bg-red-500/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm flex items-center font-medium">
            <AlertTriangle className="h-3 w-3 mr-1" />
            PATCHED
          </div>
        )}
        
        <button 
          className="absolute bottom-2 right-2 bg-red-500/80 hover:bg-red-600/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center transition-all opacity-0 group-hover:opacity-100"
          onClick={handleExecute}
        >
          <Play className="h-3 w-3 mr-1" fill="white" />
          Execute
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className={`font-medium text-lg line-clamp-1 group-hover:text-primary transition-colors ${isLight ? 'text-gray-800' : 'text-white'}`}>
            {script.title}
          </h3>
          {script.verified && (
            <div className="flex-shrink-0 text-red-400 ml-1">
              <VerifiedIcon className="h-4 w-4" />
            </div>
          )}
        </div>
        
        <p className={`text-sm ${isLight ? 'text-gray-600' : 'text-white/60'} mt-1 line-clamp-2 h-10`}>
          {script.game?.name || 'Universal'}
        </p>
        
        <div className="flex items-center justify-between mt-3 text-sm">
          <div className="flex items-center text-amber-400">
            <Star className="h-4 w-4 mr-1 fill-current" />
            <span>{script.views || 0}</span>
          </div>
          <span className={`${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
            {script.createdAt 
              ? formatDistanceToNow(new Date(script.createdAt), { addSuffix: true })
              : 'Unknown date'}
          </span>
        </div>
        
        <motion.div 
          className="w-full h-0.5 bg-gradient-to-r from-red-500 to-red-300 mt-4 scale-x-0 origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default ReactiveScriptCard;
