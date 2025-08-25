import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormControl, FormItem } from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/ui/form-hooks";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const formSchema = z.object({
    searchQuery: z.string({
        required_error: "restaurant name is required"
    })
})

export type SearchForm = z.infer<typeof formSchema>

type Props = {
    searchQuery?: string;
    onSubmit: (FormData: SearchForm) => void;
    placeholder: string;
    onReset?: () => void;
}

const SearchBar = ({ searchQuery, onSubmit, placeholder, onReset }: Props) => {
    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: { searchQuery }
    })
    useEffect(() => {
        form.reset({ searchQuery })
    }, [form, searchQuery])
    const handleReset = () => {
        form.reset({
            searchQuery: ""
        })
        if (onReset) {
            onReset();
        }
    }
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={`mx-1 sm:mx-2 md:mx-4 lg:mx-[8%] flex flex-col sm:flex-row items-center gap-2 sm:gap-3 justify-between border-2 rounded-full p-2 sm:p-3 md:p-4 ${form.formState.errors.searchQuery && "border-red-500"}`}>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <Search strokeWidth={2.5} size={24} className="text-orange-500 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                <FormField control={form.control} name="searchQuery" render={({ field }) =>
                    <FormItem className="flex-1 min-w-0">
                        <FormControl>
                            <Input
                                {...field}
                                className="border-none shadow-none text-sm sm:text-base md:text-lg lg:text-xl focus-visible:ring-0 placeholder:text-gray-500 h-8 sm:h-10 md:h-12"
                                placeholder={placeholder}
                            />
                        </FormControl>
                    </FormItem>
                } />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button 
                    type="button" 
                    variant="outline" 
                    className="rounded-full text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 flex-1 sm:flex-none h-8 sm:h-10 md:h-12 touch-manipulation"
                    onClick={handleReset}
                >
                    Reset
                </Button>
                <Button 
                    type="submit" 
                    className="rounded-full bg-orange-500 hover:bg-orange-600 text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 flex-1 sm:flex-none transition-all duration-300 hover:scale-105 h-8 sm:h-10 md:h-12 touch-manipulation"
                >
                    Search
                </Button>
            </div>
        </form>
    </Form>
}

export default SearchBar;