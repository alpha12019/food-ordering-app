import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ArrowRight } from 'lucide-react';

interface FloatingCardItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  rating?: number;
  badge?: string;
  gradient?: string;
}

interface FloatingCardsProps {
  items: FloatingCardItem[];
  className?: string;
  maxCards?: number;
}

const FloatingCards: React.FC<FloatingCardsProps> = ({
  items,
  className = "",
  maxCards = 6
}) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 sm:w-4 sm:h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const displayedItems = items.slice(0, maxCards);

  return (
    <div className={`relative w-full min-h-[600px] ${className}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-orange-200 to-red-200 rounded-full animate-morph"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full animate-morph" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-red-200 to-pink-200 rounded-full animate-morph" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating cards grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 p-4 sm:p-6 lg:p-8">
        {displayedItems.map((item, index) => {
          const isHovered = hoveredCard === item.id;
          const animationDelay = index * 0.1;
          const floatDelay = index * 0.2;

          return (
            <div
              key={item.id}
              className={`relative transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ 
                animationDelay: `${animationDelay}s`,
                transform: `translateY(${isHovered ? -20 : 0}px)`
              }}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className={`h-full overflow-hidden transition-all duration-500 group cursor-pointer ${
                isHovered 
                  ? 'shadow-2xl ring-2 ring-orange-400 scale-105' 
                  : 'shadow-lg hover:shadow-xl'
              }`}>
                <div className="relative h-full">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&q=80`;
                      }}
                    />
                    
                    {/* Badge */}
                    {item.badge && (
                      <Badge className={`absolute top-3 left-3 bg-gradient-to-r ${item.gradient || 'from-orange-500 to-red-500'} text-white text-xs animate-bounce-in`}>
                        {item.badge}
                      </Badge>
                    )}
                    
                    {/* Rating */}
                    {item.rating && (
                      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg p-2">
                        <div className="flex items-center gap-1">
                          {renderStars(item.rating)}
                        </div>
                      </div>
                    )}
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating heart icon */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100">
                      <Heart className="w-5 h-5 text-white hover:text-red-500 transition-colors duration-300 cursor-pointer" />
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-4 sm:p-6 h-40 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg sm:text-xl mb-2 text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-sm text-orange-600 font-semibold mb-2">{item.subtitle}</p>
                      <p className="text-sm text-gray-600 line-clamp-2 group-hover:text-gray-800 transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>

                    {/* Action button */}
                    <div className="mt-4 transition-all duration-500 transform group-hover:translate-y-0">
                      <button className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold text-sm group-hover:scale-105 transition-all duration-300">
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </CardContent>

                  {/* Enhanced hover effects */}
                  {isHovered && (
                    <>
                      {/* Floating particles */}
                      <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                      <div className="absolute top-2 left-2 w-2 h-2 bg-red-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                      <div className="absolute bottom-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                      
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                    </>
                  )}
                </div>
              </Card>

              {/* Floating animation wrapper */}
              <div 
                className="absolute inset-0 pointer-events-none animate-float"
                style={{ animationDelay: `${floatDelay}s` }}
              >
                {/* Additional floating elements */}
                <div className="absolute -top-2 -right-2 w-1 h-1 bg-orange-300 rounded-full animate-ping opacity-60"></div>
                <div className="absolute -bottom-2 -left-2 w-1 h-1 bg-red-300 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.3s' }}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-4 left-4 text-3xl animate-float opacity-40">🍕</div>
      <div className="absolute top-4 right-4 text-2xl animate-float opacity-40" style={{ animationDelay: '1s' }}>🍔</div>
      <div className="absolute bottom-4 left-4 text-2xl animate-float opacity-40" style={{ animationDelay: '2s' }}>🍣</div>
      <div className="absolute bottom-4 right-4 text-3xl animate-float opacity-40" style={{ animationDelay: '3s' }}>🍜</div>
      <div className="absolute top-1/2 left-8 text-2xl animate-float opacity-40" style={{ animationDelay: '1.5s' }}>🍰</div>
      <div className="absolute top-1/2 right-8 text-3xl animate-float opacity-40" style={{ animationDelay: '2.5s' }}>☕</div>
    </div>
  );
};

export default FloatingCards;
