import { CartItem } from "@/pages/DetailsPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash2 } from "lucide-react";

type Props = {
  restaurant:Restaurant;
  cartItems:CartItem[];
  deleteFromCart:(item:CartItem)=>void;
}

const OrderSummary = ({restaurant,cartItems,deleteFromCart}: Props) => {
  const getTotalCost=()=>{
    const rupees=cartItems.reduce((total,cartItem)=>total+cartItem.price*cartItem.quantity,0);
    const total=rupees+restaurant.deliveryPrice;
    return total;
  }
  return (
    <>
        <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight flex justify-between items-center">
                <span className="text-gray-800">Your Order</span>
                <span className="text-orange-600">₹{getTotalCost()}</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:gap-4 md:gap-5">
            {cartItems.map((item)=>(
                <div className="flex justify-between items-center" key={item._id}>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Badge variant="outline" className="text-xs sm:text-sm px-2 py-1 flex-shrink-0">{item.quantity}</Badge>
                        <span className="text-sm sm:text-base truncate">{item.name}</span>
                        <button 
                          className="text-red-500 hover:text-red-600 transition-colors duration-300 p-1 flex-shrink-0" 
                          onClick={()=>deleteFromCart(item)}
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                    <span className="flex items-center gap-1 text-sm sm:text-base font-semibold text-gray-800 flex-shrink-0">
                      ₹{(item.price*item.quantity)}
                    </span>
                </div>
            ))}
            <Separator className="my-2 sm:my-3 border-t border-gray-300" />
            <div className="flex justify-between items-center">
                <span className="text-sm sm:text-base text-gray-600">Delivery</span>
                <span className="text-sm sm:text-base font-semibold text-gray-800">₹{restaurant.deliveryPrice}</span>
            </div>
        </CardContent>
    </>
  )
}

export default OrderSummary;