import { useState } from "react";
import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <Hero />
      <Card className="mx-2 md:mx-28 md:px-16 bg-white rounded-lg shadow-2xl py-6 md:py-8 flex flex-col text-center gap-4 md:gap-5 -mt-10 md:-mt-16">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takeaway today
        </h1>
        <div className="flex flex-wrap justify-center gap-2 my-2">
          <Badge>Fast Delivery</Badge>
          <Badge variant="secondary">Best Restaurants</Badge>
          <Badge variant="outline">Easy Payments</Badge>
        </div>
        <span className="text-lg md:text-xl">Food is just a click away</span>
        <span className="text-xs md:text-sm">
          Search Bareilly or Manchester to get results
        </span>
        <div className="flex flex-col items-center gap-3 md:gap-4 w-full">
          <SearchBar
            placeholder="Search by city or town"
            onSubmit={handleSearchSubmit}
          />
          <Progress value={80} className="w-full max-w-xs md:max-w-md mx-auto" />
        </div>
      </Card>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-2 md:px-0">
        <Card className="flex items-center justify-center p-0 overflow-hidden min-h-[180px] md:min-h-[250px]">
          <img
            src={landingImgSrc}
            alt="Landing visual"
            onError={() => setLandingImgSrc(landingImage)}
            className="object-cover w-full h-full max-h-[200px] md:max-h-[350px] rounded-t-xl md:rounded-xl"
          />
        </Card>
        <CardContent className="flex flex-col items-center justify-center gap-3 md:gap-4 text-center">
          <span className="font-bold text-2xl md:text-3xl tracking-tighter">
            Order takeaway even faster
          </span>
          <span className="text-sm md:text-base">
            Download MERNeats for faster ordering and personalised
            recommendations
          </span>
          <Button className="bg-orange-500 text-white text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-lg shadow-lg hover:bg-orange-600 transition w-full max-w-xs">
            Download App
          </Button>
          <img
            src={appDownloadImgSrc}
            alt="App download illustration"
            className="w-full sm:w-[70vw] md:w-[30vw] mt-2 md:mt-4 rounded-lg shadow"
            onError={() => setAppDownloadImgSrc(appDownloadImage)}
          />
        </CardContent>
      </div>
    </div>
  );
};

export default HomePage;
