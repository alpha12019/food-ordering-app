import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
  badge?: string;
  gradient?: string;
}

interface AnimatedCarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  className?: string;
}

const AnimatedCarousel: React.FC<AnimatedCarouselProps> = ({
  items,
  autoPlay = true,
  interval = 4000,
  showControls = true,
  showIndicators = true,
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying && autoPlay) {
      intervalRef.current = setInterval(nextSlide, interval);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, autoPlay, interval, currentIndex, nextSlide]);

  useEffect(() => {
    // Pause auto-play on hover
    const handleMouseEnter = () => {
      if (autoPlay) {
        setIsPlaying(false);
      }
    };

    const handleMouseLeave = () => {
      if (autoPlay) {
        setIsPlaying(true);
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('mouseenter', handleMouseEnter);
      carousel.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('mouseenter', handleMouseEnter);
        carousel.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [autoPlay]);

  if (!items.length) return null;

  return (
    <div 
      ref={carouselRef}
      className={`relative w-full overflow-hidden rounded-xl ${className}`}
    >
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {/* Slides */}
        <div 
          className="flex transition-transform duration-300 ease-in-out h-full"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${items.length * 100}%`
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="relative w-full h-full flex-shrink-0"
              style={{ width: `${100 / items.length}%` }}
            >
              <Card className="h-full border-0 shadow-none bg-transparent">
                <CardContent className="p-0 h-full relative group">
                  {/* Background Image */}
                  <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] overflow-hidden rounded-xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop&q=80`;
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 text-white">
                      {/* Badge */}
                      {item.badge && (
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 animate-bounce-in`}
                             style={{ animationDelay: '0.2s' }}>
                          <span className={`bg-gradient-to-r ${item.gradient || 'from-orange-500 to-red-500'} bg-clip-text text-transparent`}>
                            {item.badge}
                          </span>
                        </div>
                      )}
                      
                      {/* Title */}
                      <h3 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight animate-slide-in-up`}
                           style={{ animationDelay: '0.4s' }}>
                        {item.title}
                      </h3>
                      
                      {/* Description */}
                      <p className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-4 max-w-2xl animate-slide-in-up`}
                         style={{ animationDelay: '0.6s' }}>
                        {item.description}
                      </p>
                      
                      {/* Action Button */}
                      <Button 
                        className={`bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white animate-bounce-in hover:scale-105 transition-all duration-300`}
                        style={{ animationDelay: '0.8s' }}
                      >
                        Learn More
                      </Button>
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-3 h-3 bg-orange-400 rounded-full animate-ping"></div>
                    </div>
                    <div className="absolute top-1/4 left-1/4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      {showControls && (
        <>
          {/* Previous Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0 hover:scale-110 transition-all duration-300 z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          {/* Next Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0 hover:scale-110 transition-all duration-300 z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Play/Pause Button */}
          {autoPlay && (
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlayPause}
              className="absolute top-4 left-4 bg-black/20 hover:bg-black/40 text-white border-0 hover:scale-110 transition-all duration-300 z-10"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
          )}
        </>
      )}

      {/* Indicators */}
      {showIndicators && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75 hover:scale-110'
              }`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {autoPlay && isPlaying && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20 z-10">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-100 ease-linear"
            style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default AnimatedCarousel;
