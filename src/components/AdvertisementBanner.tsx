import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  Clock, 
  Gift, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Heart, 
  Truck,
  Award,
  Users,
  CreditCard,
  Shield
} from "lucide-react";

interface AdvertisementBannerProps {
  type: 'promo' | 'feature' | 'testimonial' | 'offer';
  title: string;
  description: string;
  ctaText: string;
  icon?: React.ReactNode;
  badgeText?: string;
  gradient?: string;
  delay?: number;
}

const AdvertisementBanner = ({ 
  type, 
  title, 
  description, 
  ctaText, 
  icon, 
  badgeText, 
  gradient = "from-orange-500 to-red-500",
  delay = 0 
}: AdvertisementBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    const sparkleTimer = setInterval(() => {
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 1000);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(sparkleTimer);
    };
  }, [delay]);

  const getIcon = () => {
    if (icon) return icon;
    
    switch (type) {
      case 'promo':
        return <Gift className="w-6 h-6" />;
      case 'feature':
        return <Zap className="w-6 h-6" />;
      case 'testimonial':
        return <Star className="w-6 h-6" />;
      case 'offer':
        return <Award className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } hover:scale-105 hover:shadow-2xl group animate-advertisement-pulse`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
      
      {/* Floating sparkles effect */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <Sparkles
              key={i}
              className="absolute text-yellow-400 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      )}
      
      <CardContent className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full bg-gradient-to-r ${gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
              {getIcon()}
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                {title}
              </h3>
              {badgeText && (
                <Badge className="mt-1 bg-orange-100 text-orange-800 border-orange-200">
                  {badgeText}
                </Badge>
              )}
            </div>
          </div>
          
          {/* Interactive heart icon */}
          <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors duration-300 group-hover:scale-110" />
        </div>
        
        <p className="text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>
        
        <Button 
          className={`bg-gradient-to-r ${gradient} hover:shadow-lg text-white group-hover:scale-105 transition-all duration-300`}
        >
          <span className="flex items-center gap-2">
            {ctaText}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdvertisementBanner; 