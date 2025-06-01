import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string
}

const SearchResultsInfo = ({ total, city }: Props) => {
  return (
    <div className="text-sm sm:text-base md:text-lg lg:text-xl flex flex-col sm:flex-row gap-2 sm:gap-3 lg:items-center justify-between font-bold">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
        <span className="text-gray-800">
          {total} restaurants found in {city}
        </span>
        <Link
          to="/"
          className="text-xs sm:text-sm font-semibold underline cursor-pointer text-blue-500 hover:text-blue-600 transition-colors duration-300"
        >
          Change location
        </Link>
      </div>
    </div>
  )
}

export default SearchResultsInfo;