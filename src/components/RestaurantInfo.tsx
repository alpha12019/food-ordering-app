import { Restaurant } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  restaurant:Restaurant
}

const RestaurantInfo = ({restaurant}: Props) => {
  return (
    <Card className="border-slate-200 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter text-gray-800">
                {restaurant.restaurantName}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-gray-600">
                {restaurant.city}, {restaurant.country}
            </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-1 sm:gap-2">
            {restaurant.cuisines.map((item,index)=>(
                <span key={index} className="flex items-center text-sm sm:text-base text-gray-700">
                    <span className="truncate max-w-[100px] sm:max-w-[120px]">{item}</span>
                    {index<restaurant.cuisines.length-1&&<Dot className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />}
                </span>
            ))}
        </CardContent>
    </Card>
  )
}

export default RestaurantInfo;