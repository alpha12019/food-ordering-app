import { Restaurant } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  restaurant:Restaurant
}

const SearchResultCard = ({restaurant}: Props) => {
  return (
    <Link to={`/detail/${restaurant._id}`} className="grid lg:grid-cols-[2fr_3fr] gap-5 group">
        <AspectRatio ratio={16/6}>
            <img src={restaurant.imageUrl} className="rounded-md w-full h-full object-cover" />
        </AspectRatio>
        <div>
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {restaurant.restaurantName}
        </h3>
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
            <div className="flex flex-row flex-wrap">
                {restaurant.cuisines.map((cuisine,index)=>(
                    <span className="flex">
                        <span>{cuisine}</span>
                        {index<restaurant.cuisines.length-1&&<Dot></Dot>}
                    </span>
                ))}
            </div>
            <div>
            <div className="flex items-center gap-1 text-green-500">
              <Clock className="text-green-600"></Clock>
              {restaurant.estimatedDeliveryTime} mins
            </div>
            <div className="flex items-center gap-1">
                <Banknote></Banknote>
                dielivery from rs{restaurant.deliveryPrice}
            </div>
            </div>
        </div>
        </div>
    </Link>
  )
}

export default SearchResultCard;

