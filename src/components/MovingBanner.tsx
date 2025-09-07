import React, { useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';

interface MovingBannerProps {
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
  showBadges?: boolean;
  badgeColors?: string[];
}

const MovingBanner: React.FC<MovingBannerProps> = ({
  items,
  speed = 30,
  direction = 'left',
  className = "",
  showBadges = true,
  badgeColors = ['from-orange-500 to-red-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-purple-500 to-pink-500']
}) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const banner = bannerRef.current;
    const container = containerRef.current;
    
    if (!banner || !container) return;

    let animationId: number;
    let position = 0;
    const bannerWidth = banner.offsetWidth;

    const animate = () => {
      // Pause when tab hidden to save CPU
      if (document.hidden) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      if (direction === 'left') {
        position -= speed / 60; // 60 FPS
        if (position <= -bannerWidth / 2) {
          position = 0;
        }
      } else {
        position += speed / 60;
        if (position >= 0) {
          position = -bannerWidth / 2;
        }
      }

      banner.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [speed, direction]);

  // Duplicate items to create seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <div className={`relative overflow-hidden bg-gradient-to-r from-orange-50 to-red-50 py-4 ${className}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full animate-morph"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full animate-morph" style={{ animationDelay: '1s' }}></div>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full"
      >
        <div
          ref={bannerRef}
          className="flex items-center space-x-8 whitespace-nowrap will-change-transform"
          style={{ width: 'max-content' }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center space-x-4 group hover:scale-105 transition-transform duration-300"
            >
              {showBadges && (
                <Badge 
                  className={`bg-gradient-to-r ${badgeColors[index % badgeColors.length]} text-white border-0 animate-pulse-glow group-hover:animate-bounce transition-all duration-300 hidden xs:inline-flex`}
                >
                  {index % 2 === 0 ? '🔥' : '⭐'}
                </Badge>
              )}
              <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 group-hover:text-orange-600 transition-colors duration-300">
                {item}
              </span>
              {showBadges && (
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-ping opacity-60 group-hover:opacity-100 transition-opacity duration-300 hidden xs:block"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-orange-50 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-red-50 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default MovingBanner;
