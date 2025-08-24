import { useSearchRestaurant } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import SortOptionsDropdown from "@/components/SortOptionsDropdown";
import AdvertisementBanner from "@/components/AdvertisementBanner";
import RestaurantAdvertisement from "@/components/RestaurantAdvertisement";
import SpecialOffersSection from "@/components/SpecialOffersSection";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Clock, X, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
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
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  
  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const { results, isLoading, error } = useSearchRestaurant(searchState, city);
  
  // Add search to history
  const addToSearchHistory = (query: string) => {
    if (query.trim()) {
      setSearchHistory(prev => {
        const filtered = prev.filter(item => item !== query);
        return [query, ...filtered].slice(0, 5); // Keep only last 5 searches
      });
    }
  };

  // Remove search from history
  const removeFromSearchHistory = (query: string) => {
    setSearchHistory(prev => prev.filter(item => item !== query));
  };

  // Clear all search history
  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  // Show loading state while fetching results
  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingSpinner text="Searching restaurants..." />
      </div>
    );
  }

  // Show error state if there's an error
  if (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return (
      <ErrorDisplay 
        error={errorMessage} 
        title="Search Error" 
        message="We couldn't search for restaurants. Please try again." 
        showRetry={true}
        onRetry={() => window.location.reload()}
      />
    );
  }

  // Show error if no city is provided
  if (!city) {
    return (
      <ErrorDisplay 
        error={null} 
        title="Invalid Search" 
        message="Please provide a valid city to search for restaurants." 
        showHome={true}
      />
    );
  }

  // Show no results found if no restaurants are found
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
    // Add to search history
    addToSearchHistory(searchFormData.searchQuery);
  }
  const resetSearch = () => {
    setSearchState((previousState) => ({
      ...previousState,
      searchQuery: "",
      page: 1
    }))
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
        
        {/* Search History Section */}
        {searchHistory.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Clock className="w-4 h-4" />
                Recent Searches
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearchHistory}
                className="text-xs text-gray-500 hover:text-red-500 hover:bg-red-50"
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((query, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white px-3 py-2 rounded-full border border-gray-200 hover:border-orange-300 transition-colors duration-200"
                >
                  <button
                    onClick={() => {
                      setSearchState(prev => ({
                        ...prev,
                        searchQuery: query,
                        page: 1
                      }));
                      addToSearchHistory(query);
                    }}
                    className="text-sm text-gray-700 hover:text-orange-600 transition-colors duration-200"
                  >
                    {query}
                  </button>
                  <button
                    onClick={() => removeFromSearchHistory(query)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Special Offers Section - Top of search results */}
        <SpecialOffersSection />
        
        {/* Quick Filter Bar */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm font-medium text-gray-700">Quick Filters:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Pizza', 'Indian', 'Chinese', 'Burgers', 'Sushi', 'Mexican', 'Italian', 'Thai'].map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => {
                  const isSelected = searchState.selectedCuisines.includes(cuisine);
                  if (isSelected) {
                    SetSelectedCuisines(searchState.selectedCuisines.filter(c => c !== cuisine));
                  } else {
                    SetSelectedCuisines([...searchState.selectedCuisines, cuisine]);
                  }
                }}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  searchState.selectedCuisines.includes(cuisine)
                    ? 'bg-orange-500 text-white shadow-md hover:bg-orange-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultsInfo total={results.pagination.total} city={city}></SearchResultsInfo>
          <SortOptionsDropdown onChange={(value) => setSortOptions(value)} sortOption={searchState.sortOption}></SortOptionsDropdown>
        </div>
        
        {/* Active Filters Summary */}
        {(searchState.searchQuery || searchState.selectedCuisines.length > 0) && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-orange-800">Active Filters:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchState(prev => ({
                    ...prev,
                    searchQuery: "",
                    selectedCuisines: [],
                    page: 1
                  }));
                }}
                className="text-xs text-orange-600 hover:text-orange-700 hover:bg-orange-100"
              >
                Clear All Filters
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchState.searchQuery && (
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  Search: "{searchState.searchQuery}"
                </span>
              )}
              {searchState.selectedCuisines.map((cuisine) => (
                <span
                  key={cuisine}
                  className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                >
                  {cuisine}
                  <button
                    onClick={() => SetSelectedCuisines(searchState.selectedCuisines.filter(c => c !== cuisine))}
                    className="text-orange-600 hover:text-orange-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="space-y-3 sm:space-y-4">
          {results.data.map((restaurant, index) => (
            <div key={restaurant._id || index}>
              <SearchResultCard restaurant={restaurant} />
              
              {/* Restaurant-specific advertisements after every 3rd restaurant */}
              {(index + 1) % 3 === 0 && (
                <div className="my-6">
                  <RestaurantAdvertisement 
                    restaurant={restaurant} 
                    index={index} 
                  />
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

