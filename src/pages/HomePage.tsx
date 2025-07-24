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

  // Popular cuisines
  const popularCuisines = [
    "Pizza",
    "Chinese",
    "Indian",
    "Burgers",
    "Desserts",
    "Sushi",
    "Mexican",
    "South Indian",
  ];

  const handleCuisineClick = useCallback(
    (cuisine: string) => {
      navigate(`/search/${encodeURIComponent(cuisine)}`);
    },
    [navigate]
  );

  return (
    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12">
      <Hero />
      <Card className="mx-2 sm:mx-6 md:mx-16 lg:mx-28 md:px-8 lg:px-16 bg-white rounded-lg shadow-2xl py-5 sm:py-6 md:py-8 flex flex-col text-center gap-3 sm:gap-4 md:gap-5 -mt-6 sm:-mt-10 md:-mt-16">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takeaway today
        </h1>
        <div className="flex flex-wrap justify-center gap-2 my-1 sm:my-2">
          <Badge className="text-xs sm:text-sm md:text-base">Fast Delivery</Badge>
          <Badge variant="secondary" className="text-xs sm:text-sm md:text-base">Best Restaurants</Badge>
          <Badge variant="outline" className="text-xs sm:text-sm md:text-base">Easy Payments</Badge>
        </div>
        <span className="text-base sm:text-lg md:text-xl">Food is just a click away</span>
        <span className="text-xs sm:text-sm md:text-base">
          Search Bareilly or Manchester to get results
        </span>
        <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4 w-full">
          <SearchBar
            placeholder="Search by city or town"
            onSubmit={handleSearchSubmit}
          />
          <Progress value={80} className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto" />
        </div>
      </Card>
      {/* Popular Cuisines Section */}
      <Card className="mx-2 sm:mx-6 md:mx-16 lg:mx-28 bg-white rounded-lg shadow-lg py-4 flex flex-col gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-orange-600 text-center mb-2">Popular Cuisines</h2>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {popularCuisines.map((cuisine) => (
            <Badge
              key={cuisine}
              className="cursor-pointer text-base md:text-lg px-4 py-2 hover:bg-orange-500 hover:text-white transition"
              onClick={() => handleCuisineClick(cuisine)}
            >
              {cuisine}
            </Badge>
          ))}
        </div>
      </Card>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 px-2 sm:px-4 md:px-0">
        <Card className="flex items-center justify-center p-0 overflow-hidden min-h-[140px] sm:min-h-[180px] md:min-h-[220px] lg:min-h-[250px]">
          <img
            src={landingImgSrc}
            alt="Landing visual"
            onError={() => setLandingImgSrc(landingImage)}
            className="object-cover w-full h-full max-h-[120px] sm:max-h-[200px] md:max-h-[280px] lg:max-h-[350px] rounded-t-xl md:rounded-xl"
          />
        </Card>
        <CardContent className="flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 text-center">
          <span className="font-bold text-xl sm:text-2xl md:text-3xl tracking-tighter">
            Order takeaway even faster
          </span>
          <span className="text-xs sm:text-sm md:text-base lg:text-lg">
            Download MERNeats for faster ordering and personalised
            recommendations
          </span>
          <Button className="bg-orange-500 text-white text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg shadow-lg hover:bg-orange-600 transition w-full max-w-xs sm:max-w-sm">
            Download App
          </Button>
          <img
            src={appDownloadImgSrc}
            alt="App download illustration"
            className="w-full sm:w-[60vw] md:w-[40vw] lg:w-[30vw] mt-2 sm:mt-3 md:mt-4 rounded-lg shadow"
            onError={() => setAppDownloadImgSrc(appDownloadImage)}
          />
        </CardContent>
      </div>
    </div>
  );
};

export default HomePage;
