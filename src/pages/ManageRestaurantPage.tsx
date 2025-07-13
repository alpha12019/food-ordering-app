import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { useCreateMyRestaurant, useGetMyRestaurant, useGetMyRestaurantOrder, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderItemCard from "@/components/OrderItemCard";
import { Toaster } from "@/components/ui/toaster";




const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: createIsLoading } = useCreateMyRestaurant();
    const { currentRestaurant, isLoading: getIsLoading } = useGetMyRestaurant();
    const { updateRestaurant, isLoading: updateIsLoading } = useUpdateMyRestaurant();
    const { orders } = useGetMyRestaurantOrder();
    const isEditing = !!currentRestaurant;
    if (isEditing && getIsLoading) {
        return <div>loading</div>
    }
    return (
        <div className="space-y-8 px-2 sm:px-4 md:px-8 lg:px-0">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">Manage Your Restaurant</h1>
            <Tabs defaultValue="orders">
                <TabsList className="mb-4 w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <TabsTrigger value="orders" className="flex-1">Orders</TabsTrigger>
                    <TabsTrigger value="manage-restaurant" className="flex-1">Manage Restaurant</TabsTrigger>
                </TabsList>
                <TabsContent value="orders" className="space-y-5 bg-white shadow-md rounded-lg p-4 sm:p-6 md:p-10">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4">{orders?.length || 0} Active Orders</h2>
                    {orders?.length === 0 && <div className="text-gray-500">No active orders.</div>}
                    {orders?.map((order, idx) => (
                        <div key={order.id || idx} className="mb-4">
                            <OrderItemCard order={order} />
                        </div>
                    ))}
                </TabsContent>
                <TabsContent value="manage-restaurant" className="space-y-5 bg-white shadow-md rounded-lg p-4 sm:p-6 md:p-10">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4">Restaurant Details</h2>
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

