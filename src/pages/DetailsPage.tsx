import { useGetrestaurant } from "@/api/RestaurantApi";
import CheckOutButton from "@/components/CheckOutButton";
import MenuItems from "@/components/MenuItems";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItem } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateCheckoutSession } from "@/api/OrderApi";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay";

export type CartItem={
    _id:string;
    name:string;
    price:number;
    quantity:number
}


const DetailsPage = () => {
    const {createCheckoutSession,isLoading:isCheckoutLoading}=useCreateCheckoutSession();
    const {restaurantId} = useParams();
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCartItems=sessionStorage.getItem(`cartItems-${restaurantId}`);
        return storedCartItems?JSON.parse(storedCartItems):[];
    });
    const {restaurant,isLoading,error}=useGetrestaurant(restaurantId);
    const addToCart=(menuItem:MenuItem)=>{
        setCartItems((prevCartItems)=>{
            const existingCartItem=prevCartItems.find((cartItem)=>cartItem._id===menuItem._id);
            let updatedCartItem;
            if(existingCartItem){
                updatedCartItem=prevCartItems.map((cartItem)=>cartItem._id===menuItem._id?{...cartItem,quantity:cartItem.quantity+1}:cartItem)
                
            }else{
                updatedCartItem=[...prevCartItems,{_id:menuItem._id,name:menuItem.name,price:menuItem.price,quantity:1}]
                
            }
            sessionStorage.setItem(`cartItems-${restaurantId}`,JSON.stringify(updatedCartItem));
            return updatedCartItem;

        })
    }
    const deleteFromCart=(deleteCartItem:CartItem)=>{
        setCartItems((prevCartItems)=>{
            let updatedCartItem;
            if(deleteCartItem.quantity>1){
                updatedCartItem=prevCartItems.map((cartItem)=>cartItem._id===deleteCartItem._id?{...cartItem,quantity:cartItem.quantity-1}:cartItem)
                
            }else{
                updatedCartItem=prevCartItems.filter((cartItem)=>cartItem._id!==deleteCartItem._id)
            
            }
            sessionStorage.setItem(`cartItems-${restaurantId}`,JSON.stringify(updatedCartItem));
            return updatedCartItem;

        })
    }

    const onCheckout= async (userFormData:UserFormData)=>{
        if (!restaurant) {
            return;
        }
    
        const checkoutData = {
            cartItems: cartItems.map((cartItem) => ({
                menuItemId: cartItem._id,
                name: cartItem.name,
                quantity: cartItem.quantity.toString(),
            })),
            deliverydetails: {
                name: userFormData.name,
                email: userFormData.email as string,
                addressLine: userFormData.addressLine,
                city: userFormData.city
            },
            restaurantId: restaurant._id,
        };
    
        const data = await createCheckoutSession(checkoutData);
        console.log("Response Data:", data);
        toast.success("order sent successfully");
    }

    if(isLoading){
        return <LoadingSpinner fullScreen text="Loading restaurant details..." />
    }

    if(error){
        const errorMessage = error instanceof Error ? error.message : String(error);
        return <ErrorDisplay error={errorMessage} title="Restaurant Not Found" message="We couldn't load the restaurant details. Please try again." />
    }

    if(!restaurant){
        return <ErrorDisplay title="Restaurant Not Found" message="The restaurant you're looking for doesn't exist or has been removed." />
    }
    
    return (
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
            <AspectRatio ratio={16/5}>
                <img src={restaurant.imageUrl} className="rounded-md object-cover h-full w-full"  />
            </AspectRatio>
            <div className="grid grid-cols-1 lg:grid-cols-[4fr_2fr] gap-4 sm:gap-5 md:gap-6 lg:gap-8 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32">
                <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
                    <RestaurantInfo restaurant={restaurant}></RestaurantInfo>
                    <span className="text-xl sm:text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((menuitem)=>(
                        <MenuItems key={menuitem._id} menuitem={menuitem} addToCart={()=>addToCart(menuitem)}></MenuItems>
                    ))}
                </div>
                <div className="order-first lg:order-last">
                    <Card className="sticky top-24">
                        <OrderSummary cartItems={cartItems} restaurant={restaurant} deleteFromCart={deleteFromCart}></OrderSummary>
                        <CardFooter className="p-3 sm:p-4">
                            <CheckOutButton disabled={cartItems.length===0} isLoading={isCheckoutLoading} onCheckout={onCheckout}></CheckOutButton>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
export default DetailsPage;