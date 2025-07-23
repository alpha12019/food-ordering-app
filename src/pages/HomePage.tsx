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
    <div className="flex flex-col gap-12">
      <Hero />
      <Card className="md:mx-28 md:px-16 bg-white rounded-lg shadow-2xl py-8 flex flex-col text-center gap-5 -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takeaway today
        </h1>
        <div className="flex flex-wrap justify-center gap-2 my-2">
          <Badge>Fast Delivery</Badge>
          <Badge variant="secondary">Best Restaurants</Badge>
          <Badge variant="outline">Easy Payments</Badge>
        </div>
        <span className="text-xl">Food is just a click away</span>
        <span className="text-sm">
          Search Bareilly or Manchester to get results
        </span>
        <div className="flex flex-col items-center gap-4">
          <SearchBar
            placeholder="Search by city or town"
            onSubmit={handleSearchSubmit}
          />
          <Progress value={80} className="w-1/2 mx-auto" />
        </div>
      </Card>
      <Separator />
      <div className="grid md:grid-cols-2 gap-5">
        <Card className="flex items-center justify-center p-0 overflow-hidden">
          <img
            src={landingImgSrc}
            alt="Landing visual"
            onError={() => setLandingImgSrc(landingImage)}
            className="object-cover w-full h-full max-h-[350px]"
          />
        </Card>
        <CardContent className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster
          </span>
          <span>
            Download MERNeats for faster ordering and personalised
            recommendations
          </span>
          <Button className="bg-orange-500 text-white text-lg px-8 py-4 rounded-lg shadow-lg hover:bg-orange-600 transition">
            Download App
          </Button>
          <img
            src={appDownloadImgSrc}
            alt="App download illustration"
            className="sm:w-[50vw] md:w-[30vw] mt-4 rounded-lg shadow"
            onError={() => setAppDownloadImgSrc(appDownloadImage)}
          />
        </CardContent>
      </div>
    </div>
  );
};

export default HomePage;
