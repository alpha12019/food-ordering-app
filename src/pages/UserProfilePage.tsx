import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { Toaster } from "@/components/ui/toaster";

const UserProfilePage=()=>{
    const {currentUser,isLoading:isGetLoading}=useGetMyUser();
    const {updateuser,isLoading:isUpdateLoading}=useUpdateMyUser();
    if(isGetLoading){
        return <div>loading</div>
    }
    if(!currentUser){
        return <h1>unable to load user profile</h1>
    }
    return(
        <div className="max-w-xl mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>
            <div className="bg-white shadow-md rounded-lg p-8">
                <UserProfileForm currentUser={currentUser} onSave={updateuser} isLoading={isUpdateLoading} />
            </div>
            <Toaster />
        </div>
    )
}
export default UserProfilePage;