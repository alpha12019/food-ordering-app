import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;

export const useGetrestaurant=(restaurantId?:string)=>{
    const getRestaurnatByIdRequest=async():Promise<Restaurant>=>{
        const response=await fetch(`${API_BASE_URL}/api/restaurants/${restaurantId}`);
        if(!response.ok){
            throw new Error("failed to get restaurant");
        }
        return response.json();
    }
    const {data:restaurant,isLoading}=useQuery("fetchRestaurant",getRestaurnatByIdRequest,{enabled: !!restaurantId});
    return {restaurant,isLoading};
}

export const useSearchRestaurant=(searchState:SearchState,city?:string)=>{
    const params=new URLSearchParams();
    params.set("searchQuery",searchState.searchQuery);
    params.set("page",searchState.page.toString());
    params.set("selectedCuisines",searchState.selectedCuisines.join(","));
    params.set("sortOption",searchState.sortOption);
    const createSearchRequest=async():Promise<RestaurantSearchResponse>=>{
        const response=await fetch(`${API_BASE_URL}/api/restaurants/search/${city}?${params.toString()}`);
        if(!response.ok){
            throw new Error("failed to search restaurant");
        }
        return response.json();
    }
    const {data:results,isLoading}=useQuery(["searchRestaurants",searchState],createSearchRequest,{enabled:!!city});
    return {results,isLoading}
}
