import { useState } from "react";
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
import { Star, Clock, MapPin, Users, Award, Truck } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-16">
      {/* Enhanced Hero Section */}
      <div className="relative">
        <Hero />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Delicious Food Delivered
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6">
              Order from your favorite restaurants with just a few clicks
            </p>
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-3"
              onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Order Now
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Search Section */}
      <Card id="search-section" className="mx-2 sm:mx-6 md:mx-16 lg:mx-28 md:px-8 lg:px-16 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl shadow-2xl py-8 sm:py-10 md:py-12 flex flex-col text-center gap-6 -mt-8 sm:-mt-12 md:-mt-16">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-orange-600">
            Tuck into a takeaway today
          </h2>
          <div className="flex flex-wrap justify-center gap-3 my-4">
            <Badge className="text-sm md:text-base bg-orange-100 text-orange-800 border-orange-200">
              <Truck className="w-4 h-4 mr-1" />
              Fast Delivery
            </Badge>
            <Badge variant="secondary" className="text-sm md:text-base">
              <Award className="w-4 h-4 mr-1" />
              Best Restaurants
            </Badge>
            <Badge variant="outline" className="text-sm md:text-base">
              <Users className="w-4 h-4 mr-1" />
              Easy Payments
            </Badge>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700">Food is just a click away</p>
          <p className="text-sm sm:text-base text-gray-600">
            Search Bareilly or Manchester to get results
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto">
          <SearchBar
            placeholder="Search by city or town"
            onSubmit={handleSearchSubmit}
          />
          <Progress value={80} className="w-full" />
          <p className="text-xs text-gray-500">80% of orders delivered within 30 minutes</p>
        </div>
      </Card>

      {/* Enhanced Popular Cuisines Section */}
      <Card className="mx-2 sm:mx-6 md:mx-16 lg:mx-28 bg-white rounded-xl shadow-lg py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-600 mb-2">Popular Cuisines</h2>
          <p className="text-gray-600">Explore our most loved cuisines</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {popularCuisines.map((cuisine) => (
            <Card
              key={cuisine.name}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-orange-300"
              onClick={() => handleCuisineClick(cuisine.name)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">{cuisine.icon}</div>
                <p className="font-semibold text-gray-800">{cuisine.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>

      {/* Featured Restaurants Section */}
      <Card className="mx-2 sm:mx-6 md:mx-16 lg:mx-28 bg-white rounded-xl shadow-lg py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-600 mb-2">Featured Restaurants</h2>
          <p className="text-gray-600">Discover top-rated restaurants in your area</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredRestaurants.map((restaurant, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-orange-500 text-white">
                  {restaurant.cuisine}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{restaurant.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  {renderStars(restaurant.rating)}
                  <span className="text-sm text-gray-600">({restaurant.rating})</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>

      {/* Testimonials Section */}
      <Card className="mx-2 sm:mx-6 md:mx-16 lg:mx-28 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl shadow-lg py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-600 mb-2">What Our Customers Say</h2>
          <p className="text-gray-600">Real reviews from satisfied customers</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white p-6 text-center">
              <div className="flex justify-center mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <p className="font-semibold text-orange-600">{testimonial.name}</p>
            </Card>
          ))}
        </div>
      </Card>

      <Separator className="mx-2 sm:mx-6 md:mx-16 lg:mx-28" />

      {/* Enhanced App Download Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2 sm:px-4 md:px-0 mx-2 sm:mx-6 md:mx-16 lg:mx-28">
        <Card className="flex items-center justify-center p-0 overflow-hidden min-h-[300px] rounded-xl">
          <img
            src={landingImgSrc}
            alt="Landing visual"
            onError={() => setLandingImgSrc(landingImage)}
            className="object-cover w-full h-full rounded-xl"
          />
        </Card>
        <CardContent className="flex flex-col items-center justify-center gap-6 text-center p-8">
          <div className="space-y-4">
            <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl tracking-tighter text-orange-600">
              Order takeaway even faster
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Download MERNeats for faster ordering and personalised recommendations
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Exclusive app-only offers</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Track your order in real-time</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Save your favorite restaurants</span>
              </div>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-4 rounded-lg shadow-lg transition w-full max-w-sm">
              Download App
            </Button>
          </div>
          <img
            src={appDownloadImgSrc}
            alt="App download illustration"
            className="w-full max-w-sm rounded-lg shadow"
            onError={() => setAppDownloadImgSrc(appDownloadImage)}
          />
        </CardContent>
      </div>
    </div>
  );
};

export default HomePage;
