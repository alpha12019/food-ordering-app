import { Link } from "react-router-dom";

type Props = {
  total:number;
  city:string
}

const SearchResultsInfo = ({total,city}: Props) => {
  return (
    <div className="text-xl flex flex-col gap-3 font-bold lg:items-center lg:flex-row justify-between">
        <span>
            {total} restaurants found in {city}
            <Link to="/" className="text-sm font-semibold underline cursor-pointer text-blue-500 mx-5">change location</Link>
        </span>

    </div>
  )
}

export default SearchResultsInfo;