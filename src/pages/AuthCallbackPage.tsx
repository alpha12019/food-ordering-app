import { useAuth0 } from "@auth0/auth0-react";
import { useCreateMyUser } from "@/api/MyUserApi";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


const AuthCallbackPage=()=>{
    const hasCreatedUser=useRef(false);
    const navigate=useNavigate();
   const {user}=useAuth0();
   const {createuser}=useCreateMyUser();
   useEffect(()=>{
    if(user?.sub && user?.email && !hasCreatedUser.current){
        createuser({auth0id:user.sub,email:user.email});
        hasCreatedUser.current=true;
    }
    navigate('/');
   },[]);
   return <div>loading...</div>

}
export default AuthCallbackPage;

