import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock } from 'lucide-react';

interface ShowcaseItem {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image: string;
  badge?: string;
}

interface RotatingShowcaseProps {
  items: ShowcaseItem[];
  autoRotate?: boolean;
  rotationSpeed?: number;
  className?: string;
}

const RotatingShowcase: React.FC<RotatingShowcaseProps> = ({
  items,
  autoRotate = true,
  rotationSpeed = 0.5,
  className = ""
}) => {
  const [rotation, setRotation] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!autoRotate || isPaused) return;

    const animate = () => {
      setRotation(prev => prev + rotationSpeed);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [autoRotate, rotationSpeed, isPaused]);

  const handleMouseEnter = () => {
    if (autoRotate) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (autoRotate) {
      setIsPaused(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 sm:w-4 sm:h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (!items.length) return null;

  const radius = 200; // Radius of the circle
  const itemCount = items.length;
  const angleStep = (2 * Math.PI) / itemCount;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[500px] flex items-center justify-center ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Center decoration */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 bg-gradient-to-r from-orange-200 to-red-200 rounded-full animate-morph opacity-20"></div>
        <div className="absolute w-24 h-24 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full animate-morph opacity-30" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Rotating items */}
      {items.map((item, index) => {
        const angle = index * angleStep + rotation * (Math.PI / 180);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const isHovered = hoveredItem === item.id;

        return (
          <div
            key={item.id}
            className="absolute transition-all duration-500 ease-out"
            style={{
              transform: `translate(${x}px, ${y}px) scale(${isHovered ? 1.1 : 1})`,
              zIndex: isHovered ? 10 : 1,
            }}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Card className={`w-48 h-64 overflow-hidden transition-all duration-500 ${isHovered
                ? 'shadow-2xl ring-2 ring-orange-400 scale-110'
                : 'shadow-lg hover:shadow-xl'
              }`}>
              <div className="relative h-full">
                {/* Image */}
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&q=80`;
                    }}
                  />

                  {/* Badge */}
                  {item.badge && (
                    <Badge className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs animate-bounce-in">
                      {item.badge}
                    </Badge>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>

                {/* Content */}
                <CardContent className="p-4 h-32 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm mb-1 text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">{item.cuisine}</p>
                  </div>

                  <div className="space-y-2">
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {renderStars(item.rating)}
                      <span className="text-xs text-gray-600">({item.rating})</span>
                    </div>

                    {/* Delivery time */}
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span>{item.deliveryTime}</span>
                    </div>
                  </div>
                </CardContent>

                {/* Hover effects */}
                {isHovered && (
                  <>
                    {/* Floating particles */}
                    <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-red-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>

                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                  </>
                )}
              </div>
            </Card>
          </div>
        );
      })}

      {/* Center info */}
      <div className="absolute z-20 text-center bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg animate-fade-in">
        <h3 className="text-lg font-bold text-orange-600 mb-2">Featured Restaurants</h3>
        <p className="text-sm text-gray-600">Hover to explore</p>

        {/* Control indicator */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-red-400' : 'bg-green-400'} animate-pulse`}></div>
          <span className="text-xs text-gray-500">
            {isPaused ? 'Paused' : 'Auto-rotating'}
          </span>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-4 left-4 text-2xl animate-float opacity-60">🍕</div>
      <div className="absolute top-4 right-4 text-2xl animate-float opacity-60" style={{ animationDelay: '1s' }}>🍔</div>
      <div className="absolute bottom-4 left-4 text-2xl animate-float opacity-60" style={{ animationDelay: '2s' }}>🍣</div>
      <div className="absolute bottom-4 right-4 text-2xl animate-float opacity-60" style={{ animationDelay: '3s' }}>🍜</div>
    </div>
  );
};

export default RotatingShowcase;
