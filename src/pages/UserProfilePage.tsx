import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { Toaster } from "@/components/ui/toaster";

const UserProfilePage=()=>{
    const {currentUser, isLoading: isGetLoading} = useGetMyUser();
    const {updateuser, isLoading: isUpdateLoading} = useUpdateMyUser();
    if(isGetLoading){
        return <div>loading</div>
     }
    if(!currentUser){
        return <h1>unable to load user profile</h1>
    }
    if(!currentUser){
        return <h1>unable to load user profile</h1>
    }
    return(
         <div className="max-w-xl mx-auto mt-6 sm:mt-10 px-2 sm:px-4">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">My Profile</h1>
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-8">
                <UserProfileForm currentUser={currentUser} onSave={updateuser} isLoading={isUpdateLoading} />
            </div>
            <Toaster />
        </div>
    )
}
export default UserProfilePage;