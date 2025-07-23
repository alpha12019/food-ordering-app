import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;


export const useGetMyUser=()=>{
    const {getAccessTokenSilently}=useAuth0();
    const getMyUserRequest=async():Promise<User>=>{
        const accessToken=await getAccessTokenSilently(); 
        const response=await fetch(`${API_BASE_URL}/api/my/user`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${accessToken}`,
                "Content-Type":"application/json",
            }
        })
        if(!response.ok){
            throw new Error("failed to create user");
        }
        return response.json();
    }
    const {data:currentUser,isLoading,error}=useQuery("fetchCurrentUser",getMyUserRequest);
    if(error){
        toast.error(error.toString());
    }

    return {currentUser,isLoading,error};
}



type CreateUserRequest={
    auth0id:String,
    email:String,
}

export const useCreateMyUser=()=>{
    const {getAccessTokenSilently}=useAuth0();
    const creatMyUserRequest=async(user:CreateUserRequest)=>{
        const accessToken=await getAccessTokenSilently(); 
        const response=await fetch(`${API_BASE_URL}/api/my/user`,{
            method:"POST",
            headers:{
                Authorization:`Bearer ${accessToken}`,
                "Content-Type":"application/json",
            },
            body:JSON.stringify(user),
        }) 
        if(!response.ok){
            throw new Error("failed to create user");
        }
    }
    const {mutateAsync:createuser,isLoading,isError,isSuccess}=useMutation(creatMyUserRequest);

    return {createuser,isLoading,isError,isSuccess};
}

type UpdateUserRequest={
    name:String,
    addressLine:String,
    city:String,
    country:String
}

export const useUpdateMyUser=()=>{
    const {getAccessTokenSilently}=useAuth0();
    const updateMyUserRequest=async(formdata:UpdateUserRequest)=>{
        const accessToken=await getAccessTokenSilently(); 
        const response=await fetch(`${API_BASE_URL}/api/my/user`,{
            method:"PUT",
            headers:{
                Authorization:`Bearer ${accessToken}`,
                "Content-Type":"application/json",
            },
            body:JSON.stringify(formdata),
        })
        if(!response.ok){
            throw new Error("failed to update user");
        }
    }
    const {mutateAsync:updateuser,isLoading,isSuccess,error,reset}=useMutation(updateMyUserRequest);

    if(isSuccess){
        toast.success("user profile updated");
    }
    if(error){
        toast.error(error.toString());
        reset();
    }

    return {updateuser,isLoading};

}