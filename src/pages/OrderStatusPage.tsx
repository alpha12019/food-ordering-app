import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetails from "@/components/OrderStatusDetails";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const OrderStatusPage = () => {
      const {orders, isLoading} = useGetMyOrders();
  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(!orders||orders.length===0){
    return <h1>No Orders Found</h1>
  }
  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8 lg:px-0">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">Order Status</h1>
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
        <span className="text-base sm:text-lg font-medium">Total Orders:</span>
        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">{orders.length}</span>
      </div>
      {orders.map((order, idx) => (
        <div key={order.id || idx} className="space-y-6 sm:space-y-10 bg-white shadow-md p-4 sm:p-8 rounded-lg">
          <OrderStatusHeader order={order} />
          <div className="grid gap-6 sm:gap-10 grid-cols-1 md:grid-cols-2">
            <OrderStatusDetails order={order} />
            <AspectRatio ratio={16/5} className="w-full">
              <img src={order.restaurant.imageUrl} className="rounded-md h-full w-full object-cover" alt="Restaurant" />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderStatusPage;