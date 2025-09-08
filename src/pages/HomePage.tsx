import { useState, useEffect, useRef } from "react";
import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
// Removed unused Hero import
import AdvertisementBanner from "@/components/AdvertisementBanner";
import SpecialOffersSection from "@/components/SpecialOffersSection";
import FeaturesShowcase from "@/components/FeaturesShowcase";
import TestAdvertisement from "@/components/TestAdvertisement";
import AnimatedCarousel from "@/components/AnimatedCarousel";
import MovingBanner from "@/components/MovingBanner";
import RotatingShowcase from "@/components/RotatingShowcase";
import FloatingCards from "@/components/FloatingCards";
import EnhancedAnimations from "@/components/EnhancedAnimations";
import ScrollAnimations from "@/components/ScrollAnimations";
import InteractiveCursor from "@/components/InteractiveCursor";
import { Star, Clock, Users, Award, Truck, ArrowRight, Sparkles, Heart } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCuisine, setHoveredCuisine] = useState<string | null>(null);
  const [hoveredRestaurant, setHoveredRestaurant] = useState<number | null>(null);
  const [progressValue, setProgressValue] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [floatingIcons, setFloatingIcons] = useState<Array<{id: number, x: number, y: number, icon: string, delay: number}>>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [bounceElements, setBounceElements] = useState(false);
  const searchSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Animate progress bar
    const timer = setTimeout(() => {
      setProgressValue(80);
    }, 1000);

    // Show sparkles periodically
    const sparkleTimer = setInterval(() => {
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 1000);
    }, 3000);

    // Create floating particles
    const particleTimer = setInterval(() => {
      setParticles(prev => {
        const newParticle = {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100
        };
        return [...prev.slice(-5), newParticle];
      });
    }, 2000);

    // Create floating icons
    const iconTimer = setInterval(() => {
      setFloatingIcons(prev => {
        const icons = ['🍕', '🍔', '🍣', '🍜', '🍰', '☕'];
        const newIcon = {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          icon: icons[Math.floor(Math.random() * icons.length)],
          delay: Math.random() * 2
        };
        return [...prev.slice(-3), newIcon];
      });
    }, 3000);

    // Show confetti effect
    const confettiTimer = setInterval(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }, 8000);

    // Bounce elements periodically
    const bounceTimer = setInterval(() => {
      setBounceElements(true);
      setTimeout(() => setBounceElements(false), 1000);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(sparkleTimer);
      clearInterval(particleTimer);
      clearInterval(iconTimer);
      clearInterval(confettiTimer);
      clearInterval(bounceTimer);
    };
  }, []);

  const [landingImgSrc, setLandingImgSrc] = useState(
    "https://res.cloudinary.com/dqijfttks/image/upload/v1751310510/landing_poi6ma.png"
  );
  const [appDownloadImgSrc, setAppDownloadImgSrc] = useState(
    "https://res.cloudinary.com/dqijfttks/image/upload/v1751310887/appDownload_msp0i8.png"
  );

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate(`/search/${searchFormValues.searchQuery}`);
  };

  // Popular cuisines with icons
  const popularCuisines = [
    { name: "Pizza", icon: "🍕" },
    { name: "Chinese", icon: "🥢" },
    { name: "Indian", icon: "🍛" },
    { name: "Burgers", icon: "🍔" },
    { name: "Desserts", icon: "🍰" },
    { name: "Sushi", icon: "🍣" },
    { name: "Mexican", icon: "🌮" },
    { name: "South Indian", icon: "🥘" },
  ];

  // Featured restaurants with reliable images
  const featuredRestaurants = [
    {
      name: "Spice Garden",
      cuisine: "Indian",
      rating: 4.5,
      deliveryTime: "25-35 min",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&q=80"
    },
    {
      name: "Pizza Palace",
      cuisine: "Italian",
      rating: 4.3,
      deliveryTime: "20-30 min",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&q=80"
    },
    {
      name: "Golden Dragon",
      cuisine: "Chinese",
      rating: 4.7,
      deliveryTime: "30-40 min",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop&q=80"
    }
  ];

  // Carousel items for the main hero carousel
  const carouselItems = [
    {
      id: 1,
      title: "Delicious Food Delivered",
      description: "Order from your favorite restaurants with just a few clicks. Fast delivery, great prices, and amazing taste!",
      image: "https://images.unsplash.com/photo-1504674900242-87fec7f8e8c6?w=800&h=500&fit=crop&q=80",
      badge: "New",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 2,
      title: "Weekend Special Offers",
      description: "Enjoy 25% off on all orders this weekend. Perfect time to try new restaurants and cuisines!",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop&q=80",
      badge: "Limited Time",
      gradient: "from-orange-500 to-red-500"
    },
    {
      id: 3,
      title: "Premium Delivery Service",
      description: "Upgrade to premium for priority delivery, exclusive offers, and dedicated customer support.",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=500&fit=crop&q=80",
      badge: "Premium",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  // Moving banner items
  const movingBannerItems = [
    "🔥 Hot Deals Today!",
    "⭐ New Restaurants Added",
    "🚚 Free Delivery on Orders Above ₹500",
    "🎉 Weekend Special Offers",
    "🍕 Pizza Mania - 50% Off",
    "🍔 Burger Bonanza - Buy 2 Get 1 Free",
    "🍣 Sushi Special - Fresh Daily",
    "🍰 Dessert Delights - Sweet Treats"
  ];

  // Rotating showcase items
  const rotatingShowcaseItems = [
    {
      id: 1,
      name: "Spice Garden",
      cuisine: "Indian",
      rating: 4.5,
      deliveryTime: "25-35 min",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&q=80",
      badge: "Popular"
    },
    {
      id: 2,
      name: "Pizza Palace",
      cuisine: "Italian",
      rating: 4.3,
      deliveryTime: "20-30 min",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&q=80",
      badge: "Trending"
    },
    {
      id: 3,
      name: "Golden Dragon",
      cuisine: "Chinese",
      rating: 4.7,
      deliveryTime: "30-40 min",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop&q=80",
      badge: "Top Rated"
    },
    {
      id: 4,
      name: "Burger House",
      cuisine: "American",
      rating: 4.2,
      deliveryTime: "15-25 min",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&q=80",
      badge: "Fast"
    },
    {
      id: 5,
      name: "Sushi Master",
      cuisine: "Japanese",
      rating: 4.6,
      deliveryTime: "35-45 min",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&q=80",
      badge: "Fresh"
    },
    {
      id: 6,
      name: "Taco Fiesta",
      cuisine: "Mexican",
      rating: 4.4,
      deliveryTime: "20-30 min",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&q=80",
      badge: "Spicy"
    }
  ];

  // Floating cards items
  const floatingCardsItems = [
    {
      id: 1,
      title: "Quick Order",
      subtitle: "Fast & Easy",
      description: "Order your favorite food in just a few clicks with our streamlined ordering process.",
      image: "https://images.unsplash.com/photo-1504674900242-87fec7f8e8c6?w=400&h=300&fit=crop&q=80",
      rating: 4.8,
      badge: "Popular",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Live Tracking",
      subtitle: "Real-time Updates",
      description: "Track your order in real-time and know exactly when your delicious food will arrive.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop&q=80",
      rating: 4.9,
      badge: "New",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      title: "Secure Payments",
      subtitle: "100% Safe",
      description: "Multiple payment options with bank-grade security to keep your transactions safe.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&q=80",
      rating: 4.7,
      badge: "Secure",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      title: "24/7 Support",
      subtitle: "Always Here",
      description: "Round-the-clock customer support to help you with any questions or issues.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&q=80",
      rating: 4.6,
      badge: "Support",
      gradient: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      title: "Loyalty Rewards",
      subtitle: "Earn Points",
      description: "Earn points with every order and redeem them for exciting rewards and discounts.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&q=80",
      rating: 4.5,
      badge: "Rewards",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      id: 6,
      title: "Family Meals",
      subtitle: "Perfect Portions",
      description: "Specially curated family meal packages that are perfect for sharing and saving.",
      image: "https://images.unsplash.com/photo-1504674900242-87fec7f8e8c6?w=400&h=300&fit=crop&q=80",
      rating: 4.4,
      badge: "Family",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "Amazing food delivery service! The food always arrives hot and fresh.",
      rating: 5
    },
    {
      name: "Mike Chen",
      text: "Great variety of restaurants and fast delivery. Highly recommended!",
      rating: 5
    },
    {
      name: "Emma Davis",
      text: "The app is so easy to use and the customer service is excellent.",
      rating: 4
    }
  ];

  const handleCuisineClick = useCallback(
    (cuisine: string) => {
      navigate(`/search/${encodeURIComponent(cuisine)}`);
    },
    [navigate]
  );

  const scrollToSearch = () => {
    searchSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 sm:w-4 sm:h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <InteractiveCursor>
      <div className={`flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Enhanced Background Animations */}
        <EnhancedAnimations />
      {/* Enhanced Hero Section with Animated Carousel */}
      <div className="relative animate-fade-in overflow-hidden">
        <AnimatedCarousel 
          items={carouselItems}
          autoPlay={true}
          interval={5000}
          showControls={true}
          showIndicators={true}
          className="h-[500px] sm:h-[600px] md:h-[700px]"
        />
        
        {/* Floating particles effect */}
        <div className="particle-container absolute inset-0 pointer-events-none z-10">
          {particles.map(particle => (
            <div
              key={particle.id}
              className="particle animate-floating-particles"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Floating sparkles effect */}
        {showSparkles && (
          <div className="absolute inset-0 pointer-events-none z-10 hidden sm:block">
            {[...Array(6)].map((_, i) => (
              <Sparkles
                key={i}
                className="absolute text-yellow-300 animate-ping"
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

        {/* Confetti effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-10 hidden sm:block">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'][Math.floor(Math.random() * 6)],
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}
        
        {/* Morphing decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-400/20 rounded-full animate-morph z-10 hidden sm:block"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-red-400/20 rounded-full animate-morph z-10 hidden sm:block" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-yellow-400/20 rounded-full animate-morph z-10 hidden sm:block" style={{ animationDelay: '4s' }}></div>

        {/* Subtle scroll cue */}
        <button
          type="button"
          onClick={scrollToSearch}
          aria-label="Scroll to search"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white/80 backdrop-blur-sm border border-orange-200 shadow-md rounded-full w-10 h-10 flex items-center justify-center text-orange-600 hover:bg-white transition-colors animate-bounce"
        >
          <ArrowRight className="w-5 h-5 transform rotate-90" />
        </button>
      </div>

      {/* Enhanced Search Section with Interactive Animations */}
      <ScrollAnimations animationType="fade-up" delay={200}>
        <Card 
          ref={searchSectionRef}
          id="search-section" 
          className="mx-1 sm:mx-2 md:mx-4 lg:mx-8 xl:mx-16 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl shadow-2xl py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 flex flex-col text-center gap-3 sm:gap-4 md:gap-6 -mt-2 sm:-mt-4 md:-mt-6 lg:-mt-8 xl:-mt-12 animate-slide-in-up hover-lift relative overflow-hidden"
        >
        {/* Enhanced background decoration with morphing shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-20 h-20 bg-orange-200 rounded-full animate-morph"></div>
          <div className="absolute bottom-4 right-4 w-16 h-16 bg-red-200 rounded-full animate-morph" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-yellow-200 rounded-full animate-morph" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-orange-300 rounded-full animate-morph" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/6 right-1/6 w-10 h-10 bg-pink-200 rounded-full animate-morph" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-1/6 left-1/6 w-14 h-14 bg-blue-200 rounded-full animate-morph" style={{ animationDelay: '2.5s' }}></div>
        </div>

        {/* Floating food icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden xs:block">
          {floatingIcons.map(icon => (
            <div
              key={icon.id}
              className="absolute text-2xl animate-float opacity-20"
              style={{
                left: `${icon.x}%`,
                top: `${icon.y}%`,
                animationDelay: `${icon.delay}s`,
                animationDuration: '4s'
              }}
            >
              {icon.icon}
            </div>
          ))}
          
          {/* Additional static floating icons */}
          <div className="absolute top-1/6 left-1/6 text-3xl animate-float opacity-20 hidden md:block" style={{ animationDelay: '0.5s' }}>🍜</div>
          <div className="absolute top-1/3 right-1/6 text-2xl animate-float opacity-20" style={{ animationDelay: '1.5s' }}>🍰</div>
          <div className="absolute bottom-1/4 left-1/3 text-3xl animate-float opacity-20" style={{ animationDelay: '2.5s' }}>🥘</div>
          <div className="absolute bottom-1/6 right-1/3 text-2xl animate-float opacity-20" style={{ animationDelay: '3.5s' }}>🍹</div>
          
          {/* Enhanced floating elements with different animations */}
          <div className="absolute top-1/5 left-1/5 text-2xl animate-bounce opacity-20 hidden md:block" style={{ animationDelay: '0.8s' }}>🎯</div>
          <div className="absolute top-2/5 right-1/5 text-3xl animate-pulse opacity-20" style={{ animationDelay: '1.2s' }}>🌟</div>
          <div className="absolute bottom-1/5 left-2/5 text-2xl animate-spin opacity-25" style={{ animationDelay: '2.8s' }}>🎪</div>
          <div className="absolute bottom-2/5 right-2/5 text-3xl animate-ping opacity-20" style={{ animationDelay: '3.2s' }}>💫</div>
          
          {/* Additional interactive floating elements */}
          <div className="absolute top-1/3 left-1/3 text-2xl animate-float-delayed opacity-20 hidden md:block" style={{ animationDelay: '1.5s' }}>🍜</div>
          <div className="absolute top-2/3 right-1/3 text-3xl animate-float opacity-20" style={{ animationDelay: '2.5s' }}>🍰</div>
          <div className="absolute bottom-1/3 left-1/3 text-2xl animate-rotate-3d opacity-20" style={{ animationDelay: '3.5s' }}>🥘</div>
          <div className="absolute bottom-2/3 right-1/3 text-3xl animate-bounce opacity-20" style={{ animationDelay: '4.5s' }}>🍹</div>
        </div>
        
        <div className={`space-y-3 sm:space-y-4 relative z-10 transition-all duration-500 ${bounceElements ? 'animate-pulse' : ''}`}>
          <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-orange-600 leading-tight transition-all duration-500 ${bounceElements ? 'animate-bounce' : 'animate-shimmer-text'}`}>
            <span className="gradient-text animate-shimmer-text">
              Tuck into a takeaway today
            </span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 my-2 sm:my-3 md:my-4">
            <Badge className="text-xs sm:text-sm md:text-base bg-orange-100 text-orange-800 border-orange-200 px-2 sm:px-3 py-1 hover-scale transition-transform duration-300 group">
              <Truck className="w-3 h-3 sm:w-4 sm:h-4 mr-1 animate-float group-hover:animate-bounce" />
              <span className="hidden sm:inline">Fast Delivery</span>
              <span className="sm:hidden">Fast</span>
            </Badge>
            <Badge variant="secondary" className="text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1 hover-scale transition-transform duration-300 group">
              <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1 animate-float group-hover:animate-bounce" />
              <span className="hidden sm:inline">Best Restaurants</span>
              <span className="sm:hidden">Best</span>
            </Badge>
            <Badge variant="outline" className="text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1 hover-scale transition-transform duration-300 group">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 animate-float group-hover:animate-bounce" />
              <span className="hidden sm:inline">Easy Payments</span>
              <span className="sm:hidden">Easy</span>
            </Badge>
          </div>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700">Food is just a click away</p>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 px-2">
            Search Bareilly or Manchester to get results
          </p>
        </div>
        
        <div className="flex flex-col items-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto animate-scale-in relative z-10">
          <SearchBar
            placeholder="Search by city or town"
            onSubmit={handleSearchSubmit}
          />
          <div className="w-full space-y-2">
            <Progress value={progressValue} className="w-full transition-all duration-1000 ease-out" />
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <span className="animate-pulse">⚡</span>
              {progressValue}% of orders delivered within 30 minutes
            </p>
          </div>
        </div>
        </Card>
      </ScrollAnimations>

      {/* Moving Banner */}
      <MovingBanner 
        items={movingBannerItems}
        speed={40}
        direction="left"
        showBadges={true}
        className="mx-1 sm:mx-2 md:mx-4 lg:mx-8 xl:mx-16"
      />

      {/* Test Advertisement */}
      <TestAdvertisement />

      {/* Advertisement Banners Section */}
      <div className="mx-1 sm:mx-2 md:mx-4 lg:mx-8 xl:mx-16 mb-6 sm:mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <AdvertisementBanner
            type="promo"
            title="New User Bonus"
            description="Get ₹100 off on your first order! Sign up now and enjoy amazing discounts on your favorite restaurants."
            ctaText="Sign Up Now"
            badgeText="Limited Time"
            gradient="from-green-500 to-emerald-500"
            delay={200}
          />
          <AdvertisementBanner
            type="feature"
            title="Premium Delivery"
            description="Upgrade to premium for priority delivery, exclusive offers, and dedicated customer support."
            ctaText="Upgrade Now"
            badgeText="Premium"
            gradient="from-purple-500 to-pink-500"
            delay={400}
          />
        </div>
      </div>

      {/* Rotating Showcase Section */}
      <Card className="mx-1 sm:mx-2 md:mx-4 lg:mx-8 xl:mx-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 animate-slide-in-up hover-lift relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full animate-morph"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full animate-morph" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="text-center mb-6 sm:mb-8 relative z-10">
          <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-600 mb-2 gradient-text transition-all duration-500 ${bounceElements ? 'animate-bounce' : 'animate-shimmer-text'}`}>
            Interactive Restaurant Showcase
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">Hover to pause rotation and explore</p>
        </div>
        
        <RotatingShowcase 
          items={rotatingShowcaseItems}
          autoRotate={true}
          rotationSpeed={0.3}
          className="relative z-10"
        />
      </Card>

      {/* Special Offers Section */}
      <SpecialOffersSection />

      {/* Features Showcase */}
      <FeaturesShowcase />

      {/* Floating Cards Section */}
      <Card className="mx-1 sm:mx-2 md:mx-4 lg:mx-8 xl:mx-16 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl shadow-lg py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 animate-slide-in-up hover-lift relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-green-200 to-teal-200 rounded-full animate-morph"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-200 to-blue-200 rounded-full animate-morph" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="text-center mb-6 sm:mb-8 relative z-10">
          <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-600 mb-2 gradient-text transition-all duration-500 ${bounceElements ? 'animate-bounce' : 'animate-shimmer-text'}`}>
            Our Amazing Features
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">Discover what makes us special</p>
        </div>
        
        <FloatingCards 
          items={floatingCardsItems}
          maxCards={6}
          className="relative z-10"
        />
      </Card>

      {/* Enhanced Popular Cuisines Section */}
      <ScrollAnimations animationType="scale" delay={300}>
        <Card className="mx-1 sm:mx-2 md:mx-4 lg:mx-8 xl:mx-16 bg-white rounded-xl shadow-lg py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 animate-slide-in-up hover-lift relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full animate-morph"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full animate-morph" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className={`text-center mb-6 sm:mb-8 relative z-10 transition-all duration-500 ${bounceElements ? 'animate-pulse' : 'animate-fade-in'}`}>
          <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-orange-600 mb-2 gradient-text transition-all duration-500 ${bounceElements ? 'animate-bounce' : 'animate-shimmer-text'}`}>
            Popular Cuisines
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">Explore our most loved cuisines</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 relative z-10">
          {popularCuisines.map((cuisine, index) => (
            <Card
              key={cuisine.name}
              className={`cursor-pointer hover:shadow-2xl transition-all duration-500 hover-scale border-2 hover:border-orange-300 animate-bounce-in hover-lift group relative overflow-hidden transform perspective-1000 ${
                hoveredCuisine === cuisine.name ? 'ring-2 ring-orange-400 shadow-xl rotate-y-12' : ''
              }`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                transformStyle: 'preserve-3d'
              }}
              onClick={() => handleCuisineClick(cuisine.name)}
              onMouseEnter={() => setHoveredCuisine(cuisine.name)}
              onMouseLeave={() => setHoveredCuisine(null)}
            >
              {/* Enhanced 3D hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 to-red-400/30 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"></div>
              
              {/* Floating particles on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-2 left-2 w-1 h-1 bg-orange-300 rounded-full animate-ping"></div>
                <div className="absolute top-2 right-2 w-1 h-1 bg-red-300 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                <div className="absolute bottom-2 left-2 w-1 h-1 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
              </div>
              
              <CardContent className="p-3 sm:p-4 text-center relative z-10">
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2 animate-float group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  {cuisine.icon}
                </div>
                <p className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base group-hover:text-orange-600 transition-colors duration-300">
                  {cuisine.name}
                </p>
                
                {/* Enhanced interactive arrow indicator */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0 group-hover:scale-110">
                  <ArrowRight className="w-4 h-4 text-orange-500 animate-pulse" />
                </div>
                
                {/* Bottom glow effect */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        </Card>
      </ScrollAnimations>

      {/* Enhanced Featured Restaurants Section */}
      <ScrollAnimations animationType="fade-left" delay={400}>
        <Card className="mx-1 sm:mx-2 md:mx-4 lg:mx-8 xl:mx-16 bg-white rounded-xl shadow-lg py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 animate-slide-in-up hover-lift relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-orange-200 to-yellow-200 rounded-full animate-morph"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-red-200 to-pink-200 rounded-full animate-morph" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
        <div className={`text-center mb-6 sm:mb-8 relative z-10 transition-all duration-500 ${bounceElements ? 'animate-pulse' : 'animate-fade-in'}`}>
          <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-orange-600 mb-2 gradient-text transition-all duration-500 ${bounceElements ? 'animate-bounce' : 'animate-shimmer-text'}`}>
            Featured Restaurants
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">Discover top-rated restaurants in your area</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 relative z-10">
          {featuredRestaurants.map((restaurant, index) => (
            <Card 
              key={index} 
              className={`overflow-hidden hover:shadow-2xl transition-all duration-500 hover-lift animate-scale-in group relative transform perspective-1000 ${
                hoveredRestaurant === index ? 'ring-2 ring-orange-400 shadow-xl rotate-y-6' : ''
              }`} 
              style={{ 
                animationDelay: `${index * 0.2}s`,
                transformStyle: 'preserve-3d'
              }}
              onMouseEnter={() => setHoveredRestaurant(index)}
              onMouseLeave={() => setHoveredRestaurant(null)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-32 sm:h-40 md:h-48 object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-2"
                  onError={(e) => {
                    // Fallback to a placeholder image if the main image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&q=80`;
                  }}
                />
                
                {/* Enhanced gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Floating rating badge */}
                <Badge className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs sm:text-sm animate-pulse-glow group-hover:scale-110 transition-all duration-300 shadow-lg">
                  {restaurant.cuisine}
                </Badge>
                
                {/* Enhanced heart icon for favorites */}
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100 group-hover:animate-heartbeat">
                  <Heart className="w-5 h-5 text-white drop-shadow-lg cursor-pointer hover:text-red-500 transition-colors duration-300" />
                </div>
                
                {/* Floating sparkles on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Sparkles className="absolute top-1/2 left-1/4 text-yellow-300 animate-ping" style={{ animationDelay: '0.1s' }} />
                  <Sparkles className="absolute top-1/3 right-1/3 text-orange-300 animate-ping" style={{ animationDelay: '0.3s' }} />
                </div>
              </div>
              
              <CardContent className="p-3 sm:p-4 relative z-10">
                <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 group-hover:text-orange-600 transition-colors duration-300">
                  {restaurant.name}
                </h3>
                <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  {renderStars(restaurant.rating)}
                  <span className="text-xs sm:text-sm text-gray-600">({restaurant.rating})</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 group-hover:text-orange-600 transition-colors duration-300">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 group-hover:animate-pulse" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                
                {/* Enhanced interactive order button */}
                <div className="mt-3 transition-all duration-500 transform group-hover:translate-y-0">
                  <Button 
                    size="sm" 
                    className="btn-interactive w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-xs group-hover:scale-105 group-hover:shadow-lg transition-all duration-300"
                    onClick={() => navigate(`/detail/mock-${index + 1}`)}
                  >
                    <span className="flex items-center gap-1">
                      Order Now
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </div>
                
                {/* Bottom glow effect */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>

      {/* New Animated Quick Actions Section */}
      <Card className="mx-1 sm:mx-2 md:mx-4 lg:mx-8 xl:mx-16 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl shadow-lg py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 animate-slide-in-up hover-lift relative overflow-hidden mb-6 sm:mb-8">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-green-200 to-teal-200 rounded-full animate-morph"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-teal-200 to-blue-200 rounded-full animate-morph" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
        <div className="text-center mb-6 sm:mb-8 relative z-10">
          <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-600 mb-2 gradient-text transition-all duration-500 ${bounceElements ? 'animate-bounce' : 'animate-shimmer-text'}`}>
            Quick Actions
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">Get started in seconds</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 relative z-10">
          {[
            { icon: "🔍", label: "Search Food", action: () => navigate('/search/Manchester'), color: "from-blue-400 to-cyan-500" },
            { icon: "🍕", label: "Order Now", action: scrollToSearch, color: "from-orange-400 to-red-500" },
            { icon: "👤", label: "My Profile", action: () => navigate('/profile'), color: "from-purple-400 to-pink-500" },
            { icon: "📱", label: "Download App", action: () => window.open('#', '_blank'), color: "from-green-400 to-emerald-500" }
          ].map((action, index) => (
            <div
              key={action.label}
              onClick={action.action}
              className={`text-center p-4 rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-500 hover-scale cursor-pointer group animate-bounce-in`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className={`text-3xl sm:text-4xl mb-2 animate-float group-hover:scale-110 transition-transform duration-300`}>
                {action.icon}
              </div>
              <div className={`text-sm sm:text-base font-semibold bg-gradient-to-r ${action.color} bg-clip-text text-transparent`}>
                {action.label}
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center mt-2"></div>
            </div>
          ))}
        </div>
      </Card>

      {/* Additional Advertisement Banners */}
      <div className="mx-1 sm:mx-2 md:mx-4 lg:mx-8 xl:mx-16 mb-6 sm:mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <AdvertisementBanner
            type="offer"
            title="Weekend Special"
            description="Enjoy 25% off on all orders this weekend. Perfect time to try new restaurants!"
            ctaText="Order Now"
            badgeText="Weekend"
            gradient="from-orange-500 to-red-500"
            delay={100}
          />
          <AdvertisementBanner
            type="testimonial"
            title="Customer Favorite"
            description="Join 10,000+ satisfied customers who love our fast delivery and quality food."
            ctaText="Join Now"
            badgeText="Popular"
            gradient="from-blue-500 to-cyan-500"
            delay={300}
          />
          <AdvertisementBanner
            type="promo"
            title="Refer & Earn"
            description="Refer friends and earn ₹50 for each successful referral. Share the love!"
            ctaText="Refer Friends"
            badgeText="Earn Money"
            gradient="from-green-500 to-teal-500"
            delay={500}
          />
        </div>
      </div>

      {/* Enhanced Testimonials Section */}
      <Card className="mx-1 sm:mx-2 md:mx-4 lg:mx-8 xl:mx-16 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl shadow-lg py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 animate-slide-in-up hover-lift relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-orange-200 to-red-200 rounded-full animate-morph"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-yellow-200 to-orange-200 rounded-full animate-morph" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className={`text-center mb-6 sm:mb-8 relative z-10 transition-all duration-500 ${bounceElements ? 'animate-pulse' : 'animate-fade-in'}`}>
          <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-orange-600 mb-2 gradient-text transition-all duration-500 ${bounceElements ? 'animate-bounce' : 'animate-shimmer-text'}`}>
            What Our Customers Say
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">Real reviews from satisfied customers</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 relative z-10">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-white p-4 sm:p-6 text-center animate-bounce-in hover-lift group relative overflow-hidden transform perspective-1000" 
              style={{ 
                animationDelay: `${index * 0.15}s`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Enhanced background decoration */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              
              {/* Floating particles on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-orange-300 rounded-full animate-ping"></div>
                <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-red-300 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-3 sm:mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-3 sm:mb-4 italic leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-orange-600 text-xs sm:text-sm md:text-base group-hover:text-orange-700 transition-colors duration-300">
                  {testimonial.name}
                </p>
                
                {/* Enhanced floating quote marks decoration */}
                <div className="absolute top-2 left-2 text-4xl text-orange-200 opacity-50 group-hover:opacity-75 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                  "
                </div>
                <div className="absolute bottom-2 right-2 text-4xl text-orange-200 opacity-50 group-hover:opacity-75 transition-all duration-500 transform group-hover:-rotate-12">
                  "
                </div>
                
                {/* Bottom glow effect */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Separator className="mx-1 sm:mx-2 md:mx-4 lg:mx-8 xl:mx-16 animate-fade-in" />

      {/* New Animated Statistics Section */}
      <Card className="mx-1 sm:mx-2 md:mx-4 lg:mx-8 xl:mx-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 animate-slide-in-up hover-lift relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full animate-morph"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full animate-morph" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="text-center mb-6 sm:mb-8 relative z-10">
          <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-600 mb-2 gradient-text transition-all duration-500 ${bounceElements ? 'animate-bounce' : 'animate-shimmer-text'}`}>
            Amazing Stats
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">Numbers that speak for themselves</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 relative z-10">
          {[
            { number: "50K+", label: "Happy Customers", icon: "😊", color: "from-green-400 to-emerald-500" },
            { number: "200+", label: "Restaurants", icon: "🍽️", color: "from-orange-400 to-red-500" },
            { number: "15min", label: "Avg Delivery", icon: "⚡", color: "from-blue-400 to-cyan-500" },
            { number: "99%", label: "Satisfaction", icon: "⭐", color: "from-purple-400 to-pink-500" }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center p-4 rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-500 hover-scale group animate-bounce-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`text-3xl sm:text-4xl mb-2 animate-float group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Enhanced App Download Section with Interactive Animations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 px-1 sm:px-2 md:px-4 lg:px-8 xl:px-16 animate-slide-in-up relative overflow-hidden">
        {/* Background floating elements with enhanced animations */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 text-4xl animate-float" style={{ animationDelay: '0s' }}>🍕</div>
          <div className="absolute top-1/3 right-1/3 text-3xl animate-float" style={{ animationDelay: '1s' }}>🍔</div>
          <div className="absolute bottom-1/3 left-1/3 text-4xl animate-float" style={{ animationDelay: '2s' }}>🍣</div>
          <div className="absolute bottom-1/4 right-1/4 text-3xl animate-float" style={{ animationDelay: '1.5s' }}>☕</div>
          
          {/* Additional floating elements with different animations */}
          <div className="absolute top-1/6 left-1/6 text-2xl animate-float-delayed" style={{ animationDelay: '0.5s' }}>🎯</div>
          <div className="absolute top-2/6 right-1/6 text-3xl animate-float" style={{ animationDelay: '1.2s' }}>🌟</div>
          <div className="absolute bottom-1/6 left-2/6 text-2xl animate-rotate-3d" style={{ animationDelay: '2.8s' }}>🎪</div>
          <div className="absolute bottom-2/6 right-2/6 text-3xl animate-ping" style={{ animationDelay: '3.2s' }}>💫</div>
        </div>
        
        <Card className="flex items-center justify-center p-0 overflow-hidden min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px] rounded-xl order-2 lg:order-1 animate-scale-in hover-lift group relative">
          <img
            src={landingImgSrc}
            alt="Landing visual"
            onError={() => setLandingImgSrc(landingImage)}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
            className="object-cover w-full h-full rounded-xl transition-transform duration-700 group-hover:scale-125 group-hover:rotate-1"
          />
          
          {/* Enhanced overlay with interactive elements */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-4">
            <div className="text-white text-center">
              <p className="text-sm font-semibold mb-2 animate-pulse">Interactive Preview</p>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
          
          {/* Floating sparkles on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Sparkles className="absolute top-1/4 left-1/4 text-yellow-300 animate-ping" style={{ animationDelay: '0.1s' }} />
            <Sparkles className="absolute top-1/3 right-1/3 text-orange-300 animate-ping" style={{ animationDelay: '0.3s' }} />
            <Sparkles className="absolute bottom-1/3 left-1/3 text-red-300 animate-ping" style={{ animationDelay: '0.5s' }} />
          </div>
        </Card>
        
        <CardContent className="flex flex-col items-center justify-center gap-4 sm:gap-6 text-center p-4 sm:p-6 lg:p-8 order-1 lg:order-2 animate-slide-in-left relative z-10">
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-tighter text-orange-600 leading-tight">
              <span className="gradient-text animate-shimmer-text">
                Order takeaway even faster
              </span>
            </h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed">
              Download MERNeats for faster ordering and personalised recommendations
            </p>
            
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-gray-600 group hover:text-orange-600 transition-colors duration-300">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 animate-pulse group-hover:scale-150 transition-transform duration-300"></div>
                <span>Exclusive app-only offers</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-gray-600 group hover:text-orange-600 transition-colors duration-300">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 animate-pulse group-hover:scale-150 transition-transform duration-300" style={{ animationDelay: '0.2s' }}></div>
                <span>Track your order in real-time</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-gray-600 group hover:text-orange-600 transition-colors duration-300">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 animate-pulse group-hover:scale-150 transition-transform duration-300" style={{ animationDelay: '0.4s' }}></div>
                <span>Save your favorite restaurants</span>
              </div>
            </div>
            
            <Button className="btn-interactive bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 w-full max-w-xs sm:max-w-sm animate-glow-pulse group">
              <span className="flex items-center gap-2">
                Download App
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </div>
          
          <div className="relative">
            <img
              src={appDownloadImgSrc}
              alt="App download illustration"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg shadow mt-4 sm:mt-6 animate-float hover:scale-110 transition-transform duration-500"
              onError={() => setAppDownloadImgSrc(appDownloadImage)}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 40vw"
            />
            
            {/* Enhanced floating download indicator */}
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full p-2 animate-bounce group-hover:scale-110 transition-transform duration-300">
              <ArrowRight className="w-4 h-4" />
            </div>
            
            {/* Floating particles around the image */}
            <div className="absolute -top-4 -left-4 w-2 h-2 bg-orange-300 rounded-full animate-ping opacity-60"></div>
            <div className="absolute -bottom-4 -right-4 w-2 h-2 bg-red-300 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.3s' }}></div>
            <div className="absolute top-1/2 -right-6 w-1 h-1 bg-yellow-300 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </CardContent>
      </div>
      </div>
    </InteractiveCursor>
  );
};

export default HomePage;
