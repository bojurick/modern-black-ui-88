
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchScripts, type Script, type ScriptsResponse } from '@/services/scriptblox-api';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useToast } from '@/hooks/use-toast';

const FeaturedGamesCarousel = () => {
  const [featuredGames, setFeaturedGames] = useState<Script[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadFeaturedGames = async () => {
      try {
        setLoading(true);
        const scriptsResponse = await fetchScripts({ page: 1 });
        // Filter scripts that have game images
        const gamesWithImages = scriptsResponse.scripts.filter(script => script.game?.imageUrl);
        setFeaturedGames(gamesWithImages.slice(0, 5));
      } catch (error) {
        console.error("Failed to load featured games:", error);
        toast({
          title: "Error",
          description: "Failed to load featured games. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadFeaturedGames();
  }, [toast]);
  
  useEffect(() => {
    if (featuredGames.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % featuredGames.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [featuredGames.length]);

  // Default images as fallback
  const defaultGameImages = [
    "https://tr.rbxcdn.com/a78c4a5bc06cce024f5d9bffc6c9c6b8/768/432/Image/Png",
    "https://tr.rbxcdn.com/b5fecbb776ffe4f9ac68cef98e4f3486/768/432/Image/Png",
    "https://tr.rbxcdn.com/52f5128dde0dfb84b153efc21ea20c43/768/432/Image/Png",
    "https://tr.rbxcdn.com/5be5e5337ca890e376ca5c903e034f28/768/432/Image/Png",
    "https://tr.rbxcdn.com/e6a010daa67e3a2bd53fc21f945e3c40/768/432/Image/Png"
  ];
  
  const getGameImages = () => {
    if (featuredGames.length > 0) {
      return featuredGames.map(game => game.game?.imageUrl || defaultGameImages[0]);
    }
    return defaultGameImages;
  };

  const gameImages = getGameImages();

  return (
    <section className="py-12 relative z-10">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4">Enhance Your Gaming Experience</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Essence works with all popular games to give you the edge you need.
          </p>
        </motion.div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Radiant blur background effect */}
          <div className="radiant-blur w-full h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          
          <motion.div 
            className="rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <Carousel className="w-full">
              <CarouselContent>
                {loading ? (
                  <CarouselItem>
                    <div className="aspect-video flex items-center justify-center bg-background-light">
                      <div className="w-10 h-10 border-t-2 border-r-2 border-red-500 rounded-full animate-spin"></div>
                    </div>
                  </CarouselItem>
                ) : (
                  gameImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-video overflow-hidden rounded-lg">
                        <motion.img 
                          src={image}
                          alt={featuredGames[index]?.game?.name || `Featured Game ${index + 1}`}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1 }}
                          animate={{ scale: index === currentImageIndex ? 1.05 : 1 }}
                          transition={{ duration: 6, ease: "easeInOut" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                          <div className="p-6 text-left">
                            <h3 className="text-2xl font-bold text-white">
                              {featuredGames[index]?.game?.name || "Featured Games"}
                            </h3>
                            <p className="text-white/80">
                              {featuredGames[index]?.title || "Unlock new possibilities with Essence"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))
                )}
              </CarouselContent>
            </Carousel>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGamesCarousel;
