import { Restaurant } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  Clock, 
  Truck, 
  ArrowRight, 
  Sparkles, 
  Heart,
  Zap,
  Gift,
  Award,
  Flame,
  Share2,
  ShoppingCart,
  MapPin,
  Phone,
  MessageCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface RestaurantAdvertisementProps {
  restaurant: Restaurant;
  index: number;
}

const RestaurantAdvertisement = ({ restaurant, index }: RestaurantAdvertisementProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    const sparkleTimer = setInterval(() => {
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 1000);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(sparkleTimer);
    };
  }, [index]);

  // Interactive handlers
  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: `${restaurant.restaurantName} ${isLiked ? "removed from" : "added to"} your favorites.`,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: restaurant.restaurantName,
        text: `Check out ${restaurant.restaurantName} - ${restaurant.cuisines.join(", ")} cuisine!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${restaurant.restaurantName} - ${restaurant.cuisines.join(", ")}`);
      toast({
        title: "Link copied!",
        description: "Restaurant link copied to clipboard.",
      });
    }
  };

  const handleViewDetails = () => {
    setShowDetails(!showDetails);
    setClickCount(prev => prev + 1);
  };

  const handleOrderNow = () => {
    toast({
      title: "Redirecting to order...",
      description: `Taking you to ${restaurant.restaurantName} menu.`,
    });
    // Simulate navigation to restaurant details
    setTimeout(() => {
      window.location.href = `/restaurant/${restaurant._id}`;
    }, 1000);
  };

  const handleContact = () => {
    toast({
      title: "Contact Restaurant",
      description: `Calling ${restaurant.restaurantName}...`,
    });
  };

  // Generate advertisement based on restaurant characteristics
  const getAdvertisementData = () => {
    const deliveryPrice = restaurant.deliveryPrice;
    const cuisines = restaurant.cuisines;
    const estimatedTime = restaurant.estimatedDeliveryTime;

    // Premium restaurant with high delivery price
    if (deliveryPrice > 400) {
      return {
        type: 'premium' as const,
        title: "⭐ Premium Dining Experience",
        description: `Experience luxury dining with ${restaurant.restaurantName}. Premium ingredients and exceptional service.`,
        ctaText: "Order Premium",
        badgeText: "Premium",
        gradient: "from-purple-500 to-pink-500",
        icon: <Award className="w-6 h-6" />
      };
    }

    // Fast delivery restaurant
    if (estimatedTime <= 25) {
      return {
        type: 'fast' as const,
        title: "⚡ Lightning Fast Delivery",
        description: `${restaurant.restaurantName} delivers in ${estimatedTime} minutes! Quick and fresh food.`,
        ctaText: "Order Fast",
        badgeText: "Fast Delivery",
        gradient: "from-green-500 to-emerald-500",
        icon: <Zap className="w-6 h-6" />
      };
    }

    // Budget-friendly restaurant
    if (deliveryPrice <= 200) {
      return {
        type: 'budget' as const,
        title: "💰 Budget-Friendly Meals",
        description: `Great value at ${restaurant.restaurantName}. Delicious food at affordable prices.`,
        ctaText: "Save Money",
        badgeText: "Budget",
        gradient: "from-blue-500 to-cyan-500",
        icon: <Gift className="w-6 h-6" />
      };
    }

    // Cuisine-specific promotions
    if (cuisines.some(cuisine => cuisine.toLowerCase().includes('pizza'))) {
      return {
        type: 'pizza' as const,
        title: "🍕 Pizza Lovers Special",
        description: `${restaurant.restaurantName} has the best pizzas in town! Fresh ingredients and authentic taste.`,
        ctaText: "Order Pizza",
        badgeText: "Pizza Special",
        gradient: "from-orange-500 to-red-500",
        icon: <Flame className="w-6 h-6" />
      };
    }

    if (cuisines.some(cuisine => cuisine.toLowerCase().includes('indian'))) {
      return {
        type: 'indian' as const,
        title: "🌶️ Authentic Indian Cuisine",
        description: `Experience traditional Indian flavors at ${restaurant.restaurantName}. Rich spices and authentic recipes.`,
        ctaText: "Taste India",
        badgeText: "Indian Special",
        gradient: "from-yellow-500 to-orange-500",
        icon: <Flame className="w-6 h-6" />
      };
    }

    // Default advertisement
    return {
      type: 'default' as const,
      title: "🎉 Special Offer Available",
      description: `${restaurant.restaurantName} has amazing deals waiting for you! Don't miss out.`,
      ctaText: "View Offers",
      badgeText: "Special",
      gradient: "from-indigo-500 to-purple-500",
      icon: <Star className="w-6 h-6" />
    };
  };

  const adData = getAdvertisementData();

  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } hover:scale-105 hover:shadow-2xl group animate-advertisement-pulse cursor-pointer`}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => setClickCount(prev => prev + 1)}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${adData.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
      
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
      
      <CardContent className="p-4 sm:p-6 relative z-10">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div 
              className={`p-2 rounded-full bg-gradient-to-r ${adData.gradient} text-white group-hover:scale-110 transition-transform duration-300 cursor-pointer`}
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails();
              }}
            >
              {adData.icon}
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-lg text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                {adData.title}
              </h3>
              <Badge className="mt-1 bg-orange-100 text-orange-800 border-orange-200 text-xs">
                {adData.badgeText}
              </Badge>
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
              className={`p-1 rounded-full transition-all duration-200 ${
                isLiked ? 'bg-red-100' : 'hover:bg-gray-100'
              }`}
              title={isLiked ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-500 hover:text-red-500'}`} />
            </button>
          </div>
        </div>
        
        <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-sm sm:text-base">
          {adData.description}
        </p>

        {/* Restaurant info with interactive elements */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 sm:mb-4">
          <div className="flex items-center gap-1 hover:text-green-600 transition-colors duration-200 cursor-pointer">
            <Clock className="w-3 h-3" />
            <span>{restaurant.estimatedDeliveryTime} min</span>
          </div>
          <div className="flex items-center gap-1 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
            <Truck className="w-3 h-3" />
            <span>₹{restaurant.deliveryPrice}</span>
          </div>
          <div className="flex items-center gap-1 hover:text-yellow-600 transition-colors duration-200 cursor-pointer">
            <Star className="w-3 h-3 text-yellow-400" />
            <span>4.5+</span>
          </div>
        </div>

        {/* Expanded details section */}
        {showDetails && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg animate-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-gray-500" />
                <span>{restaurant.city}, {restaurant.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3 h-3 text-gray-500" />
                <span>{restaurant.cuisines.join(", ")}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex gap-2">
          <Button 
            className={`flex-1 bg-gradient-to-r ${adData.gradient} hover:shadow-lg text-white group-hover:scale-105 transition-all duration-300 text-sm`}
            onClick={(e) => {
              e.stopPropagation();
              handleOrderNow();
            }}
          >
            <span className="flex items-center gap-2">
              <ShoppingCart className="w-3 h-3" />
              {adData.ctaText}
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleContact();
            }}
            className="hover:bg-orange-50 hover:border-orange-300 transition-colors duration-200"
          >
            <Phone className="w-3 h-3" />
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

export default RestaurantAdvertisement;
