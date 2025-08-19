import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Truck, 
  Shield, 
  Star, 
  Users, 
  Zap, 
  ArrowRight,
  Sparkles,
  Heart,
  MapPin
} from "lucide-react";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  badgeText?: string;
  stats?: string;
}

const FeaturesShowcase = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features: Feature[] = [
    {
      id: 1,
      title: "Lightning Fast Delivery",
      description: "Get your food delivered in 30 minutes or less with our optimized delivery network",
      icon: <Truck className="w-8 h-8" />,
      gradient: "from-blue-500 to-cyan-500",
      badgeText: "30 min",
      stats: "98% on-time"
    },
    {
      id: 2,
      title: "Secure Payments",
      description: "Multiple payment options with bank-grade security and fraud protection",
      icon: <Shield className="w-8 h-8" />,
      gradient: "from-green-500 to-emerald-500",
      badgeText: "Secure",
      stats: "100% safe"
    },
    {
      id: 3,
      title: "Premium Restaurants",
      description: "Partner with the best restaurants in your area with verified quality standards",
      icon: <Star className="w-8 h-8" />,
      gradient: "from-yellow-500 to-orange-500",
      badgeText: "Premium",
      stats: "500+ partners"
    },
    {
      id: 4,
      title: "Real-time Tracking",
      description: "Track your order from kitchen to doorstep with live GPS updates",
      icon: <MapPin className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-500",
      badgeText: "Live",
      stats: "Real-time"
    },
    {
      id: 5,
      title: "24/7 Support",
      description: "Round-the-clock customer support to help you with any queries",
      icon: <Users className="w-8 h-8" />,
      gradient: "from-indigo-500 to-blue-500",
      badgeText: "24/7",
      stats: "Always here"
    },
    {
      id: 6,
      title: "Smart Recommendations",
      description: "AI-powered recommendations based on your taste preferences and order history",
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-red-500 to-pink-500",
      badgeText: "AI-Powered",
      stats: "Smart"
    }
  ];

  return (
    <div className="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-28 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600 mb-2 gradient-text">
          ✨ Why Choose MERNeats?
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Experience the best food delivery service with these amazing features
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card 
            key={feature.id}
            className={`relative overflow-hidden hover:scale-105 transition-all duration-300 group animate-bounce-in animate-advertisement-bounce cursor-pointer ${
              hoveredFeature === feature.id ? 'ring-2 ring-orange-400 shadow-xl' : ''
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onMouseEnter={() => setHoveredFeature(feature.id)}
            onMouseLeave={() => setHoveredFeature(null)}
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-5 group-hover:opacity-20 transition-opacity duration-300`} />
            
            {/* Floating sparkles effect */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Sparkles className="absolute top-4 right-4 text-yellow-400 animate-ping" />
              <Sparkles className="absolute bottom-4 left-4 text-yellow-400 animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>
            
            <CardContent className="p-6 relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-full bg-gradient-to-r ${feature.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                {feature.badgeText && (
                  <Badge className={`bg-gradient-to-r ${feature.gradient} text-white text-xs`}>
                    {feature.badgeText}
                  </Badge>
                )}
              </div>
              
              <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-300">
                {feature.description}
              </p>
              
              {feature.stats && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">
                    {feature.stats}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Bottom CTA section */}
      <div className="mt-8 text-center">
        <Card className="bg-gradient-to-r from-orange-50 to-red-50 p-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h3 className="font-bold text-xl text-orange-600 mb-2">
                Ready to experience the best?
              </h3>
              <p className="text-gray-600 text-sm">
                Join thousands of satisfied customers who trust MERNeats for their food delivery needs
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <span className="flex items-center gap-2">
                  Start Ordering
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
              <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                <span className="flex items-center gap-2">
                  Learn More
                  <Heart className="w-4 h-4" />
                </span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FeaturesShowcase; 