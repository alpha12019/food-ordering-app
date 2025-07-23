import { useSearchRestaurant } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import SortOptionsDropdown from "@/components/SortOptionsDropdown";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";


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
  const { results, isLoading } = useSearchRestaurant(searchState, city);
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
    return <span>Loading(it may take some time as it is deployed on render)</span>
  }
  if (!results?.data || !city) {
    return <span>no results found</span>
  }

  return <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
    <div id="cuisinesList">
      <CuisineFilter selectedCuisines={searchState.selectedCuisines} onChange={SetSelectedCuisines} isExpanded={isExpanded}></CuisineFilter>
      <Button variant="link" onClick={handleIsExpanded} className="mt-4 flex-1">
        {isExpanded ? (<span className="flex flex-row items-center">View Less<ChevronUp></ChevronUp></span>) : <span className="flex flex-row items-center">View More<ChevronDown></ChevronDown></span>}
      </Button>
    </div>
    <div id="main content" className="flex flex-col gap-5">
      <SearchBar searchQuery={searchState.searchQuery} onSubmit={setSearchQuery} placeholder="search by cuisine or restaurant name" onReset={resetSearch}></SearchBar>
      <div className="flex justify-between flex-col gap-3 lg:flex-row">
        <SearchResultsInfo total={results.pagination.total} city={city}></SearchResultsInfo>
        <SortOptionsDropdown onChange={(value) => setSortOptions(value)} sortOption={searchState.sortOption}></SortOptionsDropdown>
      </div>
      {results.data.map((restaurant) => (
        <SearchResultCard restaurant={restaurant} ></SearchResultCard>
      ))}
      <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage}></PaginationSelector>
    </div>
  </div>
}

export default SearchPage;

