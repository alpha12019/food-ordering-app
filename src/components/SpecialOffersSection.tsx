import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Flame,
  Star,
  Truck
} from "lucide-react";

interface Offer {
  id: number;
  title: string;
  description: string;
  discount: string;
  originalPrice: string;
  discountedPrice: string;
  endTime: Date;
  image: string;
  badgeText: string;
  gradient: string;
}

const SpecialOffersSection = () => {
  const [offers] = useState<Offer[]>([
    {
      id: 1,
      title: "First Order Special",
      description: "Get 50% off on your first order from any restaurant",
      discount: "50% OFF",
      originalPrice: "₹200",
      discountedPrice: "₹100",
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&q=80",
      badgeText: "New User",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 2,
      title: "Free Delivery Week",
      description: "No delivery charges on orders above ₹500",
      discount: "FREE DELIVERY",
      originalPrice: "₹50",
      discountedPrice: "₹0",
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop&q=80",
      badgeText: "Limited Time",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      id: 3,
      title: "Weekend Feast",
      description: "Extra 20% off on weekend orders from premium restaurants",
      discount: "20% OFF",
      originalPrice: "₹300",
      discountedPrice: "₹240",
      endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&q=80",
      badgeText: "Weekend",
      gradient: "from-orange-500 to-red-500"
    }
  ]);

  const [timeLeft, setTimeLeft] = useState<{ [key: number]: { hours: number; minutes: number; seconds: number } }>({});

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft: { [key: number]: { hours: number; minutes: number; seconds: number } } = {};
      
      offers.forEach(offer => {
        const now = new Date().getTime();
        const distance = offer.endTime.getTime() - now;
        
        if (distance > 0) {
          newTimeLeft[offer.id] = {
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
          };
        } else {
          newTimeLeft[offer.id] = { hours: 0, minutes: 0, seconds: 0 };
        }
      });
      
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [offers]);

  const formatTime = (time: { hours: number; minutes: number; seconds: number }) => {
    return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-28 mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600 mb-2 gradient-text">
          🎉 Special Offers & Deals
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Don't miss out on these amazing deals!
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer, index) => (
          <Card 
            key={offer.id}
            className="relative overflow-hidden hover:scale-105 transition-all duration-300 group animate-bounce-in animate-advertisement-glow"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${offer.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
            
                         {/* Floating fire icon for hot deals */}
             <div className="absolute top-4 right-4 z-10">
               <Flame className="w-6 h-6 text-red-500 animate-pulse" />
             </div>
            
            <CardContent className="p-6 relative z-10">
              {/* Image section */}
              <div className="relative mb-4 rounded-lg overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity duration-300" />
                
                {/* Discount badge */}
                <Badge className="absolute top-2 left-2 bg-red-500 text-white font-bold">
                  {offer.discount}
                </Badge>
                
                {/* Time remaining badge */}
                <Badge className="absolute top-2 right-2 bg-orange-500 text-white font-bold">
                  <Clock className="w-3 h-3 mr-1" />
                  {timeLeft[offer.id] ? formatTime(timeLeft[offer.id]) : "00:00:00"}
                </Badge>
              </div>
              
              {/* Content section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                    {offer.title}
                  </h3>
                  <Badge className={`bg-gradient-to-r ${offer.gradient} text-white`}>
                    {offer.badgeText}
                  </Badge>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {offer.description}
                </p>
                
                {/* Price comparison */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600">
                    {offer.discountedPrice}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {offer.originalPrice}
                  </span>
                </div>
                
                {/* Features */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    <span>Free Delivery</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400" />
                    <span>4.5+ Rating</span>
                  </div>
                </div>
                
                {/* CTA Button */}
                <Button 
                  className={`w-full bg-gradient-to-r ${offer.gradient} hover:shadow-lg text-white group-hover:scale-105 transition-all duration-300`}
                >
                  <span className="flex items-center gap-2">
                    Claim Offer
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </div>
            </CardContent>
            
            {/* Sparkle effect on hover */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Sparkles className="absolute top-4 left-4 text-yellow-400 animate-ping" />
              <Sparkles className="absolute bottom-4 right-4 text-yellow-400 animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffersSection; 