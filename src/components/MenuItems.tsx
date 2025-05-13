import { MenuItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuitem: MenuItem;
  addToCart: () => void;
}

const MenuItems = ({ menuitem, addToCart }: Props) => {
  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-orange-300 group touch-manipulation"
      onClick={() => addToCart()}
    >
      <CardHeader className="pb-1.5 sm:pb-2 md:pb-3 p-3 sm:p-4">
        <CardTitle className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
          {menuitem.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-3 sm:px-4 pb-3 sm:pb-4">
        <div className="font-bold text-orange-600 text-sm sm:text-base md:text-lg">
          ₹{menuitem.price}
        </div>
      </CardContent>
    </Card>
  )
}

export default MenuItems;