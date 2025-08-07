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
  Flame
} from "lucide-react";
import { useState, useEffect } from "react";

interface RestaurantAdvertisementProps {
  restaurant: Restaurant;
  index: number;
}

const RestaurantAdvertisement = ({ restaurant, index }: RestaurantAdvertisementProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

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
      } hover:scale-105 hover:shadow-2xl group animate-advertisement-pulse`}
      style={{ animationDelay: `${index * 100}ms` }}
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
            <div className={`p-2 rounded-full bg-gradient-to-r ${adData.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
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
          
          {/* Interactive heart icon */}
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors duration-300 group-hover:scale-110" />
        </div>
        
        <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-sm sm:text-base">
          {adData.description}
        </p>

        {/* Restaurant info */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 sm:mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{restaurant.estimatedDeliveryTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Truck className="w-3 h-3" />
            <span>₹{restaurant.deliveryPrice}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400" />
            <span>4.5+</span>
          </div>
        </div>
        
        <Button 
          className={`bg-gradient-to-r ${adData.gradient} hover:shadow-lg text-white group-hover:scale-105 transition-all duration-300 text-sm`}
        >
          <span className="flex items-center gap-2">
            {adData.ctaText}
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default RestaurantAdvertisement;
