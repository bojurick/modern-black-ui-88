
import { useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import ScriptEditor from '@/components/scripting/ScriptEditor';
import PageTransition from '@/components/layout/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cloud, Code, History } from 'lucide-react';
import GridBackground from '@/components/ui/grid-background';
import Particles from '@/components/ui/particles';
import { toast } from 'sonner';
import ScriptCloud from '@/components/scripting/ScriptCloud';
import { useTheme } from '@/contexts/ThemeContext';

const ExecutePage = () => {
  const [activeTab, setActiveTab] = useState('editor');
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Show a notification based on the tab change
    if (value === 'cloud') {
      toast.info("Script Cloud", {
        description: "Browse and discover scripts from the community"
      });
    } else if (value === 'history') {
      toast.info("Execution History", {
        description: "View your recent script executions"
      });
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <GridBackground />
          <Particles quantity={30} />
        </div>
        <Navbar />
        <main className="container px-4 md:px-6 mx-auto pt-28 pb-16 relative z-10">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-6">Essence Script Executor</h1>
            
            <Tabs defaultValue="editor" value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className={`grid grid-cols-3 mb-6 ${isLight ? 'bg-gray-100 shadow-sm' : 'bg-black/40 backdrop-blur-sm'}`}>
                <TabsTrigger value="editor" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  <span>Script Editor</span>
                </TabsTrigger>
                <TabsTrigger value="cloud" className="flex items-center gap-2">
                  <Cloud className="h-4 w-4" />
                  <span>Script Cloud</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  <span>Execution History</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="editor">
                <ScriptEditor />
              </TabsContent>
              
              <TabsContent value="cloud">
                <ScriptCloud />
              </TabsContent>
              
              <TabsContent value="history">
                <div className={`${isLight ? 'bg-white shadow-md border-gray-200' : 'bg-card/30 backdrop-blur-sm border-white/10'} rounded-lg border p-6`}>
                  <div className="flex items-center justify-center h-64 flex-col gap-4">
                    <History className={`h-16 w-16 ${isLight ? 'text-gray-400' : 'text-gray-500'}`} />
                    <h3 className={`text-xl font-medium ${isLight ? 'text-gray-700' : 'text-gray-400'}`}>Your Execution History</h3>
                    <p className={`${isLight ? 'text-gray-600' : 'text-gray-500'} text-center max-w-md`}>
                      View your recent script executions and their results.
                      Login to track your execution history.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default ExecutePage;
