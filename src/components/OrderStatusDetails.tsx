import { Orders } from "@/types";
import { Separator } from "./ui/separator";

type Props = {
  order:Orders
}

const OrderStatusDetails = ({order}: Props) => {
  return <div className="space-y-5">
    <div className="flex flex-col">
        <span className="font-bold">Delivering to:</span>
        <span>{order.deliveryDetails.name}</span>
        <span>{order.deliveryDetails.addressLine},{order.deliveryDetails.city}</span>
    </div>
    <div className="flex flex-col">
        <span className="font-bold">Your order</span>
        <ul>
            {order.cartItems.map((item)=>(
                <li>{item.name}X{item.quantity}</li>
            ))}
        </ul>
    </div>
    <Separator/>
    <div className="flex flex-col">
        <span className="font-bold">Total:</span>
        <span>₹{order.totalAmount}</span>
    </div>
  </div>
}

export default OrderStatusDetails;