import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Orders, Restaurant } from "@/types";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";


export const useUpdateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();
    const updateMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        // For development, simulate success if API is not available
        if (!import.meta.env.VITE_API_BASE_URL) {
            console.warn("API_BASE_URL not configured. Simulating restaurant update for development.");
            return {
                _id: "mock-restaurant-id",
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
        
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData,
        })
        if (!response.ok) {
            throw new Error("failed to update restaurant");
        }
        return response.json();
    }
    const { mutate: updateRestaurant, isLoading, isSuccess, error } = useMutation(updateMyRestaurantRequest);
    if (isSuccess) {
        toast.success("Restaurant updated");
    }
    if (error) {
        toast.error("Unable to update restaurant");
    }
    return { updateRestaurant, isLoading }
}

export const useCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();
    const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        // For development, simulate success if API is not available
        if (!import.meta.env.VITE_API_BASE_URL) {
            console.warn("API_BASE_URL not configured. Simulating restaurant creation for development.");
            return {
                _id: "mock-restaurant-id",
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
        
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData,
        })
        if (!response.ok) {
            throw new Error("failed to create restaurant");
        }
        return response.json();
    }
    const { mutate: createRestaurant, isLoading, isSuccess, error } = useMutation(createMyRestaurantRequest);
    if (isSuccess) {
        toast.success("Restaurant Created");
    }
    if (error) {
        toast.error("Unable to create restaurant");
    }
    return { createRestaurant, isLoading }
}

export const useGetMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();
    const getMyRestaurantrequest = async (): Promise<Restaurant> => {
        // For development, return mock data if API is not available
        if (!import.meta.env.VITE_API_BASE_URL) {
            console.warn("API_BASE_URL not configured. Using mock restaurant data for development.");
            return {
                _id: "mock-restaurant-id",
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
        
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        if (!response.ok) {
            throw new Error("failed to get restaurant");
        }
        return response.json();
    }
    const { data: currentRestaurant, isLoading, error } = useQuery("fetchCurrentRestaurant", getMyRestaurantrequest);
    if (error) {
        toast.error(error.toString());
    }
    return { currentRestaurant, isLoading }
}


export const useGetMyRestaurantOrder = () => {
    const {getAccessTokenSilently}=useAuth0();
    const getMyOrder=async():Promise<Orders[]>=>{
        // For development, return mock data if API is not available
        if (!import.meta.env.VITE_API_BASE_URL) {
            console.warn("API_BASE_URL not configured. Using mock order data for development.");
            return [];
        }
        
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        if (!response.ok) {
            throw new Error("failed to get restaurant");
        }

        return response.json();
    }
    const { data: orders, isLoading, error } = useQuery("fetchCurrentRestaurantOrder", getMyOrder);
    if (error) {
        toast.error(error.toString());
    }
    return { orders, isLoading }
}

type UpdateOrderStatusRequest={
    orderId:string;
    status:string;
}

export const useUpdateMyRestaurantOrder = () => {
    const { getAccessTokenSilently } = useAuth0();
    const updatemyRestaurantOrder = async (updateStatusOrderRequest:UpdateOrderStatusRequest)=> {
        // For development, simulate success if API is not available
        if (!import.meta.env.VITE_API_BASE_URL) {
            console.warn("API_BASE_URL not configured. Simulating order status update for development.");
            return { success: true };
        }
        
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type":"application/json",
            },
            body: JSON.stringify({status:updateStatusOrderRequest.status}),
        })
        if (!response.ok) {
            throw new Error("failed to update ststus");
        }
        return response.json();
    }
    const { mutate:updateRestaurantStatus, isLoading, isSuccess, error } = useMutation(updatemyRestaurantOrder);
    if (isSuccess) {
        toast.success("Restaurant status updated");
    }
    if (error) {
        toast.error("Unable to update restaurant");
    }
    return { updateRestaurantStatus, isLoading }
}