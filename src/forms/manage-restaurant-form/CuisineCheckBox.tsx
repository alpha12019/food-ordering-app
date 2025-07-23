import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props={
    cuisine:String;
    field:ControllerRenderProps<FieldValues,"cuisines">;
}

const CuisineCheckBox=({cuisine,field}:Props)=>{
    return(
        <FormItem className="flex flex-row item-center space-x-1 space-y-0 mt-2">
            <FormControl>
                <Checkbox className="bg-white" 
                checked={field.value.includes(cuisine)}
                onCheckedChange={(checked)=>{
                    if(checked){
                        field.onChange([...field.value,cuisine]);
                    }
                    else{
                        field.onChange(field.value.filter((value:String)=>value!=cuisine))
                    }
                }}>

                </Checkbox>
            </FormControl>
            <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
        </FormItem>
    )
}
export default CuisineCheckBox;

