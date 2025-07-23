import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetails from "@/components/OrderStatusDetails";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const OrderStatusPage = () => {
  const {orders,isLoading}=useGetMyOrders();
  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(!orders||orders.length===0){
    return <h1>No Orders Found</h1>
  }
  return (
    <div className="space-y-10">
        {orders.map((order)=>(
            <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
                <OrderStatusHeader order={order}></OrderStatusHeader>
                <div className="grid gap-10 md:grid-cols-2">
                  <OrderStatusDetails order={order}></OrderStatusDetails>
                  <AspectRatio ratio={16/5}> <img src={order.restaurant.imageUrl} className="rounded-md h-full w-full object-cover"/></AspectRatio>
                </div>
            </div>
        ))}
    </div>
  )
}

export default OrderStatusPage;