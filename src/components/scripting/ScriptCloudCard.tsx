
import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Play, CheckCircle, XCircle, Calendar, Eye, Download } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Button from '@/components/common/Button';
import { toast } from 'sonner';
import { type Script } from '@/services/scriptblox-api';
import { formatDistanceToNow } from 'date-fns';
import { useTheme } from '@/contexts/ThemeContext';

interface ScriptCloudCardProps {
  script: Script;
  delay?: number;
}

const ScriptCloudCard: React.FC<ScriptCloudCardProps> = ({ script, delay = 0 }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  
  // Process image URL
  let imageSrc;
  if (script.game?.imageUrl && script.game.imageUrl.startsWith("http")) {
    imageSrc = script.game.imageUrl;
  } else if (script.game?.imageUrl) {
    imageSrc = `https://scriptblox.com${script.game.imageUrl}`;
  } else {
    imageSrc = "https://files.catbox.moe/gamwb1.jpg";
  }

  const handleCopy = () => {
    // In a real application, this would copy the script code
    toast.success("Script Copied", {
      description: "Script code copied to clipboard"
    });
  };

  const handleExecute = () => {
    // In a real application, this would execute the script
    toast.success("Script Executed", {
      description: `Successfully executing "${script.title}"`
    });
  };

  const formattedDate = script.createdAt 
    ? formatDistanceToNow(new Date(script.createdAt), { addSuffix: true })
    : 'Unknown date';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="h-full"
    >
      <Card className={`${isLight ? 'bg-white shadow-md border-gray-200' : 'bg-black/40 backdrop-blur-sm border-white/5'} hover:border-${isLight ? 'gray-300' : 'white/10'} transition-all h-full flex flex-col`}>
        <div className={`p-3 border-b ${isLight ? 'border-gray-200' : 'border-white/5'}`}>
          <div className="relative h-32 rounded-md overflow-hidden">
            <img 
              src={imageSrc} 
              alt={script.game?.name || "Game"} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://files.catbox.moe/gamwb1.jpg";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute top-2 right-2 flex items-center space-x-1">
              {script.verified ? (
                <div className={`${isLight ? 'bg-green-100 text-green-700' : 'bg-green-500/20 text-green-400'} p-1 rounded-md backdrop-blur-sm`}>
                  <CheckCircle className="h-4 w-4" />
                </div>
              ) : (
                <div className={`${isLight ? 'bg-gray-100 text-gray-600' : 'bg-gray-500/20 text-gray-400'} p-1 rounded-md backdrop-blur-sm`}>
                  <XCircle className="h-4 w-4" />
                </div>
              )}
            </div>
            
            <div className="absolute bottom-2 left-2">
              <span className={`text-xs px-2 py-1 rounded-full backdrop-blur-sm ${
                script.scriptType === 'paid' 
                  ? 'script-paid-tag bg-amber-500 text-white font-medium'
                  : 'script-free-tag bg-green-500 text-white font-medium'
              }`}>
                {script.scriptType === 'paid' ? 'Paid' : 'Free'}
              </span>
            </div>
            
            {script.isPatched && (
              <div className="absolute bottom-2 right-2">
                <span className="script-patched-tag text-xs px-2 py-1 rounded-full bg-red-500 text-white font-medium backdrop-blur-sm">
                  Patched
                </span>
              </div>
            )}
          </div>
        </div>
        
        <CardContent className="flex-1 p-4">
          <h3 className={`font-semibold text-lg mb-1 line-clamp-1 ${isLight ? 'text-gray-800' : 'text-white'}`}>{script.title}</h3>
          <p className={`text-sm ${isLight ? 'text-gray-600' : 'text-white/60'} line-clamp-1 mb-3`}>Game: {script.game?.name || "Universal"}</p>
          
          <div className={`flex items-center gap-4 text-xs ${isLight ? 'text-gray-500' : 'text-white/50'}`}>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {formattedDate}
            </div>
            <div className="flex items-center">
              <Download className="h-3 w-3 mr-1" />
              {script.views || 0}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className={`p-3 border-t ${isLight ? 'border-gray-200' : 'border-white/5'}`}>
          <div className="w-full flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              className="flex-1"
              onClick={handleExecute}
            >
              <Play className="h-4 w-4 mr-1" />
              Execute
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ScriptCloudCard;
