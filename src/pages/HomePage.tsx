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
import { Star, Clock, MapPin, Users, Award, Truck, ArrowRight, Sparkles, Heart, Zap } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCuisine, setHoveredCuisine] = useState<string | null>(null);
  const [hoveredRestaurant, setHoveredRestaurant] = useState<number | null>(null);
  const [progressValue, setProgressValue] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);
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

    return () => {
      clearTimeout(timer);
      clearInterval(sparkleTimer);
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

  // Featured restaurants
  const featuredRestaurants = [
    {
      name: "Spice Garden",
      cuisine: "Indian",
      rating: 4.5,
      deliveryTime: "25-35 min",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop"
    },
    {
      name: "Pizza Palace",
      cuisine: "Italian",
      rating: 4.3,
      deliveryTime: "20-30 min",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"
    },
    {
      name: "Golden Dragon",
      cuisine: "Chinese",
      rating: 4.7,
      deliveryTime: "30-40 min",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop"
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
      {/* Enhanced Hero Section */}
      <div className="relative animate-fade-in">
        <Hero />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl stagger-children">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight animate-bounce-in">
              Delicious Food Delivered
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-4 sm:mb-5 md:mb-6 px-2 sm:px-4 animate-slide-in-up">
              Order from your favorite restaurants with just a few clicks
            </p>
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 animate-scale-in hover:scale-105 transition-all duration-300 animate-pulse-glow"
              onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Order Now
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Search Section */}
      <Card id="search-section" className="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-28 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl shadow-2xl py-6 sm:py-8 md:py-10 lg:py-12 flex flex-col text-center gap-4 sm:gap-6 -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-12 xl:-mt-16 animate-slide-in-up hover-lift">
        <div className="space-y-3 sm:space-y-4 stagger-children">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-orange-600 leading-tight">
            Tuck into a takeaway today
          </h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 my-3 sm:my-4">
            <Badge className="text-xs sm:text-sm md:text-base bg-orange-100 text-orange-800 border-orange-200 px-2 sm:px-3 py-1 hover:scale-105 transition-transform duration-300">
              <Truck className="w-3 h-3 sm:w-4 sm:h-4 mr-1 animate-float" />
              <span className="hidden sm:inline">Fast Delivery</span>
              <span className="sm:hidden">Fast</span>
            </Badge>
            <Badge variant="secondary" className="text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1 hover:scale-105 transition-transform duration-300">
              <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1 animate-float" />
              <span className="hidden sm:inline">Best Restaurants</span>
              <span className="sm:hidden">Best</span>
            </Badge>
            <Badge variant="outline" className="text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1 hover:scale-105 transition-transform duration-300">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 animate-float" />
              <span className="hidden sm:inline">Easy Payments</span>
              <span className="sm:hidden">Easy</span>
            </Badge>
          </div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700">Food is just a click away</p>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 px-2">
            Search Bareilly or Manchester to get results
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto animate-scale-in">
          <SearchBar
            placeholder="Search by city or town"
            onSubmit={handleSearchSubmit}
          />
          <Progress value={80} className="w-full" />
          <p className="text-xs text-gray-500">80% of orders delivered within 30 minutes</p>
        </div>
      </Card>

      {/* Enhanced Popular Cuisines Section */}
      <Card className="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-28 bg-white rounded-xl shadow-lg py-6 sm:py-8 px-4 sm:px-6 animate-slide-in-up hover-lift">
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-orange-600 mb-2">Popular Cuisines</h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">Explore our most loved cuisines</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 stagger-children">
          {popularCuisines.map((cuisine, index) => (
            <Card
              key={cuisine.name}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-orange-300 animate-bounce-in hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleCuisineClick(cuisine.name)}
            >
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2 animate-float">{cuisine.icon}</div>
                <p className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base">{cuisine.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>

      {/* Featured Restaurants Section */}
      <Card className="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-28 bg-white rounded-xl shadow-lg py-6 sm:py-8 px-4 sm:px-6 animate-slide-in-up hover-lift">
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-orange-600 mb-2">Featured Restaurants</h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">Discover top-rated restaurants in your area</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 stagger-children">
          {featuredRestaurants.map((restaurant, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-32 sm:h-40 md:h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <Badge className="absolute top-2 right-2 bg-orange-500 text-white text-xs sm:text-sm animate-pulse-glow">
                  {restaurant.cuisine}
                </Badge>
              </div>
              <CardContent className="p-3 sm:p-4">
                <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">{restaurant.name}</h3>
                <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  {renderStars(restaurant.rating)}
                  <span className="text-xs sm:text-sm text-gray-600">({restaurant.rating})</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>

      {/* Testimonials Section */}
      <Card className="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-28 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl shadow-lg py-6 sm:py-8 px-4 sm:px-6 animate-slide-in-up hover-lift">
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-orange-600 mb-2">What Our Customers Say</h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">Real reviews from satisfied customers</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 stagger-children">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white p-4 sm:p-6 text-center animate-bounce-in hover-lift" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="flex justify-center mb-3 sm:mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-3 sm:mb-4 italic leading-relaxed">"{testimonial.text}"</p>
              <p className="font-semibold text-orange-600 text-xs sm:text-sm md:text-base">{testimonial.name}</p>
            </Card>
          ))}
        </div>
      </Card>

      <Separator className="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-28 animate-fade-in" />

      {/* Enhanced App Download Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-28 animate-slide-in-up">
        <Card className="flex items-center justify-center p-0 overflow-hidden min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px] rounded-xl order-2 lg:order-1 animate-scale-in hover-lift">
          <img
            src={landingImgSrc}
            alt="Landing visual"
            onError={() => setLandingImgSrc(landingImage)}
            className="object-cover w-full h-full rounded-xl transition-transform duration-300 hover:scale-105"
          />
        </Card>
        <CardContent className="flex flex-col items-center justify-center gap-4 sm:gap-6 text-center p-4 sm:p-6 lg:p-8 order-1 lg:order-2 animate-slide-in-left">
          <div className="space-y-3 sm:space-y-4 stagger-children">
            <h3 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-tighter text-orange-600 leading-tight">
              Order takeaway even faster
            </h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed">
              Download MERNeats for faster ordering and personalised recommendations
            </p>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 animate-pulse"></div>
                <span>Exclusive app-only offers</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 animate-pulse"></div>
                <span>Track your order in real-time</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 animate-pulse"></div>
                <span>Save your favorite restaurants</span>
              </div>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 w-full max-w-xs sm:max-w-sm animate-pulse-glow">
              Download App
            </Button>
          </div>
          <img
            src={appDownloadImgSrc}
            alt="App download illustration"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg shadow mt-4 sm:mt-6 animate-float"
            onError={() => setAppDownloadImgSrc(appDownloadImage)}
          />
        </CardContent>
      </div>
    </div>
  );
};

export default HomePage;
