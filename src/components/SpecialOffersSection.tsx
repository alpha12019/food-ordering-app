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
  Truck,
  Heart,
  Share2,
  ShoppingCart,
  Eye,
  MapPin
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
  const [likedOffers, setLikedOffers] = useState<Set<number>>(new Set());
  const [expandedOffers, setExpandedOffers] = useState<Set<number>>(new Set());
  const [clickCounts, setClickCounts] = useState<{ [key: number]: number }>({});
  const { toast } = useToast();

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
  const formatTime = (time: { hours: number; minutes: number; seconds: number }) => {
    return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
  };
  const formatTime = (time: { hours: number; minutes: number; seconds: number }) => {
    return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
  };

  // Interactive handlers
  const handleLike = (offerId: number) => {
    const newLikedOffers = new Set(likedOffers);
    if (newLikedOffers.has(offerId)) {
      newLikedOffers.delete(offerId);
      toast({
        title: "Removed from favorites",
        description: "Offer removed from your favorites.",
      });
    } else {
      newLikedOffers.add(offerId);
      toast({
        title: "Added to favorites",
        description: "Offer added to your favorites.",
      });
    }
    setLikedOffers(newLikedOffers);
  };

  const handleShare = (offer: Offer) => {
    if (navigator.share) {
      navigator.share({
        title: offer.title,
        text: `${offer.title} - ${offer.description}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${offer.title} - ${offer.description}`);
      toast({
        title: "Link copied!",
        description: "Offer link copied to clipboard.",
      });
    }
  };

  const handleExpand = (offerId: number) => {
    const newExpandedOffers = new Set(expandedOffers);
    if (newExpandedOffers.has(offerId)) {
      newExpandedOffers.delete(offerId);
    } else {
      newExpandedOffers.add(offerId);
    }
    setExpandedOffers(newExpandedOffers);
    setClickCounts(prev => ({ ...prev, [offerId]: (prev[offerId] || 0) + 1 }));
  };

  const handleClaimOffer = (offer: Offer) => {
    toast({
      title: "Offer claimed!",
      description: `Redirecting to ${offer.title}...`,
    });
    setClickCounts(prev => ({ ...prev, [offer.id]: (prev[offer.id] || 0) + 1 }));
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
            className="relative overflow-hidden hover:scale-105 transition-all duration-300 group animate-bounce-in animate-advertisement-glow cursor-pointer"
            style={{ animationDelay: `${index * 0.2}s` }}
            onClick={() => setClickCounts(prev => ({ ...prev, [offer.id]: (prev[offer.id] || 0) + 1 }))}
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

                {/* Interactive action buttons */}
                <div className="absolute top-2 right-12 flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(offer);
                    }}
                    className="p-1 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-200"
                    title="Share"
                  >
                    <Share2 className="w-3 h-3 text-gray-600" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(offer.id);
                    }}
                    className={`p-1 rounded-full transition-all duration-200 ${likedOffers.has(offer.id) ? 'bg-red-100' : 'bg-white bg-opacity-80 hover:bg-opacity-100'
                      }`}
                    title={likedOffers.has(offer.id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart className={`w-3 h-3 ${likedOffers.has(offer.id) ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
                  </button>
                </div>
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

                {/* Expanded details */}
                {expandedOffers.has(offer.id) && (
                  <div className="p-3 bg-gray-50 rounded-lg animate-in slide-in-from-top-2 duration-300">
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span>Available in all locations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="w-3 h-3" />
                        <span>Free delivery included</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span>4.5+ rated restaurants</span>
                      </div>
                    </div>
                  </div>
                )}

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

                {/* CTA Buttons */}
                <div className="flex gap-2">
                  <Button
                    className={`w-full bg-gradient-to-r ${offer.gradient} hover:shadow-lg text-white group-hover:scale-105 transition-all duration-300`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClaimOffer(offer);
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Claim Offer
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExpand(offer.id);
                    }}
                    className="hover:bg-orange-50 hover:border-orange-300 transition-colors duration-200"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>

            {/* Sparkle effect on hover */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Sparkles className="absolute top-4 left-4 text-yellow-400 animate-ping" />
              <Sparkles className="absolute bottom-4 right-4 text-yellow-400 animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* Click counter (hidden but functional) */}
            {clickCounts[offer.id] > 0 && (
              <div className="absolute top-2 left-2 text-xs text-gray-400 bg-white bg-opacity-80 px-1 rounded">
                Clicks: {clickCounts[offer.id]}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffersSection; 