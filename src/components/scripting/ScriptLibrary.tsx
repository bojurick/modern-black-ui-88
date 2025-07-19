
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, Zap, ChevronRight, ChevronLeft, BookOpen, Code, Search as SearchIcon } from 'lucide-react';
import Button from '../common/Button';
import ScriptCard from './ScriptCard';
import Particles from '../ui/particles';
import GridBackground from '../ui/grid-background';
import { fetchScripts, searchScripts, type Script, type ScriptsResponse, type FetchScriptsParams } from '@/services/supabase-scripts';
import ScriptDetailsModal from './ScriptDetailsModal';
import { useToast } from "@/hooks/use-toast";
import { Pagination } from '../ui/pagination';

const categories = [
  'All Categories',
  'Universal',
  'Basic Scripts',
  'Advanced Scripts',
];

const ScriptLibrary = () => {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [totalScripts, setTotalScripts] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadScripts();
  }, [currentPage]);

  const loadScripts = async () => {
    try {
      setLoading(true);
      setError(null);
      const params: FetchScriptsParams = { page: currentPage };
      const response = await fetchScripts(params);
      setScripts(response.scripts);
      setTotalScripts(response.totalScripts);
    } catch (err: any) {
      setError(err.message || 'Failed to load scripts');
      toast({
        title: "Error",
        description: err.message || 'Failed to load scripts',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      return loadScripts();
    }
    
    try {
      setLoading(true);
      setError(null);
      const data = await searchScripts(searchTerm, '', currentPage);
      setScripts(data);
      setTotalScripts(data.length);
    } catch (err: any) {
      setError(err.message || 'Failed to search scripts');
      toast({
        title: "Search Error",
        description: err.message || 'Failed to search scripts',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCardClick = (script: Script) => {
    setSelectedScript(script);
    setModalOpen(true);
  };

  const handleExecuteScript = (script: string) => {
    // In a real application, you would send this to your script execution engine
    console.log("Executing script:", script.substring(0, 100) + "...");
    toast({
      title: "Script Executed",
      description: "The script has been sent to the executor",
    });
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalScripts / 9); // 9 items per page

  return (
    <div className="w-full space-y-8 relative">
      <GridBackground />
      <Particles quantity={30} />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
        <div>
          <motion.h1 
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            Essence Script Library
          </motion.h1>
          <motion.p 
            className="text-gray-400 mt-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Browse, execute and discover powerful scripts
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex gap-2"
        >
          <Button 
            variant="outline" 
            icon={<Star className="h-4 w-4" />}
          >
            Favorites
          </Button>
          <Button 
            variant="primary" 
            icon={<Code className="h-4 w-4" />}
          >
            My Scripts
          </Button>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 relative z-10"
      >
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
          <motion.input
            type="text"
            placeholder="Search scripts..."
            className="w-full h-10 bg-secondary/50 border border-white/10 rounded-md pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              className="h-10 bg-secondary/50 border border-white/10 rounded-md pl-10 pr-8 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <Button 
            variant="outline" 
            className="h-10"
            icon={<SearchIcon className="h-4 w-4" />}
            onClick={handleSearch}
          >
            Search
          </Button>
          <Button 
            variant="outline" 
            className="h-10"
            icon={<Zap className="h-4 w-4" />}
          >
            Popular
          </Button>
        </div>
      </motion.div>

      {/* Script Cards Grid */}
      <div className="relative z-10 min-h-[400px]">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-[400px]"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="relative h-12 w-12">
                  <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
                </div>
                <p className="text-white/70">Loading scripts...</p>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-10 text-center"
            >
              <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">Error loading scripts</h3>
              <p className="text-gray-400 mb-4">{error}</p>
              <Button variant="primary" onClick={loadScripts}>Try Again</Button>
            </motion.div>
          ) : scripts.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-10 text-center"
            >
              <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No scripts found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {scripts.map((script, index) => (
                  <ScriptCard 
                    key={script.id} 
                    script={script} 
                    delay={index * 0.05 + 0.4}
                    onClick={() => handleCardClick(script)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {!loading && !error && scripts.length > 0 && (
        <div className="flex justify-center items-center relative z-10 mt-8">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Script Details Modal */}
      <ScriptDetailsModal 
        script={selectedScript}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onExecute={handleExecuteScript}
      />
    </div>
  );
};

export default ScriptLibrary;
