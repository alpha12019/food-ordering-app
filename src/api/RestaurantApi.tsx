import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const useGetrestaurant = (restaurantId?: string) => {
    const getRestaurnatByIdRequest=async():Promise<Restaurant>=>{
        // For development, return mock data if API is not available
        if (!import.meta.env.VITE_API_BASE_URL) {
            console.warn("API_BASE_URL not configured. Using mock data for development.");
            return {
                _id: restaurantId || "mock-id",
                user: "mock-user",
                restaurantName: "Mock Restaurant",
                city: "Mock City",
                country: "Mock Country",
                deliveryPrice: 500,
                estimatedDeliveryTime: 30,
                cuisines: ["Mock Cuisine"],
                menuItems: [],
                imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
                lastUpdated: new Date().toISOString()
            } as Restaurant;
        }
        
        const response=await fetch(`${API_BASE_URL}/api/restaurants/${restaurantId}`);
        if(!response.ok){
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to get restaurant: ${response.status}`);
        }
        return response.json();
    }
    const {data:restaurant,isLoading,error}=useQuery(
        ["fetchRestaurant", restaurantId], 
        getRestaurnatByIdRequest,
        {
            enabled: !!restaurantId,
            retry: (failureCount, error) => {
                // Don't retry on 404 errors
                if (error && typeof error === 'object' && 'message' in error) {
                    const message = (error as Error).message;
                    if (message.includes('404') || message.includes('not found')) {
                        return false;
                    }
                }
                return failureCount < 2;
            }
        }
    );
    return {restaurant,isLoading,error};
}

export const useSearchRestaurant = (searchState: SearchState, city?: string) => {
    const params=new URLSearchParams();
    params.set("searchQuery",searchState.searchQuery);
    params.set("page",searchState.page.toString());
    params.set("selectedCuisines",searchState.selectedCuisines.join(","));
    params.set("sortOption",searchState.sortOption);
    const createSearchRequest=async():Promise<RestaurantSearchResponse>=>{
        // For development, return mock data if API is not available
        if (!import.meta.env.VITE_API_BASE_URL) {
            console.warn("API_BASE_URL not configured. Using mock data for development.");
            return {
                data: [
                    {
                        _id: "mock-1",
                        user: "mock-user-1",
                        restaurantName: "Spice Garden",
                        city: city || "Mock City",
                        country: "Mock Country",
                        deliveryPrice: 500,
                        estimatedDeliveryTime: 30,
                        cuisines: ["Indian", "Asian"],
                        menuItems: [],
                        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
                        lastUpdated: new Date().toISOString()
                    },
                    {
                        _id: "mock-2",
                        user: "mock-user-2",
                        restaurantName: "Pizza Palace",
                        city: city || "Mock City",
                        country: "Mock Country",
                        deliveryPrice: 400,
                        estimatedDeliveryTime: 25,
                        cuisines: ["Italian", "Pizza"],
                        menuItems: [],
                        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
                        lastUpdated: new Date().toISOString()
                    }
                ],
                pagination: {
                    total: 2,
                    page: 1,
                    pages: 1
                }
            } as RestaurantSearchResponse;
        }
        
        const response=await fetch(`${API_BASE_URL}/api/restaurants/search/${city}?${params.toString()}`);
        if(!response.ok){
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to search restaurants: ${response.status}`);
        }
        return response.json();
    }
    const {data:results,isLoading,error}=useQuery(
        ["searchRestaurants",searchState,city], 
        createSearchRequest,
        {
            enabled:!!city,
            retry: (failureCount, error) => {
                // Don't retry on 4xx errors
                if (error && typeof error === 'object' && 'message' in error) {
                    const message = (error as Error).message;
                    if (message.includes('400') || message.includes('404')) {
                        return false;
                    }
                }
                return failureCount < 2;
            }
        }
    );
    return {results,isLoading,error}
}
