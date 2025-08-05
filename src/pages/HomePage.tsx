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
import Hero from "@/components/Hero";
import { Star, Clock, MapPin, Users, Award, Truck, ArrowRight, Sparkles, Heart, Zap, ChefHat, Utensils, Coffee } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCuisine, setHoveredCuisine] = useState<string | null>(null);
  const [hoveredRestaurant, setHoveredRestaurant] = useState<number | null>(null);
  const [progressValue, setProgressValue] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
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

    return () => {
      clearTimeout(timer);
      clearInterval(sparkleTimer);
      clearInterval(particleTimer);
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
    <div className={`flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Enhanced Hero Section with Interactive Animations */}
      <div className="relative animate-fade-in overflow-hidden">
        <Hero />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl stagger-children relative">
            {/* Floating particles effect */}
            <div className="particle-container absolute inset-0 pointer-events-none">
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
              <div className="absolute inset-0 pointer-events-none">
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
            
            {/* Morphing decorative elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-orange-400/20 rounded-full animate-morph"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-red-400/20 rounded-full animate-morph" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-yellow-400/20 rounded-full animate-morph" style={{ animationDelay: '4s' }}></div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight animate-bounce-in-elastic relative">
              <span className="gradient-text animate-shimmer-text">
                Delicious Food Delivered
              </span>
              <div className="absolute -top-2 -right-2 animate-heartbeat">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-4 sm:mb-5 md:mb-6 px-2 sm:px-4 animate-slide-in-up-delayed">
              Order from your favorite restaurants with just a few clicks
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
              <Button 
                size="lg" 
                className="btn-interactive bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 animate-glow-pulse hover:scale-105 transition-all duration-300 shadow-2xl group"
                onClick={scrollToSearch}
              >
                <span className="flex items-center gap-2">
                  Order Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="btn-interactive border-white text-white hover:bg-white hover:text-orange-600 text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 transition-all duration-300 group hover-glow"
                onClick={() => navigate('/search/Manchester')}
              >
                <span className="flex items-center gap-2">
                  Explore Restaurants
                  <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Search Section with Interactive Animations */}
      <Card 
        ref={searchSectionRef}
        id="search-section" 
        className="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-28 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl shadow-2xl py-6 sm:py-8 md:py-10 lg:py-12 flex flex-col text-center gap-4 sm:gap-6 -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-12 xl:-mt-16 animate-slide-in-up hover-lift relative overflow-hidden"
      >
        {/* Background decoration with morphing shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-20 h-20 bg-orange-200 rounded-full animate-morph"></div>
          <div className="absolute bottom-4 right-4 w-16 h-16 bg-red-200 rounded-full animate-morph" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-yellow-200 rounded-full animate-morph" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-orange-300 rounded-full animate-morph" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="space-y-3 sm:space-y-4 stagger-children relative z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-orange-600 leading-tight">
            <span className="gradient-text animate-shimmer-text">
              Tuck into a takeaway today
            </span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 my-3 sm:my-4">
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

      {/* Enhanced Popular Cuisines Section */}
      <Card className="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-28 bg-white rounded-xl shadow-lg py-6 sm:py-8 px-4 sm:px-6 animate-slide-in-up hover-lift">
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-orange-600 mb-2 gradient-text">Popular Cuisines</h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">Explore our most loved cuisines</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 stagger-children">
          {popularCuisines.map((cuisine, index) => (
            <Card
              key={cuisine.name}
              className={`cursor-pointer hover:shadow-lg transition-all duration-300 hover-scale border-2 hover:border-orange-300 animate-bounce-in hover-lift group relative overflow-hidden ${
                hoveredCuisine === cuisine.name ? 'ring-2 ring-orange-400 shadow-xl' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleCuisineClick(cuisine.name)}
              onMouseEnter={() => setHoveredCuisine(cuisine.name)}
              onMouseLeave={() => setHoveredCuisine(null)}
            >
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <CardContent className="p-3 sm:p-4 text-center relative z-10">
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2 animate-float group-hover:scale-125 transition-transform duration-300">
                  {cuisine.icon}
                </div>
                <p className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base group-hover:text-orange-600 transition-colors duration-300">
                  {cuisine.name}
                </p>
                
                {/* Interactive arrow indicator */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-4 h-4 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>

      {/* Featured Restaurants Section */}
      <Card className="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-28 bg-white rounded-xl shadow-lg py-6 sm:py-8 px-4 sm:px-6 animate-slide-in-up hover-lift">
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-orange-600 mb-2 gradient-text">Featured Restaurants</h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">Discover top-rated restaurants in your area</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 stagger-children">
          {featuredRestaurants.map((restaurant, index) => (
            <Card 
              key={index} 
              className={`overflow-hidden hover:shadow-lg transition-all duration-300 hover-lift animate-scale-in group relative ${
                hoveredRestaurant === index ? 'ring-2 ring-orange-400 shadow-xl' : ''
              }`} 
              style={{ animationDelay: `${index * 0.2}s` }}
              onMouseEnter={() => setHoveredRestaurant(index)}
              onMouseLeave={() => setHoveredRestaurant(null)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-32 sm:h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback to a placeholder image if the main image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&q=80`;
                  }}
                />
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <Badge className="absolute top-2 right-2 bg-orange-500 text-white text-xs sm:text-sm animate-pulse-glow group-hover:bg-orange-600 transition-colors duration-300">
                  {restaurant.cuisine}
                </Badge>
                
                {/* Heart icon for favorites */}
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                  <Heart className="w-5 h-5 text-white drop-shadow-lg cursor-pointer hover:text-red-500 transition-colors duration-300" />
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
                
                {/* Interactive order button - Always visible but enhanced on hover */}
                <div className="mt-3 transition-all duration-300 transform group-hover:translate-y-0">
                  <Button 
                    size="sm" 
                    className="btn-interactive w-full bg-orange-500 hover:bg-orange-600 text-white text-xs group-hover:scale-105 transition-all duration-300"
                    onClick={() => navigate(`/detail/mock-${index + 1}`)}
                  >
                    <span className="flex items-center gap-1">
                      Order Now
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>

      {/* Testimonials Section */}
      <Card className="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-28 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl shadow-lg py-6 sm:py-8 px-4 sm:px-6 animate-slide-in-up hover-lift">
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-orange-600 mb-2 gradient-text">What Our Customers Say</h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">Real reviews from satisfied customers</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 stagger-children">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-white p-4 sm:p-6 text-center animate-bounce-in hover-lift group relative overflow-hidden" 
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Background decoration */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              
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
                
                {/* Quote marks decoration */}
                <div className="absolute top-2 left-2 text-4xl text-orange-200 opacity-50 group-hover:opacity-75 transition-opacity duration-300">
                  "
                </div>
                <div className="absolute bottom-2 right-2 text-4xl text-orange-200 opacity-50 group-hover:opacity-75 transition-opacity duration-300">
                  "
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Separator className="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-28 animate-fade-in" />

      {/* Enhanced App Download Section with Interactive Animations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-28 animate-slide-in-up">
        <Card className="flex items-center justify-center p-0 overflow-hidden min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px] rounded-xl order-2 lg:order-1 animate-scale-in hover-lift group relative">
          <img
            src={landingImgSrc}
            alt="Landing visual"
            onError={() => setLandingImgSrc(landingImage)}
            className="object-cover w-full h-full rounded-xl transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay with interactive elements */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <div className="text-white text-center">
              <p className="text-sm font-semibold mb-2">Interactive Preview</p>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </Card>
        
        <CardContent className="flex flex-col items-center justify-center gap-4 sm:gap-6 text-center p-4 sm:p-6 lg:p-8 order-1 lg:order-2 animate-slide-in-left">
          <div className="space-y-3 sm:space-y-4 stagger-children">
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
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg shadow mt-4 sm:mt-6 animate-float hover:scale-105 transition-transform duration-300"
              onError={() => setAppDownloadImgSrc(appDownloadImage)}
            />
            
            {/* Floating download indicator */}
            <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full p-2 animate-bounce">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default HomePage;
