import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  Gift,
  Zap,
  ArrowRight,
  Sparkles,
  Heart,
  Award,
  Share2,
  Eye,
  ShoppingCart
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
  const [isLiked, setIsLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const { toast } = useToast();

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

  // Interactive handlers
  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: `${title} ${isLiked ? "removed from" : "added to"} your favorites.`,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${title} - ${description}`);
      toast({
        title: "Link copied!",
        description: "Advertisement link copied to clipboard.",
      });
    }
  };

  const handleViewDetails = () => {
    setIsExpanded(!isExpanded);
    setClickCount(prev => prev + 1);
  };

  const handleCTA = () => {
    toast({
      title: "Action triggered!",
      description: `Taking you to ${ctaText.toLowerCase()}...`,
    });
    setClickCount(prev => prev + 1);
  };

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } hover:scale-105 hover:shadow-2xl group animate-advertisement-pulse cursor-pointer`}
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => setClickCount(prev => prev + 1)}
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
            <div
              className={`p-2 rounded-full bg-gradient-to-r ${gradient} text-white group-hover:scale-110 transition-transform duration-300 cursor-pointer`}
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails();
              }}
            >
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

          {/* Interactive action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              title="Share"
            >
              <Share2 className="w-4 h-4 text-gray-500 hover:text-blue-500" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLike();
              }}
              className={`p-1 rounded-full transition-all duration-200 ${isLiked ? 'bg-red-100' : 'hover:bg-gray-100'
                }`}
              title={isLiked ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500'}`} />
            </button>
          </div>
        </div>

        <p className="text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>

        {/* Expanded details section */}
        {isExpanded && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg animate-in slide-in-from-top-2 duration-300">
            <div className="text-sm text-gray-600">
              <p>✨ Enhanced features and benefits</p>
              <p>🎯 Personalized recommendations</p>
              <p>🚀 Fast and reliable service</p>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            className={`bg-gradient-to-r ${gradient} hover:shadow-lg text-white group-hover:scale-105 transition-all duration-300`}
            onClick={(e) => {
              e.stopPropagation();
              handleCTA();
            }}
          >
            <span className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              {ctaText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="hover:bg-orange-50 hover:border-orange-300 transition-colors duration-200"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>

        {/* Click counter (hidden but functional) */}
        {clickCount > 0 && (
          <div className="absolute top-2 left-2 text-xs text-gray-400">
            Clicks: {clickCount}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdvertisementBanner; 