
import { motion } from 'framer-motion';
import { BookOpen, Star, Download, ArrowRight, Code, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Button from '../common/Button';
import type { Script } from '@/services/scriptblox-api';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

interface ScriptCardProps {
  script: Script;
  delay?: number;
  onClick?: () => void;
}

const ScriptCard = ({ script, delay = 0, onClick }: ScriptCardProps) => {
  // Process image URL
  let imageSrc;
  if (script.game?.imageUrl && script.game.imageUrl.startsWith("http")) {
    imageSrc = script.game.imageUrl;
  } else if (script.game?.imageUrl) {
    imageSrc = `https://scriptblox.com${script.game.imageUrl}`;
  } else {
    imageSrc = "https://files.catbox.moe/gamwb1.jpg";
  }

  const maxTitleLength = 40;
  const displayTitle = script.title.length > maxTitleLength
    ? script.title.substring(0, maxTitleLength) + "..."
    : script.title;

  const createdDate = new Date(script.createdAt).toLocaleDateString();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="card-glow h-full"
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <Card className="border border-white/10 bg-card hover:bg-card-hover transition-colors h-full flex flex-col shadow-lg relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        <div className="flex-1">
          <div className="p-1">
            <div 
              className="h-32 rounded-md flex items-center justify-center relative overflow-hidden"
              style={{
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <img 
                  src={imageSrc} 
                  alt={script.title} 
                  className="h-28 w-28 object-cover rounded-md shadow-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://files.catbox.moe/gamwb1.jpg";
                  }}
                />
              </motion.div>
            </div>
          </div>
          
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <h3 className="font-semibold text-base mb-1 truncate cursor-help">{displayTitle}</h3>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 text-sm">
                    {script.title}
                    {script.description && (
                      <p className="mt-2 text-white/70">{script.description}</p>
                    )}
                  </HoverCardContent>
                </HoverCard>
                <p className="text-xs text-white/60 mb-2">Game: {script.game?.name || "Universal"}</p>
              </div>
              <div className="flex items-center">
                {script.verified ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-gray-400" />
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-gray-200">
                {script.scriptType === 'paid' ? 'Paid' : 'Free'}
              </span>
              {script.isPatched && (
                <span className="inline-flex items-center rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-medium text-red-300">
                  Patched
                </span>
              )}
              <span className="inline-flex items-center text-xs text-gray-400">
                <Download className="h-3 w-3 mr-1" /> {script.views?.toLocaleString() || 0}
              </span>
            </div>
          </CardContent>
        </div>
        
        <CardFooter className="px-4 py-3 border-t border-white/10">
          <div className="w-full flex items-center justify-between gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={onClick}>
              View Details
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              className="flex-1"
              icon={<Code className="h-3 w-3" />}
              iconPosition="right"
              onClick={onClick}
            >
              Execute
            </Button>
          </div>
        </CardFooter>
        
        <motion.div
          className="absolute top-2 right-2 text-xs text-white/60 bg-black/40 px-1.5 py-0.5 rounded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
        >
          {createdDate}
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default ScriptCard;
