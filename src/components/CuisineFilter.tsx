import { cuisineList } from "@/config/restaurant-options-config";
import { Label } from "./ui/label";
import { Check } from "lucide-react";
import { ChangeEvent } from "react";

type Props = {
  onChange:(suisines:string[])=>void;
  selectedCuisines:string[];
  isExpanded:boolean;
}

const CuisineFilter = ({onChange,selectedCuisines,isExpanded}: Props) => {
    const handleCuisineChange=(event:ChangeEvent<HTMLInputElement>)=>{
        const clickedCuisine=event.target.value;
        const isChecked=event.target.checked;
        const newCuisineList=isChecked?[...selectedCuisines,clickedCuisine]:selectedCuisines.filter((cuisine)=>cuisine!==clickedCuisine);
        onChange(newCuisineList);
    }
    const HandleCuisineReset=()=>onChange([]);
    return <>
        <div className="flex justify-between items-center px-2">
            <div className="text-md font-semibold mb-2">Filter By Cuisines</div>
            <div onClick={HandleCuisineReset} className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500">Reset Filters</div>
        </div>
        <div className="space-y-2 flex flex-col">
            {cuisineList.slice(0,isExpanded?cuisineList.length:7).map((cuisine)=>{
                const isSelected=selectedCuisines.includes(cuisine);
                return <div className="flex">
                    <input id={`cuisine_${cuisine}`} type="checkbox" className="hidden" value={cuisine} checked={isSelected} onChange={handleCuisineChange}></input>
                    <Label htmlFor={`cuisine_${cuisine}`} className={`flex flex-1 items-center rounded-full cursor-pointer text-sm px-4 py-2 font-semibold ${isSelected?"border border-green-600 text-green":"border border-slate-300"}`}>
                    {isSelected&&<Check size={20} strokeWidth={3}></Check>}
                    {cuisine}
                    </Label>

                </div>
            })}
        </div>
    </>
}

export default CuisineFilter;