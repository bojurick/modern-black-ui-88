
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, CheckCircle, AlertCircle, Download, Calendar, Eye, Code, Key } from 'lucide-react';
import Button from '../common/Button';
import type { Script } from '@/services/scriptblox-api';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

interface ScriptDetailsModalProps {
  script: Script | null;
  isOpen: boolean;
  onClose: () => void;
  onExecute: (script: string) => void;
}

const ScriptDetailsModal: React.FC<ScriptDetailsModalProps> = ({ 
  script, 
  isOpen, 
  onClose,
  onExecute
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  if (!script) return null;

  const gameImage = script.game?.imageUrl
    ? script.game.imageUrl.startsWith("http")
      ? script.game.imageUrl
      : `https://scriptblox.com${script.game.imageUrl}`
    : "https://files.catbox.moe/gamwb1.jpg";

  const handleCopy = () => {
    if (script.script) {
      navigator.clipboard.writeText(script.script);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Script copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExecute = () => {
    if (script.script) {
      onExecute(script.script);
      toast({
        title: "Script executed",
        description: "The script has been sent to the executor",
      });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-card w-full max-w-3xl max-h-[80vh] overflow-auto rounded-lg shadow-xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-xl font-bold">Script Details</h2>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full p-1 h-8 w-8 flex items-center justify-center"
                onClick={onClose}
                icon={<X className="h-4 w-4" />}
              >
                <span className="sr-only">Close</span>
              </Button>
            </div>

            <div className="p-4">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="w-full md:w-1/3">
                  <div className="relative rounded-lg overflow-hidden aspect-video md:aspect-square">
                    <img 
                      src={gameImage} 
                      alt={script.game?.name || "Script"} 
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://files.catbox.moe/gamwb1.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <h3 className="text-white font-medium truncate">{script.game?.name || "Universal"}</h3>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-2/3">
                  <h3 className="text-lg font-semibold mb-2">{script.title}</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${script.verified ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                      {script.verified ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                      {script.verified ? "Verified" : "Not Verified"}
                    </span>
                    
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${script.isPatched ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
                      {script.isPatched ? "Patched" : "Active"}
                    </span>
                    
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${script.scriptType === 'paid' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'}`}>
                      {script.scriptType === 'paid' ? "Paid" : "Free"}
                    </span>
                    
                    {script.key && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/20 px-2.5 py-0.5 text-xs font-medium text-yellow-300">
                        <Key className="h-3 w-3" />
                        Requires Key
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Eye className="h-4 w-4 text-white/50" />
                      <span>{script.views?.toLocaleString() || 0} Views</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Calendar className="h-4 w-4 text-white/50" />
                      <span>Created: {new Date(script.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Calendar className="h-4 w-4 text-white/50" />
                      <span>Updated: {new Date(script.updatedAt).toLocaleDateString()}</span>
                    </div>
                    
                    {script.key && script.keyLink && (
                      <div className="flex items-center gap-2 text-sm">
                        <Key className="h-4 w-4 text-white/50" />
                        <a 
                          href={script.keyLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary hover:underline"
                        >
                          Get Key
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Script
                  </h4>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      icon={copied ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      onClick={handleCopy}
                    >
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                    
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={handleExecute}
                    >
                      Execute
                    </Button>
                  </div>
                </div>
                
                <div className="relative rounded-lg bg-black/20 border border-white/10 p-3 overflow-hidden">
                  <pre className="font-mono text-xs overflow-x-auto max-h-56 scrollbar-none text-white/90">
                    {script.script || "Script content unavailable. Try visiting the original source."}
                  </pre>
                </div>
              </div>
              
              {script.slug && (
                <div className="mt-4 text-center">
                  <a 
                    href={`https://scriptblox.com/script/${script.slug}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline text-sm"
                  >
                    View on ScriptBlox
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScriptDetailsModal;
