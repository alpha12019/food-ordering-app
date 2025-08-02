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
        <div className="flex justify-between items-center px-2 sm:px-3 mb-3 sm:mb-4">
            <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">Filter By Cuisines</div>
            <div onClick={HandleCuisineReset} className="text-xs sm:text-sm font-semibold underline cursor-pointer text-blue-500 hover:text-blue-600 transition-colors duration-300">Reset Filters</div>
        </div>
        <div className="space-y-2 sm:space-y-3 flex flex-col">
            {cuisineList.slice(0,isExpanded?cuisineList.length:7).map((cuisine, index)=>{
                const isSelected=selectedCuisines.includes(cuisine);
                return <div key={index} className="flex">
                    <input id={`cuisine_${cuisine}`} type="checkbox" className="hidden" value={cuisine} checked={isSelected} onChange={handleCuisineChange}></input>
                    <Label htmlFor={`cuisine_${cuisine}`} className={`flex flex-1 items-center rounded-full cursor-pointer text-xs sm:text-sm md:text-base px-3 sm:px-4 py-2 sm:py-3 font-semibold transition-all duration-300 hover:scale-[1.02] ${isSelected?"border-2 border-green-600 text-green-600 bg-green-50":"border border-slate-300 hover:border-slate-400"}`}>
                    {isSelected&&<Check size={16} strokeWidth={3} className="mr-2 flex-shrink-0 sm:w-4 sm:h-4 md:w-5 md:h-5"></Check>}
                    <span className="truncate">{cuisine}</span>
                    </Label>

                </div>
            })}
        </div>
    </>
}

export default CuisineFilter;