import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import Cuisines from "./Cuisines";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
    restaurantName: z.string({
        required_error: "restaurantName is required"
    }),
    city: z.string({
        required_error: "city is required"
    }),
    country: z.string({
        required_error: "country is required"
    }),
    deliveryPrice: z.coerce.number({
        required_error: "deliveryPrice is required",
        invalid_type_error: "deliveryPrice must be positive number"
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: "estimatedDeliveryTime is required",
        invalid_type_error: "estimatedDeliveryTime must be positive integer"
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "please select at least one item"
    }),
    menuItems: z.array(
        z.object({
            name: z.string().min(1, "name is required"),
            price: z.coerce.number().min(1, "price is required")
        })
    ),
    imageUrl:z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
}).refine((data)=>data.imageFile||data.imageUrl,{
    message:"either image url of image file must be provided",
    path:["imageFile"]
})

type RestaurantFormData = z.infer<typeof formSchema>

type Props = {
    restaurant?:Restaurant;
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
}


const ManageRestaurantForm = ({ onSave, isLoading ,restaurant}: Props) => {
    const { toast } = useToast();
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{ 
                name: "",
                price: 0
            }]
        }
    });
    useEffect(()=>{
        if(!restaurant){
            return;
        }
        const deliveryPriceFormatted=parseInt(restaurant.deliveryPrice.toFixed(2));
        const menuItemsFormatted=restaurant.menuItems.map((item)=>({
            ...item,
            price:parseInt(item.price.toFixed(2))
        }))
        const updatedRestaurant={
            ...restaurant,
            deliveryPrice:deliveryPriceFormatted,
            menuItems:menuItemsFormatted
        }
        form.reset(updatedRestaurant);

    },[form,restaurant])
    const onSubmit:(formDataJson: RestaurantFormData) =>void=(formDataJson)=>{
        //to covert json data from form to new form data object
        const formData = new FormData();
        formData.append("restaurantName", formDataJson.restaurantName);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("deliveryPrice", (formDataJson.deliveryPrice).toString());
        formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString());
        formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine);
        })
        formDataJson.menuItems.forEach((menuitem, index) => {
            formData.append(`menuItems[${index}][name]`, menuitem.name);
            formData.append(`menuItems[${index}][price]`, (menuitem.price).toString());
        })
        if(formDataJson.imageFile){
            formData.append("imageFile",formDataJson.imageFile);
        }
        onSave(formData);
        toast({ title: "Saving...", description: "Your changes are being saved.", duration: 1500 });
    }
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-100 rounded-lg p-3 sm:p-6 md:p-10">
                <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Restaurant Details</h3>
                    <DetailsSection />
                </div>
                <Separator className="my-3 border-t border-gray-300" />
                <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Cuisines</h3>
                    <Cuisines />
                    <p className="text-xs text-gray-500 mt-1">Select at least one cuisine that represents your restaurant.</p>
                </div>
                <Separator className="my-3 border-t border-gray-300" />
                <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Menu Items</h3>
                    <MenuSection />
                    <p className="text-xs text-gray-500 mt-1">Add menu items with name and price.</p>
                </div>
                <Separator className="my-3 border-t border-gray-300" />
                <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Restaurant Image</h3>
                    <ImageSection />
                </div>
                {isLoading ? <LoadingButton /> : <Button type="submit" className="bg-orange-500 w-full py-2 sm:py-3 text-base sm:text-lg font-semibold">Save Changes</Button>}
            </form> 
        </Form>
    )
}

export default ManageRestaurantForm;

