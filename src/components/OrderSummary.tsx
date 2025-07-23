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
        <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
                <span>Your Order</span>
                <span>₹{getTotalCost()}</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
            {cartItems.map((item)=>(
                <div className="flex justify-between" key={item._id}>
                    <span className="flex items-center">
                        <Badge variant="outline" className="mr-2">{item.quantity}</Badge>
                        {item.name}
                        <span className="text-red-500 ml-1 cursor-pointer" onClick={()=>deleteFromCart(item)}><Trash2 className="cursor-pointer"></Trash2></span>
                    </span>
                    <span className="flex items-center gap-1">₹{(item.price*item.quantity)}</span>
                </div>
            ))}
            <Separator className="my-3 border-t border-gray-300" />
            <div className="flex justify-between">
                <span>Delivery</span>
                <span>{restaurant.deliveryPrice}</span>
            </div>

        </CardContent>
    </>
  )
}

export default OrderSummary;