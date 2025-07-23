import { useState } from "react";
import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

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
      <div className="md:mx-28 md:px-16 bg-white rounded-lg shadow-2xl py-8 flex flex-col text-center gap-5 -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takeaway today
        </h1>
        <span className="text-xl">Food is just a click away</span>
        <span className="text-sm">
          Search Bareilly or Manchester to get results
        </span>
        <SearchBar
          placeholder="Search by city or town"
          onSubmit={handleSearchSubmit}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <img
          src={landingImgSrc}
          alt="Landing visual"
          onError={() => setLandingImgSrc(landingImage)}
        />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster
          </span>
          <span>
            Download MERNeats for faster ordering and personalised
            recommendations
          </span>
          <img
            src={appDownloadImgSrc}
            alt="App download illustration"
            className="sm:w-[50vw] md:w-[30vw]"
            onError={() => setAppDownloadImgSrc(appDownloadImage)}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
