import { FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useFormContext } from "react-hook-form";

const ImageSection = () => {
    const { control, watch } = useFormContext();
    const existingImageUrl = watch("imageUrl");
    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Image</h2>
                <FormDescription>Add image that will be displayed at your restaurant listing in the search results .Adding a new image will overwrite the existing one</FormDescription>
            </div>
            <div className="flex flex-col gap-8 md:w-[50%]">
                {existingImageUrl&&(
                    <AspectRatio ratio={16/9}>
                        <img src={existingImageUrl} className="rounded-md object-cover h-full w-full"></img>
                    </AspectRatio>
                )}
                <FormField control={control} name="imageFile" render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                        <FormControl>
                            <Input type="file" className="bg-white" accept=".jpg,.jpeg,.png"
                                onChange={(event) => field.onChange(event.target.files ? event.target.files[0] : null)}>

                            </Input>
                        </FormControl>
                    </FormItem>
                )} />
            </div>
        </div>
    )

}
export default ImageSection;

