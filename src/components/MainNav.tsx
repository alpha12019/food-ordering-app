import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button"
import UserNameMenu from "./UserNameMenu";
import { Link } from "react-router-dom";

const MainNav=()=>{
    const {loginWithRedirect,isAuthenticated}=useAuth0();
    return(
        <span className="flex space-x-2 items-center z-5">
            {isAuthenticated?(
                <>
                    <Link to="/order-status" className="font-bold text-white bg-orange-500 py-2 px-6 rounded-md">
                        My Orders
                    </Link>
                    <UserNameMenu ></UserNameMenu>
                </>
                
            ):<Button variant="ghost" className="font-bold  hover:text-orange-500 hover:bg-white" onClick={async ()=>await loginWithRedirect()}>Login</Button>}
        </span>
    )
}
export default MainNav