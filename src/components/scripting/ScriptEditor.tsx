
import React, { useState, useRef, useEffect } from 'react';
import { Play, Download, Copy, Check, Trash2, Maximize2, Minimize2, RefreshCw } from 'lucide-react';
import Button from '@/components/common/Button';
import { toast } from 'sonner';
import MonacoEditorWrapper from './MonacoEditorWrapper';
import { useTheme } from '@/contexts/ThemeContext';

const ScriptEditor = () => {
  const [script, setScript] = useState<string>('-- Welcome to Essence Script Editor\n-- Start typing your script here\n\nlocal player = game.Players.LocalPlayer\nlocal character = player.Character or player.CharacterAdded:Wait()\n\nprint("Hello from Essence!")\n\n-- Your code goes here');
  const [isExecuting, setIsExecuting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<{ type: 'info' | 'error' | 'success'; text: string }[]>([
    { type: 'info', text: 'Essence Script Editor initialized' },
    { type: 'info', text: 'Ready to execute scripts' }
  ]);
  const consoleRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleOutput]);

  const handleExecute = () => {
    if (!script.trim()) {
      toast.error("Execution Error", {
        description: "Cannot execute empty script"
      });
      return;
    }

    setIsExecuting(true);
    
    // Simulate script execution
    setConsoleOutput(prev => [
      ...prev, 
      { type: 'info', text: 'Executing script...' }
    ]);
    
    // Simulate execution delay
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demo
      
      if (success) {
        setConsoleOutput(prev => [
          ...prev, 
          { type: 'success', text: 'Script executed successfully' }
        ]);
        toast.success("Success", {
          description: "Script executed successfully",
        });
      } else {
        setConsoleOutput(prev => [
          ...prev, 
          { type: 'error', text: 'Error: Failed to execute script' }
        ]);
        toast.error("Execution Failed", {
          description: "Failed to execute script. Please try again."
        });
      }
      
      setIsExecuting(false);
    }, 1000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setIsCopied(true);
    
    toast.success("Copied", {
      description: "Script copied to clipboard"
    });
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleClear = () => {
    setScript('');
    toast.info("Cleared", {
      description: "Script editor cleared"
    });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const clearConsole = () => {
    setConsoleOutput([{ type: 'info', text: 'Console cleared' }]);
  };

  return (
    <div className={`flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 p-6 bg-background' : ''}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-bold flex items-center ${isLight ? 'text-gray-800' : ''}`}>
          <span className={isLight ? 'text-red-600' : 'gradient-text'}>Script Editor</span>
          <span className="ml-2 px-2 py-0.5 bg-red-500/20 text-red-300 text-xs rounded-full">Essence</span>
        </h2>
        <div className="flex gap-2">
          <Button 
            onClick={toggleFullscreen} 
            variant="outline" 
            size="sm"
            className="w-8 h-8 p-0 flex items-center justify-center"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className={`${isLight ? 'bg-gray-100 border-gray-300' : 'bg-black/40 backdrop-blur-sm border-white/10'} rounded-lg border overflow-hidden`}>
            <MonacoEditorWrapper 
              value={script}
              onChange={(value) => setScript(value || '')}
              height={isFullscreen ? "calc(100vh - 240px)" : "400px"}
              options={{
                theme: isLight ? 'vs-light' : 'vs-dark',
                fontSize: 14,
                fontFamily: 'JetBrains Mono, monospace',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                renderLineHighlight: 'all',
                cursorBlinking: 'blink',
                automaticLayout: true,
                padding: { top: 16 },
                glyphMargin: false,
                folding: true,
                lineDecorationsWidth: 0,
                lineNumbersMinChars: 3,
                scrollbar: {
                  verticalScrollbarSize: 10,
                  horizontalScrollbarSize: 10
                }
              }}
            />
          </div>
          
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button 
              variant="outline"
              size="sm"
              onClick={handleExecute}
              disabled={isExecuting}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {isExecuting ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Play className="mr-2 h-4 w-4" />
              )}
              Execute
            </Button>
            
            <Button 
              onClick={handleCopy} 
              variant="outline"
              size="sm"
            >
              {isCopied ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}
              {isCopied ? 'Copied' : 'Copy'}
            </Button>
            
            <Button 
              onClick={handleClear} 
              variant="outline"
              size="sm"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear
            </Button>
            
            <Button 
              variant="outline"
              size="sm"
              className="ml-auto"
            >
              <Download className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
        
        <div className={`${isLight ? 'bg-white border-gray-200' : 'bg-black/30 border-white/10'} rounded-lg border`}>
          <div className={`p-3 border-b ${isLight ? 'border-gray-200' : 'border-white/10'} flex justify-between items-center`}>
            <h3 className={`text-sm font-medium ${isLight ? 'text-gray-800' : ''}`}>Console Output</h3>
            <Button 
              onClick={clearConsole}
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs"
            >
              Clear
            </Button>
          </div>
          <div 
            ref={consoleRef}
            className={`p-3 h-[350px] overflow-y-auto font-mono text-xs ${isLight ? 'bg-gray-50' : ''}`}
          >
            {consoleOutput.map((line, index) => (
              <div 
                key={index} 
                className={`mb-1 ${
                  line.type === 'error' ? isLight ? 'text-red-600' : 'text-red-400' : 
                  line.type === 'success' ? isLight ? 'text-green-600' : 'text-green-400' : 
                  isLight ? 'text-gray-700' : 'text-gray-300'
                }`}
              >
                &gt; {line.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptEditor;
