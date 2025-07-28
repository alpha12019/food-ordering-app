import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { useCreateMyRestaurant, useGetMyRestaurant, useGetMyRestaurantOrder, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderItemCard from "@/components/OrderItemCard";
import { Toaster } from "@/components/ui/toaster";




const ManageRestaurantPage=()=>{
    const {createRestaurant,isLoading:createIsLoading}=useCreateMyRestaurant();
    const {currentRestaurant,isLoading:getIsLoading}=useGetMyRestaurant();
    const {updateRestaurant,isLoading:updateIsLoading}=useUpdateMyRestaurant();
    const {orders}=useGetMyRestaurantOrder();
    const isEditing=!!currentRestaurant;
    if(isEditing&&getIsLoading){
        return <div>loading</div>
    }
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold mb-4">Manage Your Restaurant</h1>
            <Tabs defaultValue="orders">
                <TabsList className="mb-4">
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
                </TabsList>
                <TabsContent value="orders" className="space-y-5 bg-white shadow-md rounded-lg p-10">
                    <h2 className="text-2xl font-semibold mb-4">{orders?.length || 0} Active Orders</h2>
                    {orders?.length === 0 && <div className="text-gray-500">No active orders.</div>}
                    {orders?.map((order, idx) => (
                        <div key={order.id || idx} className="mb-4">
                            <OrderItemCard order={order} />
                        </div>
                    ))}
                </TabsContent>
                <TabsContent value="manage-restaurant" className="space-y-5 bg-white shadow-md rounded-lg p-10">
                    <h2 className="text-2xl font-semibold mb-4">Restaurant Details</h2>
                    <ManageRestaurantForm
                        restaurant={currentRestaurant}
                        onSave={isEditing ? updateRestaurant : createRestaurant}
                        isLoading={createIsLoading || updateIsLoading}
                    />
                </TabsContent>
            </Tabs>
            <Toaster />
        </div>
    )
    
}

export default ManageRestaurantPage;

