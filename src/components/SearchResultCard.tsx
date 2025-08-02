import { Restaurant } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  restaurant:Restaurant
}

const SearchResultCard = ({restaurant}: Props) => {
  return (
    <Link to={`/detail/${restaurant._id}`} className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] lg:grid-cols-[2fr_3fr] gap-3 sm:gap-4 lg:gap-5 group hover:shadow-lg transition-all duration-300 rounded-lg p-2 sm:p-3 hover:scale-[1.02]">
        <AspectRatio ratio={16/6} className="rounded-md overflow-hidden">
            <img src={restaurant.imageUrl} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </AspectRatio>
        <div className="flex flex-col justify-between p-2 sm:p-3">
            <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight mb-2 sm:mb-3 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                  {restaurant.restaurantName}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <div className="flex flex-row flex-wrap items-center gap-1">
                        {restaurant.cuisines.map((cuisine,index)=>(
                            <span key={index} className="flex items-center text-xs sm:text-sm text-gray-600">
                                <span className="truncate max-w-[80px] sm:max-w-[100px]">{cuisine}</span>
                                {index<restaurant.cuisines.length-1&&<Dot className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />}
                            </span>
                        ))}
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                        <div className="flex items-center gap-1 text-green-600 text-xs sm:text-sm">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span>{restaurant.estimatedDeliveryTime} mins</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600 text-xs sm:text-sm">
                            <Banknote className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span>Delivery from ₹{restaurant.deliveryPrice}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default SearchResultCard;

