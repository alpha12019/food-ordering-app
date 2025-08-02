import { MenuItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuitem:MenuItem;
  addToCart:()=>void;
}

const MenuItems = ({menuitem,addToCart}: Props) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-orange-300 group" 
      onClick={()=>addToCart()}
    >
        <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
              {menuitem.name}
            </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
            <div className="font-bold text-orange-600 text-sm sm:text-base md:text-lg">
              ₹{menuitem.price}
            </div>
        </CardContent>
    </Card>
  )
}

export default MenuItems;