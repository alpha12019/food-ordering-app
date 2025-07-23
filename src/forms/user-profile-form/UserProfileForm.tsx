import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "name is required"),
    addressLine: z.string().min(1, "address line is required"),
    city: z.string().min(1, "city is required"),
    country: z.string().min(1, "country is required"),
})

export type UserFormData = z.infer<typeof formSchema>

type Props = {
    currentUser:User,
    onSave: (userProfileData: UserFormData) => void,
    isLoading: boolean,
    title?:string,
    buttonText?:string
}

const UserProfileForm = ({ onSave, isLoading,currentUser,title="User Profile",buttonText="Submit" }: Props) => {
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues:currentUser
    })
    useEffect(()=>{
        form.reset(currentUser);

    },[form,currentUser]);
// Without useEffect:
// If you did not use the useEffect hook and just relied on defaultValues, the form would only initialize with the currentUser data once. If currentUser changes later (e.g., due to a data fetch or some user interaction), the form would not automatically update to reflect those changes. This would lead to a situation where the form displays stale data, which is not desirable in a dynamic form.

// Example Scenario:
// Imagine a user navigates to their profile page, and the currentUser data is initially empty or contains default values. The actual user data is then fetched asynchronously from an API and passed as a prop to UserProfileForm. Without the useEffect hook and form.reset(currentUser), the form would not update with the fetched data.

// In summary, the useEffect with form.reset(currentUser) ensures that the form values stay in sync with the currentUser prop, reflecting any updates or changes as they occur.
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 bg-gray-100 rounded-lg md:p-10">
                <div>
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <FormDescription>
                        View and change your profile information here 
                    </FormDescription>
                </div>
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} disabled className="bg-white"></Input>
                        </FormControl>
                    </FormItem>
                )}></FormField>
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white"></Input>
                        </FormControl>
                        
                        <FormMessage></FormMessage>
                    </FormItem>
                )}></FormField>
                <div className="flex flex-col md:flex-row gap-4">
                    <FormField control={form.control} name="addressLine" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>addressLine</FormLabel>
                            <Input {...field} className="bg-white"></Input>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}></FormField>
                    <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>City</FormLabel>
                            <Input {...field} className="bg-white"></Input>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}></FormField>
                    <FormField control={form.control} name="country" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Country</FormLabel>
                            <Input {...field} className="bg-white"></Input>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}></FormField>
                </div>
                {isLoading?<LoadingButton></LoadingButton>:<Button type="submit" className="bg-orange-500">{buttonText}</Button>}
            </form>
        </Form>
    )
}
export default UserProfileForm;



// How defaultValues Works in React Hook Form:
// Initialization: defaultValues are used only once when the form is first initialized. After that, React Hook Form does not automatically update the form values if defaultValues changes.
// Static Defaults: Once the form is initialized, defaultValues essentially becomes static. Any subsequent updates to the currentUser prop won’t automatically update the form’s fields.

// Why useEffect with form.reset is Necessary:
// Manual Reset: Since React Hook Form does not reactively update form values when defaultValues changes, the useEffect hook with form.reset(currentUser) is necessary to manually reset the form with the new currentUser values whenever they change.

// Without useEffect:
// Stale Data: If you don’t use useEffect to reset the form, the form will continue to display the initial values from when the form was first rendered, even if currentUser changes. This can lead to stale or incorrect data being shown in the form fields.

// Example Scenario:
// Initial Load: Suppose currentUser is null or contains placeholder values when the form is first rendered because the actual user data is still being fetched.
// Data Fetch Complete: Once the user data is fetched and currentUser is updated with the correct values, you would expect the form to update accordingly.
// Automatic Update?: However, because defaultValues in React Hook Form does not trigger an update to the form fields after initialization, the form fields won’t reflect the new currentUser values unless you explicitly reset the form.

// Key Takeaway:
// The useEffect with form.reset(currentUser) is used to ensure that the form values are in sync with the latest currentUser data. React Hook Form does not automatically update form values when defaultValues changes after the form's initialization, so this manual reset is necessary for the form to reflect updated prop values.