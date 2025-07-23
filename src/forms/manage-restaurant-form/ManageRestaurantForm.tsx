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
    isLoading: Boolean;
}


const ManageRestaurantForm = ({ onSave, isLoading ,restaurant}: Props) => {
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

    }
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-100 rounded-lg md:p-10">
                <DetailsSection></DetailsSection>
                <Separator className="my-3 border-t border-gray-300" />
                <Cuisines></Cuisines>
                <Separator className="my-3 border-t border-gray-300" />
                <MenuSection></MenuSection>
                <Separator className="my-3 border-t border-gray-300" />
                <ImageSection></ImageSection>
                {isLoading ? <LoadingButton></LoadingButton> : <Button type="submit" className="bg-orange-500">Submit</Button>}
            </form> 
        </Form>
    )
}

export default ManageRestaurantForm;

