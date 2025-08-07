import { useSearchRestaurant } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import SortOptionsDropdown from "@/components/SortOptionsDropdown";
import AdvertisementBanner from "@/components/AdvertisementBanner";
import SpecialOffersSection from "@/components/SpecialOffersSection";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay";
import NoResultsFound from "@/components/NoResultsFound";


export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
}

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  })
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { results, isLoading, error } = useSearchRestaurant(searchState, city);
  const handleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  }

  const setSortOptions = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState, sortOption, page: 1,
    }))
  }

  const SetSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevstate) => ({
      ...prevstate, selectedCuisines, page: 1
    }))
  }
  const setPage = (page: number) => {
    setSearchState((previousState) => ({
      ...previousState, page
    }))
  }
  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((previousState) => ({
      ...previousState,
      searchQuery: searchFormData.searchQuery,
      page: 1
    }))
  }
  const resetSearch = () => {
    setSearchState((previousState) => ({
      ...previousState,
      searchQuery: "",
      page: 1
    }))
  }
  if (isLoading) {
    return <LoadingSpinner fullScreen text="Searching restaurants..." />
  }

  if (error) {
    return <ErrorDisplay error={error} title="Search Error" message="We couldn't search for restaurants. Please try again. " />
  }

  if (!city) {
    return <ErrorDisplay title="Invalid Search" message="Please provide a valid city to search for restaurants." />
  }

  if (!results?.data || results.data.length === 0) {
    return (
      <NoResultsFound 
        searchQuery={searchState.searchQuery}
        city={city}
        onClearFilters={() => {
          setSearchState(prev => ({
            ...prev,
            searchQuery: "",
            selectedCuisines: [],
            page: 1
          }));
        }}
        onTryDifferentSearch={() => {
          setSearchState(prev => ({
            ...prev,
            searchQuery: "",
            page: 1
          }));
        }}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-4 sm:gap-5 lg:gap-6">
      <div id="cuisinesList" className="order-2 lg:order-1">
        <CuisineFilter selectedCuisines={searchState.selectedCuisines} onChange={SetSelectedCuisines} isExpanded={isExpanded}></CuisineFilter>
        <Button variant="link" onClick={handleIsExpanded} className="mt-3 sm:mt-4 flex-1 text-sm sm:text-base">
          {isExpanded ? (
            <span className="flex flex-row items-center gap-1">
              View Less
              <ChevronUp className="w-4 h-4" />
            </span>
          ) : (
            <span className="flex flex-row items-center gap-1">
              View More
              <ChevronDown className="w-4 h-4" />
            </span>
          )}
        </Button>
      </div>
      <div id="main content" className="flex flex-col gap-4 sm:gap-5 order-1 lg:order-2">
        <SearchBar searchQuery={searchState.searchQuery} onSubmit={setSearchQuery} placeholder="search by cuisine or restaurant name" onReset={resetSearch}></SearchBar>
        
        {/* Special Offers Section - Top of search results */}
        <SpecialOffersSection />
        
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultsInfo total={results.pagination.total} city={city}></SearchResultsInfo>
          <SortOptionsDropdown onChange={(value) => setSortOptions(value)} sortOption={searchState.sortOption}></SortOptionsDropdown>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          {results.data.map((restaurant, index) => (
            <div key={restaurant._id || index}>
              <SearchResultCard restaurant={restaurant} />
              
              {/* Advertisement banners after every 3rd restaurant */}
              {(index + 1) % 3 === 0 && (
                <div className="my-6">
                  {index % 6 === 2 ? (
                    <AdvertisementBanner
                      type="promo"
                      title="🎉 Special Restaurant Deals"
                      description="Discover exclusive offers from top-rated restaurants in your area. Limited time offers with amazing discounts!"
                      ctaText="View All Deals"
                      badgeText="Limited Time"
                      gradient="from-purple-500 to-pink-500"
                      delay={200}
                    />
                  ) : (
                    <AdvertisementBanner
                      type="offer"
                      title="🚚 Free Delivery Available"
                      description="Order from premium restaurants and get free delivery on orders above ₹300. Fast and reliable service!"
                      ctaText="Order Now"
                      badgeText="Free Delivery"
                      gradient="from-green-500 to-blue-500"
                      delay={200}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Bottom advertisement before pagination */}
        <div className="my-6">
          <AdvertisementBanner
            type="feature"
            title="⭐ Premium Restaurant Experience"
            description="Explore our curated selection of premium restaurants with exceptional food quality and service. Perfect for special occasions!"
            ctaText="Explore Premium"
            badgeText="Premium"
            gradient="from-orange-500 to-red-500"
            delay={100}
          />
        </div>
        
        <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage}></PaginationSelector>
      </div>
    </div>
  )
}

export default SearchPage;

