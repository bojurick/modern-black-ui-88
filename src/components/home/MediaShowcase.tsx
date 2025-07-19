
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, ExternalLink, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Button from '@/components/common/Button';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

// YouTube video data structure
interface VideoData {
  id: string;
  title: string;
  description: string;
}
const MediaShowcase = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const videos: VideoData[] = [{
    id: '4G7uoQrKjd8',
    title: 'How to Use Velocity in Roblox After the NEW Update!',
    description: 'Learn the latest methods for using Velocity with the new Roblox updates'
  }, {
    id: 'ZSLnMkOh9EE',
    title: 'HOW TO USE VELOCITY EXECUTOR AFTER NEW ROBLOX UPDATE!',
    description: 'Discover the best Blue Lock Rivals scripts for Velocity'
  }, {
    id: 'WgmHAGUG8sc',
    title: 'How to Download Velocity Executor AFTER the New Roblox Update',
    description: 'Get the best Fisch Script with the latest Velocity update'
  }, {
    id: '6IwDcJTx6cY',
    title: 'How to FIX EVERY Velocity Executor Issue!',
    description: 'Solve crashes, errors and more issues with Velocity'
  }, {
    id: '5nIgYliY1n4',
    title: 'NEW Velocity Executor UPDATE!',
    description: 'Now with Key System! Still the BEST! (99% UNC & SUNC)'
  }];
  const handlePrev = () => {
    closeVideo();
    setActiveSlide(prev => prev === 0 ? videos.length - 1 : prev - 1);
  };
  const handleNext = () => {
    closeVideo();
    setActiveSlide(prev => prev === videos.length - 1 ? 0 : prev + 1);
  };
  const playVideo = (videoId: string) => {
    setActiveVideoId(videoId);
    setIsPlaying(true);
  };
  const closeVideo = () => {
    setActiveVideoId(null);
    setIsPlaying(false);
  };

  // YouTube thumbnail URL generator
  const getYouTubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };
  return <section className="py-16 relative z-10">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div className="text-center mb-12" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} viewport={{
        once: true
      }}>
          <h2 className="text-3xl font-bold mb-4 text-gradient">See Essence For Yourself</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Explore Our Media To See Essence Before You Download It</p>
        </motion.div>
        
        <div className="relative glass-morphism rounded-2xl p-6 overflow-hidden">
          {/* Navigation Arrows */}
          <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10">
            <Button variant="ghost" size="sm" onClick={handlePrev} className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10">
            <Button variant="ghost" size="sm" onClick={handleNext} className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors">
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="w-full max-w-4xl">
              <Card className="bg-transparent border-0 shadow-none">
                <CardContent className="p-0">
                  <div className="relative aspect-video rounded-xl overflow-hidden" ref={playerContainerRef}>
                    {!isPlaying ? <motion.div initial={{
                    scale: 0.95,
                    opacity: 0
                  }} animate={{
                    scale: 1,
                    opacity: 1
                  }} transition={{
                    duration: 0.5
                  }} className="w-full h-full">
                        <img src={getYouTubeThumbnail(videos[activeSlide].id)} alt={videos[activeSlide].title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div whileHover={{
                        scale: 1.1
                      }} className="rounded-full bg-red-500/90 p-4 cursor-pointer" onClick={() => playVideo(videos[activeSlide].id)}>
                            <Play className="h-10 w-10 fill-white text-white" />
                          </motion.div>
                        </div>
                        
                        <div className="absolute bottom-6 left-6 right-6">
                          <h3 className="text-xl font-bold text-white mb-2">{videos[activeSlide].title}</h3>
                          <p className="text-white/80">{videos[activeSlide].description}</p>
                        </div>
                      </motion.div> : <div className="relative w-full h-full">
                        <iframe className="absolute top-0 left-0 w-full h-full rounded-xl" src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={videos[activeSlide].title}></iframe>
                        
                        <button className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full z-10" onClick={closeVideo}>
                          <X className="h-5 w-5" />
                        </button>
                      </div>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Video Indicators - Updated to use ToggleGroup */}
          <div className="flex justify-center mt-6">
            <ToggleGroup type="single" value={activeSlide.toString()} onValueChange={(value) => {
              if (value) {
                closeVideo();
                setActiveSlide(parseInt(value));
              }
            }} className="flex gap-2">
              {videos.map((_, index) => (
                <ToggleGroupItem 
                  key={index} 
                  value={index.toString()} 
                  className={`h-2 rounded-full transition-colors min-w-8 px-0 ${
                    index.toString() === activeSlide.toString() 
                      ? 'bg-red-500 data-[state=on]:bg-red-500' 
                      : 'bg-white/20 hover:bg-white/30'
                  }`} 
                  aria-label={`Go to slide ${index + 1}`} 
                />
              ))}
            </ToggleGroup>
          </div>
        </div>
      </div>
    </section>;
};
export default MediaShowcase;
