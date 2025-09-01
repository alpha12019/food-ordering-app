import { FormDescription, FormItem, FormMessage } from "@/components/ui/form";
import { FormField } from "@/components/ui/form-hooks";
import {cuisineList} from "@/config/restaurant-options-config"
import CuisineCheckBox from "./CuisineCheckBox";

const Cuisines=()=>{
    const {control} = useFormContext();
    return (
        <div className="space-y-2">
            <div>
                <h2>Cuisines</h2>
                <FormDescription>
                    Select the cuisines that your restaurant serves
                </FormDescription>
            </div>
            <FormField control={control} name="cuisines" render={({field})=>(
                <FormItem>
                    <div className="grid md:grid-cols-5 gap-1">
                        {cuisineList.map((cuisneItem)=>(
                            <CuisineCheckBox key={cuisneItem} cuisine={cuisneItem} field={field}></CuisineCheckBox>
                        ))}
                    </div>
                    <FormMessage></FormMessage>
                </FormItem>
            )} />
        </div>
    )
}
export default Cuisines;

