import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  onChange: (value: string) => void;
  sortOption: string;
};

const SORT_OPTIONS = [
  {
    label: "Best match",
    value: "bestMatch",
  },
  {
    label: "Delivery price",
    value: "deliveryPrice",
  },
  {
    label: "Estimated delivery time",
    value: "estimatedDeliveryTime",
  },
];

const SortOptionsDropdown = ({ onChange, sortOption }: Props) => {
  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
    SORT_OPTIONS[0].label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer w-full">
        <Button variant="outline" className="w-full text-xs sm:text-sm md:text-base px-3 sm:px-4 py-2 sm:py-3 justify-between">
          <span className="truncate">Sort by: {selectedSortLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full min-w-[200px] sm:min-w-[250px]">
        {SORT_OPTIONS.map((option, index) => (
          <DropdownMenuItem
            key={index}
            className="cursor-pointer text-xs sm:text-sm md:text-base px-3 sm:px-4 py-2 sm:py-3 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-300"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptionsDropdown;