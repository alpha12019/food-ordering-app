import { MenuItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuitem:MenuItem;
  addToCart:()=>void;
}

const MenuItems = ({menuitem,addToCart}: Props) => {
  return (
    <Card className="cursor-pointer" onClick={()=>addToCart()}>
        <CardHeader>
            <CardTitle>{menuitem.name}</CardTitle>
        </CardHeader>
        <CardContent className="font-bold">
            ₹{menuitem.price}
        </CardContent>
    </Card>
  )
}

export default MenuItems;