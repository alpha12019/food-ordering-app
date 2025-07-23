import { Orders } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";


type Props = {
  order:Orders
}

const OrderStatusHeader = ({order}: Props) => {
    const getExpectedDelivery=()=>{
        const create=new Date(order.createdAt);
        create.setMinutes(create.getMinutes()+order.restaurant.estimatedDeliveryTime);
        const hours=create.getHours();
        const minutes=create.getMinutes();
        const paddedMinutes=minutes<10?`0${minutes}`:minutes;
        return `${hours}:${paddedMinutes}`;
    }
    const getOrderStatusInfo=()=>{
        return ORDER_STATUS.find((o)=>o.value===order.status)||ORDER_STATUS[0];
    }
    return <>
        <h1 className="text-4xl font-bold tracking-tighter flex flex-col md:flex-row md:justify-between">
            <span>Order Status: {getOrderStatusInfo().label}</span>
            <span>Expected By: {getExpectedDelivery()}</span>
        </h1>
        <Progress className="animate-pulse" value={getOrderStatusInfo().progressValue}></Progress>
    </>
}

export default OrderStatusHeader;