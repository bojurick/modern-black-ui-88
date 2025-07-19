
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchScripts, type Script } from '@/services/supabase-scripts';
import ScriptCloudCard from './ScriptCloudCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination } from '@/components/ui/pagination';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const ScriptCloud = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [scriptType, setScriptType] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['scripts', searchTerm, scriptType, page],
    queryFn: () => fetchScripts({ q: searchTerm, scriptType: scriptType !== 'all' ? scriptType : '', page, limit: 9 }),
    enabled: isSearching || page > 1 || scriptType !== 'all',
  });

  const handleSearch = () => {
    setIsSearching(true);
    setPage(1);
    refetch();
    
    if (searchTerm) {
      toast.success("Search Started", {
        description: `Searching for "${searchTerm}" scripts`
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (isSearching && data) {
      setIsSearching(false);
      
      if (data.scripts.length === 0) {
        toast.warning("No Results", {
          description: "No scripts found matching your search criteria"
        });
      } else {
        toast.success("Search Complete", {
          description: `Found ${data.totalScripts} scripts`
        });
      }
    }
  }, [data, isSearching]);

  return (
    <div className="space-y-6">
      <div className="glass-morphism rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Input
              placeholder="Search scripts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPress}
              className="pl-10 bg-black/30 border-white/10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex gap-2">
            <Select value={scriptType} onValueChange={setScriptType}>
              <SelectTrigger className="w-[150px] bg-black/30 border-white/10">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="All Types" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
              {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
              Search
            </Button>
          </div>
        </div>
      </div>

      {error ? (
        <div className="bg-red-500/10 border border-red-500/30 text-red-200 p-4 rounded-lg">
          Error loading scripts. Please try again.
        </div>
      ) : isLoading && !data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div 
              key={i} 
              className="h-64 bg-card/50 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : data && data.scripts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.scripts.map((script, index) => (
              <ScriptCloudCard key={script.id} script={script} delay={index * 0.1} />
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(data.totalScripts / 9)}
              onPageChange={setPage}
            />
          </div>
        </>
      ) : isSearching ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div 
              key={i} 
              className="h-64 bg-card/50 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Search className="h-16 w-16 text-gray-500 mb-4" />
          <h3 className="text-xl font-medium text-gray-400 mb-2">Search for Scripts</h3>
          <p className="text-gray-500 max-w-md">
            Enter a script name or game to find scripts from our cloud library
          </p>
        </div>
      )}
    </div>
  );
};

export default ScriptCloud;
