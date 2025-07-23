import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { useCreateMyRestaurant, useGetMyRestaurant, useGetMyRestaurantOrder, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderItemCard from "@/components/OrderItemCard";




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
        <Tabs defaultValue="orders">
            <TabsList>
                <TabsTrigger value="orders">orders</TabsTrigger>
                <TabsTrigger value="manage-restaurant">manage restaurant</TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="space-y-5 bg-gray-50 pg-10 rounded-lg p-10">
                <h1 className="text-2xl font-bold">{orders?.length} active orders</h1>
                {orders?.map((order)=><OrderItemCard order={order}></OrderItemCard>)}

                
            </TabsContent>
            <TabsContent value="manage-restaurant" className="space-y-5 bg-gray-50 pg-10 rounded-lg">
                <ManageRestaurantForm
                    restaurant={currentRestaurant}
                    onSave={isEditing ? updateRestaurant : createRestaurant}
                    isLoading={createIsLoading || updateIsLoading}
                />
            </TabsContent>
        </Tabs>
    )
    
}

export default ManageRestaurantPage;

